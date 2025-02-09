import axios from "axios"
import { useEffect, useState } from "react"
import "./App.scss"

export default function App() {
  const [desenho, setDesenho] = useState([])
  const [paginaAtual, setPaginaAtual] = useState(1)
  const itensPorPagina = 4

  const pegarDados = async () => {
    try {
      const { data } = await axios.get("https://api.sampleapis.com/rickandmorty/characters")
      setDesenho(data)
    } catch (error) {
      console.error("Erro ao buscar os dados:", error)
    }
  }

  useEffect(() => {
    pegarDados()
  }, [])

  const totalPaginas = Math.ceil(desenho.length / itensPorPagina)
  const indiceInicial = (paginaAtual - 1) * itensPorPagina
  const itensDaPagina = desenho.slice(indiceInicial, indiceInicial + itensPorPagina)

  const irParaPaginaAnterior = () => {
    setPaginaAtual((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const irParaProximaPagina = () => {
    setPaginaAtual((prev) => (prev < totalPaginas ? prev + 1 : prev))
  }

  return (
    <div className="app">
      <h1>Catálogo de Rick and Morty</h1>
      <div className="catalogo">
        {itensDaPagina.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.name} className="personagem-img" />
            <h2>{item.name}</h2>
            <p>Status: {item.status}</p>
            <p>Espécie: {item.species}</p>
            <p>Tipo: {item.type || "N/A"}</p>
            <p>Gênero: {item.gender}</p>
            <p>Origem: {item.origin}</p>
          </div>
        ))}
      </div>
      <div className="paginacao">
        <button onClick={irParaPaginaAnterior} disabled={paginaAtual === 1}>
          Anterior
        </button>
        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>
        <button onClick={irParaProximaPagina} disabled={paginaAtual === totalPaginas}>
          Próxima
        </button>
      </div>
      <footer>
        <div className="boxInformacoes">
          <p>Nome do Aluno: <a href="https://claudiomendonca.eng.br">Claudio Mendonça</a></p>
          <p>Nome do instrutor: <a href="https://github.com/vinicius-bispo1">Vinicius</a> - Nome do facilitadora: <a href="https://www.linkedin.com/in/marina-gomes-106328160/">Marina</a></p>
          <p></p>
          <p>2025 - Layout criado para fins de estudos na <a href="https://vainaweb.com.br/">Escola Vai na Web</a></p>
        </div>
      </footer>
    </div>
  )
}