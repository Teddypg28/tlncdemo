export default function generateCustomMessage(currentGuesserSpot, currentRound, names) {

    let message 
    if (currentGuesserSpot === 0 && names.length === 1 && currentRound === 5) {
        message = `${names[currentGuesserSpot]}, it's your final guess!`
    } else if (currentRound === 5 && currentGuesserSpot === 0) {
        message =  `${names[currentGuesserSpot]} will start us off for round ${currentRound}, the final round! Make your final pick!`
    } else if(currentGuesserSpot === 0 && names.length === 1) { 
        message = `Make your pick, ${names[0]}!`
    } else if (currentGuesserSpot === 0) {
        message = `${names[currentGuesserSpot]} will start us off for round ${currentRound}. Make your pick!`
    } else if (currentRound === 5) {
        message =  `${names[currentGuesserSpot]} is next. Make your final pick!`
    } else {
        message = `${names[currentGuesserSpot]} is next. Make your pick!`
    }

    return message
    
}