import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import './block.scss'
import DetailedBlock from './DetailedBlock';
import newIcon from '../../../../../svg/new.svg'
import inProgress from '../../../../../svg/inProgress.svg'
import done from '../../../../../svg/done.svg'


export default function Block({ bike }) {
    
    const[visableDetail, setVisableDetail] = useState(false)

    const ButtonTwo = styled(Button)({
        fontSize: 14,
        color: '#042177',
        borderColor: '#042177',
        marginTop: '23px',
        '&:hover': {
            borderColor: '#00123A',
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: '#00123A',
            boxShadow: 'none',
        },
    })
    return (
        <>
            <div className="containerBlock">
                <div className="icon">
                    {bike.status === 'new' && <img src={newIcon} alt="" height='30px' width='30px' />}
                    {bike.status === 'in_progress' && <img src={inProgress} alt="" height='30px' width='30px' />}
                    {bike.status === 'done' && <img src={done} alt="" height='30px' width='30px' />}
                </div>  
                <div className="description">
                    <p><b>ФИО арендатора:</b> {bike.ownerFullName} </p>
                    <p><b>Описание:</b> {bike.description}</p>
                    <p><b>Приметы:</b> {bike.resolution}</p>
                    <p><b>Тип велосипеда:</b> {bike.type === "general" ? "обычный" : "спортивный"}</p>
                    <p><b>Цвет:</b> {bike.color}</p>
                    <p><b>Дата кражи:</b> {bike.date}</p>
                </div>
                <ButtonTwo variant="outlined" size="small" onClick={() => setVisableDetail(true)}>Подробнее</ButtonTwo>
            </div>
            {visableDetail && <DetailedBlock bike={bike} setVisableDetail={setVisableDetail } />}
    
        </>
    )
}