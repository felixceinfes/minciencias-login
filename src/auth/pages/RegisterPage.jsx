// ** React Imports
import { Link } from 'react-router-dom'

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'
import { useEffect } from 'react';
import { getDocumentTypes } from '../../helpers/getDocumentType';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerEnlazaa } from '../../store/register';


export const RegisterPage = () => {

  const defaultValues = {
    documentType: '',
    docNumber:'',
    firstNames:'',
    lastNames:'',
    email:''
  }

  const {
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const [documentType,setDocumentType] = useState([]);

  const dispatch = useDispatch();

  const { status } = useSelector(state=>state.register);

  const validRegistration = (status==='checking')?true:false;

  const getDocTypes = async() => {
    const documentTypes = await getDocumentTypes();
    setDocumentType(documentTypes);
  }
  useEffect(() => {
    getDocTypes();
  }, []);

/*   const onSubmit = data => console.log(data);
  console.log(errors.documentNumber); 
  
  {...register("documentNumber", {required: true, pattern:/^[0-9]+$/})}        
  */
  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      dispatch(registerEnlazaa(data));
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }


  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>              
              <h2 className='brand-text text-primary ms-1'>Enlazaa</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Nueva experiencia en evaluación 🚀
            </CardTitle>
            <CardText className='mb-2'>!Registra los siguientes datos!</CardText>
            <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='select-basic'>
                  Tipo de documento
                </Label>
                <Controller
                  id='documentType'
                  name='documentType'
                  control={control}
                  render={({ field }) => (
                    <Input 
                      type='select' 
                      {...field}
                      invalid={errors.documentType && true}
                    >
                      <option key="0" value="" >Selecciona ...</option>)
                        {
                          documentType.map( (document) => <option key={document.id} value={document.id}>{document.name}</option>)
                        }
                    </Input>
                  )}
                />
                {errors.documentType && 'Debes seleccionar un tipo de documento'}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Número de documento
                </Label>
                <Controller
                  id='docNumber'
                  name='docNumber'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='text'                    
                      invalid={errors.docNumber && true}
                      {...field}              
                    />
                  )}
                />
                {errors.docNumber && 'Debes escribir un nombre'}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Nombres
                </Label>
                <Controller
                  id='firstNames'
                  name='firstNames'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='text'                    
                      invalid={errors.firstNames && true}
                      {...field}
                    />
                  )}
                />
                {errors.firstNames && 'Debes escribir un nombre'}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Apellidos
                </Label>
                <Controller
                  id='lastNames'
                  name='lastNames'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='text'
                      invalid={errors.lastNames && true}
                      {...field}
                    />
                  )}
                />
                {errors.lastNames && 'Debes escribir tus apellidos'}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Correo
                </Label>
                <Controller
                  id='email'
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='ejemplo@correo.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
                {errors.email && 'Debes escribir un correo válido'}
              </div>
              <Button color='primary' block disabled={validRegistration}>
                Sign up
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>¿Ya tienes cuenta?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
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
          </CardBody>
        </Card>
      </div>
    </div>
  )
}