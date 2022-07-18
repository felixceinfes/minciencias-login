import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { SideBar,NavBar } from "../components";

const drawerWidth=240;
export const JournalLayout = ({children}) => {
  return (
    <Box sx={{ display:'flex'}}>
        <NavBar drawerWidth={ drawerWidth }/>

        <SideBar drawerWidth={ drawerWidth } />

        <Box 
            componente="main"
            sx={{flexGrow: 1, p:2 }}
        >
            <Toolbar />
            {children}
        </Box>
    </Box>
  )
}
