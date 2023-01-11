import './componentsHeader.scss'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from 'react';
import { officerApi } from '../../API/officerApi';
import { OfficerPage } from './OfficerPage';
import { Route, Routes, useNavigate } from 'react-router-dom';


export default function OfficerList({ setVisableList }) {
    
    const [officers, setOfficers] = useState([])
    const [visableOfficer, setVisableOfficer] = useState(false)
    const [officerInfo, setOfficerInfo] = useState({})
    const navigate = useNavigate();
    
    useEffect(() => {
        const getOfficers = async() => {
            const officersMass = await officerApi.getAllOfficers();
            setOfficers(officersMass)
        }
        getOfficers()
    }, [visableOfficer])

    const handleDelet = async(id, name, lastName) => {
        await officerApi.deleteOfficer(id);
        const officersMass = await officerApi.getAllOfficers();
        setOfficers(officersMass)
        alert(`Сотрудник ${name} ${lastName} удален`);
    }

    
    const handleVisableInfo = ( officer ) => {
        navigate(`/officers/${officer._id}`)
        setVisableOfficer(true)
        setOfficerInfo(officer)
    }
    
    
    return (
        <>
            <div className='officerList'>
                <div className="exit" onClick={() => {
                    navigate('/')
                    setVisableList(false)
                }}><h3><b>X</b></h3></div>
                
                {officers.map((officer) => 
                    <div className="officerItem" key={officer._id}>
                        <label htmlFor="officerList">{officer.firstName + ' ' + officer.lastName}</label>
                        <InfoIcon titleAccess='Информация' onClick={() => handleVisableInfo(officer)} />
                        <PersonRemoveIcon titleAccess='Удалить' onClick={() => handleDelet(officer._id, officer.firstName, officer.lastName)} />
                    </div>
                )}
            </div>
             <Routes>
                {visableOfficer && <Route path=':id' element={<OfficerPage officer={officerInfo} setVisableOfficer={setVisableOfficer}/>} />}
            </Routes>  
            {/* {visableOfficer && <OfficerPage officer={officerInfo} setVisableOfficer={setVisableOfficer} />} */}
            {/* {visableOfficer && <Route to='/officers/:id' element={<OfficerPage officer={officerInfo} setVisableOfficer={setVisableOfficer}/>} />} */}
            <div onClick={() => {
                navigate('/')
                setVisableList(false)
            }} className='overlay' />
        </>
    )
}