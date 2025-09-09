export class GameManager {
  constructor() {
    this.reset();
  }

  countPassedElements = (data) => ({
    total: data.length,
    passed: data.filter(item => item.isPassed).length
  });

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
    if (!result || !result.status || result.status === 'processing') {
      this.codeCheckerResults[player] = "";
      return;
    }

    this.codeCheckerResults[player] = {
      status: result.status,
      isSussesful: result.status === "testsPassed",
      error: result.logs === null ? null : result.logs.map(str => str.replace(/\n/g, ' ')).join('\n'),
      testsResult: result.tests === null ? null : this.countPassedElements(result.tests),
    };
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
