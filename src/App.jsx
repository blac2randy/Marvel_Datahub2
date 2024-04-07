import { useState, useEffect } from 'react';
import viteLogo from '/vite.svg';
import './App.css';
import { Link } from 'react-router-dom';
import DetailView from './routes/DetailView';


const API_KEY = import.meta.env.REACT_APP_MARVEL_API_KEY;

function App() {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [list, setList] = useState(null);
  
  const fetchAllData = async (characterName) => {
    const url = characterName
      ? `https://gateway.marvel.com:443/v1/public/characters?name=${characterName}&apikey=ef6a37a0caeb5c39932b7dc2814faf96&hash=5175`
      : `https://gateway.marvel.com:443/v1/public/characters?apikey=ef6a37a0caeb5c39932b7dc2814faf96&hash=5175`;
  
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // Log the result to the console
    setList(data);
  }
  
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  }
  


  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };
    
  useEffect(() => {
    fetchAllData().catch(console.error);
  }, []);

  return (
    <div className='WholePage'>
    <h1 style={{ color: 'black' }}> Marvel Datahub</h1>
    
    <nav style={{position: 'fixed', left: 0, top: 0, bottom: 0, width: '200px', overflow: 'auto'}}>
    <ul>
  {list && list.data && list.data.results.map((character) => (
    <li key={character.id}>
      <span>{character.name}</span>
    </li>
  ))}
</ul>
    </nav>

    <div style={{marginLeft: '200px'}} >
      <input type="text" id="CharNAme" placeholder='Enter Character' onChange={handleSearch} />
      <p style={{ color: 'black' }}>Total Characters: {list && list.data && list.data.results.length}</p>
      <ul>

 
      {list && list.data && list.data.results.filter(character => character.name.toLowerCase().includes(searchInput.toLowerCase())).map((character) => {
  console.log(character); // Log each character here
  return (
    <li key={character.id}>
      <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} style={{width: '100px', height: '100px'}} />
      <span style={{ color: 'black' }}>{character.name}</span>
      <Link to={`/detail/${character.id}`}>
        <button>View Details</button>
      </Link>
    </li>
  );
})}

</ul>
    </div>
  </div>
  )};
export default App;