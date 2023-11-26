import Oatstalk from '../oatstalk/index.js';
import scheduler from '../scheduler/index.js';

let pusherIds = 0;

class BasePusher {
  constructor(tubename, scheduleInterval = 30000) {
    this.pusherId = `p_${pusherIds++}`;
    this.interval = scheduleInterval;
    this.oatstalk = new Oatstalk(tubename);

    this.start = this.start.bind(this);
    this.handler = this.handler.bind(this);
    this.setup = this.setup.bind(this);
  }

  async start() {
    await this.setup();
    await this.handler();
    scheduler.addTask(this.pusherId, this.handler, this.interval);
  }

  async handler() { }

  async setup() { }
}

export default BasePusher;
