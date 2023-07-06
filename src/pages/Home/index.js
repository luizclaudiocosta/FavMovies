import { useEffect, useState} from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './home.css'

// https://api.themoviedb.org/3/movie/now_playing?api_key=442ba11a4bd5c20280d026e4f4957790&language=pt-PT&region=PT

function Home(){

    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: '442ba11a4bd5c20280d026e4f4957790',
                    language: 'pt-PT',
                    region: 'PT',
                    page: 1
                }
            })

            //console.log(response.data.results.slice(0,10))
            setFilmes(response.data.results.slice(0,10))
            setLoading(false)

        }

        loadFilmes()

    }, [])

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <Link to={`/filme/${filme.id}`}><img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} /></Link>
                            <Link to={`/filme/${filme.id}`} className='detalhe'>Detalhe</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home