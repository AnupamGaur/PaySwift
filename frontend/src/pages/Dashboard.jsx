import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
export const Dashboard = function(){
  return(
    <>
    <Appbar/>
    <Balance/>
    <Users></Users>
    </>
  )
}