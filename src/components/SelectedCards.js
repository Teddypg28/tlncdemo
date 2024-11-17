import React from 'react';

import '../css/SelectedCards.css'
import getGameWinners from '../helper/getGameWinners';

function SelectedCards({currentRound, selectedCardHistory, isCardSelected, playerGuesses, playerNames, playerScores, setPlayerScores}) { 
       
     // check for any correct guesses

    const guessKeys = Object.keys(playerGuesses)
    
    const winningPlayers = []
    const checkForWinners  = () => {
        for (let i=0; i<guessKeys.length; i++) {
            
            if (playerGuesses[guessKeys[i]].toLowerCase() === selectedCardHistory[currentRound-1].name.toLowerCase()) {
                winningPlayers.push(guessKeys[i])
            }
        }
    }

    isCardSelected && checkForWinners()

    // retrieve winning names if there are correct guesses
    
    let winningNames
    if (winningPlayers.length > 0) {

        if (winningPlayers.length === 1) {
            winningNames = `${winningPlayers[0]}`
        } else if (winningPlayers.length === 2) {
            winningNames = `${winningPlayers[0]} and ${winningPlayers[1]}`
        } else if (winningPlayers.length > 2) {
            winningPlayers.forEach(winningPlayer => {
            winningNames += winningPlayer === winningPlayers[winningPlayers.length-1] ? `and ${winningPlayer}` : `${winningPlayer}, `})
        }
        
        winningPlayers.forEach(player => {
            setPlayerScores({...playerScores, [player]: playerScores[player] + (currentRound * 2)})
        })

    }

    // end of game winner check function

    const { winnerMessage, winners } = getGameWinners(playerScores)

    const renderCards = () => {
        let cardHtml = []
        for (let i = 0; i<5; i++) {

            selectedCardHistory[i] ?
                cardHtml.push(
                <div key={`round${i}`} className='card'> 
                    <img draggable={false} className='image' alt={`round${i}-card`} src={`${selectedCardHistory[i].image}`} /> 
                </div>
                )
            
                :
                cardHtml.push(
                    <div key={`round${i}`} className='card'></div>
                )

            } 
            
            return cardHtml
    }

    return (
        <>
            <h1 style={{color: 'yellow', fontSize: 60}}>{`Round ${currentRound === 5 ? `${currentRound} (Final Round - ${currentRound * 2} Points!)` : `${currentRound} (${currentRound * 2} Points) `}`}</h1> 
             <p style={{color: 'white'}}>All guesses have been made! {currentRound === 5 ? 'And the final card is...' : 'And the card is...'} { isCardSelected && <span style={{color: 'yellow', fontSize: 35}}>{selectedCardHistory[currentRound-1].name}</span>} </p> 
            {isCardSelected && winningPlayers.length > 0 && currentRound !== 5 && <p style={{color: 'limegreen', fontSize: 40}}> {winningNames} {winningPlayers.length === 1 ? 'wins the round!' : 'win the round!'}</p> }
            {isCardSelected && currentRound === 5 && <p style={{color: 'limegreen', fontSize: 40}}>{winnerMessage}</p>}
            {isCardSelected && currentRound !== 5 && winningPlayers.length === 0 && <p> {playerNames.length === 1 ? `You didn't win this round, ${playerNames[0]}` : 'Nobody won this round'}</p> } 
            {isCardSelected && winners.length === 0 && currentRound === 5 && <p style={{fontWeight: 'bold'}}> {playerNames.length === 1 ? `Sorry, ${playerNames[0]}! You walk away empty handed today!` : 'Nobody walks away with the TLNC grand prize...'} </p>}
            <div className='selectedCardsContainer'>
                {renderCards()}
            </div>
        </>
    );
}

export default SelectedCards;