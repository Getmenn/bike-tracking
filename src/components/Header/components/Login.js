import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup'
import './login.scss'
import { loginApi } from '../../API/loginApi';
import { useDispatch} from "react-redux";
import { addOfficer } from '../../Redux/firstReducer';

export default function Login({ setVisableLogin, handleLogin }) {
    const dispatch = useDispatch(); //диспач
    /* const customers = useSelector(state => state.customers.customers) */

    const ButtonTwo = styled(Button)({
        fontSize: 14,
        color: '#042177',
        borderColor: '#042177',
        marginTop: '23px',
        '&:hover': {
            borderColor: '#00123A',
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: '#00123A',
            boxShadow: 'none',
        },
    })

    async function onSubmitFn (values) { 
        const officer = await loginApi.signIn(values)
        dispatch(addOfficer(officer)) //добавление в редакс активного сотрудника

        if (localStorage.getItem('token') !== null ) {
            setVisableLogin(false)
        }
        else {
            alert('Email или логин не верны')
        }
        //setVisableLogin(false)
        //setVisable(false)
        //console.log('Form Data \n', values)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            //email: yup.string().required('Required').email('Invalid email add'),
            //системное status: yup.string(), //статус 
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
            <div onClick={() => setVisableLogin(false)} className='overlay' />
        </>
    )
}