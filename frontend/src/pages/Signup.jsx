import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { WarningMessage } from "../components/WarningMessage";
import { useState } from "react";
import axios from 'axios'

export const Signup  = function(){
  const [firstname,setfirstname] = useState('')
const [lastname,setlastname] = useState('')
const [password,setpassword] = useState('')
const [username,setusername] = useState('')
  return(
    <>
    <div className="flex justify-center h-screen bg-slate-300">
      <div className="flex flex-col justify-center">
    <Heading heading="Sign Up"></Heading>
    <Subheading text='Enter Your information to create an Account'></Subheading>
    <InputBox ques="First Name" placeholder="Anupam" onChange={(e) => {setfirstname(e.target.value)
      console.log(e.target.value)
    }}></InputBox>
    <InputBox ques="Last Name" placeholder="Gaur" onChange={(e) => setlastname(e.target.value)}></InputBox>
    <InputBox ques="Email" placeholder="anupam.gaur@gbgmail.com" onChange={(e) => setusername(e.target.value)}></InputBox>
    <InputBox ques="Password" placeholder="Password" onChange={(e) => setpassword(e.target.value)}></InputBox>
    <Button text="Sign Up" onClick={async () => {const response = await axios.post('http://localhost:3000/signup',{
      firstname,
      lastname,
      password,
      username
    })
    console.log(response.data)
    localStorage.setItem('token',response.data.token)
    // setfirstname('')
    // setlastname('')
    // setpassword('')
    // setusername('')
    }}></Button>
    <WarningMessage message="Already have an account? " buttontext="Login" to='/signin'></WarningMessage>
    </div>
    </div>
    </>
  )
}