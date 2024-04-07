import React from 'react';
import { Link } from 'react-router-dom';

const CharacterList = ({ characters }) => {
  return (
    <div>
      {characters.map(character => (
        <Link to={`/character/${character.id}`} key={character.id}>
          {character.name}
        </Link>
      ))}
    </div>
  );
};

export default CharacterList;