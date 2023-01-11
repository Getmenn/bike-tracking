import { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { Route, Routes} from "react-router-dom";

function App() {
 
  const [token, setToken] = useState(null)

  return (
    <>
      <Header token={token} setToken={setToken}/>
        <Routes>
          <Route path='/*' element={<Main token={token} setToken={setToken}/>} />
        </Routes>
    </>
  );
}

export default App;
