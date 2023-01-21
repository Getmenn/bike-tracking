import { useFormik } from 'formik';
import * as yup from 'yup'
import './componentsHeader.scss'
import { officerApi } from '../../API/officerApi';
import { ButtonTwo } from '../../button/Button';
import { useNavigate } from 'react-router-dom';

export default function Registration() {

    const navigate = useNavigate();

    async function onSubmitFn(values) { 
        const result = await officerApi.newOfficer(values) 
        if (result  !== null) {
            navigate('/', { state: { message: "Reload officers" }})
        } else {
            formik.errors.email = true
            formik.touched.email = true
            formik.errors.email = 'Пользователь с данным email уже существует'
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        },
        validationSchema: yup.object({
            email: yup.string().required('Обязательное поле').email(),
            password: yup.string().required('Обязательное поле'),
            firstName: yup.string(),
            lastName: yup.string(),
        }),
        onSubmit: onSubmitFn
    })

    

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="registration">
                <div className="exit" onClick={() => {
                    navigate('/')
                }}><h3><b>X</b></h3></div>
                <label>Имя</label>
                <input type="text" id="firstName" name="firstName" className='input' onChange={formik.handleChange} />
                
                <label>Фамилия</label>
                <input type="text" id="lastName" name="lastName" className='input' onChange={formik.handleChange}/>
                
                <label>Email</label>
                <input type="text" id="email" name="email" className={`input ${formik.errors.email && formik.touched.email ? 'Error' : null}`} onChange={formik.handleChange}/>
                {formik.errors.email && formik.touched.email && (<div className='messageError'>{formik.errors.email}</div>)}
                
                <label>Пароль</label>
                <input type="password" id="password" name="password" className={`input ${formik.errors.password && formik.touched.password ? 'Error' : null}`}  onChange={formik.handleChange}/>
                {formik.errors.password && formik.touched.password && (<div className='messageError'>{formik.errors.password}</div>)}
                
                <ButtonTwo variant="outlined" size="small" type='submit'>Регистрация</ButtonTwo>
            </form>
            <div onClick={() => {
                navigate('/')
            }} className='overlay' />
        </>
    )
}