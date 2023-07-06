import axios from "axios";

// BASE DA URL
// https://api.themoviedb.org/3/movie/now_playing?api_key=442ba11a4bd5c20280d026e4f4957790&language=pt-PT&region=PT


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api