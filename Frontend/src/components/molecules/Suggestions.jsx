import { Button } from "antd"
import { Link } from 'react-router-dom'
import { useAuthStore } from "../../store/useAuthStore"

const Suggestions = () => {
  const { authUser } = useAuthStore()
  return (
    <>
      {!authUser &&
      <div className='p-[20px]'>
          <div className='border-[#333]/[50%] border-solid border-[1px] pl-[30px] pr-[30px] pt-[30px] pb-[30px]'>
              <p className='font-afacadFlux font-bold select-none cursor-pointer text-center text-[14px]'>Try Now</p>
              <ul className='bulleted'>
                  <li className='font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>Get free access to hundred of stories.</li>
                  <li className='font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>Enjoy unlimited talk with hundred hommies.</li>
                  <li className='font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>We want to make you happy.</li>
              </ul>
              <div className='mt-[6px]'>
                  <Link to='/signup'>
                    <Button className='bg-sky-400 font-afacadFlux fonnt-bold border-[0px] text-[#fff]'>Create Account Now</Button>
                  </Link>
              </div>
              <p className='font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>Already have account? <span className='hover:underline'><Link to='/login'>Sign In</Link></span></p>
          </div>
      </div>
      }
    </>
  )
}

export default Suggestions
