import MainBox from './components/MainBox/MainBox'
import InfoBox from './components/InfoBox/InfoBox'
import './main.scss'
import { useState } from 'react'

export default function Main({ token, setToken }) {
    
    const [reload, setReload] = useState(false)

    return (
        <div className="main">
            <InfoBox setReload={setReload}/>
            <MainBox token={token} setToken={setToken} setReload={setReload} reload={reload} />
        </div>    
    )
}