

// material-ui
import { styled } from '@mui/material/styles';
import backgroundImage from '../../assets/images/golfbackground.jpg';
// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const LoginWrapper = styled('div')(({ theme }) => ({
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh'
}));

const Logo = styled('img')(({ theme }) => ({
    height: '50px',
    width: '50px',
    marginBottom: '1rem',
}));

export default LoginWrapper;