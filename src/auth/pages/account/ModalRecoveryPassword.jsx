import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import validator from 'validator';
import { sendEmailToResetPassword } from '../../../api/auth';
import { ToastContainer, toast } from 'react-toastify';
export const ModalRecoveryPassword = ({disabledAnimation,setDisabledAnimation}) => {
    
    const modalRenewPassword = useRef(null);
    const [sendingModalForm, setsendingModalForm] = useState(false)
    const toggle = () => setDisabledAnimation(!disabledAnimation);
    const [defCalendar, setDefCalendar] = useState([]);
    const calendar=[{id:1,name:"asdf"}];
  
    const notify = (msg) => toast(msg);
    const defaultValues = {
        recoveryEmail:''
    }
    const {
        control:controli,
        setError:setErrori,
        handleSubmit:handleSubmiti,
        formState: { errors:errorsi }
    } = useForm({ defaultValues });
  
    
    const sendModalForm=async(datai)=>{
        const {status}=await sendEmailToResetPassword(datai);
        toggle();
        if(status!=="success"){
          notify("Ha habido un error en envío de correo para restablecer tu contraseña."); 
          return false;
        }
        notify("Se te ha enviado un correo para que puedas restablecer tu contraseña"); 
    }

    const onSubmitRecPassword = (datai) => {
        
        console.log(datai.recoveryEmail);
        console.log(validator.isEmail(datai.recoveryEmail));
        if (validator.isEmail(datai.recoveryEmail)) {
            //setsendingModalForm(true);
            sendModalForm(datai);
          } else {
            setErrori("recoveryEmail",{type:'manual'});
          }
      }
  return (
    <div className='disabled-animation-modal' ref={modalRenewPassword}>
      <ToastContainer />
    <Modal
      isOpen={disabledAnimation}
      toggle={toggle}
      className='modal-dialog-centered'
      fade={false}
      
    >
      <ModalHeader toggle={toggle}>Recuperar contraseña</ModalHeader>
      <Form className='auth-login-form mt-2' onSubmit={handleSubmiti(onSubmitRecPassword)}>
        <ModalBody>
            Digita tu correo y te enviaremos un link para que puedas restablecer tu contraseña.
            < br />
            
                <Label className='form-label' for='login-email'>
                Correo
                </Label>
                <Controller
                id='recoveryEmail'
                name='recoveryEmail'
                control={controli}
                render={({ field }) => (
                    <Input
                    autoFocus
                    type='text'
                    invalid={errorsi.recoveryEmail && true}
                    {...field}
                    />
                )}
                />
                {errorsi.recoveryEmail && 'Correo no válido'}
            
        </ModalBody>
        <ModalFooter>
            <Button color='primary' disabled={sendingModalForm}>
                Accept
            </Button>

        </ModalFooter>
      </Form>
      
    </Modal>
  </div>
  )
}
