import { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";


function App() {
 
  const [token, setToken] = useState(null)

  return (
    <>
      <Header token={token} setToken={setToken} />
      <Main token={token} setToken={setToken} />
    </>
  );
}

export default App;
