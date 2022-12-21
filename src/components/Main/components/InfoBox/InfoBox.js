import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Report from './Report';
import './infoBox.scss'

export default function InfoBox() {
    const [visable, setVisable] = useState(false)

    const ButtonOne = styled(Button)({
        fontSize: 18,
        background: '#b37b7b',
        marginTop: '80px',
        '&:hover': {
            backgroundColor: '#765050',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
    })

    return (
        <div className="infoBlock">
            <div className="infoBox">
                <div className="infoBox-text">
                    <p>Данный сайт предназначен для отслеживания случаев о краже велосипедов</p>
                    <ButtonOne variant="contained" onClick={() => setVisable(!visable)}>Сообщить о краже</ButtonOne>
                </div>
                {visable && <Report setVisable={setVisable} />}
                
                <img className='infoBox-image' src="https://sarvelo.ru/wp-content/uploads/f/5/b/f5bcc82980d8f827760dead323bcc6d9.jpg" alt="Велосипед" />
            </div>
        </div>
    )
}