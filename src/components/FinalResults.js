import getGameWinners from "../helper/getGameWinners"

export default function FinalResults({playerScores, playerNames}) {

    const { winnerMessage, winners } = getGameWinners(playerScores.current)

    return (
        <>
            {winners.length === 0 ?
                <p style={{fontWeight: 'bold'}}> {playerNames.length === 1 ? `Sorry, ${playerNames[0]}! You walk away empty handed today!` : 'Nobody walks away with the TLNC grand prize...'} </p>
                :
                <p style={{color: 'limegreen', fontSize: 40}}>{winnerMessage}</p>
            }
        </>
    )

}