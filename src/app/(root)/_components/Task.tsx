"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDeleteTask } from "@/data/task";
import { Task as TaskType } from "@/db/schema";
import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import React from "react";

interface TaskProps {
  name: string;
  description: string;
  id: string;
  editTaskHandler: (task: TaskType) => void;
}

const Task: React.FC<TaskProps> = ({
  name,
  id,
  description,
  editTaskHandler,
}) => {
  const deleteTask = useDeleteTask();

  const onDeleteTask = (idTask: string) => {
    deleteTask.mutate(idTask);
  };

  const onEditTaskHandler = () => {
    editTaskHandler({ description, name, id });
  };

  return (
    <div className="my-2">
      <div className="flex justify-between items-center">
        <div>{name}</div>
        <div className="flex gap-3">
          <Button size={"icon"} variant={"default"}>
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button size={"icon"} variant={"outline"} onClick={onEditTaskHandler}>
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            size={"icon"}
            variant={"destructive"}
            onClick={() => onDeleteTask(id)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Separator className="my-1" />
    </div>
  );
};

export default Task;
