import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Modal, Input } from 'antd'
import { useState } from 'react'
import { useAuthStore } from "../../store/useAuthStore";
import { usePostStore } from "../../store/usePostStore"
import toast from 'react-hot-toast'

const { TextArea } = Input;

const Sidebar = () => {
    const currentPath = useLocation()
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
    const [postDescription, setPostDescription] = useState('Post Description')
    const [color, setColor] = useState("#1c7d71");
    const navigate = useNavigate();


    const { authUser, logout } = useAuthStore()
    const { createPost } = usePostStore()

    const handleAddPost = async (e) => {
        e.preventDefault()
        try {
            const data = {
                description: postDescription,
                color: color
            }
            await createPost(data)
            setIsCreatePostModalOpen(false)
            document.body.classList.remove("modal-open");
        } catch(error) {
            console.log(error)
        }
    }

    const handleShowBeingWorkedOn = () => {
        toast.error("Being Worked on", { 
            position: 'bottom-center',
            duration: 5000,            
            className: 'font-roboto text-[12px] font-bold cursor-pointer',
            style: {
                color: '#fff',        
                backgroundColor: '#CC2B52',
                padding: '6px 20px', 
            },
        });
    }

    const handleLogout = async () => { 
        await logout(); 
        navigate('/login'); 
    };

    const showCreatePostModal = () => {
        setIsCreatePostModalOpen(true)
        document.body.classList.add("modal-open");
    };
  
    const handleOk = () => {
        setIsCreatePostModalOpen(false)
        document.body.classList.remove("modal-open");
    };
    const handleCancel = () => {
        setIsCreatePostModalOpen(false)
        document.body.classList.remove("modal-open");
    };

    const handleDescriptionChange = (e) => {
        setPostDescription(e.target.value)
    }

    const handleColorChange = (event) => {
        setColor(event.target.value);
    }
  return (
    <div className='w-[200px] bg-[#000] fixed left-0 h-[100vh] border-r-[1px] border-[#333]/[50%] border-solid flex justify-start pr-[10px] pl-[10px] pt-[30px] pb-[30px]'>
        {/* create post modal */}
        <Modal className="custom-modal" width={600} centered open={isCreatePostModalOpen} onOk={handleOk} footer={null} onCancel={handleCancel}>
            <p className='font-afacadFlux font-normal select-none cursor-pointer'>Create New Post</p>
            <div className='w-full'>
                <div style={{ backgroundColor: color }} className='min-h-[200px] pr-[10px] pl-[10px] w-full mt-[20px] flex justify-center items-center'>
                    <div className="flex justify-center items-center w-full">
                        <p className="font-afacadFlux text-center text-white select-none cursor-pointer break-words">
                            {postDescription}
                        </p>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <div className='mt-[10px]'>
                    <p className='font-afacadFlux font-normal select-none cursor-pointer underline'>Post Background Color</p>
                    <input type="color" value={color} onChange={handleColorChange} className="w-[40px] h-[40px] rounded-full cursor-pointer"/>
                </div>
                <div className='mt-[20px]'>
                    <p className='font-afacadFlux font-normal select-none cursor-pointer underline'>Post Description</p>
                    <TextArea onChange={handleDescriptionChange} maxLength={40} placeholder='Description (Max: 40 characters)' className='rounded-[4px] h-[50px] custom-input mt-[5px] bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
                </div>
                <div className='flex flex-row space-x-[15px] mt-[10px]'>
                    <Button className='bg-[#333]/[50%] font-afacadFlux mt-[5px] font-bold border-[0px] text-[#fff]' onClick={handleCancel}>Cancel</Button>
                    <Button htmlType="button" onClick={handleAddPost} className='bg-sky-400 font-afacadFlux mt-[5px] font-bold border-[0px] text-[#fff]'>Twika Post</Button>
                </div>
            </div>
        </Modal>
        {/* create post modal */}

      <div className='flex flex-col w-full justify-between'>
        {/* top sidebar */}
        <div className='flex flex-col w-full space-y-[24px]'>
            <div><h3 className='text-[#fff] font-bold italic select-none p-[6px] cursor-pointer font-afacadFlux'><Link to="/">Twika🔥</Link></h3></div>
            <div className='flex flex-col space-y-[10px]'>
                <div className={currentPath.pathname == '/' ? 'flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer bg-[#333]/[50%] p-[6px]' : 'flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                        <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path>
                    </svg>
                    <p className='text-[#fff] font-bold font-afacadFlux'><Link to='/'>Home</Link></p>
                </div>
                <div onClick={handleShowBeingWorkedOn} className='flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                        <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                    </svg>
                    <p className='text-[#fff] font-bold font-afacadFlux'>Search</p>
                </div>
                <div className={currentPath.pathname == '/explore' ? 'flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer bg-[#333]/[50%] p-[6px]' : 'flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM16.5 7.5L14 14L7.5 16.5L10 10L16.5 7.5ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"></path>
                    </svg>
                    <p className='text-[#fff] font-bold font-afacadFlux'><Link to='/explore'>Explore</Link></p>
                </div>
                <div onClick={handleShowBeingWorkedOn} className='flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                        <path d="M15.4142 4.99998H21.0082C21.556 4.99998 22 5.44461 22 6.00085V19.9991C22 20.5519 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5553 2 19.9991V6.00085C2 5.44808 2.45531 4.99998 2.9918 4.99998H8.58579L6.05025 2.46445L7.46447 1.05023L11.4142 4.99998H12.5858L16.5355 1.05023L17.9497 2.46445L15.4142 4.99998ZM4 6.99998V19H20V6.99998H4Z"></path>
                    </svg>
                    <p className='text-[#fff] font-bold font-afacadFlux'>Watch</p>
                </div>
                {authUser ?
                    <div className={currentPath.pathname == '/inbox' ? 'flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer bg-[#333]/[50%] p-[6px]' : 'flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                            <path d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3ZM12 17H14C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17Z"></path>
                        </svg>
                        <p className='text-[#fff] font-bold font-afacadFlux'><Link to='/inbox'>Inbox</Link></p>
                    </div>
                    :
                    <div className='flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                            <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
                        </svg>
                        <p className='text-[#fff] font-bold font-afacadFlux'><Link to='/login'>Inbox</Link></p>
                    </div>
                }
                <div onClick={handleShowBeingWorkedOn} className='flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                        <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path>
                    </svg>
                    <p className='text-[#fff] font-bold font-afacadFlux'>Notifications</p>
                </div>
                {authUser ? 
                    <div onClick={showCreatePostModal} className='flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                            <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
                        </svg>
                        <p className='text-[#fff] font-bold font-afacadFlux'>Create</p>
                    </div>
                    :
                    <div className='flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                            <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
                        </svg>
                        <p className='text-[#fff] font-bold font-afacadFlux'><Link to='/login'>Create</Link></p>
                    </div>
                }
                <div className={currentPath.pathname == '/profile' ? 'flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer bg-[#333]/[50%] p-[6px]' : 'flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'}>
                    <div className='w-[20px] h-[20px] bg-slate-500 overflow-hidden rounded-full'>
                        <img src={authUser?.profileImage || "/images/pic.webp"} className='w-full h-full object-cover object-center' alt="Profile" />
                    </div>
                    <p className='text-[#fff] font-bold font-afacadFlux'><Link to={authUser ? '/profile' : '/login'}>Profile</Link></p>
                </div>
            </div>
        </div>
        {/* top sidebar */}

        {/* bottom sidebar */}
        <div onClick={handleLogout} className='flex flex-row items-center space-x-[12px] w-full rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
            </svg>
            <p className='text-[#fff] font-bold font-afacadFlux'>More</p>
        </div>
        {/* bottom sidebar */}

      </div>
    </div>
  )
}

export default Sidebar
