

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Heading from './Auth/Heading'
import SubHeading from './Auth/SubHeading'
import InputBox from './Auth/InputBox'
import WarningFooter from './Auth/WarningFooter'
import Button from './Auth/Button'

const SignIn = ({toggle}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate() 
  return (
      <div className="bg-neutral-800 w-80 flex flex-col h-max rounded-lg  px-4 ">
           <Heading label={"SignIn"}></Heading>
           <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
           <InputBox onChange={(e)=>setEmail(e.target.value)} title={"Email"} holder={"leoj@example.com"}></InputBox>
           <InputBox onChange={e=>setPassword(e.target.value)} title={"Password"} holder={"123456"}></InputBox>
           <Button buttonlabel={"Sign In"} onClick={async()=>{
            try{
              const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/signin`,{
                    email,password })
              localStorage.setItem('authHeader','Bearer '+response.data.token)
              {navigate("/homepage")}
            }catch(err){ console.log(err) }
          }}></Button>
           <WarningFooter label="Don't have an account?" buttonText={"SignUp"} onClick={toggle}></WarningFooter>
      </div>
  )
}

export default SignIn 