import { launch, Browser } from 'puppeteer'
import axios from 'axios'

export class Oatstalk {
  constructor(tubename: string, serverAddress: string)
  tubename: string
  serverAddress: string
  url: string
  put(size: number): Promise<string | Object<string, any> | null>
  body(body: string | Object<string, any> | any, spreading: false): Promise<boolean>
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
  setup(): Promise<void>
  onJobEmpty(): Promise<void>
  onSchedule(): Promise<void>
}

export class PuppeteerWorker extends BaseWorker {
  browser: Browser
}

export class BasePusher<scheduleInterval> {
  constructor(tubename: string, scheduleInterval: scheduleInterval | 30000): void
  pusherId: string
  oatstalk: Oatstalk
  interval: scheduleInterval | 30000
  start(): Promise<void>
  handler(): Promise<void>
  setup(): Promise<void>
}

export interface Scheduler {
  start(findInterval: number): void
  tasks: Object<string, { interval: number, fn(): void, nextRun: number }>
  running: boolean
  nodeInterval: null
  addTask(name: string, fn: Function, interval = 5000): void
  removeTask(name: string): void
  stop(): void
}
export const scheduler: Scheduler

export {
  launch,
  axios,
}
