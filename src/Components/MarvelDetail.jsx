import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const API_KEY = "ef6a37a0caeb5c39932b7dc2814faf96"

const DetailViews = () => {
    const { symbol } = useParams();
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${symbol}&apikey=${API_KEY}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch character details');
                }
                const data = await response.json();
                setFullDetails(data.data.results[0]); 
            } catch (error) {
                console.error('Error fetching character details:', error);
            }
        };
        fetchData();
    }, [symbol]);

    
    if (!fullDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <Link to={`/detail/${fullDetails.id}`}>
          <h1>{fullDetails.name}</h1>
          <img src={`${fullDetails.thumbnail.path}.${fullDetails.thumbnail.extension}`} alt={fullDetails.name} />
          <p>{fullDetails.description || "No description available"}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Modified</th>
                <th>Resource URI</th>
                <th>URLs</th>
                <th>Comics</th>
                <th>Stories</th>
                <th>Events</th>
                <th>Series</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{fullDetails.id}</td>
                <td>{fullDetails.modified}</td>
                <td>{fullDetails.resourceURI}</td>
                <td>{fullDetails.urls.map((url, index) => <a key={index} href={url.url}>{url.type}</a>)}</td>
                <td>{fullDetails.comics.available}</td>
                <td>{fullDetails.stories.available}</td>
                <td>{fullDetails.events.available}</td>
                <td>{fullDetails.series.available}</td>
              </tr>
            </tbody>
          </table>
          </Link>
        </div>
      );
};

export default DetailViews;
