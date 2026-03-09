import { useState, useEffect } from "react"
import TicketForm from "./components/TicketForm"
import TicketList from "./components/TicketList"

function App() {

  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  // Carregar tickets do localStorage
  useEffect(() => {

    setTimeout(() => {

      const dadosSalvos = localStorage.getItem("tickets")

      if (dadosSalvos) {
        setTickets(JSON.parse(dadosSalvos))
      }

      setLoading(false)

    }, 500)

  }, [])

  // Salvar tickets no localStorage
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets))
  }, [tickets])

  function adicionarTicket(ticket) {
    setTickets([...tickets, ticket])
  }

  function atualizarStatus(id) {

    const proximoStatus = {
      aberto: "em andamento",
      "em andamento": "fechado"
    }

    const novosTickets = tickets.map(ticket => {

      if (ticket.id === id) {
        return {
          ...ticket,
          status: proximoStatus[ticket.status] || ticket.status
        }
      }

      return ticket
    })

    setTickets(novosTickets)
  }

  function excluirTicket(id) {

    const confirmar = window.confirm("Deseja excluir este chamado?")

    if (confirmar) {
      setTickets(tickets.filter(ticket => ticket.id !== id))
    }

  }

  function arquivarTicket(id) {
    setTickets(
      tickets.map(ticket =>
        ticket.id === id
          ? { ...ticket, arquivado: true }
          : ticket
      )
    )
  }

  // LOADING STATE

  if (loading) {
    return <h2>⏳ Carregando chamados...</h2>
  }

  return (
    <div className="container">

      <h1>📊 Painel de Chamados</h1>

      <TicketForm adicionarTicket={adicionarTicket} />

      <TicketList
        tickets={tickets}
        atualizarStatus={atualizarStatus}
        excluirTicket={excluirTicket}
        arquivarTicket={arquivarTicket}
      />

    </div>
  )
}

export default App