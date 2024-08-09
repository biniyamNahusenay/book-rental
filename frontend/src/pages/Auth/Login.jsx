import  React, { useEffect, useState } from 'react';
import { Button ,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Paper,Box,Grid,Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader"
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useLoginMutation } from '../../redux/api/users';
import { toast } from 'react-toastify';

const defaultTheme = createTheme();

export default function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("user logged in successfully")
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
              Login
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
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="acceptTerms" color="primary" />}
                label="Remeber me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
               Login
              </Button>
              {isLoading && <Loader/>}
              <Grid container sx={{ justifyContent: 'center' }}>
                <Grid item>
                don't have an account?
                  <Link href="/signup" variant="body1">
                    {"Signup"}
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
