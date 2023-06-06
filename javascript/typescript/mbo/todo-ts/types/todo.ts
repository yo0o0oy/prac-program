export type Todo = {
  id: number,
  isDone: boolean,
  task: string,
}

export type TaskRef = {
  [index: number]: HTMLTextAreaElement,
}
