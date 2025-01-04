import Sidebar from "../components/molecules/Sidebar"
import Preloader from '../components/atoms/Preloader'
import { Button, Tabs, Modal, Input } from 'antd'
import { useState, useEffect } from 'react'
import { useAuthStore } from "../store/useAuthStore"
import { getPastTime, formatPastTime } from "../utils/formatDate"
import { usePostStore } from "../store/usePostStore"
const { TextArea } = Input;
import { Controller, useForm } from 'react-hook-form'
import MobileNavigation from "../components/molecules/MobileNavigation"




const ProfilePage = () => {
    const [isEditProfileImageModalOpen, setIsEditProfileImageModalOpen] = useState(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
    const { control, handleSubmit, setValue, formState: {errors} } = useForm()

    const { authUser, updateProfileImage, checkAuth, updateProfileDetails } = useAuthStore()
    

    useEffect(() => {
        checkAuth()
    }, [])

    const onSubmit = async (data) => {
        try {
            const res = await updateProfileDetails(data)
            if (!res) {
                console.log(`Error occured`)
            }

            setIsEditProfileModalOpen(false)
            document.body.classList.remove("modal-open");
            checkAuth()
        } catch(error) {
            console.log(error)
        }
    }

    const { loggedInUserPosts, fetchLoginedUserPosts } = usePostStore()
    const [currentlyChoosenProfileImage, setCurrentlyChoosenProfileImage] = useState(() => {
        if (authUser.profileImage) {
            const baseURL = 'https://twikaapp.netlify.app';
            if (authUser.profileImage.startsWith(baseURL)) {
                return authUser.profileImage.replace(baseURL, '');
            }
        }
        return authUser.profileImage || null;
    })

    const predefinedProfileImages = [
        {
            id: "1",
            image_link: "/images/avatar.jpg",
        },
        {
            id: "2",
            image_link: "/images/memo_9.png",
        },
        {
            id: "3",
            image_link: "/images/memo_18.png",
        },
        {
            id: "4",
            image_link: "/images/notion_8.png",
        },
        {
            id: "5",
            image_link: "/images/vibrent_6.png",
        },
        {
            id: "6",
            image_link: "/images/memo_26.png",
        },
        {
            id: "7",
            image_link: "/images/pic.webp",
        },
    ]

    const handleChooseImage = (id) => {
        const selectedImage = predefinedProfileImages.find(image => image.id === id);
        setCurrentlyChoosenProfileImage(selectedImage?.image_link);
        console.log(selectedImage)
    };

    const handleUploadImage = async (e) => {
        try {
            const choosenImage = `https://twikaapp.netlify.app${currentlyChoosenProfileImage}`
            const data = {
                profileImage: choosenImage
            }
            const res = await updateProfileImage(data)
            if(!res) {
                console.log(`Error uploading image ${choosenImage}`)
            }

            setIsEditProfileImageModalOpen(false);
            document.body.classList.remove("modal-open");
            checkAuth()
        } catch(error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fetchLoginedUserPosts()
    }, [])

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
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
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
          <p className='text-center font-afacadFlux text-white mt-[20px] select-none cursor-pointer'>User has saved no posts yet</p>
          ,
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

    useEffect(() => {
        if (isEditProfileModalOpen) {
          setValue('fullName', authUser?.fullName || '');
          setValue('username', authUser?.username || '');
          setValue('bio', authUser?.bio || 'No bio yet');
        }
    }, [isEditProfileModalOpen, authUser, setValue]);

  return (
    <div className='flex flex-row min-h-screen'>
        <MobileNavigation />
        {/* preloader */}
        <Preloader />
        {/* preloader */}
        <Sidebar />
        <div className='md:ml-[200px] w-full flex flex-row justify-center bg-[#000] md:flex-1'>
            <div className='md:w-[80%] w-full pr-[40px] pl-[40px] pt-[40px] pb-[40px]'>
                <div className='flex flex-col md:flex-row space-y-[20px] md:space-y-[0px] items-center md:space-x-[30px] pb-[40px] border-b-[1px] border-[#333]/[50%] border-solid'>
                    <div onClick={showEditProfileImageModal} className='w-[100px] overflow-hidden cursor-pointer h-[100px] bg-slate-500 rounded-full'>
                        <img src={authUser?.profileImage || '/images/pic.webp'} className='w-full h-full object-cover object-center' alt="Profile" />
                    </div>
                    <div>
                        <p className='font-afacadFlux font-bold select-none cursor-pointer'>{authUser?.username}</p>
                        <div className='mt-[10px] flex flex-row space-x-[15px]'>
                            <p className='font-afacadFlux font-bold select-none cursor-pointer'>{loggedInUserPosts.length} Posts</p>
                            <p className='font-afacadFlux font-bold select-none cursor-pointer'>Joined: {formatPastTime(getPastTime(authUser.createdAt))}</p>
                        </div>
                        <p className='font-afacadFlux font-normal select-none cursor-pointer'>{authUser?.bio || 'No bio yet'}</p>
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
            <div className='grid grid-cols-3 md:grid-cols-6 mt-[15px] gap-4'>
                {predefinedProfileImages.map((image, index) => (
                    <div onClick={() => handleChooseImage(image.id)} key={image.id} className='w-[60px] border-[2px] border-solid border-sky-500 cursor-pointer h-[60px] bg-slate-500 rounded-full relative'>
                        <img src={image.image_link} className='w-full h-full object-cover rounded-full object-center' alt="Profile" />
                        {currentlyChoosenProfileImage === image.image_link &&
                            <div className='bg-blue-500 w-[20px] h-[20px] rounded-full absolute top-0 right-0 flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff">
                                    <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
                                </svg>
                            </div>
                        }
                    </div>
                ))}
            </div>
            <div className='flex flex-row space-x-[15px] mt-[10px]'>
                <Button className='bg-[#333]/[50%] font-afacadFlux mt-[5px] font-bold border-[0px] text-[#fff]' onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleUploadImage} className='bg-sky-400 font-afacadFlux mt-[5px] font-bold border-[0px] text-[#fff]'>Save</Button>
            </div>
        </Modal>
        {/* edit profile image */}


        {/* edit profile */}
        <Modal className="custom-modal" open={isEditProfileModalOpen} onOk={handleOk} footer={null} onCancel={handleCancel}>
            <p className='font-afacadFlux font-normal select-none cursor-pointer'>Edit Profile</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mt-[10px]'>
                    <Controller
                        name='fullName'
                        control={control}
                        rules={{
                            required: "Full Name is required",
                        }}
                        render={({ field }) => (
                            <Input {...field} placeholder='Full Name' className='rounded-[4px] custom-input mt-[5px] bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
                        )}
                    />
                    {errors.fullName && (
                        <p className='font-afacadFlux text-[12px] text-[#FF204E]'>{errors.fullName.message}</p>
                    )}
                    <Controller 
                        name='username'
                        control={control}
                        rules={{
                            required: "Username is required",
                        }}
                        render={({ field }) => (
                            <Input {...field} placeholder='Username' className='rounded-[4px] custom-input mt-[5px] bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
                        )}
                    />
                    {errors.username && (
                        <p className='font-afacadFlux text-[12px] text-[#FF204E]'>{errors.username.message}</p>
                    )}
                    <Controller 
                        name='bio'
                        control={control}
                        rules={{
                            required: "Bio is required",
                        }}
                        render={({ field }) => (
                            <TextArea {...field} maxLength={100} placeholder='Bio(Max: 100 characters)' className='rounded-[4px] h-[50px] custom-input mt-[5px] bg-[#000] hover:bg-[#000] placeholder:text-[12px] placeholder:text-white/[50%] placeholder:font-afacadFlux text-white text-afacadFlux text-[13px]' />
                        )}
                    />
                    {errors.bio && (
                        <p className='font-afacadFlux text-[12px] text-[#FF204E]'>{errors.bio.message}</p>
                    )}
                </div>
                <div className='flex flex-row space-x-[15px] mt-[10px]'>
                    <Button className='bg-[#333]/[50%] font-afacadFlux mt-[5px] font-bold border-[0px] text-[#fff]' onClick={handleCancel}>Cancel</Button>
                    <Button htmlType="submit" className='bg-sky-400 font-afacadFlux mt-[5px] font-bold border-[0px] text-[#fff]'>Save</Button>
                </div>
            </form>
        </Modal>
        {/* edit profile */}
    </div>
  )
}

export default ProfilePage
