import express from "express";
import dotenv from "dotenv";
import { GameManager } from "./lib/game-manager.js";
import { TASKS_DIR, getTasks, checkTask, getFileContents } from "./lib/tasks.js";
import { adminAuth } from "./lib/password.js";
import { CodeChecker } from "./lib/code-checker.js";
import { zip } from "./lib/solution-zip.js";

dotenv.config({ path: "../.env" });

const game = new GameManager();
const checker = new CodeChecker(process.env.CODE_CHECKER_TOKEN);
const app = express();
const PORT = process.env.SERVER_PORT || 4747;

const apiRouter = express.Router();

app.use("/tasks", express.static(TASKS_DIR));

if (process.env.NODE_ENV !== "development") {
  app.use("/", express.static("../client/dist"));
}

app.use("/api", apiRouter);

apiRouter.use(express.json());

apiRouter.post("/start", adminAuth, async (req, res) => {
  const { taskId, duration } = req.body;
  if (!(await checkTask(taskId)) || !Number(duration)) {
    return res.status(400).send("Bad task or duration");
  }

  const defaultCodeTemplate = await getFileContents(taskId, "template", "utf-8");
  game.start(taskId, Number(duration), defaultCodeTemplate);
  res.json({ taskId, duration: Number(duration) });
});

apiRouter.post("/stop", adminAuth, async (req, res) => {
  game.stop();
  res.json({ status: "ok" });
});

apiRouter.post("/code", async (req, res) => {
  const { player, code } = req.body;
  if (player !== 1 && player !== 2) {
    return res.status(400).send("Unknown player");
  }

    if (typeof code !== "string") {
    return res.status(400).send("Invalid code data");
  }

  game.submitCode(player, code);
  res.send("OK");
});

apiRouter.get("/tasks", async (req, res) => {
  const tasks = await getTasks();
  res.json(
    tasks.map((x) => ({
      name: x,
      url: `http://localhost:${PORT}/tasks/${x}/task.png`    
    })),
  );
});

apiRouter.get("/state", (req, res) => {
  res.json(game.getState());
});

apiRouter.post("/run", async (req, res) => {
  const { player, code } = req.body;
  if (player !== 1 && player !== 2) {
    return res.status(400).send("Unknown player");
  }
  if (typeof code !== "string") {
    return res.status(400).send("Invalid code data");
  }

  const solutionZip = await zip(code, game.getState().taskId);
  var requestId = checker.run(solutionZip);
  res.json({ requestId });
});

apiRouter.get("/runResult", async (req, res) => {
  const checkResult = await checker.getResult(req.query.requestId);
  res.json(checkResult);
});

app.use((req, res) => res.status(404).send("Not found"));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`\x1b[1mListening on http://localhost:${PORT}\x1b[0m`);
});
