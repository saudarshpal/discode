import { useState } from "react"

import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Heading from "./Auth/Heading"
import SubHeading from "./Auth/SubHeading"
import InputBox from "./Auth/InputBox"
import Button from "./Auth/Button"
import WarningFooter from "./Auth/WarningFooter"


const SignUp = ({toggle}) => {
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  return (
        <div className="bg-neutral-800 flex flex-col px-4 w-80 h-max rounded-lg">
          <Heading label="SignUp"></Heading>
          <SubHeading label="Enter your information to create account"></SubHeading>
          <InputBox onChange={e=>setUsername(e.target.value)}title={"Username"} holder={"Leojosepg21"}></InputBox>
          <InputBox onChange={e=>setEmail(e.target.value)} title={"Email"} holder={"leoj@example.com"}></InputBox>
          <InputBox onChange={e=>setPassword(e.target.value)}title={"Password"} holder={"123456"}></InputBox>
          <Button buttonlabel="Sign Up" onClick={async()=>{
            try{
              const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/signup`,{
                    username,email,password })
              localStorage.setItem('authHeader','Bearer '+response.data.token)
              {navigate("/dashboard")}
            }catch(err){ console.log(err) }
          }}></Button>
          <WarningFooter label={"Already have an account?"} buttonText={"SignIn"} onClick={toggle}></WarningFooter>
        </div>
  )
}

export default SignUp