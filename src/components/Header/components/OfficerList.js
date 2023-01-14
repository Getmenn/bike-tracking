import './componentsHeader.scss'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from 'react';
import { officerApi } from '../../API/officerApi';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { addAllOfficers } from '../../Redux/firstReducer'


export default function OfficerList() {
    
    const [officerState, setOfficers] = useState([])
    const {officers} = useSelector(state => state.main)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (officers.length === 0) {
            getOfficers()
        } else {
            setOfficers(officers)
        }
    },[])
    
    useEffect(() => { //присмтреться
        if (location.state?.message === 'Reload') {
            getOfficers()
        }
    }, [location.state]) //присмтреться

    const getOfficers = async () => {
        const officersMass = await officerApi.getAllOfficers();
        setOfficers(await officersMass)
        dispatch(addAllOfficers(officersMass))
    }


    const handleDelet = async (id, name, lastName) => {
        const result = window.confirm(`Хотите удалить сотрудника ${name} ${lastName} из базы данных?`);
        if (result) {
            await officerApi.deleteOfficer(id);
            const officersMass = await officerApi.getAllOfficers();
            setOfficers(officersMass)
        }
    }

    
    const handleVisableInfo = ( officer ) => {
        navigate(`/officers/${officer._id}`, { state: { message: "officer" }})
    }
    
    
    return (
        <>
            <div className='officerList'>
                <div className="exit" onClick={() => {
                    navigate('/')
                }}><h3><b>X</b></h3></div>
                
                {officerState.map((officer) => 
                    <div className="officerItem" key={officer._id}>
                        <label htmlFor="officerList">{officer.firstName + ' ' + officer.lastName}</label>
                        <InfoIcon titleAccess='Информация' onClick={() => handleVisableInfo(officer)} />
                        <PersonRemoveIcon titleAccess='Удалить' onClick={() => handleDelet(officer._id, officer.firstName, officer.lastName)} />
                    </div>
                )}
            </div>
            <div onClick={() => {
                navigate('/')
            }} className='overlay' />
        </>
    )
}