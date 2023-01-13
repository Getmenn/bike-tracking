import MainBox from './components/MainBox/MainBox'
import InfoBox from './components/InfoBox/InfoBox'
import './main.scss'
import { useState } from 'react'

export default function Main({ token, setToken }) {

    return (
        <div className="main">
            <InfoBox/>
            <MainBox token={token} />
        </div>    
    )
}