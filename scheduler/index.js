const scheduler = {
  tasks: {},
  running: false,
  nodeInterval: null,
  start(findInterval = 5000) {
    if (this.running) return;
    this.running = true;
    this.nodeInterval = setInterval(() => {
      const now = Date.now();
      for (const nameTask of Object.keys(this.tasks)) {
        if (this.tasks[nameTask].nextRun <= now) {
          this.tasks[nameTask].nextRun = now + this.tasks[nameTask].interval;
          try {
            this.tasks[nameTask].fn();
          } catch (error) {
            console.error(error);
          }
        }
      }
    }, findInterval);
  },
  addTask(name, fn, interval = 5000) {
    this.tasks[name] = {
      interval,
      fn,
      nextRun: Date.now() + interval,
    };
  },
  removeTask(name) {
    delete this.tasks[name];
  },
  stop() {
    clearInterval(this.nodeInterval);
    this.running = false;
  },
};

export default scheduler;
