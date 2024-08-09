import { useState,useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button ,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Paper,Box,Grid,Typography} from '@mui/material';
import { useLocation,useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import Loader from "../../components/Loader"
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../redux/api/users';

const defaultTheme = createTheme();

export default function SignUp() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [location,setLocation] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'

  const [register,{isLoading,isError,error}] = useRegisterMutation()
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
      toast.error("Password do not match")
    }else{
      try {
        const res = await register({email,password,confirmPassword,location,phoneNumber}).unwrap()
        console.log(res)
        dispatch(setCredentials({...res}))
        navigate(redirect)
        toast.success("user registered successfully")
      } catch (err) {
         //console.log(error)
         toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', display: 'flex' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
        >
          <Paper
            elevation={3}
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#171B36",
              color: "#FFFFFF",
            }}
          >
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/education-school/read-book-icon.svg"
              alt="Logo"
              style={{ width: "80px", height: "80px", filter: "invert(100%)" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignSelf:'flex-start', mb: 2 }}>
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/education-school/read-book-icon.svg"
                alt="Logo"
               style={{ width: "30px", height: "30px", marginRight: "8px", filter: "invert(28%) sepia(100%) saturate(7476%) hue-rotate(185deg) brightness(101%) contrast(101%)" }}
              />
              <Typography component="h3" variant="h6" sx={{ textAlign: 'left' }}>
                Book Rent
              </Typography>
            </Box>
            <Typography component="h3" variant="h5" sx={{ alignSelf: 'flex-start' }}>
              Sign Up
            </Typography>
            <hr style={{ width: '100%', borderColor: 'lightgray', marginBottom: '15px' }} />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="location"
                label="Location"
                id="location"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e)=>setPhoneNumber(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="acceptTerms" color="primary" name='terms'/>}
                label="I accept the terms and conditions"
              />
              <Button
                disabled={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoading ? 'loading': 'SIGN UP'}
              </Button>
              {isLoading && <Loader/>}
              {isError && <p>{toast.error(error.data)}</p>}
              
              <Grid container sx={{ justifyContent: 'center' }}>
                <Grid item>
                Already have an account?
                  <Link href={redirect ? `/login?redirect=${redirect}` : "/login"} variant="body1">
                    {"Login"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
