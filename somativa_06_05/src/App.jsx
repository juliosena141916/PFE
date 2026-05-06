import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
const [eventTitle, setEventTitle] = useState("");
const [eventType, setEventType] = useState("Palestra");
const [eventList, setEventList] = useState([]);
const [filter, setFilter] = useState("Todos");
const [search, setSearch] = useState("");
const [eventSlots, setEventSlots] = useState(10);

// Carregar dados iniciais do LocalStorage
useEffect(() => {
const savedEvents = localStorage.getItem("@eventpulse_data");
if (savedEvents) setEventList(JSON.parse(savedEvents));
}, []);

// Sincronizar alterações com o LocalStorage
useEffect(() => {
localStorage.setItem("@eventpulse_data", JSON.stringify(eventList));
}, [eventList]);

const addEvent = (e) => {
e.preventDefault();
if (!eventTitle.trim()) return;

const newEvent = {
  id: crypto.randomUUID(),
  title: eventTitle,
  type: eventType,
  status: "Agendado",
  date: new Date().toLocaleDateString(),
  vagas: eventSlots
};

setEventList([newEvent, ...eventList]);
setEventTitle("");
};

const toggleStatus = (id) => {

setEventList(eventList.map(evt => {
    if (evt.id === id) {
// Rotaciona o status do evento sequencialmente
        const nextStatus = evt.status === "Agendado" ? "Em Andamento" :
        evt.status === "Em Andamento" ? "Encerrado" : "Agendado";
            return { ...evt, status: nextStatus };
        }
        return evt;
    }));
};

const deleteEvent = (id) => {
setEventList(eventList.filter(evt => evt.id !== id));
};

const filteredEvents = eventList
  .filter(evt => {
    // filtro por status
    if (filter === "Agendados" && evt.status !== "Agendado") return false;
    if (filter === "Em Andamento" && evt.status !== "Em Andamento") return false;
    if (filter === "Encerrados" && evt.status !== "Encerrado") return false;

    // filtro por busca (case insensitive)
    if (!evt.title.toLowerCase().includes(search.toLowerCase())) return false;

    return true;
  })
  .sort((a, b) => {
    // prioridade: Workshop primeiro
    if (a.type === "Workshop" && b.type !== "Workshop") return -1;
    if (b.type === "Workshop" && a.type !== "Workshop") return 1;

    return 0;
  });


  const enrollStudent = (id) => {
  setEventList(prev =>
    prev.map(evt => {
      const vagasAtual = evt.vagas ?? 0;

      if (evt.id === id && vagasAtual > 0) {
        return { ...evt, vagas: vagasAtual - 1 };
      }
      return evt;
    })
  );
};

const clearAllEvents = () => {
  const confirmClear = window.confirm(
    "Tem certeza que deseja apagar todo o cronograma?"
  );

  if (!confirmClear) return;

  localStorage.removeItem("@eventpulse_data");
  setEventList([]);
};


return (

    
<div className="app-container">
<header>
<h1>EventPulse</h1>
<p>Gestão de Eventos Acadêmicos</p>
</header>

<section className="search-section">
  <input
    type="text"
    placeholder="Buscar evento..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</section>

<section className="form-section">
<form onSubmit={addEvent}>
<input
value={eventTitle}
onChange={(e) => setEventTitle(e.target.value)}
placeholder="Nome do evento ou atividade..."
/>
<select value={eventType} onChange={(e) => setEventType(e.target.value)}>
<option value="Palestra">Palestra</option>
<option value="Workshop">Workshop</option>
<option value="Painel">Painel</option>
</select>

<select value={eventSlots} onChange={(e) => setEventSlots(Number(e.target.value))}>
  <option value={10}>10 vagas</option>
  <option value={30}>30 vagas</option>
  <option value={50}>50 vagas</option>
</select>

<button type="submit">Agendar</button>

<button className="clear-btn" onClick={clearAllEvents}>
    Limpar Cronograma
  </button>
</form>
</section>

<section className="filter-section">
{["Todos", "Agendados", "Em Andamento", "Encerrados"].map(f => (
<button
key={f}
className={filter === f ? "active" : ""}
onClick={() => setFilter(f)}
>
{f}
</button>
))}
</section>

<main className="event-grid">
{filteredEvents.map(item => (
<div
key={item.id}
className={`event-card ${item.type.toLowerCase()}
${item.status.toLowerCase().replace(" ", "-")}`}
>
<div className="event-content">
<h3>{item.title}</h3>
<span className="event-tag">Tipo: {item.type}</span>
<span className="status-badge">Status: {item.status}</span>
<span className="event-tag">
  Vagas: {item.vagas ?? 0}
</span>
<small>Registrado em: {item.date}</small>
</div>

<div className="event-actions">
<button onClick={() => toggleStatus(item.id)} className="status-btn">
{item.status === "Agendado" ? "Iniciar" : item.status === "Em Andamento"
? "Encerrar" : "Reiniciar"}
</button>

<button
    onClick={() => enrollStudent(item.id)}
    disabled={item.vagas === 0}
    className="enroll-btn"
  >
    {item.vagas === 0 ? "Esgotado" : "Inscrever"}
  </button>

<button onClick={() => deleteEvent(item.id)} className="delete">
    Remover
  </button>
  
</div>
</div>
))}
</main>
</div>
);
}

export default App;