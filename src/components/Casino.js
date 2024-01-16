import React, { useEffect, useRef, useState } from 'react';

import SelectedCards from './SelectedCards';

// NOTES FOR TOMORROW
// 1) add pictures of cards for styling to casino

// Deck of Cards API Functions

import { generateDeckId, getCard } from '../deckOfCardsApi'

function Casino({names}) {
    
    // Player keys that hold player names from object passed from Welcome.js
    
    const playerKeys = Object.keys(names)
    
    // State Value storage that will be reset / updated each round
    
    const [currentGuesserSpot, setCurrentGuesserSpot] = useState(0)
    const [currentGuesserName, setCurrentGuesserName] = useState(names[playerKeys[currentGuesserSpot]])
    const [playerGuesses, setPlayerGuesses] = useState({})
    const [guess, setGuess] = useState('')
    const [allGuessesMade, setAllGuessesMade] = useState(false)
    const [selectedCard, setSelectedCard] = useState('')

    // Except for these two (below)

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

    useEffect(() => {
        
    if (isFirstRender.current) {
        isFirstRender.current = false
        return () => console.log('Cleaning up...')
    }
    else if (!isDeckId.current && !isImageRetrieved.current) {
           const fetchUsers = async () => {
               const newDeckId = await generateDeckId()
                isDeckId.current = true
                deckId.current = newDeckId
                const card = await getCard(deckId.current)
                const cardName = `${card.cards[0].value} of ${card.cards[0].suit}`
                setTimeout(() => { setSelectedCardImages([...selectedCardImages, card.cards[0].image]); setSelectedCard(cardName); isImageRetrieved.current = true} , 3000)
        }; fetchUsers()
        
            return () => console.log('Unmounted 2')

        } else if (isDeckId.current && !isImageRetrieved.current && allGuessesMade) {
            const fetchUsers = async () => {
                const card = await getCard(deckId.current)
                const cardName = `${card.cards[0].value} of ${card.cards[0].suit}`
                setTimeout(() => { setSelectedCardImages([...selectedCardImages, card.cards[0].image]); setSelectedCard(cardName); isImageRetrieved.current = true}, 3000)
            };
            fetchUsers()
            return () => console.log('Unmounted 3')
        } else {
            return () => console.log('Unmounted 4')
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
        setPlayerGuesses()
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
    const generateCustomThankYouMessage = (n) => {
        if (playerNames.length === 1) {
            thankYouMessage += `, ${n}!`
        } 
        else if (n === playerNames[playerNames.length - 1]) {
            thankYouMessage += ` and ${n}!`
        }
        else if (playerNames.length === 2) {
            thankYouMessage += `, ${n}`
        } else if (playerNames.length > 2) {
            thankYouMessage += ` ${n},`
        }
    }

   if (currentRound.current === 5 && selectedCardImages.length === 5) { playerNames.forEach(name => {
        generateCustomThankYouMessage(name)
    })
    }

    return (
        <>
            <div style={styles.container}>
               {displayWelcomeHeading && <h1 style={{color: 'yellow'}}>{welcomeHeading.current}</h1> }
                {!allGuessesMade && 
                <>
                    <p>{playerNames.length === 1 ? `${message}` : `${currentGuesserName}${message}`}</p>
                    <input autoComplete='off' onChange={handleGuess} value={guess} name={currentGuesserName} style={styles.input} placeholder='Enter your card guess here' />
                    {guess.trim() !== '' && <button onClick={updateOrder} style={styles.button}>Make Pick</button> }
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
                    { currentRound.current !== 5 && isImageRetrieved.current && <button onClick={nextRound} style={styles.button}>Next Round</button> }
                    { currentRound.current === 5 && selectedCardImages.length === 5 && 
                    <div>
                       <p>{thankYouMessage}</p>
                       <p>Come again soon! And as always, MIFUUUUUU</p>
                       <button onClick={() => window.location.reload()} style={styles.button}>Exit Casino</button>
                    </div>
                        
                    }
                </>
                }       
            </div>
        </>
    );
}

const styles = {
    container: {
        overflow: 'hidden',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundImage: "url('https://img.freepik.com/premium-vector/poker-table-background-green-color_47243-1068.jpg')",
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Bubblegum Sans',
        fontSize: 28
    },
    button: {
        width: 350,
        height: 70,
        backgroundColor: 'yellow',
        color: 'black',
        border: 'none',
        borderRadius: 10,
        cursor: 'pointer'
    },
    input: {
        display: 'block',
        margin: 'auto',
        height: 30,
        width: 400,
        padding: 20,
        borderRadius: 10,
        marginBottom: 40
    }
}

export default Casino;