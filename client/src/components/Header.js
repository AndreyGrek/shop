import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { AccountMenu } from './AccountMenu'


export const Header = () => {
  const auth = useContext(AuthContext)

  return (
    <div className='header'>
      {auth.isAuthenticated && <AccountMenu />}
    </div>
  )
}
