import { atom, selector } from "recoil";

// type categories = "TO_DO" | "DOING" | "DONE"; //재사용가능
// 실수를 줄이기 위해서 이렇게 값을 넣어 사용하기
export enum Categories {
  "TO_DO",
  "DOING",
  "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

// Selector 는 atom을 가져다가 output을 변형하는 것. state 자체를 바꾸는 게 아니다
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
