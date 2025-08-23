import { readdir, readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const TASKS_DIR = resolve(__dirname, "../../tasks");

export async function getTasks() {
  const dirs = await readdir(TASKS_DIR);
  return dirs
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

export async function checkTask(taskId) {
  const tasks = await getTasks();
  return tasks.includes(taskId);
}

export async function getFileContents(taskId, filename, encoding = null) {
    return readFile(`${TASKS_DIR}/${taskId}/${filename}`, encoding);
}