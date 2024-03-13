import { useAuth } from "../store/store";
import {Navigate} from "react-router-dom"

function AdminProtected({children}) {
  const { user } = useAuth();
  if(user && user.role!=='admin'){
    return <Navigate to="*" replace={true}></Navigate>
  }
  return children;
}

export default AdminProtected;
