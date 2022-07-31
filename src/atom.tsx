import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

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
  effects: [persistAtom],
});
