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

export const ButtonThree = styled(Button)({
    fontSize: 17,
    color: '#042177',
    borderColor: '#042177',
    marginTop: '17px',
    '&:hover': {
        borderColor: '#00123A',
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        color: '#00123A',
        boxShadow: 'none',
    },
})

export const ButtonOne = styled(Button)({
    fontSize: 18,
    background: '#b37f61',
    marginTop: '80px',
    '&:hover': {
        backgroundColor: '#c76d3a',
        borderColor: '#c76d3a',
    },
})