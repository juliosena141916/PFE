import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
const [taskText, setTaskText] = useState("");
const [priority, setPriority] = useState("Baixa");
const [taskList, setTaskList] = useState([]);
const [filter, setFilter] = useState("Todas");
const [searchTerm, setSearchTerm] = useState("");
const [editingId, setEditingId] = useState(null); 
const [tempEditText, setTempEditText] = useState("");

useEffect(() => {
const saved = localStorage.getItem("@taskflow_data");
if (saved) setTaskList(JSON.parse(saved));
}, []);

useEffect(() => {
localStorage.setItem("@taskflow_data", JSON.stringify(taskList));
}, [taskList]);

const addTask = (e) => {
e.preventDefault();
if (!taskText.trim()) return;

const newTask = {
id: crypto.randomUUID(),
text: taskText,
priority: priority,
completed: false,
createdAt: new Date().toLocaleDateString()
};

setTaskList([newTask, ...taskList]);
setTaskText("");
};

const toggleTask = (id) => {
setTaskList(taskList.map(t =>
t.id === id ? { ...t, completed: !t.completed } : t
));
};

const deleteTask = (id) => {
  const confirmed = window.confirm("Você tem certeza que deseja excluir esta tarefa definitivamente?");
  
  if (confirmed) {
    setTaskList(taskList.filter(t => t.id !== id));
  }
};


const filteredTasks = taskList
  .filter(t => {
    const matchesFilter = 
      filter === "Todas" ? true :
      filter === "Pendentes" ? !t.completed :
      t.completed;

    const matchesSearch = t.text.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  })
  .sort((a, b) => {
    const weight = { "Alta": 3, "Média": 2, "Baixa": 1 };
    return weight[b.priority] - weight[a.priority];
  });

const startEditing = (task) => {
  setEditingId(task.id);
  setTempEditText(task.text);
};

const saveEdit = (id) => {
  setTaskList(taskList.map(t => 
    t.id === id ? { ...t, text: tempEditText } : t
  ));
  setEditingId(null); 
};

const cancelEdit = () => {
  setEditingId(null);
  setTempEditText("");
};

return (
<div className="app-container">
  <header>
    <h1>TaskFlow</h1>
      <p>Gestão de Produtividade</p>
  </header>

  <section className="form-section">
    <form onSubmit={addTask}>
      <input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Descrição da tarefa..."
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Baixa">Baixa</option>
        <option value="Média">Média</option>
        <option value="Alta">Alta</option>
      </select>
        <button type="submit">Criar</button>
    </form>
  </section>

  <section className="search-section">
    <input
      type="text"
      placeholder="Pesquisar tarefas..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  </section>

  <section className="filter-section">
      {["Todas", "Pendentes", "Concluídas"].map(f => (
    <button 
      key={f}
      className={filter === f ? "active" : ""}
      onClick={() => setFilter(f)}> {f} 
    </button>))}
  </section>

  <main className="task-grid">
  {filteredTasks.map(item => (
    <div key={item.id} className={`task-card ${item.priority.toLowerCase()} ${item.completed ? 'done' : ''}`}>
      <div className="task-content">
        {editingId === item.id ? (
          /* MODO EDIÇÃO */
          <input 
            type="text" 
            value={tempEditText} 
            onChange={(e) => setTempEditText(e.target.value)}
            className="edit-input"
            autoFocus
          />
        ) : (
          /* MODO VISUALIZAÇÃO */
          <h3>{item.text}</h3>
        )}
        <span>Prioridade: {item.priority}</span>
        <small>Criada em: {item.createdAt}</small>
      </div>

      <div className="task-actions">
        {editingId === item.id ? (
          <>
            <button onClick={() => saveEdit(item.id)} className="save">Salvar</button>
            <button onClick={cancelEdit}>Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={() => toggleTask(item.id)}>
              {item.completed ? "Reabrir" : "Concluir"}
            </button>
            {/* Botão Editar desabilitado se a tarefa estiver concluída */}
            <button onClick={() => startEditing(item)} disabled={item.completed}>
              Editar
            </button>
            <button onClick={() => deleteTask(item.id)} className="delete">
              Remover
            </button>
          </>
        )}
      </div>
    </div>
  ))}
</main>
</div>
);
}

export default App;