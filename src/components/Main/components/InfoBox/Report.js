import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React from 'react'
import { useFormik } from 'formik'
import  * as yup from 'yup'

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

    const onSubmitFn = (values) => {
        console.log('Form Data \n', values)
    }


    const formik = useFormik({
        initialValues: { 
            licenseNumber: '',
            type: '',
            ownerFullName: '',
            color: '',
            date: '',
            //officer: '',
            description: '',
            //resolution: ''
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

    return (
        <>  
            <form onSubmit={formik.handleSubmit} className="report">
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
                <input type="text" id="color" name="color" className='input' />
                {/* {formik.errors.color && formik.touched.color && (<div className='messageError'>{formik.errors.color}</div>)} */}

                <label>Дата кражи</label>
                <input type="date" id="date" name="date" className='input' />
                
                {/* <label>Ответственный сотрудник</label>
                <input type="text" id="officer" name="officer" className='input' /> */}
                                        
                <label>Комментарий</label>
                <input type="text" id="description" name="description" className='input' />
                
               {/*  <label>Дополнительный комментарий</label>
                <input type="text" id="resolution" name="resolution" className='input' /> */}
                
                <ButtonTwo variant="outlined" size="medium" type='submit'/*  onClick={handleSubmit} */>Добавить</ButtonTwo>

            </form>
            <div onClick={() => setVisable(false)} className='overlay' />
        </>
    )
}