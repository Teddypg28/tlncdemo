import React from 'react';

function Welcome({numOfPlayers, setNumOfPlayers, names, setNames, setReadyToStart}) {

    const handleChange = (e) => {
       if (e.target.value.trim() === '') {
        setNumOfPlayers('')
       } else {
        setNumOfPlayers(e.target.value)
       }
    }

    const handleInputChange = (e) => {
        setNames({...names, [e.target.name]: e.target.value})
    }

    let inputs = []
    const generateInputs = () => {
        for (let i=0; i<numOfPlayers; i++) {
                inputs.push(<input autoComplete='off' key={i+1} name={`player${i+1}`} onChange={handleInputChange} style={styles.nameInput} placeholder={`Player ${i + 1} name`} />)
        }
        return inputs
    }

    const handleFormSubmit = (e) => {
        const keys = Object.keys(names)
        if (inputs.length !== keys.length) {
            alert('All names must be entered in order to enter the casino!')
            e.preventDefault()
        } else if (inputs.length === 0) {
            alert('Please enter the number of players and their names to enter the casino.')
            e.preventDefault()
        } else {
            setReadyToStart(val => !val)
            e.preventDefault()
        }
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to TLNC!</h1>
            <p style={{fontSize: 23, marginTop: 7}}>How many players will be participating today?</p>
            <input placeholder='ex: 2' onChange={handleChange} style={styles.input} />
            {numOfPlayers !== '' && numOfPlayers !== '0' &&
            <form onSubmit={handleFormSubmit} style={{width: 500}}>
                <div style={styles.inputContainer}>
                    {generateInputs()}
                </div> 
                <button style={styles.startGameBtn}>Enter the Casino!</button>
            </form>
            }
        </div>
    );
}

const styles= {
    container: {
        backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/005/525/213/original/neon-casino-playing-cards-with-poker-chips-and-hologram-of-digital-rings-in-dark-empty-scene-vector.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'Bubblegum Sans'
    },
    heading: {
        margin: 0,
        marginTop: 60,
        fontSize: 70,
        color: '#00A2FF'
    },
    input: {
        width: 70,
        height: 40,
        padding: 10,
        borderRadius: 10,
        border: '4px solid white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    inputContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    nameInput: {
        width: '100%',
        height: 70,
        padding: 10,
        borderRadius: 10,
        border: '4px solid #00A2FF',
        boxSizing: 'border-box',
        margin: '5px 0px'
    },
    startGameBtn: {
        width: '100%',
        height: 80,
        padding: 10,
        borderRadius: 5,
        color: 'white',
        backgroundColor: '#00A2FF',
        marginTop: 5,
        fontSize: 25,
        border: 'none',
        fontFamily: 'Bubblegum Sans',
        cursor: 'pointer'
    }
}

export default Welcome;