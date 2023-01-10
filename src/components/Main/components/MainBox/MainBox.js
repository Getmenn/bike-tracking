import './mainBox.scss'
import Block from './Block/Block'
import { useEffect, useState } from 'react'
import { reportApi } from '../../../API/reportsApi'

export default function MainBox({token, setToken, setReload, reload}) {

    const [massivBike, setMassivBike] = useState({})
   
    
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
        setMassivBike(await reportApi.getAllReports())
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