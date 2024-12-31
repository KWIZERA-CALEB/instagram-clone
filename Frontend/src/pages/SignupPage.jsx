import { Link, useNavigate } from 'react-router-dom'
import { Input, Button } from 'antd'
import Preloader from '../components/atoms/Preloader'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const SignupPage = () => {
    const { control, handleSubmit, setValue, formState: {errors} } = useForm()
    const { isSigningUp, signup } = useAuthStore()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            await signup(data)
            navigate('/login')
        } catch(error) {
            console.log(error)
            setValue('password', '')
        }
    }
  return (
    <div className='w-full h-[100vh] bg-[#000] flex justify-center items-center'>
        {/* preloader */}
        <Preloader />
        {/* preloader */}
        <div className='flex flex-row space-x-[24px] items-center'>
            <div>
                <img src="/images/screenshot2.png" alt="ScreenShot" />
            </div>
            <div className='border-[#333]/[50%] w-[300px] h-[350px] border-solid border-[1px] pl-[20px] pr-[20px] pt-[20px] pb-[20px]'>
                <div><h3 className='text-[#fff] font-bold italic select-none p-[6px] cursor-pointer font-afacadFlux text-center'><Link to="/">Twika🔥</Link></h3></div>
                <div className='mt-[12px]'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name='email'
                            control={control}
                            rules={{
                                required: 'Email is required', 
                            }}
                            render={({ field }) => (
                                <Input {...field} placeholder='Email' className='rounded-[4px] custom-input bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
                            )}
                        />
                        {errors.email && (
                            <p className='font-afacadFlux text-[12px] text-[#FF204E]'>{errors.email.message}</p>
                        )}
                        <Controller
                            name='fullName'
                            control={control}
                            rules={{
                                required: 'Full Name is required', 
                            }}
                            render={({ field }) => (
                                <Input {...field} placeholder='Full Name' className='rounded-[4px] custom-input bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
                            )}
                        />
                        {errors.fullName && (
                            <p className='font-afacadFlux text-[12px] text-[#FF204E]'>{errors.fullName.message}</p>
                        )}
                        <Controller
                            name='username'
                            control={control}
                            rules={{
                                required: 'Username is required', 
                            }}
                            render={({ field }) => (
                                <Input {...field} placeholder='Username' className='rounded-[4px] custom-input bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
                            )}
                        />
                        {errors.username && (
                            <p className='font-afacadFlux text-[12px] text-[#FF204E]'>{errors.username.message}</p>
                        )}
                        <Controller
                            name='password'
                            control={control}
                            rules={{
                                required: 'Password is required', 
                            }}
                            render={({ field }) => (
                                <Input.Password {...field} placeholder='Password' className='rounded-[4px] custom-password-input custom-input mt-[5px] bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
                            )}
                        />
                        {errors.password && (
                            <p className='font-afacadFlux text-[12px] text-[#FF204E]'>{errors.password.message}</p>
                        )} 
                        <Button htmlType="submit" disabled={isSigningUp} className='bg-sky-400 font-afacadFlux mt-[5px] w-full fonnt-bold border-[0px] text-[#fff]'>
                            {isSigningUp ? 'Loading' : 'Create Account'}
                        </Button>  
                    </form>
                </div>
                <div className='mt-[12px]'>
                    <p className='font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>Already have account? <span className='hover:underline'><Link to='/login'>Sign In</Link></span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignupPage
