import React from 'react'
import { Task, tasksList } from '@/Types/Task';

interface TaskDetailsProps {
  params: {
    TaskId: string;
  };
}


export default async function TaskDetails({ params }: TaskDetailsProps) {
    const { TaskId } = await params;
    const allTasks: Task[] = tasksList
    console.log(TaskId);
    const numberValue = Number(TaskId); 
    const task = allTasks.find((t) => t.taskId === numberValue);
    
    if (!task) {
    return <div>Task not found ❌ id= {TaskId}</div>;
}

  return (
  <div style={{ padding: '20px' }}>
      <h1>Task Details</h1>
      <p><strong>ID:</strong> {task.taskId}</p>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong> {task.taskDescription}</p>
      <p><strong>Status:</strong> {task.isDone ? '✅ Done' : '⏳ Not done yet'}</p>
    </div> 
     );
}