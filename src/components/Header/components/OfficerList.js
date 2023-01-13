import './componentsHeader.scss'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from 'react';
import { officerApi } from '../../API/officerApi';
import { useDispatch } from 'react-redux'
import { OfficerPage } from './OfficerPage';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { addAllOfficers } from '../../Redux/firstReducer'


export default function OfficerList() {
    
    const [officers, setOfficers] = useState([])
    //const [visableOfficer, setVisableOfficer] = useState(false)
    //const [officerInfo, setOfficerInfo] = useState({})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    //console.log(location);

    
    
    useEffect(() => {
        const getOfficers = async () => {
            console.log('getOfficers');
            const officersMass = await officerApi.getAllOfficers();
            setOfficers(await officersMass)
            dispatch(addAllOfficers(officersMass))
        }
        getOfficers()
    }, [location.state]) //присмтреться


    const handleDelet = async(id, name, lastName) => {
        await officerApi.deleteOfficer(id);
        const officersMass = await officerApi.getAllOfficers();
        setOfficers(officersMass)
        alert(`Сотрудник ${name} ${lastName} удален`);
    }

    
    const handleVisableInfo = ( officer ) => {
        navigate(`/officers/${officer._id}`, { state: { message: "officer" }})
        //setOfficerInfo(officer)
    }
    
    
    return (
        <>
            <div className='officerList'>
                <div className="exit" onClick={() => {
                    navigate('/')
                }}><h3><b>X</b></h3></div>
                
                {officers.map((officer) => 
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