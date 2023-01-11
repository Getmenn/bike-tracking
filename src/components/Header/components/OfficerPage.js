import { useEffect, useState } from "react";
import { ButtonTwo } from "../../button/Button";
import { officerApi } from "../../API/officerApi";
import { useNavigate } from "react-router-dom";

export const OfficerPage = ({ officer, setVisableOfficer, info = false }) => {

    const [officerS, setOfficerS] = useState({})
    const navigate = useNavigate();
    
    useEffect(() => {
        if (info) {
            loadOfficer()
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
    }

    const handleChange = (event) => {
        const value = event.target.value
        switch (event.currentTarget.id) {
            case 'firstName':
                setOfficerS({...officerS, 'firstName': value })
                break;
            case 'lastName':
                setOfficerS({...officerS, 'lastName': value })
            break;
            case 'approved':
                setOfficerS({...officerS, 'approved': event.target.checked })
                break;
            case 'password':
                setOfficerS({...officerS, 'password': value })
                break;
            default:
                break;
        }   
    }

    const handleSubmit = async() => {
        await officerApi.editOfficer(officer._id, officerS)
        setVisableOfficer(false)
        navigate(info ? '/' : 'officers')
    }

    return (
        <>
            <div className="officerPage">
                <div className="exit" onClick={() => {
                    navigate(info ? '/' : 'officers')
                    setVisableOfficer(false)
                }}><h3><b>X</b></h3></div>
                
                <p className="fio">
                    <input type="text" defaultValue={officerS.firstName} id='firstName' onChange={(e) => handleChange(e)} readOnly={info} />
                    <input type="text" defaultValue={officerS.lastName} id='lastName' onChange={(e) => handleChange(e)} readOnly={info}/>
                </p>
                <p>
                    Email: {officerS.email}
                </p>
                <p>
                    Одобрен:  
                    <input type="checkbox" checked={officerS.approved || false} id='approved' onChange={(e) => handleChange(e)} readOnly={info}/>
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
                setVisableOfficer(false)
            }} className='overlay' />
        </>
    )
}