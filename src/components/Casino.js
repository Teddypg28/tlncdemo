import React, { useEffect, useRef, useState } from 'react';

import generateWelcomeHeading from '../helper/generateWelcomeHeading';
import generateCustomMessage from '../helper/generateCustomMessage';
import generateThankYouMessage from '../helper/generateThankYouMessage';

import SelectedCards from './SelectedCards';

import '../css/Casino.css'

// Deck of Cards API Functions

import { generateDeckId, getCard } from '../api/deckOfCardsApi'


function Casino({names}) {

    const initialRoundData = {
        round: 1,
        currentGuesserSpot: 0,
        playerGuesses: Object.fromEntries(names.map(name => [name, ''])),
        allGuessesMade: false,
        isCardSelected: false
    }

    const [playerScores, setPlayerScores] = useState(Object.fromEntries(names.map(name => [name, 0])))
    const [roundData, setRoundData] = useState(initialRoundData)

    const [selectedCardHistory, setSelectedCardHistory] = useState([])

    // useRef hooks

    const isFirstRender = useRef(true)
    const deckId = useRef(null)

    /*

    After component mounts:

    If no deck ID, call API to generate a new deck and select card from that deck.

    Only fetch when isCardSelected === false so that user can't fetch another card while still
    waiting for the first one to show.

    Otherwise, using the deck that's already generated, select another card.

    */

    useEffect(() => {
        
    if (isFirstRender.current) {

        isFirstRender.current = false

    } else {

        if (roundData.allGuessesMade && !roundData.isCardSelected) {

            const drawCard = async () => {

                if (!deckId.current && !roundData.isCardSelected) deckId.current = await generateDeckId()                         
    
                const card = await getCard(deckId.current)
                
                setTimeout(() => { 
                    setSelectedCardHistory([...selectedCardHistory, {name: `${card.cards[0].value} of ${card.cards[0].suit}`, image: card.cards[0].image}]); 
                    setRoundData({...roundData, isCardSelected: true})
                }, 3000)
                                
            }

            drawCard()

        }
    } 

    // Cleanup Function

    return () => console.log('Unmounted')

    }, [roundData, selectedCardHistory]) 

    // Set Guess Order 

    const updateOrder = () => {   
        if (roundData.currentGuesserSpot === names.length - 1) {
            setRoundData({...roundData, allGuessesMade: true})
        } else {
            setRoundData({...roundData, currentGuesserSpot: roundData.currentGuesserSpot + 1})
        }
    }

    // Set Next Round

    const nextRound = () => setRoundData({...initialRoundData, round: roundData.round + 1})

    // Handle guesses

    const handleGuess = (e) => {
        setRoundData({...roundData, playerGuesses: {...roundData.playerGuesses, [e.target.name]: e.target.value}})
    }
    
    return (
        <>
            <div className='casinoContainer'>
               {roundData.round === 1 && !roundData.allGuessesMade && <h1 style={{color: 'yellow'}}>{generateWelcomeHeading(names)}</h1> }
                {!roundData.allGuessesMade && 
                <>
                    <p>{generateCustomMessage(roundData.currentGuesserSpot, roundData.round, names)}</p>
                    <input 
                    autoComplete='off' 
                    onChange={handleGuess} 
                    value={roundData.playerGuesses[names[roundData.currentGuesserSpot]]} 
                    name={names[roundData.currentGuesserSpot]} 
                    className='casinoInput' 
                    placeholder='Enter your card guess here' 
                    />
                    <button onClick={updateOrder} className='casinoButton'>Make Pick</button>
                </>
                }
                {roundData.allGuessesMade && 
                <>
                    <SelectedCards 
                    playerNames={names} 
                    playerScores={playerScores}
                    setPlayerScores={setPlayerScores}
                    playerGuesses={roundData.playerGuesses} 
                    isCardSelected={roundData.isCardSelected} 
                    selectedCardHistory={selectedCardHistory} 
                    currentRound={roundData.round} 
                    /> 
                    { roundData.round !== 5 && roundData.isCardSelected && <button onClick={nextRound} className='casinoButton'>Next Round</button> }
                    { roundData.round === 5 && selectedCardHistory.length === 5 && 
                    <div>
                       <p>{generateThankYouMessage(names)}</p>
                       <p>Come again soon! And as always, MIFUUUUUU</p>
                       <button onClick={() => window.location.reload()} className='casinoButton'>Exit Casino</button>
                    </div>
                    }
                </>
                }       
            </div>
        </>
    );
}

export default Casino;