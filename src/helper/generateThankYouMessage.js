export default function generateThankYouMessage(names) {

    let thankYouMessage = 'Thanks for coming out to TLNC'
    const handleNames = (name) => {
        if (names.length === 1) {
            thankYouMessage += `, ${name}!`
        } 
        else if (name === names[names.length - 1]) {
            thankYouMessage += ` and ${name}!`
        }
        else if (names.length === 2) {
            thankYouMessage += `, ${name}`
        } else if (names.length > 2) {
            thankYouMessage += ` ${name},`
        }
    }

    names.forEach(name => handleNames(name))

    return thankYouMessage
}
