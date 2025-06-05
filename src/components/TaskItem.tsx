
import React from 'react';
import { Check, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-purple-400'
            }`}
          >
            {task.completed && <Check size={12} className="sm:w-3.5 sm:h-3.5" />}
          </button>
          <span
            className={`transition-all duration-300 text-sm sm:text-base break-words ${
              task.completed
                ? 'text-gray-500 line-through'
                : 'text-gray-800'
            }`}
          >
            {task.title}
          </span>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 hover:bg-red-50 rounded-lg flex-shrink-0"
        >
          <Trash2 size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
