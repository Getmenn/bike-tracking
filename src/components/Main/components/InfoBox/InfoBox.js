import { useState } from 'react';
import Report from './Report';
import './infoBox.scss'
import { ButtonOne } from '../../../button/Button';

export default function InfoBox({setReload}) {
    
    const [visable, setVisable] = useState(false)

    return (
        <div className="infoBlock">
            <div className="infoBox">
                <div className="infoBox-text">
                    <p>Данный сайт предназначен для отслеживания случаев о краже велосипедов</p>
                    <ButtonOne variant="contained" onClick={() => setVisable(!visable)}>Сообщить о краже</ButtonOne>
                </div>
                {visable && <Report setVisable={setVisable} setReload={setReload} />}
                
                <img className='infoBox-image' src="https://sarvelo.ru/wp-content/uploads/f/5/b/f5bcc82980d8f827760dead323bcc6d9.jpg" alt="Велосипед" />
            </div>
        </div>
    )
}