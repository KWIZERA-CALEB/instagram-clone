import Sidebar from "../components/molecules/Sidebar"
import Suggestions from "../components/molecules/Suggestions"
import Preloader from '../components/atoms/Preloader'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation'
import { usePostStore } from "../store/usePostStore";
import { useEffect } from "react";
import { getPastTime, formatPastTime } from "../utils/formatDate";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import MobileNavigation from "../components/molecules/MobileNavigation";

const HomePage = () => {

    const { allPosts, isFetchingAllPosts, fetchAllPosts, toggleLikePost } = usePostStore()
    const { likedPosts, authUser } = useAuthStore()
    const navigate = useNavigate()
    
    useEffect(() => {
        fetchAllPosts()
    }, [])

    const handleLikePost = async(postId) => {
        try {
            if (!authUser) {
                navigate('/login')
            }
            
            const likeResponse = await toggleLikePost(postId)
            console.log(likeResponse)
        } catch(error) {
            console.log(error)
        }
    }

  return (
    <div className='flex flex-row min-h-screen'>
        <MobileNavigation />
        {/* preloader */}
        <Preloader />
        {/* preloader */}
        <Sidebar />
        <div className='md:ml-[200px] w-full flex flex-row bg-[#000] md:flex-1'>
            {/* middle section */}
            <div className='lg:w-[60%] w-full flex pr-[20px] pl-[20px] pb-[40px] md:pr-[80px] md:pl-[80px] justify-center'>
                <div className='w-full'>
                    {/* stories */}
                    <Swiper modules={[Navigation]} navigation  slidesPerView={8} onSlideChange={() => console.log('slide change')} onSwiper={(swiper) => console.log(swiper)} className='mySwiper w-full h-[90px] pt-[20px] pb-[15px] flex flex-row space-x-[24px] relative'>
                        <SwiperSlide>
                            <div className='flex flex-col space-y-[4px] items-center'>
                                <div className='w-[40px] h-[40px] cursor-pointer outline-dotted outline-offset-1 outline-pink-500 bg-slate-500 rounded-full relative' style={{ outlineWidth: "2px" }}>
                                    <img src="/images/memo_32.png" className='w-full h-full object-cover object-center' alt="Profile" />
                                    <div className='bg-[#333] w-[20px] h-[20px] rounded-full absolute bottom-0 right-0 flex justify-center items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff">
                                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div><p className='font-afacadFlux text-[14px] select-none cursor-pointer'>You</p></div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='flex flex-col space-y-[4px] items-center'>
                                <div className='w-[40px] h-[40px] cursor-pointer outline-dotted outline-offset-1 outline-pink-500 bg-slate-500 rounded-full' style={{ outlineWidth: "2px" }}>
                                    <img src="/images/memo_32.png" className='w-full h-full object-cover object-center' alt="Profile" />
                                </div>
                                <div><p className='font-afacadFlux text-[14px] select-none cursor-pointer'>Caleb</p></div>
                            </div>
                        </SwiperSlide>
                        
                    </Swiper>
                    {/* stories */}
                    {/* posts */}
                    <div className='flex flex-col space-y-[8px] pt-[10px] pb-[20px]'>
                        {allPosts.map((post, index) => (
                            <div key={index} className='w-full'>
                                <div className='flex flex-row justify-between'>
                                    <div className='flex flex-row items-center space-x-[6px]'>
                                        <div className='w-[20px] h-[20px] overflow-hidden bg-slate-500 rounded-full'>
                                            <img src={post.userId.profileImage} className='w-full h-full object-cover object-center' alt="Profile" />
                                        </div>
                                        <div><p className='font-afacadFlux font-bold select-none cursor-pointer'>{post.userId._id ==  authUser?._id || null ? <Link to='/profile'>{post.userId.username || "Loading..."}</Link> : <Link to={`/profile/${post.userId.username}`}>{post.userId.username || "Loading..."}</Link>} • {formatPastTime(getPastTime(post.createdAt))}</p></div>
                                    </div>
                                    <div className='cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                                            <path d="M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div style={{ backgroundColor: post.color }} onDoubleClick={() => handleLikePost(post._id)} className='w-full h-[300px] mt-[20px] flex justify-center items-center'>
                                    <p className='text-center font-afacadFlux select-none cursor-pointer'>{post.description || "Loading..."}</p>
                                </div>
                                <div className='flex flex-row mt-[6px] justify-between'>
                                    <div className='flex flex-row space-x-[12px]'>
                                        <div onClick={() => handleLikePost(post._id)} className='cursor-pointer'>
                                            {likedPosts.includes(post._id) ? 
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" height='20' width='20'>
                                                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
                                            </svg>
                                            : 
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" height='20' width='20'>
                                                <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
                                            </svg>
                                            }
                                        </div>
                                        <div className='cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" height='20' width='20'>
                                                <path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V2.5L23.5 11L13 19.5V14ZM11 12H15V15.3078L20.3214 11L15 6.69224V10H13C10.5795 10 8.41011 11.0749 6.94312 12.7735C8.20873 12.2714 9.58041 12 11 12Z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className='cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                                            <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className='mt-[5px]'><p className='font-afacadFlux text-[14px] select-none cursor-pointer'>{post.likes || 0} like(s)</p></div>
                            </div>
                        ))}
                    </div>
                    {/* posts */}
                </div>
            </div>
            {/* middle section */}
            <div className='hidden w-[40%] lg:block'>
                <Suggestions />
            </div>
        </div>
    </div>
  )
}

export default HomePage
