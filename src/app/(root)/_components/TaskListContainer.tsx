"use client";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useGetTask } from "@/data/task";
import React, { useMemo } from "react";
import Task from "./Task";
import { Task as TaskType } from "@/db/schema";

interface TaskListContainerProps {
  editTaskHandler: (task: TaskType) => void;
}

const TaskListContainer: React.FC<TaskListContainerProps> = ({
  editTaskHandler,
}) => {
  const { data, isLoading, isRefetching, error } = useGetTask();

  const taskList = useMemo(() => data?.success || [], [data?.success]);

  return (
    <>
      {(isLoading || isRefetching) && (
        <div className="flex justify-center">
          <LoadingSpinner className="w-12 h-20" />
        </div>
      )}

      {!isLoading && !isRefetching && (
        <>
          {taskList.length === 0 && !isLoading && (
            <div className="flex justify-center">
              <p>Tidak Ada Task</p>
            </div>
          )}

          {taskList.length > 0 && (
            <>
              {taskList?.map((item) => {
                return (
                  <Task
                    key={item.id}
                    name={item.name}
                    id={item.id}
                    description={item.description}
                    editTaskHandler={editTaskHandler}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
};

export default TaskListContainer;
