import SignIn from "@/components/Landing/SignIn"
import SignUp from "@/components/Landing/SignUp"
import { PageAtom } from "@/store/atoms/Auth"
import { useRecoilState } from "recoil"



const LandingPage = () => {
  const [signInPage,setPage] = useRecoilState(PageAtom)
  const toggle = ()=>{
    setPage(!signInPage)
  }
  return (
    <div className="bg-neutral-900 flex flex-row">
       <div className="w-8/12 flex flex-col items-start justify-center pl-30 pb-15">
            <span className=" text-white text-7xl font-bold">CodeBuzz</span>
            <span className=" text-white text-md font-mds pl-2 pt-2">A community-driven space for coding discussions and discoveries</span>
       </div>
       <div className='w-4/12 flex items-center h-screen '>
          {signInPage ? <SignIn toggle={toggle}/> : <SignUp toggle={toggle}/>} 
    </div>
    </div>
  )
}

export default LandingPage