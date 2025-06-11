import { useState } from 'react';
import './App.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [mainTopic, setMainTopic] = useState('');
  const [subTopic, setSubTopic] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mainTopic.trim() || !subTopic.trim()) {
      alert('Please fill in both the main and sub topics.');
      return;
    }

    const newTask = {
      id: Date.now(),
      mainTopic: mainTopic.trim(),
      subTopic: subTopic.trim(),
      content: content.trim(),
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setMainTopic('');
    setSubTopic('');
    setContent('');
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  return (
    <main className="todo-container">
      <form className="form" onSubmit={handleSubmit}>
        <legend>Add a Task</legend>

        <input
          type="text"
          placeholder="Main Topic"
          className="input main_topic"
          value={mainTopic}
          onChange={(e) => setMainTopic(e.target.value)}
        />

        <input
          type="text"
          placeholder="Sub Topic"
          className="input sub_topic"
          value={subTopic}
          onChange={(e) => setSubTopic(e.target.value)}
        />

        <textarea
          placeholder="Additional Notes"
          className="input text_topic"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button type="submit" className="submit-btn">Add Task</button>
      </form>

      <section className="task-list">
        <h2>Task List</h2>
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet. Add something!</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div>
                  <strong>{task.mainTopic}</strong> – {task.subTopic}
                  {task.content && <p className="task-content">{task.content}</p>}
                </div>
                <div className="task-buttons">
                  <button onClick={() => toggleTaskCompletion(task.id)}>
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button onClick={() => removeTask(task.id)} className="delete-btn">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default TodoList;

