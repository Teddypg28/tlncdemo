import { useState } from 'react';

import Welcome from './components/Welcome';
import Casino from './components/Casino';

function App() {

  const [names, setNames] = useState([''])
  const [readyToStart, setReadyToStart] = useState(false)

  return ( 
    <>
      { !readyToStart ?
      <Welcome  
      names={names} 
      setNames={setNames} 
      readyToStart={readyToStart} 
      setReadyToStart={setReadyToStart} />  
      :
      <Casino playerNames={names} />    
      }
    </>
    )
}

export default App;
