import './componentsHeader.scss'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import InfoIcon from '@mui/icons-material/Info';


export default function OfficerList({setVisableList}){
    return (
        <>
            <div className='officerList'>
                <div className="exit" onClick={() => setVisableList(false)}><h3><b>X</b></h3></div>
                <div className="officerItem">
                    <label htmlFor="officerList">Name</label>
                    <InfoIcon titleAccess='Информация'/>
                    <PersonRemoveIcon titleAccess='Удалить'/>
                </div>
                <div className="officerItem">
                    <label htmlFor="officerList">Name</label>
                    <InfoIcon titleAccess='Информация'/>
                    <PersonRemoveIcon titleAccess='Удалить'/>
                </div>
                <div className="officerItem">
                    <label htmlFor="officerList">Name</label>
                    <InfoIcon titleAccess='Информация'/>
                    <PersonRemoveIcon titleAccess='Удалить'/>
                </div>
            </div>
            <div onClick={() => setVisableList(false)} className='overlay' />
        </>
    )
}