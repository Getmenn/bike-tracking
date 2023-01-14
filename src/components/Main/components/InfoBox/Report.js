import React, { useEffect, useMemo, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { reportApi } from '../../../API/reportsApi';
import { ButtonThree } from '../../../button/Button';
import { officerApi } from '../../../API/officerApi';
import { useNavigate } from 'react-router-dom';

export default function Report() {

    const token = useMemo(() => localStorage.getItem('token'), [])
    const [massiveWorkers, setMassiveWorkers] = useState([])
    const navigate = useNavigate();

    const onSubmitFn = (values) => {
        if (token !== null) {
            reportApi.newReport(values) 
            navigate('/', { state: { message: "Reload main" }})
        }
        else {
            const transormValues = {...values, clientId : '54643bb2-7e2d-11ed-a1eb-0242ac120002'}
            reportApi.newReportNoLogin(transormValues)
            navigate('/')
        }   
    }

    useEffect(() => {
        if (token !== null) {
            getAllOfficers()
        }
    }, [])

    const getAllOfficers = async () => {
        setMassiveWorkers(await officerApi.getAllOfficers())
    }

    const formik = useFormik({
        initialValues: { 
            licenseNumber: '',
            type: 'general',
            ownerFullName: '',
            color: '',
            date: '',  
            description: '',
            officer: ''
            /* officer: officerID,
            clientId : '54643bb2-7e2d-11ed-a1eb-0242ac120002' */
            //resolution: ''
            //добавить поле ответственный сотрудник для авторизованных пользователей
        },
        validationSchema: yup.object({
            //email: yup.string().required('Required').email('Invalid email add'),
            //системное status: yup.string(), //статус 
            licenseNumber: yup.number('Только цифры').positive('Только положительные цифры').required('Обязательное поле'),/* .length(7,'Номер лицензии состоит из 7 цифр') добавить длину*/
            ownerFullName: yup.string().required('Обязательное поле'),
            type: yup.string().required('Обязательное поле'),
            //системное clientId: yup.string().required('Required'), //  clientId, уникальный для каждого студента
            //автоматом createdAt: yup.date().required('Required'),  //Дата создания сообщения
            //системное updatedAt: yup.date(), //Дата последнего обновления сообщения
            color: yup.string(),
            date: yup.date(), //дата кражи
            // добавить в виде селект с существующими сотрудниками officer: yup.string(), //Ответственный сотрудник 
            description: yup.string(), //название
            //resolution: yup.string(), //комментарий
        }),
        onSubmit: onSubmitFn
    })

    return (
        <>  
            <form onSubmit={formik.handleSubmit} className="report">
                <div className="exit" onClick={() => {
                    navigate('/')
                }}><h3><b>X</b></h3></div>
                <label>Номер лицензии</label>
                <input type="number"  id="licenseNumber" name="licenseNumber" className={`input ${formik.errors.licenseNumber && formik.touched.licenseNumber ? 'Error' : null}`} onChange={formik.handleChange} value={formik.values.licenseNumber}/>
                {formik.errors.licenseNumber && formik.touched.licenseNumber && (<div className='messageError'>{formik.errors.licenseNumber}</div>)}

                <label>ФИО арендатора</label>
                <input type="text" id="ownerFullName" name="ownerFullName" className={`input ${formik.errors.ownerFullName && formik.touched.ownerFullName ? 'Error' : null}`} onChange={formik.handleChange} value={formik.values.ownerFullName}/>
                {formik.errors.ownerFullName && formik.touched.ownerFullName && (<div className='messageError'>{formik.errors.ownerFullName}</div>)}

                <label>Тип велосипеда</label>
                <select id="type" name="type" className={`select ${formik.errors.type && formik.touched.type ? 'Error' : null}`} onChange={formik.handleChange} value={formik.values.type}>
                    <option value="general">Обычный</option>
                    <option value="sport">Спортивный</option>
                </select>
                {formik.errors.type && formik.touched.type && (<div className='messageError'>{formik.errors.type}</div>)}
                
                <label>Цвет велосипеда</label>
                <input type="text" id="color" name="color" className='input' onChange={formik.handleChange}/>

                <label>Дата кражи</label>
                <input type="date" id="date" name="date" className='input' onChange={formik.handleChange}/>
                
                <label>Комментарий</label>
                <input type="text" id="description" name="description" className='input' onChange={formik.handleChange} />
                
                {token !== null &&
                    <>
                        <label>Ответственный сотрудник</label>
                        <select type="text" id="officer" name="officer" className='input' value={formik.values.officer} onChange={formik.handleChange}>
                            {formik.values.officer === '' && <option>Выберете ответственного</option>}
                            {massiveWorkers !== [] && massiveWorkers.map(officer => {
                                    if (officer.approved) {
                                        return <option key={officer._id} value={officer._id}>{officer.firstName + ' ' + officer.lastName}</option>
                                    }
                                })
                            }     
                        </select>
                    </>
                }
                
                <ButtonThree size="medium" variant="outlined" type='submit'>Добавить</ButtonThree>

            </form>
            <div onClick={() => {
                navigate('/')
            }} className='overlay' />
        </>
    )
}