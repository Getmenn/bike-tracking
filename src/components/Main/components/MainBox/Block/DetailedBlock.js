import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import * as yup from 'yup'
import './block.scss'
import { ButtonThree } from '../../../../button/Button'
import { officerApi } from '../../../../API/officerApi'
import { reportApi } from '../../../../API/reportsApi'
import { useNavigate, useParams } from "react-router-dom";
import { addAllOfficers } from '../../../../Redux/firstReducer'

export default function DetailedBlock() {

    const [done, setDone] = useState(false);
    const [massiveWorkers, setMassiveWorkers] = useState([])
    const dispatch = useDispatch()
    const { reports } = useSelector(state => state.reports)
    const { officers } = useSelector(state => state.main)
    
    const navigate = useNavigate();
    const {id} = useParams()
    const bike = Object(...reports.filter(report => report._id === id))

    useEffect(() => {
        if (officers.length === 0) {
            getAllOfficers()
        }
        else {
            setMassiveWorkers(officers)
        } 
    }, [])

    const getAllOfficers = async () => {
        const officersMass = await officerApi.getAllOfficers()
        setMassiveWorkers(officersMass)
        dispatch(addAllOfficers(officersMass))
    }

    async function onSubmitFn (value) {
        await reportApi.editReport(value._id, value)
        navigate('/', { state: { message: "Reload main" }})
    }

    const formik = useFormik({
        initialValues: { 
            status: bike.status,
            licenseNumber: bike.licenseNumber,
            type: bike.type,
            ownerFullName: bike.ownerFullName,
            createdAt: bike.createdAt,
            updatedAt: bike.updatedAt === null ? bike?.createdAt : bike?.updatedAt,
            color: bike.color || '',
            date: bike.date || '',
            officer: bike.officer || '',
            description: bike.description,
            resolution: bike.resolution || '',
            _id: bike._id
            //clientId: bike.clientId
        },
        validationSchema: yup.object({
            //email: yup.string().required('Required').email('Invalid email add'),
            status: yup.string(), //статус системное
            licenseNumber: yup.number('Только цифры').positive('Только положительные цифры').required('Обязательное поле'), //из 7 цифр 
            type: yup.string().required('Обязательное поле'),
            ownerFullName: yup.string().required('Обязательное поле'),
            //clientId: yup.string(), //системное//  clientId, уникальный для каждого студента
            createdAt: yup.date(), //автоматом //Дата создания сообщения
            updatedAt: yup.date(), //системное//Дата последнего обновления сообщения
            //color: yup.string(),
            //date: yup.date(), //дата кражи
            //officer: yup.string(), //Ответственный сотрудник
            //description: yup.string(), //название
            //resolution: yup.string(), //комментарий 
        }),
        onSubmit: onSubmitFn
    })

    
    const handleSelect = (event) => {
        setDone(false)
        if (event.target.value === "done") {
            setDone(true)
        }
    }

    return (
        <>  
            <form onSubmit={formik.handleSubmit} className="detail">
                <div className='detailBlock'>
                    <label>Статус</label>
                    <select type="number" id="status" name="status" className={`input ${formik.errors.licenseNumber && formik.touched.licenseNumber ? 'Error' : null}`} onChange={event => {formik.handleChange(event); handleSelect(event)}} value={formik.values.status}>
                        <option value="new" >Новое</option>
                        <option value="in_progress" >В работе</option>   
                        <option value="done">Закрытое</option>  
                    </select>
                    {formik.errors.status && formik.touched.status && (<div className='messageError'>{formik.errors.status}</div>)}

                    <label>Номер лицензии</label>
                    <input type="number"  id="licenseNumber" name="licenseNumber" className={`input ${formik.errors.licenseNumber && formik.touched.licenseNumber ? 'Error' : null}`} onChange={formik.handleChange} value={formik.values.licenseNumber}/>
                    {formik.errors.licenseNumber && formik.touched.licenseNumber && (<div className='messageError'>{formik.errors.licenseNumber}</div>)}

                    <label>Тип велосипеда</label>
                    <select id="type" name="type" className={`select ${formik.errors.type && formik.touched.type ? 'Error' : null}`} onChange={formik.handleChange} value={formik.values.type}>
                        <option value="general">Обычный</option>
                        <option value="sport">Спортивный</option>
                    </select>
                    {formik.errors.type && formik.touched.type && (<div className='messageError'>{formik.errors.type}</div>)}

                    <label>ФИО арендатора</label>
                    <input type="text" id="ownerFullName" name="ownerFullName" className={`input ${formik.errors.ownerFullName && formik.touched.ownerFullName ? 'Error' : null}`} onChange={formik.handleChange} value={formik.values.ownerFullName}/>
                    {formik.errors.ownerFullName && formik.touched.ownerFullName && (<div className='messageError'>{formik.errors.ownerFullName}</div>)}

                    <label>Дата создания</label>
                    <input type="date" id="createdAt" name="createdAt" className='input'  value={formik.values.createdAt?.split('T')[0]} readOnly/>
                    
                    <label>Дата последнего обновления</label>
                    <input type="date" id="updatedAt" name="updatedAt" className='input' value={formik.values.updatedAt?.split('T')[0]} readOnly />
                    
                    <ButtonThree variant="outlined" size="medium" type='submit'>Изменить</ButtonThree>
                </div>

                <div className='detailBlock'>  {/* второй  блок*/}
                    <label>Цвет велосипеда</label>
                    <input type="text" id="color" name="color" className='input' value={formik.values.color || ''} onChange={formik.handleChange} />

                    <label>Дата кражи</label>
                    <input type="date" id="date" name="date" className='input' value={formik.values.date?.split('T')[0] || ''} onChange={formik.handleChange} />
                    
                    <label>Ответственный сотрудник</label>
                    <select type="text" id="officer" name="officer" className='input' value={formik.values.officer || ''} onChange={formik.handleChange}>
                        {formik.values.officer === '' && <option value=''>Выберете ответственного</option>}
                        {massiveWorkers !== [] && massiveWorkers.map(officer => {
                                if (officer.approved) {
                                    return <option key={officer._id} value={officer._id}>{officer.firstName + ' ' + officer.lastName}</option>
                                }
                            })
                        }     
                    </select> 
                                            
                    <label>Комментарий</label>
                    <input type="text" id="description" name="description" className='input' value={formik.values.description  || ''} onChange={formik.handleChange} />
                    
                    {done && <>
                        <label>Завершающий комментарий</label>
                        <input type="text" id="resolution" name="resolution" className='input' value={formik.values.resolution} onChange={formik.handleChange} required/>
                    </>}
                </div>
                
                
                <div className="exit" onClick={() => {
                    navigate('/')
                }}><h3><b>X</b></h3></div> 
            </form>
            <div onClick={() => {
                navigate('/')
            }} className='overlay' />
        </>
    ) 
}