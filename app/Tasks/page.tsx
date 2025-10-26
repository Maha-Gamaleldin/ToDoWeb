import React from 'react'
import { Task, tasksList } from '@/Types/Task';
import TaskItem from './TaskItem';
import { createClient } from '@/Utils/Supabase/server';
import { callCloudflareWorker } from '@/Utils/Api/cloudflare-worker';

const tasks: Task[] = tasksList;

export  default async function Tasks() {
const supabase = await createClient();
  const { data: instruments } = await supabase.from("task").select();
  console.log("====================================");
  console.log(JSON.stringify(instruments, null, 2));
  console.log("====================================");

  // Call Cloudflare Worker
  let workerData = null;
  let workerError = null;
  
  const workerUrl = process.env.CLOUDFLARE_WORKER_URL || process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_URL || '';
  
  if (workerUrl) {
    try {
      // Try calling the worker base URL first to see if it exists
      workerData = await callCloudflareWorker(workerUrl, 'GET');
      console.log("====================================");
      console.log("Cloudflare Worker Data:", JSON.stringify(workerData, null, 2));
      console.log("====================================");
    } catch (error) {
      workerError = error instanceof Error ? error.message : 'Unknown error';
      console.error("Cloudflare Worker Error:", workerError);
      console.error("Worker URL attempted:", workerUrl);
    }
  } else {
    console.warn("Cloudflare Worker URL not configured. Set CLOUDFLARE_WORKER_URL in .env.local");
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tasks</h1>
      
      {/* Display Cloudflare Worker Status */}
      {workerError && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '5px'
        }}>
          <strong>Cloudflare Worker Error:</strong> {workerError}
        </div>
      )}
      
      {workerData && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          backgroundColor: '#efe', 
          border: '1px solid #cfc',
          borderRadius: '5px'
        }}>
          <strong>Cloudflare Worker Response:</strong>
          <pre style={{ marginTop: '10px', fontSize: '12px' }}>
            {JSON.stringify(workerData, null, 2)}
          </pre>
        </div>
      )}
      
      {/* Display Tasks List */}
      <ul>
        {tasks.map((task, index) => (
          <TaskItem key={task.taskId} task={task} />
        ))}
      </ul>
    </div>
  );
}
