import React, { useEffect, useRef, useState } from 'react';

import SelectedCards from './SelectedCards';

import '../css/Casino.css'

// Deck of Cards API Functions

import { generateDeckId, getCard } from '../api/deckOfCardsApi'

function Casino({names}) {
    
    // Player keys that hold player names from object passed from Welcome.js
    
    const playerKeys = Object.keys(names)
    
    // Player guess state - will be reset / updated each round
    
    const [currentGuesserSpot, setCurrentGuesserSpot] = useState(0)
    const [currentGuesserName, setCurrentGuesserName] = useState(names[playerKeys[currentGuesserSpot]])
    const [playerGuesses, setPlayerGuesses] = useState({})
    const [guess, setGuess] = useState('')
    const [allGuessesMade, setAllGuessesMade] = useState(false)
    const [selectedCard, setSelectedCard] = useState('')

    // Except for these two

    const [selectedCardImages, setSelectedCardImages] = useState([])
    const [displayWelcomeHeading, setDisplayWelcomeHeading] = useState(true)

    // useRef hooks

    const isFirstRender = useRef(true)
    const isImageRetrieved = useRef(false)
    const isDeckId = useRef(false)
    const deckId = useRef('')
    const playerScores = useRef({})
    const currentRound = useRef(1)
    const welcomeHeading = useRef('Welcome, ')

    /*

    After component mounts:

    If no deck ID, call API to generate a new deck and select card from that deck.

    Only fetch when isImageRetrieved === false so that user can't fetch another card while still
    waiting for the first one to show.

    Otherwise, using the deck that's already generated, select another card.

    */

    useEffect(() => {
        
    if (isFirstRender.current) {
        isFirstRender.current = false

    }
    else if (!isDeckId.current && !isImageRetrieved.current) {
           const fetchUsers = async () => {
               const newDeckId = await generateDeckId()
                isDeckId.current = true
                deckId.current = newDeckId
                const card = await getCard(deckId.current)
                const cardName = `${card.cards[0].value} of ${card.cards[0].suit}`
                setTimeout(() => { setSelectedCardImages([...selectedCardImages, card.cards[0].image]); setSelectedCard(cardName); isImageRetrieved.current = true} , 3000)
        }; 

            fetchUsers()

            // Cleanup function

            return () => console.log('Unmounted')

        } else if (isDeckId.current && !isImageRetrieved.current && allGuessesMade) {
            const fetchUsers = async () => {
                const card = await getCard(deckId.current)
                const cardName = `${card.cards[0].value} of ${card.cards[0].suit}`
                setTimeout(() => { setSelectedCardImages([...selectedCardImages, card.cards[0].image]); setSelectedCard(cardName); isImageRetrieved.current = true}, 3000)
            };

            fetchUsers()

            // Cleanup function

            return () => console.log('Unmounted')

        } 

    }, [allGuessesMade, selectedCardImages]) 

    // Set Guess Order 

    const updateOrder = (e) => {   

        if (currentGuesserSpot + 1 > playerKeys.length - 1) {
            setAllGuessesMade(val => !val)
            if (displayWelcomeHeading) { 
                setDisplayWelcomeHeading(val => !val) 
            }
        } else {
            setCurrentGuesserSpot(currentGuesserSpot + 1)
            setCurrentGuesserName(names[playerKeys[currentGuesserSpot + 1]])
            setGuess('')
            e.preventDefault()
        }
    }

    // Set Next Round

    const nextRound = () => {
        setCurrentGuesserSpot(0)
        setAllGuessesMade(false)
        setPlayerGuesses({})
        setCurrentGuesserName(names[playerKeys[0]])
        setGuess('')
        currentRound.current = currentRound.current + 1
        isImageRetrieved.current = false
    }

    // Handle guesses

    const handleGuess = (e) => {
        setGuess(e.target.value)
        setPlayerGuesses({...playerGuesses, [e.target.name]: e.target.value})
    }

    // Get player names from input

    let playerNames = []
    for (let i = 0; i<playerKeys.length; i++) {
        playerNames.push(names[playerKeys[i]])
    }

    // Create welcome heading based on names

    if (currentRound.current === 1 && isFirstRender.current) {

    const handleNameLogic = (n) => {
        if (playerNames.length === 1) {
            welcomeHeading.current = `Welcome, ${n}!`
        } else if (n === playerNames[playerNames.length - 1]) {
            welcomeHeading.current += `and ${n}!`
        } else if (playerNames.length === 2) {
            welcomeHeading.current += `${n} `
        } else if (playerNames.length > 2) {
            welcomeHeading.current += `${n}, `
    }}

    playerNames.forEach(name => {
        handleNameLogic(name)
    })

    }

    // Custom message for each round of guessing

    let message 
    if (currentGuesserSpot === 0 && playerNames.length === 1 && currentRound.current === 5) {
        message = `${currentGuesserName}, it's your final guess!`
    } else if (currentRound.current === 5 && currentGuesserSpot === 0) {
     message =  ` will start us off for round ${currentRound.current}, the final round! Make your final pick!`
    }
   else if(currentGuesserSpot === 0 && playerNames.length === 1) { 
        message = 'You are up!'
    }
     else if (currentGuesserSpot === 0) {
        message = ` will start us off for round ${currentRound.current}. Make your pick!`
     } else if (currentRound.current === 5) {
        message =  ` is next. Make your final pick!`
     }
    else {
        message = ' is next. Make your pick!' 
    }

    // Custom thank you message at the end of each game

    let thankYouMessage = 'Thanks for coming out to TLNC'
    const generateCustomThankYouMessage = (name) => {
        if (playerNames.length === 1) {
            thankYouMessage += `, ${name}!`
        } 
        else if (name === playerNames[playerNames.length - 1]) {
            thankYouMessage += ` and ${name}!`
        }
        else if (playerNames.length === 2) {
            thankYouMessage += `, ${name}`
        } else if (playerNames.length > 2) {
            thankYouMessage += ` ${name},`
        }
    }

   if (currentRound.current === 5 && selectedCardImages.length === 5) { playerNames.forEach(name => {
        generateCustomThankYouMessage(name)
    })
    }

    return (
        <>
            <div className='casinoContainer'>
               {displayWelcomeHeading && <h1 style={{color: 'yellow'}}>{welcomeHeading.current}</h1> }
                {!allGuessesMade && 
                <>
                    <p>{playerNames.length === 1 ? `${message}` : `${currentGuesserName}${message}`}</p>
                    <input autoComplete='off' onChange={handleGuess} value={guess} name={currentGuesserName} className='casinoInput' placeholder='Enter your card guess here' />
                    {guess.trim() !== '' && <button onClick={updateOrder} className='casinoButton'>Make Pick</button> }
                </>
                }
                {allGuessesMade && 
                <>
                    <SelectedCards 
                    playerNames={playerNames} 
                    playerGuesses={playerGuesses} 
                    isImageRetrieved={isImageRetrieved} 
                    selectedCard={selectedCard} 
                    selectedCardImages={selectedCardImages} 
                    currentRound={currentRound.current} 
                    playerScores={playerScores}
                    /> 
                    { currentRound.current !== 5 && isImageRetrieved.current && <button onClick={nextRound} className='casinoButton'>Next Round</button> }
                    { currentRound.current === 5 && selectedCardImages.length === 5 && 
                    <div>
                       <p>{thankYouMessage}</p>
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