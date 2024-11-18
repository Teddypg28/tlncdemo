export default function RoundResults({playerScores, playerNames, roundData, selectedCardHistory})  {

    const { round, playerGuesses } = roundData

    const guessKeys = Object.keys(playerGuesses)
    
    const winningPlayers = []
    const checkForWinners  = () => {
        for (let i=0; i<guessKeys.length; i++) {
            if (playerGuesses[guessKeys[i]].toLowerCase() === selectedCardHistory[round-1].name.toLowerCase()) {
                winningPlayers.push(guessKeys[i])
            }
        }
    }

    checkForWinners()
    
    let winningNames
    if (winningPlayers.length > 0) {

        if (winningPlayers.length === 1) {
            winningNames = `${winningPlayers[0]}`
        } else if (winningPlayers.length === 2) {
            winningNames = `${winningPlayers[0]} and ${winningPlayers[1]}`
        } else if (winningPlayers.length > 2) {
            winningPlayers.forEach(winningPlayer => {
                winningNames += winningPlayer === winningPlayers[winningPlayers.length-1] ? `and ${winningPlayer}` : `${winningPlayer}, `
            })
        }
    }

    winningPlayers.forEach(player => {
        playerScores.current = {...playerScores.current, [player]: playerScores.current[player] + (round * 2)}
    })

    return (
        <>
            {winningPlayers.length > 0 ? 
                <p style={{color: 'limegreen', fontSize: 40}}> {winningNames} {winningPlayers.length === 1 ? 'wins the round!' : 'win the round!'}</p> 
                :
                <p> {playerNames.length === 1 ? `You didn't win this round, ${playerNames[0]}` : 'Nobody won this round'}</p> 
            } 
        </>         
    )

}