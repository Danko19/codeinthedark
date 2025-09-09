import * as monaco from "monaco-editor";
import { emmetHTML } from "emmet-monaco-es";

import { formatTime } from "../utils/formatTime";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";

const params = new URLSearchParams(location.search);
const timerEl = document.getElementById("timer");
const refImg = document.getElementById("ref");
const runButton = document.getElementById("runCode");

let PLAYER =
  Number(params.get("player")) || Number(localStorage.getItem("player"));
while (!PLAYER) {
  PLAYER = Number(prompt("Введите номер игрока (1 или 2):"));
}
window.history.replaceState({}, "", "/game/");
localStorage.setItem("player", PLAYER);

self.MonacoEnvironment = {
  getWorker: (moduleId, label) => {
    return new HtmlWorker();
  },
};

const editor = monaco.editor.create(document.getElementById("editor"), {
  // value: localStorage.getItem("value"),
  language: "csharp",
  theme: "vs-dark",
  fontSize: 15,
  automaticLayout: true,
  "editor.scrollBeyondLastLine": false,
});

emmetHTML(monaco);

editor.onDidChangeModelContent(() => {
  const code = editor.getValue();
  //localStorage.setItem("value", code);
  fetch("/api/code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player: PLAYER, code }),
  });
});

let currentTaskId = null;

async function poll() {
  try {
    const state = await fetch("/api/state").then((r) => r.json());
    if (!state.taskId)
      runButton.hidden = true;

    timerEl.textContent = state.taskId
      ? `${formatTime(state.timeLeft)}`
      : "Waiting for the start…";

    if (state.taskId !== currentTaskId) {
      currentTaskId = state.taskId;
      const tasks = await fetch("/api/tasks").then((r) => r.json());
      const t = tasks.find((x) => x.name === state.taskId);
      refImg.src = t ? t.url : "";
      editor.setValue(state.codes[PLAYER] || "");
      runButton.textContent = "► Run"
      runButton.disabled = false;
      runButton.hidden = false;
    }
  } catch (e) {
    console.error(e);
  }
}

poll();
setInterval(poll, 500);

runButton.onclick = async function () {
  runButton.disabled = true;
  runButton.textContent = "↻ Waiting"
  const code = editor.getValue();
  const response = await fetch("/api/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player: PLAYER, code }),
  }).then(response => response.json());
  waitReult(response.requestId);
};

function waitReult(requestId) {
  var tryCount = 0;
  const pollingId = setInterval(async () => {
    try {
      tryCount++;
      const response = await fetch(`/api/runResult?requestId=${requestId}&playerId=${PLAYER}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.status !== 'processing' || tryCount >= 60) {
        clearInterval(pollingId);
        const state = await fetch("/api/state").then((r) => r.json());

        alert(JSON.stringify(state.codeCheckerResults[PLAYER], null, 2));
        runButton.textContent = "► Run"
        runButton.disabled = false;
        runButton.hidden = false;
      }
    }
    catch (error) {
      console.error('Error during polling:', error);
      clearInterval(pollingId); // Stop polling on error
    }
  }, 1000)
}
