import { Task } from "@/db/schema";
import { addTask, deleteTask, getData, updateTask } from "@/server/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetTask = () => {
  return useQuery({
    queryFn: async () => getData(),
    queryKey: ["task"],
  });
};

export const useCreateTask = (actionFn?: () => void, queryKey?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationKey: ["task"],
    mutationFn: (taskValues: Pick<Task, "description" | "name">) =>
      addTask(taskValues),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      actionFn?.();
    },
  });
};

export const useDeleteTask = (actionFn?: () => void, queryKey?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] }), actionFn?.();
    },
  });
};

export const useUpdateTask = (actionFn?: () => void, queryKey?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task: Task) => updateTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      actionFn?.();
    },
  });
};
