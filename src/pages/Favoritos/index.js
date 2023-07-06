import { useEffect, useState } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'

function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(()=>{

        const minhaLista = localStorage.getItem("@favmovies")
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item)=>{
            return (item.id !== id)
        })

        setFilmes(filtroFilmes)
        localStorage.setItem("@favmovies", JSON.stringify(filtroFilmes))
        toast.success("Filme excluído da lista.")
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus Favoritos</h1>

            {filmes.length === 0 && <span>Ainda não há filmes salvos.</span>}

            <ul>
                {filmes.map((filme)=>{
                    return(
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Detalhes</Link>
                                <button onClick={()=>excluirFilme(filme.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos