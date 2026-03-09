import { useState } from "react"

function TicketList({ tickets, atualizarStatus, excluirTicket, arquivarTicket }) {

  const [statusFiltro, setStatusFiltro] = useState("todos")
  const [busca, setBusca] = useState("")

  const ticketsFiltrados = tickets.filter(ticket => {

    const matchBusca =
      ticket.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      ticket.descricao.toLowerCase().includes(busca.toLowerCase())

    if (statusFiltro === "todos")
      return matchBusca && !ticket.arquivado

    return matchBusca && ticket.status === statusFiltro && !ticket.arquivado
  })

  function corPrioridade(prioridade) {
    if (prioridade === "alta") return "#ff4d4f"
    if (prioridade === "media") return "#faad14"
    if (prioridade === "baixa") return "#52c41a"
  }

  function corStatus(status) {
    if (status === "aberto") return "#ff4d4f"
    if (status === "em andamento") return "#1677ff"
    if (status === "fechado") return "#52c41a"
  }

  const abertos = tickets.filter(t => t.status === "aberto" && !t.arquivado).length
  const andamento = tickets.filter(t => t.status === "em andamento" && !t.arquivado).length
  const fechados = tickets.filter(t => t.status === "fechado" && !t.arquivado).length

  return (
    <div style={{ marginTop: "40px", width: "100%" }}>

      <h2>📋 Lista de Chamados</h2>

      <div style={{
        display:"flex",
        gap:"20px",
        marginBottom:"30px",
        flexWrap:"wrap"
      }}>

        <div style={{background:"#1e1e1e",padding:"15px",borderRadius:"10px"}}>
          🟡 Abertos: <strong>{abertos}</strong>
        </div>

        <div style={{background:"#1e1e1e",padding:"15px",borderRadius:"10px"}}>
          🔵 Em andamento: <strong>{andamento}</strong>
        </div>

        <div style={{background:"#1e1e1e",padding:"15px",borderRadius:"10px"}}>
          🟢 Fechados: <strong>{fechados}</strong>
        </div>

      </div>

      {/* CAMPO DE BUSCA */}

      <input
        type="text"
        placeholder="Buscar chamado..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          padding:"8px",
          marginBottom:"20px",
          width:"100%",
          borderRadius:"6px",
          border:"1px solid #444",
          background:"#1e1e1e",
          color:"white"
        }}
      />

      {/* FILTRO DE STATUS */}

      <div style={{ marginBottom: "25px" }}>

        <label style={{ marginRight: "10px" }}>
          Filtrar por status:
        </label>

        <select
          value={statusFiltro}
          onChange={(e) => setStatusFiltro(e.target.value)}
          style={{
            padding:"8px",
            borderRadius:"6px",
            background:"#1e1e1e",
            color:"white"
          }}
        >
          <option value="todos">Todos</option>
          <option value="aberto">Aberto</option>
          <option value="em andamento">Em andamento</option>
          <option value="fechado">Fechado</option>
        </select>

      </div>

      {/* LOADING / SEM CHAMADOS */}

      {ticketsFiltrados.length === 0 && (
        <p style={{opacity:0.7}}>
          ⏳ Nenhum chamado encontrado...
        </p>
      )}

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",
        gap:"20px"
      }}>

        {ticketsFiltrados.map(ticket => (

          <div
            key={ticket.id}
            style={{
              border:"1px solid #444",
              padding:"20px",
              borderRadius:"12px",
              background:"#1e1e1e"
            }}
          >

            <h3>{ticket.titulo}</h3>

            <p>{ticket.descricao}</p>

            <p style={{fontSize:"12px", opacity:0.7}}>
              Criado em: {ticket.criadoEm}
            </p>

            {/* RESPONSÁVEL */}

            <p style={{fontSize:"13px"}}>
              👤 Responsável: {ticket.responsavel || "Não definido"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span style={{
                background:corStatus(ticket.status),
                padding:"4px 8px",
                borderRadius:"5px"
              }}>
                {ticket.status}
              </span>
            </p>

            <p style={{
              color:corPrioridade(ticket.prioridade),
              fontWeight:"bold"
            }}>
              Prioridade: {ticket.prioridade}
            </p>

            <div style={{display:"flex",gap:"10px",marginTop:"15px"}}>

              <button
                onClick={() => atualizarStatus(ticket.id)}
                style={{
                  background:"#1677ff",
                  border:"none",
                  padding:"8px 14px",
                  borderRadius:"6px",
                  cursor:"pointer",
                  color:"white"
                }}
              >
                Avançar
              </button>

              <button
                onClick={() => arquivarTicket(ticket.id)}
                style={{
                  background:"#faad14",
                  border:"none",
                  padding:"8px 14px",
                  borderRadius:"6px",
                  cursor:"pointer",
                  color:"white"
                }}
              >
                Arquivar
              </button>

              <button
                onClick={() => excluirTicket(ticket.id)}
                style={{
                  background:"#ff4d4f",
                  border:"none",
                  padding:"8px 14px",
                  borderRadius:"6px",
                  cursor:"pointer",
                  color:"white"
                }}
              >
                Excluir
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default TicketList