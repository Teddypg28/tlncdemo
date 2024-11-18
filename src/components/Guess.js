import generateCustomMessage from '../helper/generateCustomMessage'

export default function Guess({roundData, setRoundData, playerNames}) {

    const {playerGuesses, currentGuesserSpot, round} = roundData

    const handleGuess = (e) => {
        setRoundData(prevRoundData => {return {...prevRoundData, playerGuesses: {...playerGuesses, [e.target.name]: e.target.value}}})
    }

    // Change Guessers 

    const updateOrder = () => {   
        if (currentGuesserSpot === playerNames.length - 1) {
            setRoundData(prevRoundData => {return {...prevRoundData, allGuessesMade: true}})
        } else {
            setRoundData(prevRoundData => {return {...prevRoundData, currentGuesserSpot: currentGuesserSpot + 1}})
        }
    }

    return (
        <>
            <p>{generateCustomMessage(currentGuesserSpot, round, playerNames)}</p>
            <input 
            autoComplete='off' 
            onChange={handleGuess} 
            value={playerGuesses[playerNames[currentGuesserSpot]]} 
            name={playerNames[currentGuesserSpot]} 
            className='casinoInput' 
            placeholder='Enter your card guess here' 
            />
            <button onClick={updateOrder} className='casinoButton'>Make Pick</button>
        </>
    )
}