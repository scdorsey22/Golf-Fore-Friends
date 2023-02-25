import { styled } from '@mui/material/styles';

const Logo = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  maxWidth: 400,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(-8),
  display: 'inline-block',
  marginLeft: 'auto',
  marginRight: 'auto',
}));

export default Logo;
