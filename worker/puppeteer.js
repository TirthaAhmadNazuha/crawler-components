import BaseWorker from './base.js';
import { launch, Browser } from 'puppeteer';

class PuppeteerWorker extends BaseWorker {
  async preStart() {
    this.browser = await launch({ headless: false });
    this.args = (this.options?.args || []).unshift(this.browser);
  }

  /**
   * 
   * @param {(string | number)} job 
   * @param {Browser} browser 
   * @param  {...any} args 
   */
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
