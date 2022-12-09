import { Form, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import InputPasswordToggle from '../../@core/components/input-password-toggle';
import { loginBM } from '../../store/auth';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef, useState } from 'react';
import '../style.css';
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import { ModalRecoveryPassword } from './account/ModalRecoveryPassword';

export const LoginPage = () => {
  
  const defaultValuesRp = {
    password: '',
    loginEmail: '',
    _token:localStorage.getItem('csrftoken')
  }

  const [tokenState, setTokenState] = useState();

  const [disabledAnimation, setDisabledAnimation] = useState(false);

  const toggle = () => setDisabledAnimation(!disabledAnimation);

  const user =  useSelector(state=>state.auth);

  const { status, error:loginErrorMsg, accessToken, uuid, email, rolename } = user;

  const { token } = useSelector(state=>state.csrftoken);

  const dispatch = useDispatch()

  const nodeRef = useRef(null)
  const {
    setValue,
    control:controlii,
    setError:setErrorii,
    handleSubmit:handleSubmitii,
    formState: { errors:errorsii }
  } = useForm({ defaultValues:defaultValuesRp });

  const loginError = useMemo( ()=>{ return status==='error-in-authentication'},[status] );
  const tokenAuth = useMemo( ()=>{ if(token!=='notoken'){ return token}else{ return 'notoken'}},[token] );
  const uuidAuth = useMemo( ()=>{ if(uuid!=='notoken'){ return uuid}else{ return 'notoken'}},[uuid] );
  const roleAuth = useMemo( ()=>{ if(rolename!=='notoken'){ return rolename}else{ return 'notoken'}},[rolename] );
  const onSubmitLogin = async (data) => {
    if (Object.values(data).every(field => field.length > 0)) {
      const ds = await dispatch(await loginBM(data))
      
      console.log(ds);      
      console.log(roleAuth,uuidAuth);
      if(ds && ds.user_uuid !== null){
          if(ds.user.rolename === 'teacher'){
            console.log("redirect teacher")
            window.location.replace(`${import.meta.env.VITE_URL_DASHBOARDDOCENTE}?useruuid=${ds.user_uuid}&accestoken=${ds.token}&email=${ds.user.email}`)
          }
          if(ds.user.rolename === 'student'){
            console.log("redirect estudiante")
            window.location.replace(`${import.meta.env.VITE_URL_DASHBOARDESTUDIANTE}?useruuid=${ds.user_uuid}&accestoken=${ds.token}&email=${ds.user.email}`)
          }
          if(ds.user.rolename === 'executive'){
            window.location.replace(`${import.meta.env.VITE_URL_DASHBOARDADDIRECTIVO}?useruuid=${ds.user_uuid}&accestoken=${ds.token}&email=${ds.user.email}`)
          }
        }
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
              <Controller
                  id='_token'
                  name='_token'
                  control={controlii}
                  render={({ field }) => (
                    <Input
                      value={tokenAuth}
                      type='hidden'
                      {...field}
                    />
                  )}
                />
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
