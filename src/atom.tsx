import { atom, selector } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface ItoDoState {
  [key: string]: ITodo[];
}
export const toDoState = atom<ItoDoState>({
  key: "toDo",
  default: {
    "To Do": [],
    doing: [],
    done: [],
  },
});
