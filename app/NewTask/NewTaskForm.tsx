"use client";

import React from 'react'
import { useState } from "react";
import { createClient } from '@/Utils/Supabase/client';  

export default function NewTaskForm() {


const [title, setTitle] = useState("");
const [taskDescription, setTaskDescription] = useState("");

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // ✅ prevent form reload
    console.log("New Task:===========================");
    console.log("New Task:", { title, taskDescription });
    // Supabase insert logic will go here later
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("task")
      .insert([{ title, taskDescription, isDone: false }])
      .select();

    if (error) {
      console.error("Error inserting task:", error);
    } else {
      console.log("Inserted task:", data);
    }
}

return (
    <div>
      <h1>Create New Task</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Task Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={function (e) {
              setTitle(e.target.value);
            }}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Task Description:</label>
          <textarea
            id="description"
            value={taskDescription}
            onChange={function (e) {
              setTaskDescription(e.target.value);
            }}
            required
            rows={4}
          ></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
);

}