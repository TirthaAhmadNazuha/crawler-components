import { Browser } from "puppeteer"

export class Oatstalk {
  constructor(tubename: string, serverAddress: string)
  tubename: string
  serverAddress: string
  url: string
  put(size: number): string | Object<string, any> | null
  body(body: string | Object<string, any> | any, spreading: false): boolean
}

interface OptionsWorker {
  useScheduler?: true | number
  workStack?: 1
  args?: []
}

export class BaseWorker {
  constructor(tubename: string, options: OptionsWorker)
  workerId: string
  oatstalk: Oatstalk
  workStack: 1
  options: OptionsWorker
  args: any[]
  start(): Promise<void>
  handler(job: string | number): Promise<void>
  preStart(): Promise<void>
  onJobEmpty(): Promise<void>
  onSchedule(): Promise<void>
}

export class PuppeteerWorker extends BaseWorker {
  browser: Browser
  async handler(job: string | number): void
}
