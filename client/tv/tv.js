import { formatTime } from "../utils/formatTime";
import * as monaco from "monaco-editor";
import { emmetHTML } from "emmet-monaco-es";
emmetHTML(monaco);

const player1Result = document.getElementById("frame1");
const player2Result = document.getElementById("frame2");

let currentTaskId = null;
let lastCodes = { 1: "", 2: "" };

const editor1 = monaco.editor.create(player1Result, {
  language: "csharp",
  theme: "vs-dark",
  fontSize: 15,
  automaticLayout: true,
  readOnly: true,
  "editor.scrollBeyondLastLine": false,
});

const editor2 = monaco.editor.create(player2Result, {
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
      }

      if (state.taskId !== currentTaskId) {
        currentTaskId = state.taskId;
        fetch("/api/tasks")
          .then((r) => r.json())
          .then((tasks) => {
            const t = tasks.find((x) => x.name === state.taskId);
            img.src = t ? t.url : ``;
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
      document.getElementById("timer").innerText = formatTime(state.timeLeft);
    });
}

setInterval(poll, 500);

poll();
