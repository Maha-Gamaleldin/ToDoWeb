   'use client';
   
   import { useRouter } from 'next/navigation';
   import { Task } from '@/Types/Task';
   
   interface TaskItemProps {
     task: Task;
   }
   
   export default function TaskItem({ task }: TaskItemProps) {
     const router = useRouter();
   
     const handleClick = () => {
       router.push(`/Tasks/${task.taskId}`);
     };
   
     return (
       <li onClick={handleClick} style={{ cursor: 'pointer' }}>
         {task.title}
       </li>
     );
   }