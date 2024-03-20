"use client";
import { IUseModalStore, useModalState } from "@/hooks/use-modal-state";
import React, { useMemo, useEffect } from "react";
import { FormActivity } from "./FormActivity";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetTask } from "@/data/task";
import TaskListContainer from "./TaskListContainer";
import { Task } from "@/db/schema";

const TaskContainer: React.FC = () => {
  const { isOpen, onClose, onOpen, editData, onEditData } =
    useModalState() as IUseModalStore<Task>;

  return (
    <div className="my-11">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Task With Drizzle
          </h1>
          <p className="leading-7 text-zinc-600 [&:not(:first-child)]:mt-2 pl-3">
            {/* using react-query hydration for fetching data, and Drizzle for ORM */}
            using react-query fetching data function, and Drizzle for Database
            ORM
          </p>
        </div>
        <Button onClick={onOpen}>Create Task</Button>
      </div>

      <div className="mt-10 flex flex-col">
        <div className="">
          <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-lg">
            Task list
          </h2>
        </div>
        <Separator className="my-4" />
      </div>

      <TaskListContainer editTaskHandler={onEditData} />
      <FormActivity onClose={onClose} isOpen={isOpen} editData={editData} />
    </div>
  );
};

export default TaskContainer;
