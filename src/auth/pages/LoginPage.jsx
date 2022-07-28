import { Form, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import InputPasswordToggle from '../../@core/components/input-password-toggle';
import { loginBM } from '../../store/auth';
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useRef, useState } from 'react';
import '../style.css';
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import { ModalRecoveryPassword } from './account/ModalRecoveryPassword';


const defaultValuesRp = {
  password: 'mauro',
  loginEmail: 'prueba1@correo.com'
}


export const LoginPage = () => {

 
  const [disabledAnimation, setDisabledAnimation] = useState(false);

  const toggle = () => setDisabledAnimation(!disabledAnimation);

  const { status, error:loginErrorMsg } = useSelector(state=>state.auth);

  const dispatch = useDispatch()

  const nodeRef = useRef(null);

  const {
    control:controlii,
    setError:setErrorii,
    handleSubmit:handleSubmitii,
    formState: { errors:errorsii }
  } = useForm({ defaultValues:defaultValuesRp });



  const loginError = useMemo( ()=>{ return status==='error-in-authentication'},[status] );

  const onSubmitLogin = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      dispatch(loginBM(data));
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setErrorii(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  

  return (
  <>
    
    <div className="card mb-0">
        <div className="card-body">
            <a href="index.html" className="brand-logo">
                <h2 className="brand-text text-primary ms-1">Enlazaa</h2>
            </a>

            <h4 className="card-title mb-1">¡Bienvenido a Enlazaa! 👋</h4>
            <p className="card-text mb-2">Por favor ingresa digitando correo y contraseña</p>

            <Form className='auth-login-form mt-2' onSubmit={handleSubmitii(onSubmitLogin)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Correo
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={controlii}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='john@example.com'
                      invalid={errorsii.loginEmail && true}
                      {...field}
                    />
                  )}
                />
                {errorsii.loginEmail && 'Debes escribir un correo válido'}

              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Contraseña
                  </Label>
                  <Button 
                    color='link' 
                    onClick={toggle} 
                    style={{paddingTop: '0px',paddingBottom: '0px',paddingRight: '0px'}}
                    
                  >
                    <small>¿Olvidaste la contraseña?</small>
                  </Button>         
                           
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={controlii}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errorsii.password && true} {...field} />
                  )}
                />
                {errorsii.password && 'Password no válido'}
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
            <ModalRecoveryPassword   disabledAnimation={disabledAnimation} setDisabledAnimation={setDisabledAnimation}/>
            <p className="text-center mt-2">
                <span>¿No tienes cuenta?</span>
                <a href="auth-register-basic.html">
                    <span> Crea una</span>
                </a>
            </p>

            <div className="divider my-2">
                <div className="divider-text">Redes sociales</div>
            </div>

            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button color='google'>
                <Mail size={14} />
              </Button>
              <Button className='me-0' color='github'>
                <GitHub size={14} />
              </Button>
            </div>
        </div>
       
    </div>
    </>
  )
}
