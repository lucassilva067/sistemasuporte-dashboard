import { useState } from "react"

function TicketForm({ adicionarTicket }) {

  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [prioridade, setPrioridade] = useState("media")
  const [responsavel, setResponsavel] = useState("")

  const [mensagem, setMensagem] = useState("")
  const [erro, setErro] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    // 🔴 VALIDAÇÃO
    if (!titulo || !descricao) {
      setErro("Preencha título e descrição")
      setTimeout(() => {
        setErro("")
      }, 3000)
      return
    }

    const novoTicket = {
      id: Date.now(),
      titulo,
      descricao,
      responsavel,
      status: "aberto",
      prioridade,
      arquivado: false,
      criadoEm: new Date().toLocaleString()
    }

    adicionarTicket(novoTicket)

    // 🟢 MENSAGEM DE SUCESSO
    setMensagem("Chamado criado com sucesso!")

    setTimeout(() => {
      setMensagem("")
    }, 3000)

    setTitulo("")
    setDescricao("")
    setPrioridade("media")
    setResponsavel("")
  }

  return (
  <form 
    onSubmit={handleSubmit}
    style={{
      background:"#1e1e1e",
      padding:"20px",
      borderRadius:"8px",
      marginBottom:"30px"
    }}
  >

    <h2>Novo Chamado</h2>

    {/* 🔴 ERRO */}
    {erro && (
      <div
        style={{
          background:"#ff4d4f",
          padding:"10px",
          borderRadius:"6px",
          marginBottom:"15px",
          color:"white",
          fontWeight:"bold"
        }}
      >
        {erro}
      </div>
    )}

    {/* 🟢 SUCESSO */}
    {mensagem && (
      <div
        style={{
          background:"#52c41a",
          padding:"10px",
          borderRadius:"6px",
          marginBottom:"15px",
          color:"white",
          fontWeight:"bold"
        }}
      >
        {mensagem}
      </div>
    )}

    <input
      type="text"
      placeholder="Título"
      value={titulo}
      onChange={(e) => setTitulo(e.target.value)}
      style={{width:"100%", padding:"8px", marginBottom:"10px"}}
    />

    <textarea
      placeholder="Descrição"
      value={descricao}
      onChange={(e) => setDescricao(e.target.value)}
      style={{width:"100%", padding:"8px", marginBottom:"10px"}}
    />

    {/* NOVO CAMPO RESPONSÁVEL */}

    <input
      type="text"
      placeholder="Responsável"
      value={responsavel}
      onChange={(e) => setResponsavel(e.target.value)}
      style={{width:"100%", padding:"8px", marginBottom:"10px"}}
    />

    <select
      value={prioridade}
      onChange={(e) => setPrioridade(e.target.value)}
      style={{padding:"8px", marginBottom:"10px"}}
    >
      <option value="baixa">Baixa</option>
      <option value="media">Média</option>
      <option value="alta">Alta</option>
    </select>

    <br/>

    <button
      type="submit"
      style={{
        background:"#4CAF50",
        border:"none",
        padding:"10px 15px",
        borderRadius:"5px",
        cursor:"pointer",
        color:"white",
        fontWeight:"bold"
      }}
    >
      Criar Chamado
    </button>

  </form>
)
}

export default TicketForm