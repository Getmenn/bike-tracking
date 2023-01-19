import './infoBox.scss'
import { ButtonOne } from '../../../button/Button';
import { useNavigate, } from 'react-router-dom';
import bicycle from '../../../../svg/bicycle.png'
import forest from '../../../../svg/forest.png'


export default function InfoBox() {
    
    const navigate = useNavigate();

    return (
        <div className="infoBlock">
            <div className="infoBox">
                <div className="infoBox-text">
                    <p>Данный сайт предназначен для отслеживания случаев о краже арендованных велосипедов фирмы "Bike Patrol"</p>
                    <ButtonOne variant="contained" onClick={() => {
                        navigate('report')
                    }}>Сообщить о краже</ButtonOne>
                </div>
                <img className='infoBox-image' src={bicycle} alt="Велосипед" />
                
            </div>
            <img className='imageBackground' src={forest} alt="Лес" />
        </div>
    )
}