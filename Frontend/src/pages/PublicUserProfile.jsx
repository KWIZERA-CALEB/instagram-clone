import Sidebar from "../components/molecules/Sidebar"
import Preloader from '../components/atoms/Preloader'
import { Button, Tabs, Modal, Input } from 'antd'
import { useState, useEffect } from 'react'
import { useAuthStore } from "../store/useAuthStore"
import { getPastTime, formatPastTime } from "../utils/formatDate"
import { useParams } from "react-router-dom"




const PublicUserProfile = () => {
    const { username } = useParams()
    const { fetchPublicUserProfileInfo, selectedPublicProfile, selectedPublicProfilePosts } = useAuthStore()

    const fetchUserDetails = async () => {
        try {
            const res = await fetchPublicUserProfileInfo(username)
            console.log(res)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])

    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: <p className='custom-tab font-afacadFlux font-bold select-none cursor-pointer'>POSTS</p>,
            children: 
            (
                <>
                {selectedPublicProfilePosts.length == 0 ? 
                    <p className='text-center font-afacadFlux text-white mt-[20px] select-none cursor-pointer'>User has no posts yet</p>
                    : 
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {selectedPublicProfilePosts.map((post, index) => (
                            <div key={index} style={{ backgroundColor: post?.color || "#333" }} className='h-[300px] mt-[20px] flex justify-center items-center'>
                                <p className='text-center font-afacadFlux text-white select-none cursor-pointer'>{post?.description || 'Loading...'}</p>
                            </div>
                        ))}
                    </div>
                }
                </>
            ),
        },
        {
          key: '2',
          label: <p className='custom-tab font-afacadFlux font-bold select-none cursor-pointer'>TAGGED</p>,
          children: 
          <p className='text-center font-afacadFlux text-white mt-[20px] select-none cursor-pointer'>User has no tagged posts yet</p>
          ,
        },
    ];


  return (
    <div className='flex flex-row min-h-screen'>
        {/* preloader */}
        <Preloader />
        {/* preloader */}
        <Sidebar />
        <div className='md:ml-[200px] w-full flex flex-row justify-center bg-[#000] md:flex-1'>
            <div className='md:w-[80%] w-full pr-[40px] pl-[40px] pt-[40px] pb-[40px]'>
                <div className='flex flex-col md:flex-row space-y-[20px] md:space-y-[0px] items-center md:space-x-[30px] pb-[40px] border-b-[1px] border-[#333]/[50%] border-solid'>
                    <div className='w-[100px] overflow-hidden cursor-pointer h-[100px] bg-slate-500 rounded-full'>
                        <img src={selectedPublicProfile?.user.profileImage || '/images/pic.webp'} className='w-full h-full object-cover object-center' alt="Profile" />
                    </div>
                    <div>
                        <p className='font-afacadFlux font-bold select-none cursor-pointer'>{selectedPublicProfile?.user.username}</p>
                        <div className='mt-[10px] flex flex-row space-x-[15px]'>
                            <p className='font-afacadFlux font-bold select-none cursor-pointer'>0 Posts</p>
                            <p className='font-afacadFlux font-bold select-none cursor-pointer'>Joined: {formatPastTime(getPastTime(selectedPublicProfile?.user.createdAt))}</p>
                        </div>
                        <p className='font-afacadFlux font-normal select-none cursor-pointer'>{selectedPublicProfile?.user.bio || 'No bio yet'}</p>
                        <Button className='bg-[#333]/[50%] font-afacadFlux mt-[5px] font-bold border-[0px] text-[#fff]'>Follow</Button>
                    </div>
                </div>
                {/* user posts */}
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                {/* user posts */}
            </div>
        </div>
        
    </div>
  )
}

export default PublicUserProfile
