import './infoBox.scss'
import { ButtonOne } from '../../../button/Button';
import { useNavigate, } from 'react-router-dom';

export default function InfoBox() {
    
    const navigate = useNavigate();

    return (
        <div className="infoBlock">
            <div className="infoBox">
                <div className="infoBox-text">
                    <p>Данный сайт предназначен для отслеживания случаев о краже велосипедов</p>
                    <ButtonOne variant="contained" onClick={() => {
                        navigate('report')
                    }}>Сообщить о краже</ButtonOne>
                </div>
                <img className='infoBox-image' src="https://sarvelo.ru/wp-content/uploads/f/5/b/f5bcc82980d8f827760dead323bcc6d9.jpg" alt="Велосипед" />
            </div>
        </div>
    )
}