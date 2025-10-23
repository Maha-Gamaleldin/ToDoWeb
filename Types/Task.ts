import React from 'react'

export interface Task {
  taskId?: number;
  title: string;
  taskDescription: string;
  isDone: boolean;
}
export const tasksList: Task[] = [
  {
    taskId: 1,
    title: 'Buy groceries',
    taskDescription: 'Milk, eggs, bread, and cheese from the supermarket.',
    isDone: false,
  },
  {
    taskId: 2,
    title: 'Clean the apartment',
    taskDescription: 'Vacuum, dust shelves, and mop the floor.',
    isDone: true,
  },
  {
    taskId: 3,
    title: 'Finish project report',
    taskDescription: 'Summarize findings and send to the manager.',
    isDone: false,
  },
  {
    taskId: 4,
    title: 'Call mom',
    taskDescription: 'Check in and see how she’s doing.',
    isDone: false,
  },
  {
    taskId: 5,
    title: 'Workout session',
    taskDescription: '30 minutes of cardio and 20 minutes of strength training.',
    isDone: true,
  },
];