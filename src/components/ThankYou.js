import generateThankYouMessage from "../helper/generateThankYouMessage"

export default function ThankYou({playerNames}) {
    return (
        <div>
            <p>{generateThankYouMessage(playerNames)}</p>
            <p>We look forward to seeing you again soon!</p>
            <button onClick={() => window.location.reload()} className='casinoButton'>Exit Casino</button>
        </div>
    )
}