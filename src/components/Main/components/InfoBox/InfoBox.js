import { useState } from 'react';
import Report from './Report';
import './infoBox.scss'
import { ButtonOne } from '../../../button/Button';
import { Route, Routes, useNavigate } from 'react-router-dom';

export default function InfoBox({ setReload }) {
    
    const navigate = useNavigate();
    
    const [visable, setVisable] = useState(false)

    return (
        <div className="infoBlock">
            <div className="infoBox">
                <div className="infoBox-text">
                    <p>Данный сайт предназначен для отслеживания случаев о краже велосипедов</p>
                    <ButtonOne variant="contained" onClick={() => {
                        navigate('report')
                        setVisable(!visable)
                    }}>Сообщить о краже</ButtonOne>
                </div>
                <Routes>
                    {visable && <Route path='report' element={<Report setVisable={setVisable} setReload={setReload} />} />}
                </Routes>
                {/* {visable && <Report setVisable={setVisable} setReload={setReload} />} */}
                
                <img className='infoBox-image' src="https://sarvelo.ru/wp-content/uploads/f/5/b/f5bcc82980d8f827760dead323bcc6d9.jpg" alt="Велосипед" />
            </div>
        </div>
    )
}