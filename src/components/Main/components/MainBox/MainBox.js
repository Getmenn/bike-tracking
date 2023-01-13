import './mainBox.scss'
import Block from './Block/Block'
import { useEffect, useState } from 'react'
import { reportApi } from '../../../API/reportsApi'
import { useDispatch } from 'react-redux'
import { addAllReports } from '../../../Redux/reportsReducer'

export default function MainBox({token, setToken, setReload, reload}) {

    const [massivBike, setMassivBike] = useState({})
    const dispatch = useDispatch();
   
    useEffect(() => {
        if (token !== null) {
            getAllReports();
        }
        else {
            setMassivBike({})
        }
        setReload(false)
    }, [token, reload])//token

    const getAllReports = async () => {
        const massiv = await reportApi.getAllReports()
        setMassivBike(massiv)
        dispatch(addAllReports(massiv))
    }

    return (
        <div className="mainBox">
            {massivBike !== {} ? Object.values(massivBike).map(bike => {
                return <Block bike={bike} key={bike._id} setReload={setReload}/>
            }) :
            undefined
            }
        </div>
    )
}