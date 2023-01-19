import './mainBox.scss'
import Block from './Block/Block'
import { useEffect, useState } from 'react'
import { reportApi } from '../../../API/reportsApi'
import { useDispatch} from 'react-redux'
import { addAllReports } from '../../../Redux/reportsReducer'
import { useLocation} from 'react-router-dom'
import success from '../../../../svg/success.png'
import glass from '../../../../svg/glass.png'
import leader from '../../../../svg/leader.png'


export default function MainBox({token}) {

    const [massivBike, setMassivBike] = useState(null)
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (location.state?.message === 'Reload main' && token !== null) {
            getAllReports();
        }
    }, [location.state?.message])

    useEffect(() => {
        if (token !== null) {
            getAllReports();
        }
        else {
            setMassivBike(null)
        }
    }, [token])

    const getAllReports = async () => { ///ghbcvjnhtnmcz
        let massiv = await reportApi.getAllReports()
        setMassivBike(massiv)
        dispatch(addAllReports(massiv))
        location.state = ''
       
    }

    return (
        <div className="mainBox">
            {massivBike !== null
                ?  <h1>Случаи кражи</h1> 
                :  <div className="mainBox-info">
                        <div className="statistic">
                            <img src={success} alt="Успех" />
                            <p>В 2022 году мы нашли более 180 украденных велосипедов по всей стране! И предотвратили более 300 случаев.</p>
                        </div>
                        <div className="statistic">
                            <img src={glass} alt="Лупа с галочкой" />
                            <p>Число украденных велосипедов уменьшилось по всей России на <b>30%!</b> по сравнению с 2021 годом!</p>
                        </div>
                        <div className="statistic">
                            <img src={leader} alt="Лидер" />
                            <p>Наша фирма <b>Bike Patrol</b> занимает лидирующую позицию на рынке арендованных велосипедов уже более 5 лет.</p>
                        </div>
                    </div>
            }
            <div className="mainBox-container">
                {massivBike !== null
                    ? Object.values(massivBike).map(bike => {
                        return <Block bike={bike} key={bike._id}/>
                    })
                    : undefined
                }
            </div>
        </div>
    )
}