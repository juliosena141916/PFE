import React, { useState, useEffect } from "react";

export default function App() {
  // ================= ESTADOS =================
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newUser, setNewUser] = useState("");

  const [users, setUsers] = useState([
    { id: 1, username: "admin", password: "123", role: "admin" },
    { id: 2, username: "user1", password: "123", role: "user", turmas: [1] },
  ]);

  const [turmas, setTurmas] = useState([
    { id: 1, nome: "Turma A", presenca: ["Aluno 1"] },
    { id: 2, nome: "Turma B", presenca: ["Aluno 3"] },
  ]);

  // ================= TEMPO REAL (SIMULADO) =================
  useEffect(() => {
    const interval = setInterval(() => {
      setTurmas((prev) =>
        prev.map((t) => ({
          ...t,
          presenca: [
            ...t.presenca,
            "Aluno " + Math.floor(Math.random() * 100),
          ],
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ================= LOGIN =================
  const handleLogin = () => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (found) {
      setUser(found);
      setUsername("");
      setPassword("");
    } else {
      alert("Login inválido");
    }
  };

  const logout = () => {
    setUser(null);
  };

  // ================= ADMIN FUNÇÕES =================
  const addUser = () => {
    if (!newUser) return;

    const u = {
      id: Date.now(),
      username: newUser,
      password: "123",
      role: "user",
      turmas: [],
    };

    setUsers([...users, u]);
    setNewUser("");
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const vincularTurma = (userId, turmaId) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? {
              ...u,
              turmas: [...new Set([...(u.turmas || []), turmaId])],
            }
          : u
      )
    );
  };

  // ================= TELA LOGIN =================
  if (!user) {
    return (
      <div style={styles.container}>
        <h2>Login</h2>

        <input
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Entrar</button>
      </div>
    );
  }

  // ================= ADMIN =================
  if (user.role === "admin") {
    return (
      <div style={styles.container}>
        <h2>Painel do Administrador</h2>
        <button onClick={logout}>Sair</button>

        <h3>Criar Usuário</h3>
        <input
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Nome do usuário"
        />
        <button onClick={addUser}>Adicionar</button>

        <h3>Lista de Usuários</h3>
        {users.map((u) => (
          <div key={u.id} style={styles.card}>
            <strong>{u.username}</strong> ({u.role})
            <button onClick={() => deleteUser(u.id)}>Excluir</button>

            {u.role === "user" && (
              <div>
                <p>Vincular Turma:</p>
                {turmas.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => vincularTurma(u.id, t.id)}
                  >
                    {t.nome}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // ================= USUÁRIO COMUM =================
  const minhasTurmas = turmas.filter((t) =>
    user.turmas?.includes(t.id)
  );

  return (
    <div style={styles.container}>
      <h2>Minhas Turmas</h2>
      <button onClick={logout}>Sair</button>

      {minhasTurmas.map((turma) => (
        <div key={turma.id} style={styles.card}>
          <h3>{turma.nome}</h3>
          <ul>
            {turma.presenca.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ================= ESTILO =================
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f7f6",
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginBox: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "background 0.3s",
    marginTop: "10px",
  },
  buttonSecondary: {
    padding: "8px 16px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  buttonDelete: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    marginLeft: "10px",
    cursor: "pointer",
  },
  buttonTurma: {
    padding: "6px 12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    marginRight: "5px",
    marginTop: "5px",
    cursor: "pointer",
    fontSize: "12px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    margin: "15px 0",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    border: "1px solid #eee",
  },
  header: {
    color: "#333",
    marginBottom: "20px",
  },
  userHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
  }
};