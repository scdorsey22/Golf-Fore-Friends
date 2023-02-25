

// material-ui
import { styled } from '@mui/material/styles';
import backgroundImage from '../../assets/images/golfbackground.jpg';
// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const LoginWrapper = styled('div')(({ theme }) => ({
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}));


export default LoginWrapper;