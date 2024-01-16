
async function generateDeckId() {
    const result = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const deck = await result.json()
    return deck.deck_id
}


async function getCard(deckId) {
    const result = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const card = await result.json()
    return card
}

async function reshuffleDeck(deckId) {
    const result = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
    const reshuffledDeck = await result.json()
    return reshuffledDeck
}

export { generateDeckId, getCard, reshuffleDeck }