import React from 'react';

import '../css/SelectedCards.css'

function SelectedCards({currentRound, selectedCardImages, selectedCard, isImageRetrieved, playerGuesses, playerNames, playerScores}) { 
    
    const guessKeys = Object.keys(playerGuesses)

    // initialize player scores object

    currentRound === 1 && playerNames.forEach(name => {
        playerScores.current = ({...playerScores.current, [name]: 0})
     })

     // check for any correct guesses
    
    const winningPlayers = []

    for (let i=0; i<guessKeys.length; i++) {
        
        if (playerGuesses[guessKeys[i]].toLowerCase() === selectedCard.toLowerCase()) {
            winningPlayers.push(guessKeys[i])
        }
    }

    // retrieve winning names if there are correct guesses
    
    let winningNames

    if (winningPlayers) {

        if (winningPlayers.length === 1) {
            winningNames = `${winningPlayers[0]}`
        } else if (winningPlayers.length === 2) {
            winningNames = `${winningPlayers[0]} and ${winningPlayers[1]}`
        } else if (winningPlayers.length > 2) {
            winningPlayers.forEach(winningPlayer => {
            winningNames += winningPlayer === winningPlayers[winningPlayers.length-1] ? `and ${winningPlayer}` : `${winningPlayer}, `})
        }
        
        winningPlayers.forEach(player => {
            playerScores.current = {...playerScores.current, [player]: playerScores.current[player] + (currentRound * 2)}
        })

    }

    // end of game winner check function

    let winners = []
    
    const handleWinner = () => {

        let winningScore = 0

        const playerScoreKeys = Object.keys(playerScores.current)   
        playerScoreKeys.forEach(key => {
            if (playerScores.current[key] > 0) {
               if (winningScore === playerScores.current[key]) {
                winners.push(key)
               } else {
                   winners = [key]
                   winningScore = playerScores.current[key]
               }
            }
        })  
        
        let winnerMessage
        if (winners.length === 1) {
            winnerMessage = `${winners[0]} wins the TLNC grand prize with ${winningScore} points!`
        } else if (winners.length === 2) {
            winnerMessage = `${winners[0]} and ${winners[1]} win the TLNC grand prize with ${winningScore} points!`
        } else {
            winners.forEach(winner => {
                if (winner === winners[winners.length - 1]) {
                    winnerMessage += `and ${winner} win the TLNC grand prize with ${winningScore} points!`
                } else {
                    winnerMessage += `${winner}, `
                }
            })
        }

        return winnerMessage
    }

    const renderCards = () => {
        let cardHtml = []
        for (let i = 0; i<5; i++) {
            if (selectedCardImages[i]) {
                cardHtml.push(
                <div key={`round${i}`} className='card'> 
                    <img className='image' alt={`round${i}-card`} src={`${selectedCardImages[i]}`} /> 
                </div>
                )
            } else {
                cardHtml.push( 
                    <div key={`round${i}`} className='card'></div>
                    )
                }
            }
            
            return cardHtml
    }

    return (
        <>
            <h1 style={{color: 'yellow', fontSize: 60}}>{`Round ${currentRound === 5 ? `${currentRound} (Final Round - ${currentRound * 2} Points!)` : `${currentRound} (${currentRound * 2} Points) `}`}</h1> 
             <p style={{color: 'white'}}>All guesses have been made! {currentRound === 5 ? 'And the final card is...' : 'And the card is...'} { isImageRetrieved.current && <span style={{color: 'yellow', fontSize: 35}}>{selectedCard}</span>} </p> 
            {isImageRetrieved.current && winningPlayers.length > 0 && currentRound !== 5 && <p style={{color: 'limegreen', fontSize: 40}}> {winningNames} {winningPlayers.length === 1 ? 'wins the round!' : 'win the round!'}</p> }
            {isImageRetrieved.current && currentRound === 5 && <p style={{color: 'limegreen', fontSize: 40}}>{handleWinner()}</p>}
            {isImageRetrieved.current && currentRound !== 5 && winningPlayers.length === 0 && <p> {playerNames.length === 1 ? `You didn't win this round, ${playerNames[0]}` : 'Nobody won this round'}</p> } 
            {isImageRetrieved.current && winners.length === 0 && currentRound === 5 && <p style={{fontWeight: 'bold'}}> {playerNames.length === 1 ? `Sorry, ${playerNames[0]}! You walk away empty handed today!` : 'Nobody walks away with the TLNC grand prize...'} </p>}
            <div className='cardLayoutContainer'>
                <div className='selectedCardsContainer'>
                    {renderCards()}
                </div>
            </div>
        </>
    );
}

export default SelectedCards;