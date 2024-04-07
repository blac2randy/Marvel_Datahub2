import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.REACT_APP_MARVEL_API_KEY;

const DetailView = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  const fetchAllData = async (id) => {
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?&apikey=ef6a37a0caeb5c39932b7dc2814faf96`);
    const data = await response.json();
    return data.data.results[0]; 
  };

  useEffect(() => {
    fetchAllData(id).then(character => { 
      setCharacter(character);
    }).catch(console.error);
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
<div style={{ color: 'black' }}>
  {character.thumbnail && <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />}
  <h1>{character.name}</h1>
  <p>ID: {character.id}</p>
  <p>Description: {character.description}</p>
  <ul>
  Series list: 
  {character.series.items.map((item, index) => (
    <li key={index}>{item.name}</li>
  ))}
</ul>
</div>
  );
};

export default DetailView;



