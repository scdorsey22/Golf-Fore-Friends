import { styled } from '@mui/material/styles';
import logo from '../../assets/images/golflogo.png';

const Logo = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  maxWidth: 400,
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(-6),
  display: 'inline-block',
  marginLeft: 'auto',
  marginRight: 'auto',
}));

export default Logo;
