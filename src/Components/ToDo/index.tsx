import React from "react";
import moment from "moment/moment";
import { FaRegCheckCircle } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";

interface ToDoProps {
  data: any[];
  onSelect: (data: any) => void;
  onComplete: (data: any) => void;
}

const ToDO = ({ data, onSelect, onComplete }: ToDoProps) => {
  return (
    <div
      className={
        "w-full flex flex-col gap-3 overflow-x-scroll no-scrollbar pb-3 flex-1"
      }
    >
      {!data.length && (
        <div
          className={
            "w-full flex flex-col gap-4 justify-center items-center h-full"
          }
        >
          {" "}
          <BsEmojiSmile className={"text-8xl text-primary"} />
          <p className={"text-primary text-2xl line-clamp-2 font-bold text-center"}>
            Let's Go. <br /> Create your first TODO.
          </p>
        </div>
      )}
      {data.map((item) => (
        <div
          key={item.id}
          className={`w-full relative shadow-lg bg-white p-4 rounded-2xl flex items-center gap-3 ${
            item.completed ? "" : ""
          }`}
          onClick={() => onSelect(item)}
        >
          <FaRegCheckCircle
            className={`text-4xl cursor-pointer ${
              !item.completed ? "text-gray-400" : "text-primary"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onComplete(item);
            }}
          />
          <div
            className={
              "w-full flex flex-col justify-between items-start cursor-pointer"
            }
          >
            <div
              className={
                "w-full flex justify-between items-center cursor-pointer"
              }
            >
              <p className={"text-xl font-medium cursor-pointer"}>
                {item.title}
              </p>
              <p className={"text-xs font-medium text-gray-500 cursor-pointer"}>
                {moment(item.createdAt).format("DD/MM/yyyy")}
              </p>
            </div>
            <p className={"text-sm cursor-pointer text-gray-600 line-clamp-1"}>
              {item.description}
            </p>
          </div>
          {item.completed && (
            <div
              className={`w-full flex flex-col justify-center items-center shadow-lg bg-white p-4 overflow-hidden rounded-2xl left-0 h-full bg-opacity-80 absolute ${
                item.completed ? "" : ""
              }`}
            >
              <div
                className={"h-1 bg-primary w-full opacity-75 rotate-[10deg]"}
              ></div>
              <div
                className={"h-1 bg-primary w-full opacity-75 rotate-[170deg]"}
              ></div>
              {/*<p className={'text-secondary font-bold text-xl'}>COMPLETED</p>*/}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToDO;
