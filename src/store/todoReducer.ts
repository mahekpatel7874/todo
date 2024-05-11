import { ADD_TODO, REMOVE_TODO, RESET_TODO, UPDATE_TODO } from "./todoActions";

export interface ITodo {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
}

const initialState: any = {
  todoList: [] as ITodo[],
};

const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TODO:
      return { todoList: [...state.todoList, action.payload] };
    case UPDATE_TODO:
      return {
        todoList: [
          ...state.todoList.map((todo: ITodo) =>
            todo.id === action.payload.id ? action.payload : todo
          ),
        ],
      };
    case REMOVE_TODO:
      return {
        todoList: [
          ...state.todoList.filter(
            (todo: ITodo) => todo.id !== action.payload.id
          ),
        ],
      };
    case RESET_TODO:
      return {
        todoList: [],
      };
    default:
      return state;
  }
};

export default todoReducer;
