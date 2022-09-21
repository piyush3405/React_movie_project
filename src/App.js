import {useState,useEffect} from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

// const movie1={
//     "Poster": "N/A",
//     "Title": "Spiderman",
//     "Type":"movie",
//     "Year": "1990",
//     "imdbID": "tt0100669"
// }

//36341b1c

const API_URL=`https://www.omdbapi.com?apikey=${process.env.REACT_APP_MY_API_KEY}`;


const App=()=>{

    const [movies,setMovies]=useState([]);
    const [searchTerm,setSearchTerm]=useState('');

    const searchMovies=async(title) =>{
        const response =await fetch(`${API_URL}&s=${title}`);
        const data=await response.json();

        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('Spiderman');

    },[]);

    return(
     <div className="app">
        <h1>MovieLand</h1>  

        <div className="search">
           <input
              placeholder="search for Movies"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
           />

           <img
           src={SearchIcon}
           alt="search"
           onClick={()=>searchMovies(searchTerm)}
             
           />

        </div>

        {movies?.length>0
            ? (
                <div className="container">
                  {movies.map((movie)=>(
                    <MovieCard movie={movie}/>
                   ))}
                </div>

            ) : (
                <div className="empty">
                  <h2>No Movies found</h2>
                </div>

            )
        }


       
     </div>
    );
}

export default App;