import { atom, selector } from "recoil";

interface ItoDoState {
  [key: string]: string[];
}
export const toDoState = atom<ItoDoState>({
  key: "toDo",
  default: {
    "To Do": ["a", "b"],
    doing: ["c"],
    done: ["d", "e"],
  },
});
