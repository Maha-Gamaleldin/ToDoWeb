import React from 'react'
import { Task, tasksList } from '@/Types/Task';
import TaskItem from './TaskItem';
import { createClient } from '@/Utils/Supabase/server';

const tasks: Task[] = tasksList;

export  default async function Tasks() {
const supabase = await createClient();
  const { data: instruments } = await supabase.from("task").select();
  console.log("====================================");
  console.log(JSON.stringify(instruments, null, 2));
  console.log("====================================");

  return (
    <div>
      {""}
      <h1>Tasks</h1>
      <ul>
        { tasks.map((task, index) => (
          <TaskItem key={task.taskId} task={task} />
        ))}
      </ul>
    </div>
  );
}
