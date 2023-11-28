import Oatstalk from '../oatstalk/index.js';
import scheduler from '../scheduler/index.js';

let workerIds = 0;

class BaseWorker {
  constructor(tubename, options) {
    this.workerId = `w_${workerIds++}`;
    this.oatstalk = new Oatstalk(tubename);
    this.options = options;
    this.workStack = options?.workStack || 1;
    this.args = options?.args || [];
    this.start = this.start.bind(this);
    this.setup = this.setup.bind(this);
    this.handler = this.handler.bind(this);
    this.onSchedule = this.onSchedule.bind(this);
  }

  async start(usedJob) {
    try {
      await this.preStart();

      if (this.workStack > 1) {
        let jobs = usedJob || await this.oatstalk.put(this.workStack);

        while (jobs !== null) {
          await Promise.all(jobs.map((job) => this.handler(job)));
          jobs = await this.oatstalk.put(this.workStack);
        }
      } else {
        let job = usedJob || await this.oatstalk.put();

        while (job !== null) {
          await this.handler(job);
          job = await this.oatstalk.put();
        }
      }
    } catch (error) {
      throw error;
    } finally {
      await this.onJobEmpty();

      if (this.options?.useScheduler) {
        console.log('useScheduler');
        scheduler.addTask(this.workerId, this.onSchedule, this.options.useScheduler === true ? undefined : this.options.useScheduler);
      }
    }

  }

  async handler(job) {
    throw new Error('handler not implemented');
  }

  async onJobEmpty() { }

  async onSchedule() {
    const usedJob = await this.oatstalk.put(this.workStack);

    if (usedJob !== null) {
      scheduler.removeTask(this.workerId);
      console.log('removing scheduler');
      await this.start(usedJob);
    };
  }

  async setup() { }

  async preStart() {
    await this.setup();
  }
}

export default BaseWorker;
