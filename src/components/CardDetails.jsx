import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

const CardDetails = () => {
    const location = useLocation();
    const { id } = useParams();
    const [showCard, setShowCard] = useState(false);

    useEffect(() => {
        // Folosim un delay pentru a ne asigura că componenta se montează înainte de a face animația
        const timer = setTimeout(() => {
            setShowCard(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            margin: "20px",
            opacity: showCard ? 1 : 0, // Opacitatea este setată în funcție de valoarea showCard
            transform: `translateY(${showCard ? 0 : 20}px)`, // Schimbă poziția verticală
            transition: "opacity 0.5s, transform 0.5s" // Adaugă o tranziție
        }}>
            {location.state ?
                <div>
                    <h1>card details: {id}</h1>
                    <h2>{location.state.title}</h2>
                    <img src={location.state.image} alt={location.state.title}></img>
                    <p>{location.state.description}</p>
                    <p>{location.state.price}</p>
                </div>
                : <p>Not Found</p>
            }
        </div>
    )
}

export default CardDetails;