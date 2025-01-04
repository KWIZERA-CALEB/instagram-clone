import Sidebar from "../components/molecules/Sidebar"
import Preloader from '../components/atoms/Preloader'
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useEffect, useRef } from 'react'
import { formatMessageTime } from "../utils/formatDate";
import { Input, Button } from 'antd'
const { TextArea } = Input;
import { Link } from "react-router-dom";

const InboxPage = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, sendMessage, subscribeToMessages, unsubscribeFromMessages, getMessages, messages, isMessagesLoading } = useChatStore();

    const { onlineUsers, authUser, checkAuth } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [text, setText] = useState('')

    const messageEndRef = useRef(null)

    useEffect(() => {
        checkAuth()
    }, [])



    const handleSendMessage = async (e) => {
        e.preventDefault()
        try {
            await sendMessage({text: text.trim()})
            setText("");
        } catch(error) {
            console.log(error)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id);
        }
    
        subscribeToMessages();
    
        return () => unsubscribeFromMessages();
    }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if(messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])
  return (
    <div className='flex flex-row min-h-screen'>
        {/* preloader */}
        <Preloader />
        {/* preloader */}
        <Sidebar />
        <div className='md:ml-[200px] w-full min-h-[100vh] bg-[#000] md:flex-1'>
            <div className='w-full flex h-full flex-row'>
                <div className='w-[20%] border-r-[1px] border-[#333]/[50%] border-solid'>
                    <div className='p-[10px]'>
                        <p className='hidden md:block font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>Members ({onlineUsers.length - 1} Online)</p>
                    </div>
                    <div className='mt-[20px] flex flex-col space-y-[4px]'>
                        <div className='p-[5px] md:hidden'>
                            <Link to='/'>
                                <div className='w-[40px] h-[40px] bg-slate-400 cursor-pointer rounded-full text-white flex justify-center items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" height={18} width={18}>
                                        <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
                                    </svg>
                                </div>
                            </Link>
                        </div>
                        {users.map((user, index) => (
                            <div onClick={() => setSelectedUser(user)} key={user._id} className={selectedUser?._id === user._id ? 'w-full flex p-[5px] bg-[#333]/[50%] flex-row space-x-[12px]' : 'w-full flex p-[5px] flex-row space-x-[12px]'}>
                                <div className='w-[40px] border-[2px] border-solid border-sky-500 cursor-pointer h-[40px] bg-slate-500 rounded-full relative'>
                                    <img src={user.profileImage || "/images/memo_32.png"} className='w-full rounded-full h-full object-cover object-center' alt={user.username} />
                                    {onlineUsers.includes(user._id) &&
                                        <div className='bg-green-500 w-[10px] h-[10px] rounded-full absolute bottom-0 right-0 flex justify-center items-center'></div>
                                    }
                                </div>
                                <div>
                                    <p className='hidden md:block font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>{user.username}</p>
                                    {onlineUsers.includes(user._id) ? 
                                    <p className='hidden md:block font-afacadFlux font-bold select-none text-[#333]/[80%] cursor-pointer text-start text-[14px]'>Online</p>
                                        :
                                    <p className='hidden md:block font-afacadFlux font-bold select-none text-[#333]/[80%] cursor-pointer text-start text-[14px]'>Offline</p>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-[80%]'>
                    {!selectedUser ? 
                    <div className='h-full w-full flex justify-center items-center'>
                        <p className='font-afacadFlux font-bold select-none text-[#333]/[80%] cursor-pointer text-center text-[14px]'>No Selected Chat</p>
                    </div>
                        :
                    <div className='relative flex flex-col h-full'>
                        {/* chat header */}
                        <div className='w-full h-[80px] p-[12px] border-b-[1px] border-[#333]/[50%] border-solid'>
                            <div className='w-full flex p-[5px] flex-row space-x-[12px]'>
                                <div className='w-[40px] border-[2px] border-solid border-sky-500 cursor-pointer h-[40px] bg-slate-500 rounded-full relative'>
                                    <img src={selectedUser?.profileImage || "/images/memo_32.png"} className='w-full rounded-full h-full object-cover object-center' alt={selectedUser.username} />
                                    {onlineUsers.includes(selectedUser?._id) &&
                                        <div className='bg-green-500 w-[10px] h-[10px] rounded-full absolute bottom-0 right-0 flex justify-center items-center'></div>
                                    }
                                </div>
                                <div>
                                    <p className='font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>{selectedUser?.username}</p>
                                    {onlineUsers.includes(selectedUser?._id) ? 
                                    <p className='font-afacadFlux font-bold select-none text-[#333]/[80%] cursor-pointer text-start text-[14px]'>Online</p>
                                        :
                                    <p className='font-afacadFlux font-bold select-none text-[#333]/[80%] cursor-pointer text-start text-[14px]'>Offline</p>
                                    }
                                </div>
                            </div>
                        </div>
                        {/* chat header */}
                        <div className='flex-1 max-h-[calc(100vh-80px-60px)] overflow-y-auto p-[12px]'>
                            {messages.length === 0 ? (
                                <p className='font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>No Message</p>
                            ) : (
                                messages.map((message, index) => (
                                    <div key={index} ref={messageEndRef} className={message.senderId === authUser._id ?  'flex justify-end mt-[4px]' : 'flex justify-start mt-[4px]'}>
                                        <div className='bg-[#333]/[50%] p-[8px] rounded-full relative'>
                                            <p className='font-afacadFlux font-bold absolute top-[32px] right-[6px] select-none text-[#333]/[80%] cursor-pointer text-start text-[14px]'>{formatMessageTime(message.createdAt)}</p>
                                            <p className='font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>
                                                {message.text || "Loading..."}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {/* texting area */}
                        <form onSubmit={handleSendMessage}>
                            <div className='w-full absolute bg-[#000] bottom-0 flex flex-row space-x-[6px] right-0 left-0 h-[60px] p-[12px] border-t-[1px] border-[#333]/[50%] border-solid'>
                                <TextArea onKeyDown={handleKeyDown} value={text}  onChange={(e) => setText(e.target.value)} placeholder='Message...' className='rounded-[4px] flex-1 h-[30px] custom-input mt-[5px] bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
                                <Button htmlType="submit" className='bg-sky-400 font-afacadFlux mt-[5px] font-bold border-[0px] text-[#fff]'>Send</Button>
                            </div>
                        </form>
                        {/* texting area */}
                    </div>
                    }

                </div>
            </div>
        </div>

    </div>

  )
}

export default InboxPage
