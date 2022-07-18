import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
export const RegisterPage = () => {
  return (
      <AuthLayout title="Register page">
        <form>
          <Grid container>
              <Grid item xs={ 12 } sx={{ mb:2,mt:2 }}>
                <TextField 
                    label="Nombre completo" 
                    type="text" 
                    placeholder="Tu nombre" 
                    fullWidth
                />
              </Grid>
              <Grid item xs={ 12 } sx={{ mb:2  }}>
                <TextField 
                    label="Correo" 
                    type="email" 
                    placeholder="example@correo.com" 
                    fullWidth
                />
              </Grid>  
              <Grid item xs={ 12 } sx={{ mb:2 }}>
                <TextField 
                    label="Contraseña" 
                    type="password" 
                    fullWidth
                />
              </Grid>
              <Grid item xs={ 12 } sx={{ mb:2 }}>
                <TextField 
                    label="Confirmar contraseña" 
                    type="password" 
                    fullWidth
                />
              </Grid>  
              <Grid container spacing={ 2 } sx={{ mb:2 }}>
                <Grid item xs={12} sm={ 12 }>
                  <Button variant="contained" fullWidth>
                    Create account
                  </Button>
                </Grid>                
              </Grid>
              <Grid container direction="row" justifyContent="end">
                <Typography sx={{ mr:1 }}>Do you already have an accound?</Typography>
                  <Link component={ RouterLink } color="inherit" to="/auth/login" > Login </Link>                    
              </Grid>
          </Grid>
        </form>
      </AuthLayout>
  )
}
