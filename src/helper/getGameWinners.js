export default function getGameWinners(playerScores) {
    
    let winners = []
    
    let winningScore = 0

    const playerScoreKeys = Object.keys(playerScores)   
    playerScoreKeys.forEach(key => {
        if (playerScores[key] > 0) {
            if (winningScore === playerScores[key]) {
            winners.push(key)
            } else {
                winners = [key]
                winningScore = playerScores[key]
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
    
    return {winnerMessage, winners}

}