import React, { useEffect, useRef, useState } from 'react';

import generateWelcomeHeading from '../helper/generateWelcomeHeading';

import { generateDeckId, getCard } from '../api/deckOfCardsApi'

import '../css/Casino.css'

import ThankYou from './ThankYou';
import Guess from './Guess';
import SelectedCards from './SelectedCards';
import FinalResults from './FinalResults';
import RoundResults from './RoundResults';

const initialRoundData = {
    round: 1,
    currentGuesserSpot: 0,
    playerGuesses: {},
    allGuessesMade: false,
    isCardSelected: false
}

function Casino({playerNames}) {

    const [roundData, setRoundData] = useState({...initialRoundData, playerGuesses: Object.fromEntries(playerNames.map(name => [name, '']))})
    const { allGuessesMade, isCardSelected, round } = roundData
    const [selectedCardHistory, setSelectedCardHistory] = useState([])

    // useRef hooks

    const playerScores = useRef(Object.fromEntries(playerNames.map(name => [name, 0])))
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

            if (allGuessesMade && !isCardSelected) {

                const drawCard = async () => {

                    if (!deckId.current && !isCardSelected) deckId.current = await generateDeckId()                         
        
                    const card = await getCard(deckId.current)
                    
                    setTimeout(() => { 
                        setSelectedCardHistory([...selectedCardHistory, {name: `${card.cards[0].value} of ${card.cards[0].suit}`, image: card.cards[0].image}]); 
                        setRoundData({...roundData, isCardSelected: true})
                    }, 3000)
                                    
                }

                drawCard()

                return () => console.log('Unmounted')
            }

        } 

        // Cleanup Function


    }, [roundData, selectedCardHistory, allGuessesMade, isCardSelected]) 

    // Set Next Round

    const nextRound = () => {
        setRoundData({...initialRoundData, round: round + 1, playerGuesses: Object.fromEntries(playerNames.map(name => [name, '']))})
    }

    // end of game winner check function
    
    return (
        <>
            <div className='casinoContainer'>
               {round === 1 && !allGuessesMade ? 
               <h1 style={{color: 'yellow'}}>{generateWelcomeHeading(playerNames)}</h1> :
                <h1 style={{color: 'yellow', fontSize: 60}}>
                    {`Round ${round === 5 ? `${round} (Final Round - ${round * 2} Points!)` : `${round} (${round * 2} Points) `}`}
                </h1> 
                }
                {!allGuessesMade ? 
                    <Guess 
                    roundData={roundData} 
                    setRoundData={setRoundData} 
                    playerNames={playerNames}  
                    />
                    :
                    <>
                        <p style={{color: 'white'}}>
                            All guesses have been made! {round === 5 ? 'And the final card is...' : 'And the card is...'} 
                            { isCardSelected && 
                            <span style={{color: 'yellow', fontSize: 35}}>
                                {selectedCardHistory[round-1].name}
                            </span>} 
                        </p> 

                        { isCardSelected &&
                            <RoundResults 
                            playerNames={playerNames}
                            playerScores={playerScores}
                            roundData={roundData}
                            selectedCardHistory={selectedCardHistory}
                            />
                        }

                        { isCardSelected && round === 5 &&
                            <FinalResults 
                            playerNames={playerNames}
                            playerScores={playerScores} 
                            /> 
                        }  

                        <SelectedCards selectedCardHistory={selectedCardHistory} />
                        
                        { round !== 5 && isCardSelected && 
                            <button 
                            onClick={nextRound} 
                            className='casinoButton'>
                                Next Round
                            </button> 
                        }

                        { round === 5 && selectedCardHistory.length === 5 && <ThankYou playerNames={playerNames} /> }
                    </>  
                }   
            </div>
        </>
    );
}

export default Casino;