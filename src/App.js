import { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { Link, Route, Routes} from "react-router-dom";
import Report from "./components/Main/components/InfoBox/Report";
import DetailedBlock from "./components/Main/components/MainBox/Block/DetailedBlock";
import Login from "./components/Header/components/Login";
import Registration from "./components/Header/components/Registration";
import OfficerList from "./components/Header/components/OfficerList";
import { OfficerPage } from "./components/Header/components/OfficerPage";

function App() {
 
  const [token, setToken] = useState(null)

  return (
    <>
      <Header token={token} setToken={setToken} /> 
      <Main token={token} setToken={setToken}/>
        <Routes>
          <Route path='/*' element={null} />
          <Route path='/cases/:id' element={<DetailedBlock />} /> 
          <Route path='/report' element={<Report />} /> 
          <Route path='/officers/:id' element={<OfficerPage />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/registration' element={<Registration  />} />
          <Route path='/officers/*' element={<OfficerList  />} />  
        </Routes>
    </>
  );
}

export default App;
