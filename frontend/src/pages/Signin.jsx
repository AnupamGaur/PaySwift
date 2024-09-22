import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { WarningMessage } from "../components/WarningMessage"; 
import { useState } from "react";

export const Signin = function(){
  const {email, setemail} = useState('')
  return (<>
  <div className="bg-slate-300 h-screen flex justify-center">
   <div className="flex flex-col justify-center">
  <Heading heading="Sign In"></Heading>
  <Subheading text='Enter Your credentials to access your Account'></Subheading>
  <InputBox ques="Email" placeholder="Anupam@gmailcom" onChange={(e) => setemail(e.target.value)}></InputBox>
  <InputBox ques="Password" placeholder=""></InputBox>
  <Button text="Sign In"></Button>
  <WarningMessage message="Already have an account? " buttontext="SignUp" to='/signup'></WarningMessage>
  </div>
  </div>
  </>
  )
}