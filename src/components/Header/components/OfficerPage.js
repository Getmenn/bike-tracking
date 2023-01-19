import { useEffect, useState } from "react";
import { ButtonTwo } from "../../button/Button";
import { officerApi } from "../../API/officerApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux/es/exports'
import Divider from '@mui/material/Divider';

export const OfficerPage = () => {

    const navigate = useNavigate();
    const {officers} = useSelector(state => state.main)
    const location = useLocation();
    const [officer, setOfficer] = useState({})
    const [checkbox, setCheckbox] = useState(false)

    const {id} = useParams()
    const info = location.state.message !== 'officer' ? true : false
   
    useEffect(() => {
        getOfficer()
    }, [location])
    
    const getOfficer = async () => {
        if (location.state.message === 'User') {
            setOfficer(JSON.parse(localStorage.getItem('user')))
            setCheckbox(officer.checked)
        }
        else {
            let officerTime = Object(...officers.filter(officer => officer._id === id))
            if (officers.length === 0) {
                officerTime = await officerApi.getOfficer(id)
            }
            delete officerTime.password
            setOfficer(officerTime)
            setCheckbox(officerTime.checked)
        }   
    }

    const handleChange = (event) => {
        const value = event.target.value
        switch (event.currentTarget.id) {
            case 'firstName':
                officer.firstName = value;
                break;
            case 'lastName':
                officer.lastName = value;
                break;
            case 'approved':
                setCheckbox(!checkbox)
                officer.approved = info ? officer.approved : checkbox;
                break;
            case 'password':
                officer.password = value;
                break;
            default:
                break;
        }   
    }

    const handleSubmit = async() => {
        await officerApi.editOfficer(officer._id, officer)
        navigate(info ? '/' : '/officers', { state: { message: "Reload" }})
    }

    return (
        <>
            <div className="officerPage">
                <div className="exit" onClick={() => {
                    navigate(info ? '/' : '/officers')
                }}><h3><b>X</b></h3></div>
                {info && <h2>Профиль</h2>}
                <p className="fio">
                    <input type="text" defaultValue={officer.firstName} id='firstName' onChange={(e) => handleChange(e)} readOnly={info} />
                    <input type="text" defaultValue={officer.lastName} id='lastName' onChange={(e) => handleChange(e)} readOnly={info}/>
                </p>
                <p>
                    Email: {officer.email}
                </p>
                <p>
                    Одобрен:  
                    <input type="checkbox"  checked={officer.approved || false} id='approved' onChange={(e) => handleChange(e)} readOnly={info}/>
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
                navigate(info ? '/' : '/officers')
            }} className='overlay' />
        </>
    )
}