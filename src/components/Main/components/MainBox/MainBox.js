import './mainBox.scss'
import Block from './Block/Block'
import { useEffect, useState } from 'react'
import { reportApi } from '../../../API/reportsApi'
import { useDispatch} from 'react-redux'
import { addAllReports } from '../../../Redux/reportsReducer'
import { useLocation} from 'react-router-dom'

export default function MainBox({token}) {

    const [massivBike, setMassivBike] = useState({})
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.state?.message === 'Reload main') {
            getAllReports();
        }
    }, [location.state?.message])

    useEffect(() => {
        if (token !== null) {
            getAllReports();
        }
        else {
            setMassivBike({})
        }
    }, [token])

    const getAllReports = async () => {
        const massiv = await reportApi.getAllReports()
        setMassivBike(massiv)
        dispatch(addAllReports(massiv))
        location.state = ''
    }

    return (
        <div className="mainBox">
            {massivBike !== {} ? Object.values(massivBike).map(bike => {
                return <Block bike={bike} key={bike._id}/>
            }) :
            undefined
            }
        </div>
    )
}