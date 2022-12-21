import './mainBox.scss'
import Block from './Block/Block'
import {bikeMassiv} from '../../../API/bikeMassiv'

export default function MainBox() {

    const massivBike = bikeMassiv.component
    return (
        <div className="mainBox">
            {Object.values(massivBike).map(bike => {
                return <Block bike={bike} key={bike.licenseNumber} />
            })}
        </div>
    )
}