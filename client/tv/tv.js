import { formatTime } from "../utils/formatTime";
import * as monaco from "monaco-editor";
import { emmetHTML } from "emmet-monaco-es";
emmetHTML(monaco);

function updatePlayerResult(result, element) {
  if (result && result.isSussesful) {
    element.textContent = `✔ Tests passed!`;
    element.className = `player-result-success`;
  } else if (result && result.status === 'testsFailed') {
    element.textContent = `✘ Tests failed! Passed ${result.testsResult.passed} from ${result.testsResult.total}`;
    element.className = `player-result-test-failed`;
  } else if (result && result.status === 'sandboxError') {
    element.textContent = `⚠ Compilation or Runtime error`;
    element.className = `player-result-error`;
  } else {
    element.className = `player-no-result`;
    element.textContent = "";
  }
}

const player1Code = document.getElementById("frame1");
const player2Code = document.getElementById("frame2");

const player1Result = document.getElementById("result-player-1");
const player2Result = document.getElementById("result-player-2");

let currentTaskId = null;
let lastCodes = { 1: "", 2: "" };

const editor1 = monaco.editor.create(player1Code, {
  language: "csharp",
  theme: "vs-dark",
  fontSize: 15,
  automaticLayout: true,
  readOnly: true,
  "editor.scrollBeyondLastLine": false,
});

const editor2 = monaco.editor.create(player2Code, {
  language: "csharp",
  theme: "vs-dark",
  fontSize: 15,
  readOnly: true,
  automaticLayout: true,
  "editor.scrollBeyondLastLine": false,
});

function poll() {
  fetch("/api/state")
    .then((r) => r.json())
    .then((state) => {
      const img = document.getElementById("refImg");
      if (!currentTaskId) {
        img.src = "preview.png";
        img.style.objectFit = "fill";
      }

      if (state.taskId !== currentTaskId) {
        currentTaskId = state.taskId;
        fetch("/api/tasks")
          .then((r) => r.json())
          .then((tasks) => {
            const t = tasks.find((x) => x.name === state.taskId);
            img.src = t ? t.url : ``;
            img.style.objectFit = "contain";
          });
        lastCodes = { 1: "", 2: "" };
        editor1.setValue("");
        editor2.setValue("");
      }
      if (state.codes[1] !== lastCodes[1]) {
        lastCodes[1] = state.codes[1];
        editor1.setValue(lastCodes[1]);
      }
      if (state.codes[2] !== lastCodes[2]) {
        lastCodes[2] = state.codes[2];
        editor2.setValue(lastCodes[2]);
      }

      updatePlayerResult(state.codeCheckerResults[1], player1Result);
      updatePlayerResult(state.codeCheckerResults[2], player2Result);

      document.getElementById("timer").innerText = formatTime(state.timeLeft);
    });
}

setInterval(poll, 500);

poll();
