
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './filme.css'
import {toast} from 'react-toastify'

function Filme(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [ filme, setFilme] = useState({})
    const [ loading, setLoading] = useState(true)
    
    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: '442ba11a4bd5c20280d026e4f4957790',
                    language: 'pt-PT'
                }
            })
            .then((response)=>{
                //console.log(response)
                setFilme(response.data)
                setLoading(false)

            })
            .catch(()=>{
                //console.log("filme não encontrado")
                navigate("/", { replace: true})
                return
            })
        }

        loadFilme()

        return ()=>{
            console.log("COMPONENTE FOI DESMONTADO")
        }
    }, [navigate, id])

    function favoritar(){
        const favMoviesList = localStorage.getItem("@favmovies")
        let filmesSalvos = JSON.parse(favMoviesList) || []
        const hasMovie = filmesSalvos.some((filmesSalvos)=> filmesSalvos.id === filme.id)

        if(hasMovie) {
            toast.warn("O filme já está na sua lista!")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@favmovies", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhe do filme</h1>
            </div>
        )

    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} /10</strong>
            
            <div className='area-buttons'>
                <button onClick={favoritar}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
                
            </div>
        </div>
    )
}

export default Filme