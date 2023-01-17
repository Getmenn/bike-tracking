import { useFormik } from 'formik';
import * as yup from 'yup'
import './componentsHeader.scss'
import { loginApi } from '../../API/loginApi';
import { useDispatch} from "react-redux";
import { addOfficer } from '../../Redux/firstReducer';
import { useNavigate } from 'react-router-dom';
import { ButtonTwo } from '../../button/Button';

export default function Login() {

    const navigate = useNavigate();

    async function onSubmitFn(values) { 
        
        await loginApi.signIn(values)

        if (localStorage.getItem('token') !== null) {
            navigate('/', { state: { message: "Reload main", data: 'login'}})
        }
        else {
            alert('Email или логин не верны')
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string().required('Обязательное поле').email(),
            password: yup.string().required('Обязательное поле')
        }),
        onSubmit: onSubmitFn
    })

    

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="login">
                <label>Email</label>
                <input type="text" id="email" name="email" className={`input ${formik.errors.email && formik.touched.email ? 'Error' : null}`} onChange={formik.handleChange}/>
                {formik.errors.email && formik.touched.email && (<div className='messageError'>{formik.errors.email}</div>)}
                <label>Пароль</label>
                <input type="password" id="password" name="password" className={`input ${formik.errors.password && formik.touched.password ? 'Error' : null}`}  onChange={formik.handleChange}/>
                {formik.errors.password && formik.touched.password && (<div className='messageError'>{formik.errors.password}</div>)}
                
                <ButtonTwo variant="outlined" size="small" type='submit'>Войти</ButtonTwo>
            </form>
            <div onClick={() => {
                navigate('/')
            }} className='overlay' />
        </>
    )
}