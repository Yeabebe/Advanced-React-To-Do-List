import { useState } from 'react'
import './App.css'
import './Form'


const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [Maintopic, setMaintopic] = useState("");
  const [Subtopic, setSubtopic] = useState("");
  const [content, setcontent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

  
    const newTask = { mainTopic: Maintopic, subTopic: Subtopic, content };
    setTasks([...tasks, newTask]);

    
    setMaintopic("");
    setSubtopic("");
    setcontent("");
  };

  const handleTaskCompletion = (index) => {
   
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <main>
      <form className="form" onSubmit={handleSubmit}>
        <legend>Add Task</legend>
        <input
          placeholder="main text"
          type="text"
          className="main_topic"
          value={Maintopic}
          onChange={(event) => {
            setMaintopic(event.target.value);
          }}
        />
        <input
          placeholder="sub text"
          type="text"
          className="sub_topic"
          value={Subtopic}
          onChange={(event) => {
            setSubtopic(event.target.value);
          }}
        />
        <textarea
          className="text_topic"
          value={content}
          onChange={(event) => {
            setcontent(event.target.value);
          }}
        />
        <input type="submit" value="Add Task" />
      </form>

      <section>
        <h2>Task List</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? "completed" : ""}>
              <span>{task.mainTopic} - {task.subTopic}</span>
              <button onClick={() => handleTaskCompletion(index)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default TodoList;
