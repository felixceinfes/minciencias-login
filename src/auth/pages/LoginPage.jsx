import { Form, Input, Label, Button } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import { Link,useNavigate } from 'react-router-dom';
import InputPasswordToggle from '../../@core/components/input-password-toggle';
import { loginBM } from '../../store/auth';
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from 'react';
const defaultValues = {
  password: 'mauro',
  loginEmail: 'prueba1@correo.com'
}


export const LoginPage = () => {

  const navigate=useNavigate();

  const { status, error:loginErrorMsg } = useSelector(state=>state.auth);

  const dispatch = useDispatch()

  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const loginError = useMemo( ()=>{ return status==='error-in-authentication'},[status] );

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      dispatch(loginBM(data));
    } else {
      for (const key in data) {
        console.log(data);
        if (data[key].length === 0) {
          
          setError(key, {
            type: 'manual'
          })
          console.log(key);
        }
      }
    }
  }

  console.log(status);
  return (
    <>
    <link href="/publicassets/app-assets/css/pages/authentication.css" rel="stylesheet" type="text/css" />
    <div className="card mb-0">
        <div className="card-body">
            <a href="index.html" className="brand-logo">
               
                <h2 className="brand-text text-primary ms-1">Enlazaa</h2>
            </a>

            <h4 className="card-title mb-1">¡Bienvenido a Enlazaa! 👋</h4>
            <p className="card-text mb-2">Por favor ingresa digitando correo y contraseña</p>

            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Correo
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='john@example.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
                {errors.loginEmail && 'Debes escribir un correo válido'}

              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Contraseña
                  </Label>
                  <Link to='/forgot-password'>
                    <small>¿Olvidaste la contraseña?</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
                {errors.password && 'Password no válido'}
                {loginError && loginErrorMsg}
              </div>
              
              <Button 
                type='submit' 
                color='primary' 
                block 
                disabled={status==='checking'?true:false}    
              >
                Ingresar
              </Button>
            </Form>

            <p className="text-center mt-2">
                <span>¿No tienes cuenta?</span>
                <a href="auth-register-basic.html">
                    <span> Crea una</span>
                </a>
            </p>

            <div className="divider my-2">
                <div className="divider-text">Redes sociales</div>
            </div>

            <div className="auth-footer-btn d-flex justify-content-center">
                <a href="#" className="btn btn-facebook">
                    <i data-feather="facebook"></i>
                </a>
                <a href="#" className="btn btn-twitter white">
                    <i data-feather="twitter"></i>
                </a>
                <a href="#" className="btn btn-google">
                    <i data-feather="mail"></i>
                </a>
                <a href="#" className="btn btn-github">
                    <i data-feather="github"></i>
                </a>
            </div>
        </div>
    </div>
    </>
  )
}
