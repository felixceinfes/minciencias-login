import { Form, Label, Button } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import InputPasswordToggle from '../../../@core/components/input-password-toggle';
import validator from 'validator';
import { useState } from 'react';
import { accountActivation } from '../../../api/auth';

export const FormActivateAccount = ({tokenAccount}) => {

    const defaultValues = {
        password: '',
        confirmpassword:'',
        token:tokenAccount.token,
        uuid:tokenAccount.user_uuid
    }
    const [sendingForm, setSendingForm] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm({defaultValues});

    const onSubmit = data => {
        setSendingForm(true);
        const resultActivation = accountActivation(data);
        if(resultActivation===true){
            
        }
        else{


        }
        console.log(data);
        /* if (Object.values(data).every(field => field.length > 0)) {
          dispatch(loginBM(data));
        } else {
          for (const key in data) {
            if (data[key].length === 0) {
              setError(key, {
                type: 'manual'
              })
            }
          }
        } */
      }
    
    return (
        <div>
            <div className="card mb-0">
                <div className="card-body">
                    <a href="index.html" className="brand-logo">
                        <h2 className="brand-text text-primary ms-1">Enlazaa</h2>
                    </a>

                    <h4 className="card-title mb-1">¡Bienvenido a Enlazaa! 👋</h4>
                    <p className="card-text mb-2">Por favor crea una contraseña y activa la cuenta.</p>

                    <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-1'>
                        <div className='d-flex justify-content-between'>
                        <Label className='form-label' for='login-password'>
                            Contraseña
                        </Label>                  
                        </div>
                        <Controller
                        id='password'
                        name='password'
                        control={control}
                        render={({ field }) => (
                            <InputPasswordToggle 
                                className='input-group-merge' 
                                invalid={errors.password && true} 
                                {...register("password", { validate: value=>{
                                    if (validator.isStrongPassword(value, {
                                        minLength: 8, minLowercase: 1,
                                        minUppercase: 1, minNumbers: 1, minSymbols: 1
                                    })) {
                                        return true;
                                    } else {
                                        return "El password debe tener a lo menos una letra mayúscula una minúscula, un número y un carácter %$# y debe tener más de 8 carácteres";
                                    }
                                }})}
                                {...field} 
                            />
                        )}
                        />
                        {errors.password && <span className='aut-error'>{errors.password.message}</span>}
                    </div>
                    <div className='mb-1'>
                        <div className='d-flex justify-content-between'>
                            <Label className='form-label' for='login-password'>
                                Confirmar Contraseña
                            </Label>                  
                        </div>
                        <Controller
                        id='confirmpassword'
                        name='confirmpassword'
                        control={control}
                        render={({ field }) => (
                            <InputPasswordToggle 
                                className='input-group-merge' 
                                invalid={errors.confirmpassword && true} 
                                {...register("confirmpassword", { validate:value=>{
                                    const { password } = getValues();
                                    return password === value || "Los Passwords deberían coincidir";
                                }})}
                                {...field} 
                            />
                        )}
                        />
                        {errors.confirmpassword && <span className='aut-error'>{errors.confirmpassword.message}</span>}
                    </div>
                    
                    <Button 
                        disabled={sendingForm}
                        type='submit' 
                        color='primary' 
                        block 
                    >
                        Activar cuenta
                    </Button>
                    </Form>
                
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
        </div>
  )
}
