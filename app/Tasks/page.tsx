import React from 'react'
import { Task, tasksList } from '@/Types/Task';
import TaskItem from './TaskItem';
import { createClient } from '@/Utils/Supabase/server';

var tasks: Task[] = tasksList;

export  default async function Tasks() {
const supabase = await createClient();
const { data: remoteTasks } = await supabase.from("task").select();

  console.log("====================================");
  console.log(JSON.stringify(remoteTasks, null, 2));
  console.log("====================================");

 if (remoteTasks) {
        // map and coerce into our Task type
        tasks = remoteTasks.map(function (item: any) {
          return {
            taskId: item.taskId,
            title: item.title,
            taskDescription: item.taskDescription,
            isDone: item.isDone,
          };
        });

}

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
