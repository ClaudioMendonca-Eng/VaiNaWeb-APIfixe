import axios from "axios"
import { useEffect, useState } from "react"
import "./App.scss"

export default function App() {
  const [desenho, setDesenho] = useState([])
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [pageInfo, setPageInfo] = useState({ pages: 0 })

  const pegarDados = async () => {
    try {
      const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?page=${paginaAtual}`)
      setDesenho(data.results)
      setPageInfo(data.info)
    } catch (error) {
      console.error("Erro ao buscar os dados:", error)
    }
  }

  useEffect(() => {
    pegarDados()
  }, [paginaAtual])

  const irParaPaginaAnterior = () => {
    setPaginaAtual((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const irParaProximaPagina = () => {
    setPaginaAtual((prev) => (prev < pageInfo.pages ? prev + 1 : prev))
  }

  return (
    <div className="app">
      <h1>Catálogo de Rick and Morty</h1>
      <div className="catalogo">
        {desenho.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.name} className="personagem-img" />
            <h2>{item.name}</h2>
            <p>Status: {item.status}</p>
            <p>Espécie: {item.species}</p>
            <p>Tipo: {item.type || "N/A"}</p>
            <p>Gênero: {item.gender}</p>
            <p>Origem: {item.origin.name}</p>
          </div>
        ))}
      </div>
      <div className="paginacao">
        <button onClick={irParaPaginaAnterior} disabled={paginaAtual === 1}>
          Anterior
        </button>
        <div className="card paginacao-info">
          <span>
            Página {paginaAtual} de {pageInfo.pages}
          </span>
        </div>
        <button onClick={irParaProximaPagina} disabled={paginaAtual === pageInfo.pages}>
          Próxima
        </button>
      </div>
      <footer>
        <div className="boxInformacoes">
          <p>Nome do Aluno: <a href="https://claudiomendonca.eng.br">Claudio Mendonça</a></p>
          <p>Nome do instrutor: <a href="https://github.com/vinicius-bispo1">Vinicius</a> - Nome do facilitadora: <a href="https://www.linkedin.com/in/marina-gomes-106328160/">Marina</a></p>
          <p>2025 - Layout criado para fins de estudos na <a href="https://vainaweb.com.br/">Escola Vai na Web</a></p>
        </div>
      </footer>
    </div>
  )
}