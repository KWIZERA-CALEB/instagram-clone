import { Link } from 'react-router-dom'
import { Input, Button } from 'antd'
import Preloader from '../components/atoms/Preloader'


const LoginPage = () => {
  return (
    <div className='w-full h-[100vh] bg-[#000] flex justify-center items-center'>
        {/* preloader */}
        <Preloader />
        {/* preloader */}
        <div className='flex flex-row space-x-[24px] items-center'>
            <div>
                <img src="/images/screenshot.png" alt="ScreenShot" />
            </div>
            <div className='border-[#333]/[50%] w-[300px] h-[350px] border-solid border-[1px] pl-[20px] pr-[20px] pt-[20px] pb-[20px]'>
                <div><h3 className='text-[#fff] font-bold italic select-none p-[6px] cursor-pointer font-afacadFlux text-center'><Link to="/">Twika🔥</Link></h3></div>
                <div className='mt-[12px]'>
                    <Input placeholder='Phone number, email, username' className='rounded-[4px] custom-input bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
                    <Input placeholder='Password' className='rounded-[4px] custom-input mt-[5px] bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
                    <Button className='bg-sky-400 font-afacadFlux mt-[5px] w-full fonnt-bold border-[0px] text-[#fff]'>Sign In</Button>
                </div>
                <div className='mt-[12px]'>
                    <p className='font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>Don't have account? <span className='hover:underline'><Link to='/signup'>Create</Link></span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage
