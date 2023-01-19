import './footer.scss'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {

    return (
        <div className="footer">
            <div className="number">
                    <LocalPhoneIcon />
                    + 7 (800) 553-70-90
            </div>
            <div className="social">
                <a href="https://e.mail.ru/compose/">
                    <EmailIcon style={{cursor: 'pointer', color: '#fff'}}/>
                </a>
                <a href="https://ru-ru.facebook.com/">
                    <FacebookIcon style={{cursor: 'pointer', color: '#fff'}} />
                </a>
                <a href="https://www.instagram.com/">
                    <InstagramIcon style={{cursor: 'pointer', color: '#fff'}}/>
                </a> 
            </div>
        </div>    
    )
}