import {Navigate, Outlet} from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProviders';
const GuestLayout = () => {
  const {token} = useStateContext()
  // debugger;
  if(token){
    return <Navigate to="/" />;
  }
  return (
    <div>
      <h1>Guest</h1>
      <Outlet />
    </div>
  )
}

export default GuestLayout
