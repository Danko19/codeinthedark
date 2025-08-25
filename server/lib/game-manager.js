export class GameManager {
  constructor() {
    this.reset();
  }

  reset() {
    this.current = null;
    this.codes = { 1: "", 2: "" };
    this.codeCheckerResults = { 1: "", 2: "" };
  }

  start(taskId, duration, defaultCodeTemplate) {
    this.current = { taskId, duration, startAt: Date.now() };
    this.codes = { 1: defaultCodeTemplate, 2: defaultCodeTemplate };
    this.codeCheckerResults = { 1: "", 2: "" };
  }

  stop() {
    this.reset();
  }

  submitCode(player, code) {
    this.codes[player] = code;
  }

  setCodeCheckerResult(player, result) {
    this.codeCheckerResults[player] = result;
  }

  getState() {
    if (!this.current) {
      return { taskId: null, duration: 0, timeLeft: 0, codes: this.codes, codeCheckerResults: this.codeCheckerResults };
    }
    const now = Date.now();
    const end = this.current.startAt + this.current.duration * 1000;
    return {
      taskId: this.current.taskId,
      duration: this.current.duration,
      timeLeft: Math.max(0, Math.ceil((end - now) / 1000)),
      codes: this.codes,
      codeCheckerResults: this.codeCheckerResults,
    };
  }
}
