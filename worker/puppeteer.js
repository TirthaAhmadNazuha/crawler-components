import BaseWorker from './base.js';
import { launch } from 'puppeteer';

class PuppeteerWorker extends BaseWorker {
  async preStart() {
    this.browser = await launch({ headless: false });
    await this.setup();
  }

  async handler(job) {
    throw new Error('handler not implemented');
  }

  async onJobEmpty() {
    await this.browser.close();
    this.browser = null;
    this.args = null;
  }
}

export default PuppeteerWorker;
