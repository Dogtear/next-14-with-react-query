"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { Task, task } from "@/db/schema";

export const getData = async () => {
  const task = await db.query.task.findMany();
  if (!task) return { error: "No Task" };
  return { success: task };
};

export const addTask = async (
  taskValues: Pick<Task, "name" | "description">
) => {
  const { description, name } = taskValues;

  const result = await db.insert(task).values({
    id: crypto.randomUUID(),
    name: name,
    description: description,
  });

  revalidatePath("/");
  return result;
};

export const deleteTask = async (id: string) => {
  const deletedData = await db.delete(task).where(eq(task.id, id)).returning();
  return deletedData;
};

export const updateTask = async (taskValues: Task) => {
  const { description, id, name } = taskValues;

  const udpatedTask = await db
    .update(task)
    .set({ name, description })
    .where(eq(task.id, id))
    .returning({ updatedId: task.id });

  return updateTask;
};
