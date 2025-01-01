import Sidebar from "../components/molecules/Sidebar"
import Preloader from '../components/atoms/Preloader'
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useEffect } from 'react'
import { formatMessageTime } from "../utils/formatDate";
import { Input, Button } from 'antd'
const { TextArea } = Input;

const InboxPage = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, sendMessage, subscribeToMessages, unsubscribeFromMessages, getMessages, messages, isMessagesLoading } = useChatStore();

    const { onlineUsers, authUser } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [text, setText] = useState('')



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

    console.log(messages)
  return (
    <div className='flex flex-row min-h-screen'>
        {/* preloader */}
        <Preloader />
        {/* preloader */}
        <Sidebar />
        <div className='ml-[200px] min-h-[100vh] bg-[#000] flex-1'>
            <div className='w-full flex h-full flex-row'>
                <div className='w-[20%] border-r-[1px] border-[#333]/[50%] border-solid'>
                    <div className='p-[10px]'>
                        <p className='font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>Members ({onlineUsers.length - 1} Online)</p>
                    </div>
                    <div className='mt-[20px] flex flex-col space-y-[4px]'>
                        {users.map((user, index) => (
                            <div onClick={() => setSelectedUser(user)} key={user._id} className={selectedUser?._id === user._id ? 'w-full flex p-[5px] bg-[#333]/[50%] flex-row space-x-[12px]' : 'w-full flex p-[5px] flex-row space-x-[12px]'}>
                                <div className='w-[40px] border-[2px] border-solid border-sky-500 cursor-pointer h-[40px] bg-slate-500 rounded-full relative'>
                                    <img src={user.profileImage || "/images/memo_32.png"} className='w-full rounded-full h-full object-cover object-center' alt={user.username} />
                                    {onlineUsers.includes(user._id) &&
                                        <div className='bg-green-500 w-[10px] h-[10px] rounded-full absolute bottom-0 right-0 flex justify-center items-center'></div>
                                    }
                                </div>
                                <div>
                                    <p className='font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>{user.username}</p>
                                    {onlineUsers.includes(user._id) ? 
                                    <p className='font-afacadFlux font-bold select-none text-[#333]/[80%] cursor-pointer text-start text-[14px]'>Online</p>
                                        :
                                    <p className='font-afacadFlux font-bold select-none text-[#333]/[80%] cursor-pointer text-start text-[14px]'>Offline</p>
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
                    <div className='relative h-full'>
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
                        <div className='flex-1 overflow-y-auto p-[12px]'>
                            {messages.length === 0 ? (
                                <p className='font-afacadFlux font-bold select-none cursor-pointer text-start text-[14px]'>No Message</p>
                            ) : (
                                messages.map((message, index) => (
                                    <div key={index} className={message.senderId === authUser._id ?  'flex justify-end mt-[4px]' : 'flex justify-start mt-[4px]'}>
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
                            <div className='w-full absolute bottom-0 flex flex-row space-x-[6px] right-0 left-0 h-[60px] p-[12px] border-t-[1px] border-[#333]/[50%] border-solid'>
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
