import './block.scss'
import newIcon from '../../../../../svg/new.svg'
import inProgress from '../../../../../svg/inProgress.svg'
import done from '../../../../../svg/done.svg'
import delet from '../../../../../svg/delete.svg'
import { reportApi } from '../../../../API/reportsApi';
import { ButtonTwo } from '../../../../button/Button';
import { useNavigate } from 'react-router-dom';



export default function Block({ bike }) {
    
    const navigate = useNavigate();

    const handleDelete = () => {
        const result = window.confirm('Хотите удалить случай кражи из базы данных?');
        if (result) {
            reportApi.deleteReport(bike._id)
            navigate('/', { state: { message: "Reload main" }})
        }       
    }

    return (
        <>
            <div className="containerBlock">
                <div className="icon">
                    {bike.status === 'new' && <img src={newIcon} alt="Новое" height='30px' width='30px'  title='Новое'/>}
                    {bike.status === 'in_progress' && <img src={inProgress} alt="В процессе" height='30px' width='30px' title='В процессе'/>}
                    {bike.status === 'done' && <img src={done} alt="Завершено" height='30px' width='30px' title='Завершено'/>}
                    {bike.status === 'done' &&
                        <img src={delet}
                        alt="Удалить"
                        height='30px'
                        width='30px'
                        style={{ marginLeft: '15px', cursor: 'pointer' }}
                        onClick={handleDelete}
                        title='Удалить' />}
                </div>  
                <div className="description">
                    <p><b>ФИО арендатора:</b> {bike.ownerFullName} </p>
                    <p><b>Описание:</b> {bike.description}</p>
                    <p><b>Тип велосипеда:</b> {bike.type === "general" ? "обычный" : "спортивный"}</p>
                    <p><b>Цвет:</b> {bike.color}</p>
                    <p><b>Дата кражи:</b> {bike.date?.split('T')[0]}</p>
                </div>
                <ButtonTwo variant="outlined" size='small' onClick={() => {
                    navigate(`cases/${bike._id}`, { state: { message: "report" }})
                }}>Подробнее</ButtonTwo>
            </div>
        </>
    )
}