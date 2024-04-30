import { useState } from 'react';

import Welcome from './components/Welcome';
import Casino from './components/Casino';

function App() {

  const [numOfPlayers, setNumOfPlayers] = useState(1)
  const [names, setNames] = useState({})
  const [readyToStart, setReadyToStart] = useState(false)

  return ( 
    <>
      { !readyToStart && 
      <Welcome 
      numOfPlayers={numOfPlayers} 
      setNumOfPlayers={setNumOfPlayers} 
      names={names} 
      setNames={setNames} 
      readyToStart={readyToStart} 
      setReadyToStart={setReadyToStart} /> } 
      {
        readyToStart &&
      <Casino names={names} />    
      }
    </>
    )
}

export default App;
