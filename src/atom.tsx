import { atom, selector } from "recoil";

// type categories = "TO_DO" | "DOING" | "DONE"; //재사용가능
// 실수를 줄이기 위해서 이렇게 값을 넣어 사용하기
// string으로 바꾸고 싶다면  "TO_DO"="TO_DO", 이런식으로도 가능하다
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}
export const TODO_LIST = "todos";
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

// Selector 는 atom을 가져다가 output을 변형하는 것. state 자체를 바꾸는 게 아니다
// Selector 로 category별로 분류해줌
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
