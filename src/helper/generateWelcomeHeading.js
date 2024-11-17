export default function generateWelcomeHeading(names) {

    let welcomeHeading = 'Welcome, '
    const handleName = (n) => {
        if (names.length === 1) {
            welcomeHeading = `Welcome, ${n}!`
        } else if (n === names[names.length - 1]) {
            welcomeHeading += `and ${n}!`
        } else if (names.length === 2) {
            welcomeHeading += `${n} `
        } else if (names.length > 2) {
            welcomeHeading += `${n}, `
    }}

    names.forEach(name => {
        handleName(name)
    })

    return welcomeHeading
}