import { Link } from "react-router-dom"
export const WarningMessage = function({message,buttontext,to}){
  return(
    <div className="text-center">
    <p>{message}
    <Link className="pointer underline pl-1 cursor-pointer" to={to}>{buttontext}</Link></p>
    </div>
  )
}