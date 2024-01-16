import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./Card"
import "./Deck.css"

const BASE_URL = "https://deckofcardsapi.com/api/deck"

/**
 * Deck returns Card components that are rendered from newly shuffled deck. 
 * Two different buttons. One button to draw card other button to shuffle same deck. 
 * 
 * Props: 
 * none
 * 
 * State: 
 * deck => stores deck data
 * drawn => stores cards drawn 
 * isShuffling => stores whether deck is currently being shuffled 
 */

const Deck = () => {
    const [deck, setDeck] = useState(null)
    const [drawn, setDrawn] = useState([])
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(() => {
        async function getDeck() {
            const response = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`)
            setDeck(response.data)
        }
        getDeck()
    }, [])

    async function drawCard() {
        try {
            const response = await axios.get(`${BASE_URL}/${deck.deck_id}/draw/`)
            const card = response.data.cards[0]

            if (response.data.remaining === 0) throw new Error("Deck empty!");

            setDrawn(data => [
                ...data,
                {
                    id: card.code,
                    name: `${card.suit} ${card.value}`,
                    image: card.image,
                }
            ])
        } catch (err) {
            alert(err)
        }
        
    }

    async function Shuffle() {
        setIsShuffling(true);
        try {
          await axios.get(`${BASE_URL}/${deck.deck_id}/shuffle/`);
          setDrawn([]);
        } catch (err) {
          alert(err);
        } finally {
          setIsShuffling(false);
        }
    }
    
     
    function drawButton() {
        if (!deck) return null;
    
        return (
          <button
            className="Deck-draw"
            onClick={drawCard}
            disabled={isShuffling}>
            Gimme Card!
          </button>
        );
    }
    
     
    function shuffleButton() {
        if (!deck) return null;
        return (
          <button
            className="Deck-draw"
            onClick={Shuffle}
            disabled={isShuffling}>
            Shuffle Deck
          </button>
        );
    }

    return (
        <>
            {drawButton()}
            {shuffleButton()}

            <div className="Deck-cardarea">{
                drawn.map(card => (
                <Card key={card.id} name={card.name} image={card.image} />
                ))}
            </div>

        </>
        
    )
    
}

export { Deck }