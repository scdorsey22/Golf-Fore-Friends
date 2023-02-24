import { styled } from '@mui/material/styles';
import logo from '../../assets/images/golflogo.png';

const Logo = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  maxWidth: 400,
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(5),
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
}));

export default Logo;
