
import React, { useState } from 'react';
import { List } from 'lucide-react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

type FilterType = 'all' | 'pending' | 'completed';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: true },
    { id: 3, title: 'Complete the task manager app', completed: false },
    { id: 4, title: 'Go for a morning walk', completed: true },
  ]);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTaskComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'pending':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 p-2 sm:p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full">
              <List size={24} className="text-white sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white">Task Manager</h1>
          </div>
          <p className="text-white/80 text-base sm:text-lg">Stay organized and productive</p>
        </div>

        {/* Task Form */}
        <div className="mb-4 sm:mb-6">
          <TaskForm onAddTask={addTask} />
        </div>

        {/* Task Filter */}
        <div className="mb-4 sm:mb-6">
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />
        </div>

        {/* Task List */}
        <div className="space-y-2 sm:space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-white/20 text-center">
              <div className="text-gray-400 text-base sm:text-lg mb-2">
                {filter === 'pending' && 'No pending tasks'}
                {filter === 'completed' && 'No completed tasks'}
                {filter === 'all' && 'No tasks yet'}
              </div>
              <p className="text-gray-500 text-sm sm:text-base">
                {filter === 'all' && 'Add your first task to get started!'}
                {filter === 'pending' && 'Great job! All tasks are completed.'}
                {filter === 'completed' && 'Complete some tasks to see them here.'}
              </p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={toggleTaskComplete}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>

        {/* Stats */}
        {tasks.length > 0 && (
          <div className="mt-6 sm:mt-8 bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-white/20">
            <div className="text-center text-gray-600">
              <span className="font-medium text-sm sm:text-base">
                {taskCounts.completed} of {taskCounts.all} tasks completed
              </span>
              {taskCounts.completed === taskCounts.all && taskCounts.all > 0 && (
                <span className="block text-green-600 font-medium mt-1 text-sm sm:text-base">
                  🎉 All tasks completed! Great job!
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
