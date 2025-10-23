import React from 'react'

export default function Tasks() {
  const tasks = ["task1", "task2", "task3", "task4", "task5"];

  return (
    <div>
      {""}
      <h1>Tasks</h1>
      <ul>
        { tasks.map((task, index) => (
          <li key = {index} > {task} 
          </li>
        ))}
      </ul>
    </div>
  );
}
