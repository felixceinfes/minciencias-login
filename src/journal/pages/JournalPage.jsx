import { AddOutlined } from '@mui/icons-material';
import {  IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView,NoteView } from '../views';


export const JournalPage = () => {
  return (
    <JournalLayout>
      {/*<Typography >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem quos veritatis repudiandae dolorem sunt facilis possimus? Unde suscipit aspernatur culpa totam deleniti sapiente pariatur quo corporis, ipsa, quia quos doloremque!</Typography>*/}
      <NothingSelectedView/>

      {/* <NoteView/> */}

       <IconButton
        size="large"
        sx={{
            color:'white',
            backgroundColor:'error.main',
            ':hover':{ 
                backgroundColor:'error.main',
                opacity:0.9
            },
            position:'fixed',
            right:50,
            bottom:50          
        }}

       >
        <AddOutlined sx={{ fontSize:20}}/>
       </IconButton>
    </JournalLayout>
  )
}
