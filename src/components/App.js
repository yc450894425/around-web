import React, {useState} from 'react';
import TopBar from "./TopBar";
import Main from "./Main";
import { TOKEN_KEY } from "../constants";


function App() {

  // how to sue useState
  // 1. declare a state
  // 2. declare a function => how to change the state
  // 3. default value for the state
  const [isLoggedIn, setIsLoggedIn] = useState(
      localStorage.getItem(TOKEN_KEY) ? true : false
  );

  const logout = () => {
    console.log("log out");
    localStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  }

  const loggedIn = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsLoggedIn(true);
    }
  };
  return (
    <div className="App">
      <TopBar
          isLoggedIn = {isLoggedIn}
          handleLogout = {logout}
      />
      <Main
          isLoggedIn = {isLoggedIn}
          handleLoggedIn={loggedIn}/>
    </div>
  );
}

export default App;
