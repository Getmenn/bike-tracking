import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup'
import './componentsHeader.scss'
import { officerApi } from '../../API/officerApi';
import { useDispatch} from "react-redux";
import { addOfficer } from '../../Redux/firstReducer';

export default function Registration({ setVisableRegistration, handleLogin }) {
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

    async function onSubmitFn(values) { 
        const result = await officerApi.newOfficer(values) 
        console.log(result);
        if (result  !== null) {
            setVisableRegistration(false)
            console.log('closed');
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
            //clientId: '54643bb2-7e2d-11ed-a1eb-0242ac120002'
        },
        validationSchema: yup.object({
            //email: yup.string().required('Required').email('Invalid email add'),
            //системное status: yup.string(), //статус 
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
                <div className="exit" onClick={() => setVisableRegistration(false)}><h3><b>X</b></h3></div>
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
                
                <ButtonTwo variant="outlined" size="small" type='submit'>Войти</ButtonTwo>
            </form>
            <div onClick={() => setVisableRegistration(false)} className='overlay' />
        </>
    )
}