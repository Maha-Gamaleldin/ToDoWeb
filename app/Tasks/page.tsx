import React from 'react'
import { Task, tasksList } from '@/Types/Task';
import TaskItem from './TaskItem';

const tasks: Task[] = tasksList;

export default function Tasks() {

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
