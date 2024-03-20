import { InferSelectModel } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const task = sqliteTable("task", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export type Task = InferSelectModel<typeof task>;
