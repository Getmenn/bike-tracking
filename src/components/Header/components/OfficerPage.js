import { useEffect, useState } from "react";
import { ButtonTwo } from "../../button/Button";
import { officerApi } from "../../API/officerApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux/es/exports'

export const OfficerPage = () => {

    const [officerS, setOfficerS] = useState({})
    const navigate = useNavigate();
    const {officers} = useSelector(state => state.main)

    const location = useLocation();
    console.log(location.state.message) 
    console.log(officers);

    const {id} = useParams()
    const info = JSON.parse(localStorage.getItem('user')).id === id ? true : false
    const officer = Object(...officers.filter(officer => officer._id === id ))//при первом заходе в профиль данных нет 
    delete officer.password

    useEffect(() => {
        if(officers === []){
            officer = JSON.parse(localStorage.getItem('user'))
            delete officer.password
            console.log(officer);
        }
    },[])

    /*
    useEffect(() => {
        if (info) {
            //loadOfficer()
        }
        else {
            delete officer.password //сделано из-за хеширования пароля на сервере
            setOfficerS(officer)
        }        
    }, [])
    
    const loadOfficer = async () => {
        const officerMass = await officerApi.getOfficer(officer.id)
        delete officerMass.password //сделано из-за хеширования пароля на сервере
        setOfficerS(officerMass)
    }*/

    const handleChange = (event) => {
        const value = event.target.value
        switch (event.currentTarget.id) {
            case 'firstName':
                officer.firstName = value;
                //setOfficerS({...officer, 'firstName': value })
                break;
            case 'lastName':
                officer.lastName = value;
                //setOfficerS({...officer, 'lastName': value })
            break;
            case 'approved':
                officer.approved = event.target.checked;
                //setOfficerS({...officer, 'approved': event.target.checked })
                break;
            case 'password':
                officer.password = value;
                //setOfficerS({...officer, 'password': value })
                break;
            default:
                break;
        }   
    }

    const handleSubmit = async() => {
        await officerApi.editOfficer(officer._id, officer)
        navigate(info ? '/' : 'officers')
    }

    return (
        <>
            <div className="officerPage">
                <div className="exit" onClick={() => {
                    navigate(info ? '/' : 'officers')
                }}><h3><b>X</b></h3></div>
                
                <p className="fio">
                    <input type="text" defaultValue={officer.firstName} id='firstName' onChange={(e) => handleChange(e)} readOnly={info} />
                    <input type="text" defaultValue={officer.lastName} id='lastName' onChange={(e) => handleChange(e)} readOnly={info}/>
                </p>
                <p>
                    Email: {officer.email}
                </p>
                <p>
                    Одобрен:  
                    <input type="checkbox" checked={officer.approved || false} id='approved' onChange={(e) => handleChange(e)} readOnly={info}/>
                </p>
                {info === false &&
                    <p>
                        Пароль:
                        <input type="password" placeholder="Новый пароль" id='password' onChange={(e) => handleChange(e)}/>
                    </p>
                }
                {info === false && <ButtonTwo size='small' variant="outlined" onClick={() => handleSubmit()}>Сохранить</ButtonTwo>}
            </div> 
            <div onClick={() => {
                navigate(info ? '/' : 'officers')
            }} className='overlay' />
        </>
    )
}