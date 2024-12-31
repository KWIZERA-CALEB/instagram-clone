import Sidebar from "../components/molecules/Sidebar"
import Preloader from '../components/atoms/Preloader'
import { Button, Tabs, Modal, Input } from 'antd'
import { useState, useEffect } from 'react'
import { useAuthStore } from "../store/useAuthStore"
import { getPastTime, formatPastTime } from "../utils/formatDate"
import { usePostStore } from "../store/usePostStore"
const { TextArea } = Input;



const ProfilePage = () => {
    const [isEditProfileImageModalOpen, setIsEditProfileImageModalOpen] = useState(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    
    const { authUser } = useAuthStore()
    
    const { loggedInUserPosts, fetchLoginedUserPosts } = usePostStore()
    

    useEffect(() => {
        fetchLoginedUserPosts()
    }, [loggedInUserPosts])

    const onChange = (key) => {
        console.log(key);
    };

    console.log(loggedInUserPosts)
    
    const items = [
        {
            key: '1',
            label: <p className='custom-tab font-afacadFlux font-bold select-none cursor-pointer'>POSTS</p>,
            children: 
            (
                <>
                {loggedInUserPosts.length == 0 ? 
                    <p className='text-center font-afacadFlux text-white mt-[20px] select-none cursor-pointer'>User has no posts yet</p>
                    : 
                    <div className='grid grid-cols-3 gap-4'>
                        {loggedInUserPosts.map((post, index) => (
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
          label: <p className='custom-tab font-afacadFlux font-bold select-none cursor-pointer'>SAVED</p>,
          children: 
          <div className='grid grid-cols-3'>
                <div className='h-[300px] bg-[#333]/[50%] mt-[20px] flex justify-center items-center'>
                    <p className='text-center font-afacadFlux text-white select-none cursor-pointer'>Hello Am saved here</p>
                </div>
                <div className='h-[300px] bg-[radial-gradient(circle,_#3b82f6,_#ef4444)] mt-[20px] flex justify-center items-center'>
                    <p className='text-center font-afacadFlux text-white select-none cursor-pointer'>Hello You can unsave me</p>
                </div>
          </div>,
        },
    ];



    const showEditProfileImageModal = () => {
      setIsEditProfileImageModalOpen(true);
      document.body.classList.add("modal-open");
    };
    const showEditProfileModal = () => {
      setIsEditProfileModalOpen(true)
      document.body.classList.add("modal-open");
    };

    const handleOk = () => {
      setIsEditProfileImageModalOpen(false);
      setIsEditProfileModalOpen(false)
      document.body.classList.remove("modal-open");
    };
    const handleCancel = () => {
      setIsEditProfileImageModalOpen(false);
      setIsEditProfileModalOpen(false)
      document.body.classList.remove("modal-open");
    };

  return (
    <div className='flex flex-row min-h-screen'>
        {/* preloader */}
        <Preloader />
        {/* preloader */}
        <Sidebar />
        <div className='ml-[200px] flex flex-row justify-center bg-[#000] flex-1'>
            <div className='w-[80%] pr-[40px] pl-[40px] pt-[40px] pb-[40px]'>
                <div className='flex flex-row items-center space-x-[30px] pb-[40px] border-b-[1px] border-[#333]/[50%] border-solid'>
                    <div onClick={showEditProfileImageModal} className='w-[100px] overflow-hidden cursor-pointer h-[100px] bg-slate-500 rounded-full'>
                        <img src={authUser?.profileImage || '/images/pic.webp'} className='w-full h-full object-cover object-center' alt="Profile" />
                    </div>
                    <div>
                        <p className='font-afacadFlux font-bold select-none cursor-pointer'>{authUser?.username}</p>
                        <div className='mt-[10px] flex flex-row space-x-[15px]'>
                            <p className='font-afacadFlux font-bold select-none cursor-pointer'>{loggedInUserPosts.length} Posts</p>
                            <p className='font-afacadFlux font-bold select-none cursor-pointer'>Joined: {formatPastTime(getPastTime(authUser?.createdAt))}</p>
                        </div>
                        <p className='font-afacadFlux font-normal select-none cursor-pointer'>Always up for a good adventure. Programming is my passion</p>
                        <Button onClick={showEditProfileModal} className='bg-[#333]/[50%] font-afacadFlux mt-[5px] font-bold border-[0px] text-[#fff]'>Edit Account</Button>
                    </div>
                </div>
                {/* user posts */}
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                {/* user posts */}
            </div>
        </div>

        {/* edit profile image */}
        <Modal className="custom-modal" open={isEditProfileImageModalOpen} onOk={handleOk} footer={null} onCancel={handleCancel}>
            <p className='font-afacadFlux font-normal select-none cursor-pointer'>Change Profile Image</p>
            <div className='grid grid-cols-6 mt-[15px] gap-4'>
                <div className='w-[60px] border-[2px] border-solid border-sky-500 cursor-pointer h-[60px] bg-slate-500 rounded-full relative'>
                    <img src="/images/memo_32.png" className='w-full h-full object-cover object-center' alt="Profile" />
                    <div className='bg-blue-500 w-[20px] h-[20px] rounded-full absolute top-0 right-0 flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff">
                            <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
                        </svg>
                    </div>
                </div>
                <div className='w-[60px] border-[2px] overflow-hidden border-solid border-sky-500 cursor-pointer h-[60px] bg-slate-500 rounded-full'>
                    <img src="/images/avatar.jpg" className='w-full h-full object-cover object-center' alt="Profile" />
                </div>
                <div className='w-[60px] border-[2px] overflow-hidden border-solid border-sky-500 cursor-pointer h-[60px] bg-slate-500 rounded-full'>
                    <img src="/images/memo_9.png" className='w-full h-full object-cover object-center' alt="Profile" />
                </div>
                <div className='w-[60px] border-[2px overflow-hidden] border-solid border-sky-500 cursor-pointer h-[60px] bg-slate-500 rounded-full'>
                    <img src="/images/memo_18.png" className='w-full h-full object-cover object-center' alt="Profile" />
                </div>
                <div className='w-[60px] border-[2px] overflow-hidden border-solid border-sky-500 cursor-pointer h-[60px] bg-slate-500 rounded-full'>
                    <img src="/images/notion_8.png" className='w-full h-full object-cover object-center' alt="Profile" />
                </div>
                <div className='w-[60px] border-[2px] overflow-hidden border-solid border-sky-500 cursor-pointer h-[60px] bg-slate-500 rounded-full'>
                    <img src="/images/vibrent_6.png" className='w-full h-full object-cover object-center' alt="Profile" />
                </div>
                <div className='w-[60px] border-[2px] overflow-hidden border-solid border-sky-500 cursor-pointer h-[60px] bg-slate-500 rounded-full'>
                    <img src="/images/memo_26.png" className='w-full h-full object-cover object-center' alt="Profile" />
                </div>
                <div className='w-[60px] border-[2px] overflow-hidden border-solid border-sky-500 cursor-pointer h-[60px] bg-slate-500 rounded-full'>
                    <img src="/images/pic.webp" className='w-full h-full object-cover object-center' alt="Profile" />
                </div>
            </div>
            <div className='flex flex-row space-x-[15px] mt-[10px]'>
                <Button className='bg-[#333]/[50%] font-afacadFlux mt-[5px] font-bold border-[0px] text-[#fff]' onClick={handleCancel}>Cancel</Button>
                <Button className='bg-sky-400 font-afacadFlux mt-[5px] font-bold border-[0px] text-[#fff]'>Save</Button>
            </div>
        </Modal>
        {/* edit profile image */}


        {/* edit profile */}
        <Modal className="custom-modal" open={isEditProfileModalOpen} onOk={handleOk} footer={null} onCancel={handleCancel}>
            <p className='font-afacadFlux font-normal select-none cursor-pointer'>Edit Profile</p>
            <div className='mt-[10px]'>
                <Input placeholder='Full Name' className='rounded-[4px] custom-input mt-[5px] bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
                <Input placeholder='Username' className='rounded-[4px] custom-input mt-[5px] bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
                <TextArea maxLength={100} placeholder='Bio(Max: 100 characters)' className='rounded-[4px] h-[50px] custom-input mt-[5px] bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
            </div>
            <div className='flex flex-row space-x-[15px] mt-[10px]'>
                <Button className='bg-[#333]/[50%] font-afacadFlux mt-[5px] font-bold border-[0px] text-[#fff]' onClick={handleCancel}>Cancel</Button>
                <Button className='bg-sky-400 font-afacadFlux mt-[5px] font-bold border-[0px] text-[#fff]'>Save</Button>
            </div>
        </Modal>
        {/* edit profile */}
    </div>
  )
}

export default ProfilePage
