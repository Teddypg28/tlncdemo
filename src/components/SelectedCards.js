import '../css/SelectedCards.css'

export default function SelectedCards({selectedCardHistory}) {

    const renderCards = () => {
        let cardHtml = []
        for (let i = 0; i<5; i++) {

            selectedCardHistory[i] ?
                cardHtml.push (
                <div key={`round${i}`} className='card'> 
                    <img draggable={false} className='image' alt={`round${i}-card`} src={`${selectedCardHistory[i].image}`} /> 
                </div>
                )
            
                :
                cardHtml.push (
                    <div key={`round${i}`} className='card'></div>
                )

            } 
            
            return cardHtml
    }


    return (
        <div className='selectedCardsContainer'>
            {renderCards()}
        </div>
    )
}