import MainBox from './components/MainBox/MainBox'
import InfoBox from './components/InfoBox/InfoBox'
import './main.scss'

export default function Main() {
    return (
        <div className="main">
            <InfoBox />
            <MainBox />
        </div>    
    )
}