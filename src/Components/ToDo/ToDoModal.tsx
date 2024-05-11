import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

interface IAddToDoProps {
  open: boolean;
  onSubmit: (todo: any) => void;
  onClose: () => void;
  onDelete: () => void;
  data?: any;
}

const ToDoModal = ({
  open,
  onSubmit,
  onClose,
  onDelete,
  data = null,
}: IAddToDoProps) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    createdAt: "",
    completed: false,
    errors: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
    }
  }, [data]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isCheckbox = false
  ) => {
    const { id, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [id]: isCheckbox ? !prev.completed : value,
    }));
  };

  console.log(formData);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title) {
      onSubmit({
        id: data ? formData.id : uuidv4(),
        title: formData.title,
        description: formData.description,
        createdAt: data ? formData.createdAt : moment().format(),
        completed: formData.completed,
      });
      setFormData({
        id: "",
        title: "",
        description: "",
        createdAt: "",
        completed: false,
        errors: {
          title: "",
          description: "",
        },
      });
    } else {
      setFormData((prev: any) => ({
        ...prev,
        errors: { ...prev.errors, title: "Please enter title." },
      }));
    }
  };

  return (
    <div
      className={`fixed ${
        open ? "flex" : "hidden"
      } insert-0 bg-gray-600 bg-opacity-90 h-screen w-screen justify-center items-center`}
    >
      <div className="relative flex flex-col items-center justify-center top-0 p-5 border w-full max-w-[500px] shadow-lg rounded-md bg-white">
        <div className={"flex justify-between w-full"}>
          <MdOutlineCancel className={"text-2xl text-white"} />
          <h3 className="text-xl leading-6 font-bold text-primary">
            {data ? "Detail" : "New To Do"}
          </h3>
          <MdOutlineCancel
            className={"text-2xl text-primary cursor-pointer"}
            onClick={onClose}
          />
        </div>
        <form
          onSubmit={submitHandler}
          className="mt-3 text-left w-full flex flex-col gap-3"
        >
          <div className="mt-2 w-full">
            <label htmlFor={"title"} className="text-md font-bold text-primary">
              Title
            </label>
            <input
              id={"title"}
              className={
                "bg-white w-full border-2 border-primary rounded-lg p-2 outline-none text-secondary"
              }
              type={"text"}
              value={formData?.title}
              onChange={onChange}
              readOnly={formData.completed}
            />
            {formData.errors.title && (
              <p className={"text-sm font-bold text-red-500"}>
                {formData.errors.title}
              </p>
            )}
          </div>
          <div className="mt-2 w-full">
            <label
              htmlFor={"description"}
              className="text-md font-bold text-primary"
            >
              Description
            </label>
            <textarea
              id={"description"}
              className={
                "bg-white w-full border-2 border-primary rounded-lg p-2 outline-none text-secondary"
              }
              cols={5}
              value={formData?.description}
              onChange={onChange}
              readOnly={formData.completed}
            />
          </div>
          <div className="mt-2 w-full flex justify-start gap-2">
            <input
              id={"completed"}
              className={"w-4"}
              checked={formData.completed}
              type={"checkbox"}
              onChange={(e) => onChange(e, true)}
              readOnly={formData.completed}
              disabled={formData.completed}
            />
            <label
              htmlFor={"completed"}
              className="text-md font-bold text-primary"
            >
              Mark as Completed
            </label>
          </div>
          {!data?.completed && (
            <div className={'flex flex-col gap-3'}>
              <button
                className={
                  "w-full bg-primary text-white font-bold py-3 rounded-lg"
                }
                type="submit"
              >
                {data ? "Update" : "Save"}
              </button>
              <button
                className={
                  "w-full border-primary border-2 text-primary font-bold py-3 rounded-lg"
                }
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ToDoModal;
