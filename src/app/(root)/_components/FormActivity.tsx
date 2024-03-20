import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Modal from "@/components/common/Modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addTask } from "@/server/todo";
import { useCreateTask, useUpdateTask } from "@/data/task";
import { Task } from "@/db/schema";

interface FormActivityProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: Task;
}

const formSchema = z.object({
  taskname: z.string().min(2, { message: "at least 2 character is needed" }),
  task_description: z.string().min(1, { message: "field cannot be empty" }),
});

export const FormActivity: React.FC<FormActivityProps> = ({
  isOpen,
  onClose,
  editData,
}) => {
  console.log(editData);
  const createTask = useCreateTask(onClose);

  const updateTask = useUpdateTask(onClose);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskname: "",
      task_description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editData) {
      return updateTask.mutate({
        description: values.task_description,
        name: values.taskname,
        id: editData.id,
      });
    }

    return createTask.mutate({
      description: values.task_description,
      name: values.taskname,
    });
  };

  useEffect(() => {
    form.reset();
    if (editData) {
      form.setValue("task_description", editData?.description || "");
      form.setValue("taskname", editData.name);
    }
  }, [editData, form, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Form Activity"
      description="Form Activiy for testing"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name={"taskname"}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Task Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name={"task_description"}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Task description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Task Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
