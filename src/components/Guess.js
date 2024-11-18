import generateCustomMessage from '../helper/generateCustomMessage'

export default function Guess({roundData, setRoundData, playerNames}) {

    const {playerGuesses, currentGuesserSpot, round} = roundData

    const handleGuess = (e) => {
        setRoundData({...roundData, playerGuesses: {...playerGuesses, [e.target.name]: e.target.value}})
    }

    // Change Guessers 

    const updateOrder = () => {   
        if (currentGuesserSpot === playerNames.length - 1) {
            setRoundData({...roundData, allGuessesMade: true})
        } else {
            setRoundData({...roundData, currentGuesserSpot: currentGuesserSpot + 1})
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