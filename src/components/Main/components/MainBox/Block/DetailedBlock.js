import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React, {useState} from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import './block.scss'
import {employeeMassiv} from '../../../../API/employeeMassiv'

export default function DetailedBlock({ bike, setVisableDetail }) {

    const [done, setDone] = useState(false);
    const massiveEployee = employeeMassiv.component

    const ButtonTwo = styled(Button)({
        fontSize: 17,
        color: '#042177',
        borderColor: '#042177',
        marginTop: '15px',
        '&:hover': {
            borderColor: '#00123A',
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: '#00123A',
            boxShadow: 'none',
        },
    })

    const onSubmitFn = (values) => {
        console.log('Form Data \n', values)
    }


    const formik = useFormik({
        initialValues: { 
            status: bike.status,
            licenseNumber: bike.licenseNumber,
            type: bike.type,
            ownerFullName: bike.ownerFullName,
            createdAt: bike.createdAt,
            updatedAt: bike.updatedAt,
            color: bike.color,
            date: bike.date,
            officer: bike.officer,
            description: bike.description,
            resolution: bike.resolution,
            //clientId: bike.clientId
        },
        validationSchema: yup.object({
            //email: yup.string().required('Required').email('Invalid email add'),
            status: yup.string(), //статус системное
            licenseNumber: yup.number('Только цифры').positive('Только положительные цифры').required('Обязательное поле'),/* .length(7,'Номер лицензии состоит из 7 цифр') добавить длину*/
            type: yup.string().required('Обязательное поле'),
            ownerFullName: yup.string().required('Обязательное поле'),
            //clientId: yup.string(), //системное//  clientId, уникальный для каждого студента
            createdAt: yup.date(), //автоматом //Дата создания сообщения
            updatedAt: yup.date(), //системное//Дата последнего обновления сообщения
            color: yup.string(),
            date: yup.date(), //дата кражи
            officer: yup.string(), //Ответственный сотрудник
            description: yup.string(), //название
            resolution: yup.string(), //комментарий
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
                    <select /* as="select" */ id="type" name="type" className={`select ${formik.errors.type && formik.touched.type ? 'Error' : null}`} onChange={formik.handleChange} value={formik.values.type}>
                        <option value="general">Обычный</option>
                        <option value="sport">Спортивный</option>
                    </select>
                    {formik.errors.type && formik.touched.type && (<div className='messageError'>{formik.errors.type}</div>)}

                    <label>ФИО арендатора</label>
                    <input type="text" id="ownerFullName" name="ownerFullName" className={`input ${formik.errors.ownerFullName && formik.touched.ownerFullName ? 'Error' : null}`} onChange={formik.handleChange} value={formik.values.ownerFullName}/>
                    {formik.errors.ownerFullName && formik.touched.ownerFullName && (<div className='messageError'>{formik.errors.ownerFullName}</div>)}

                    <label>Дата создания</label>
                    <input type="date" id="createdAt" name="createdAt" className='input'  value={formik.values.createdAt} readOnly/>
                    
                    <label>Дата последнего обновления</label>
                    <input type="date" id="updatedAt" name="updatedAt" className='input' value={formik.values.updatedAt} readOnly />
                    
                    <ButtonTwo variant="outlined" size="medium" type='submit'/*  onClick={handleSubmit} */>Изменить</ButtonTwo>
                </div>

                <div className='detailBlock'> {/* второй */}
                    <label>Цвет велосипеда</label>
                    <input type="text" id="color" name="color" className='input' value={formik.values.color} onChange={formik.handleChange} />
                    {/* {formik.errors.color && formik.touched.color && (<div className='messageError'>{formik.errors.color}</div>)} */}

                    <label>Дата кражи</label>
                    <input type="date" id="date" name="date" className='input' value={formik.values.date} onChange={formik.handleChange} />
                    
                    <label>Ответственный сотрудник</label>
                    <select type="text" id="officer" name="officer" className='input' value={formik.values.officer} onChange={formik.handleChange} >
                        {Object.values(massiveEployee).map(officer => {
                            if (officer.approved === 'true') {
                                return <option key={officer.email}>{officer.firstName + ' ' + officer.lastName}</option>
                            }}
                            )}
                    </select>
                                            
                    <label>Комментарий</label>
                    <input type="text" id="description" name="description" className='input' value={formik.values.description} onChange={formik.handleChange} />
                    
                    {done && <>
                        <label>Завершающий комментарий</label>
                        <input type="text" id="resolution" name="resolution" className='input' value={formik.values.resolution} onChange={formik.handleChange} />
                    </>} {/* //Завершающий комментарий */}
                </div>
                
                
               

            </form>
            <div onClick={() => setVisableDetail(false)} className='overlay' />
        </>
    )
}