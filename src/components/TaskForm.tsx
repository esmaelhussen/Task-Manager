
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title cannot be empty');
      return;
    }
    
    onAddTask(title.trim());
    setTitle('');
    setError('');
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-white/20">
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="Add a new task..."
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
          />
          {error && (
            <p className="text-red-500 text-xs sm:text-sm mt-2 animate-pulse">{error}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2.5 sm:py-3 px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          <Plus size={18} className="sm:w-5 sm:h-5" />
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
