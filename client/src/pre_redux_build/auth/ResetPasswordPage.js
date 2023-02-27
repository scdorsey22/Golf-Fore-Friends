import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Card, Box } from '@mui/material';
import ResetPasswordForm from './ResetPasswordForm';
import LoginWrapper1 from './AuthWrapper1';

function ResetPasswordPage({onCreateOrLog, responseFromAccountOrLogged}) {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <LoginWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                        <Card sx={{
                                maxWidth: { xs: 400, lg: 475 },
                                margin: { xs: 2.5, md: 3 },
                                '& > *': {
                                    flexGrow: 1,
                                    flexBasis: '50%'
                                },
                                border: '1px solid',
                                borderColor: theme.palette.success[200] + 75,
                                ':hover': {
                                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
                                },
                            }}>
                         <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#">
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.success.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Reset Password
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Use the token from your email to reset your password
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ResetPasswordForm onCreateOrLog={onCreateOrLog} responseFromAccountOrLogged={responseFromAccountOrLogged}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                component={Link}
                                                to="/login"
                                                variant="subtitle1"
                                                sx={{ textDecoration: 'none' }}
                                            >
                                               Back to Sign In?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </LoginWrapper1>
        
        )
    }
    
    export default ResetPasswordPage;