import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToDO from "../../Components/ToDo";
import ToDoModal from "../../Components/ToDo/ToDoModal";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../../store/todoActions";
import { ITodo } from "../../store/todoReducer";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { todoList } = useSelector((state: any) => state);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [selectedTodo, setSelectedTodo] = useState<any>(null);
  const [todos, setTodos] = useState<any>([]);

  useEffect(() => {
    if (todoList) {
      const notComplete = todoList
        .filter((todo: ITodo) => !todo.completed)
        .sort((a: any, b: any) => (a?.createdAt < b?.createdAt ? 1 : -1));
      const complete = todoList
        .filter((todo: ITodo) => todo.completed)
        .sort((a: any, b: any) => (a?.createdAt < b?.createdAt ? 1 : -1));
      setTodos([...notComplete, ...complete]);
    }
  }, [todoList]);

  const submitHandler = async (todo: any) => {
    await dispatch({
      type: selectedTodo ? UPDATE_TODO : ADD_TODO,
      payload: todo,
    });
    cleanUp();
  };

  const onDeleteHandler = async () => {
    await dispatch({
      type: REMOVE_TODO,
      payload: selectedTodo,
    });
    cleanUp();
  };

  const onCompleteHandler = async (todo: any) => {
    await dispatch({
      type: UPDATE_TODO,
      payload: { ...todo, completed: true },
    });
    cleanUp();
  };

  const cleanUp = () => {
    setOpenModal(false);
    setSelectedTodo(null);
  };

  return (
    <div
      className={
        "w-screen h-screen flex justify-center bg-gradient-to-t from-secondary to-primary"
      }
    >
      <div
        className={
          "flex flex-col w-full max-w-[500px] p-4 items-center bg-white my-4 mx-4 sm:my-10 sm:mx-0 rounded-2xl relative gap-3"
        }
      >
        <p
          className={
            "text-primary text-2xl font-bold border-b-2 border-primary w-full text-center"
          }
        >
          Your Goals
        </p>
        <ToDO
          data={todos}
          onSelect={(todo) => {
            setSelectedTodo(todo);
            setOpenModal(true);
          }}
          onComplete={onCompleteHandler}
        />
        <button
          className={
            "w-full bg-secondary flex relative bottom-0 justify-center items-center text-white font-bold rounded-2xl py-2"
          }
          onClick={() => {
            setOpenModal(true);
            setSelectedTodo(null);
          }}
        >
          ADD TODO
        </button>
      </div>
      {openModal && (
        <ToDoModal
          open={openModal}
          data={selectedTodo}
          onSubmit={submitHandler}
          onClose={cleanUp}
          onDelete={onDeleteHandler}
        />
      )}
    </div>
  );
};

export default LandingPage;
