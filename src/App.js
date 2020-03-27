import React, { useState } from 'react';
import ApplicationBar from './components/ApplicationBar';
import Calendar from './components/Calendar';
import { initialState, StateContext } from "./context/context"; 

const App = () => {

  const [state, setState] = useState(initialState)

  return (
    <StateContext.Provider value={[state, setState]}>
      <ApplicationBar></ApplicationBar>
      <Calendar></Calendar>
    </StateContext.Provider>
  );
}

export default App;
