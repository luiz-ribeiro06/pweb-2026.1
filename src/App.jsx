import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  function addTask(e) {
    e.preventDefault();

    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function toggleTask(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    );

    setTasks(updatedTasks);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite uma tarefa"
        />

        <button type="submit">Adicionar</button>
      </form>

      <div className="filters">
        <button onClick={() => setFilter("all")}>Todas</button>

        <button onClick={() => setFilter("pending")}>Pendentes</button>

        <button onClick={() => setFilter("done")}>Concluídas</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span className={task.done ? "done" : ""}>{task.text}</span>
            <button
              className="complete-btn"
              onClick={() => toggleTask(task.id)}
            >
              {task.done ? "Desmarcar" : "Concluir"}
            </button>

            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
