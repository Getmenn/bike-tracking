import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const ButtonTwo = styled(Button)({
    fontSize:  14 ,
    color: '#042177',
    borderColor: '#042177',
    marginTop:  '23px' ,
    '&:hover': {
        borderColor: '#00123A',
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        color: '#00123A',
        boxShadow: 'none',
    },
})