import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React, { useMemo } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { reportApi } from '../../../API/reportsApi';
import { loginApi } from '../../../API/loginApi';
import { employeeMassiv } from '../../../API/employeeMassiv';

export default function Report({ setVisable }) {

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

    const token = useMemo(() => localStorage.getItem('token'), [])
    const officerID = useMemo(() => localStorage.getItem('officerID'), [])

    const onSubmitFn = (values) => {
        //console.log(values);
        //console.log(values);
        if (token !== null) {
            const transormValues = { ...values, officer: officerID }
            //console.log(transormValues);
            reportApi.newReport(transormValues) //не работает, но должно
        }
        else {
            const transormValues = {...values, clientId : '54643bb2-7e2d-11ed-a1eb-0242ac120002'}
            reportApi.newReportNoLogin(transormValues)
        }
        setVisable(false)
        //console.log('Form Data \n', values)
    }

    const time = () => { //временно
        //console.log(employeeMassiv.component[0]);
        loginApi.signIn(employeeMassiv.component[1])
        console.log('ok');
    }

    //time();

    //console.log(officerOrClientId);
    const formik = useFormik({
        initialValues: { 
            licenseNumber: '',
            type: '',
            ownerFullName: '',
            color: '',
            date: '',  
            description: '',
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
            type: yup.string(),
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

   /*  const handleTask = () => {
        console.log(formik);
    } */

    return (
        <>  
            <form onSubmit={formik.handleSubmit} className="report">
                <div className="exit" onClick={() => setVisable(false)}><h3><b>X</b></h3></div>
                <label>Номер лицензии</label>
                <input type="number"  id="licenseNumber" name="licenseNumber" className={`input ${formik.errors.licenseNumber && formik.touched.licenseNumber ? 'Error' : null}`} onChange={formik.handleChange} value={formik.values.licenseNumber}/>
                {formik.errors.licenseNumber && formik.touched.licenseNumber && (<div className='messageError'>{formik.errors.licenseNumber}</div>)}

                <label>ФИО арендатора</label>
                <input type="text" id="ownerFullName" name="ownerFullName" className={`input ${formik.errors.ownerFullName && formik.touched.ownerFullName ? 'Error' : null}`} onChange={formik.handleChange} value={formik.values.ownerFullName}/>
                {formik.errors.ownerFullName && formik.touched.ownerFullName && (<div className='messageError'>{formik.errors.ownerFullName}</div>)}

                <label>Тип велосипеда</label>
                <select /* as="select" */ id="type" name="type" className='select' onChange={formik.handleChange} value={formik.values.type}>
                    <option value="general">Обычный</option>
                    <option value="sport">Спортивный</option>
                </select>
                
                <label>Цвет велосипеда</label>
                <input type="text" id="color" name="color" className='input' onChange={formik.handleChange}/>
                {/* {formik.errors.color && formik.touched.color && (<div className='messageError'>{formik.errors.color}</div>)} */}

                <label>Дата кражи</label>
                <input type="date" id="date" name="date" className='input' onChange={formik.handleChange}/>
                
                {/* <label>Ответственный сотрудник</label>
                <input type="text" id="officer" name="officer" className='input' /> */}
                                        
                <label>Комментарий</label>
                <input type="text" id="description" name="description" className='input' onChange={formik.handleChange}/>
                
               {/*  <label>Дополнительный комментарий</label>
                <input type="text" id="resolution" name="resolution" className='input' /> */}
                
                <ButtonTwo variant="outlined" size="medium" type='submit' /* onClick={handleTask} */ >Добавить</ButtonTwo>

            </form>
            <div onClick={() => setVisable(false)} className='overlay' />
        </>
    )
}