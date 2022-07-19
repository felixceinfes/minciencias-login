import {Route, Routes} from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";


export const AppRouter = () => {
  return (
    
      <Routes>
        {/* Journal app */}
        <Route path="/journalapp/*" element={<JournalRoutes/>}  />
        {/* Login y registro */}
        <Route path="/*" element={<AuthRoutes/>}  />        
      </Routes>
  )
}
