import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'
import toast from 'react-hot-toast'
import { io } from "socket.io-client";


const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    likedPosts: [],
    selectedPublicProfile: null,
    selectedPublicProfilePosts: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/loggedin-user");
            set({ authUser: res.data, likedPosts: res.data.likedPosts, });
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            setTimeout(() => {
                set({ isCheckingAuth: false });
            }, 5000)
        }
    },

    updateProfileImage: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/update-profile-image", data);
        } catch (error) {
            console.log(error);
        }
    },

    updateProfileDetails: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/update-profile-info", data);
        } catch (error) {
            console.log(error);
        }
    },

    fetchPublicUserProfileInfo: async (username) => {
        try {
            const res = await axiosInstance.get(`/auth/public-profile/${username}`);
            set({ selectedPublicProfile: res.data, selectedPublicProfilePosts: res.data.posts });
        } catch (error) {
            console.log(error);
        }
    },

    updateLikedPosts: (postId, isLiked) => {
        try {
            set(() => {
                const updatedLikedPosts = isLiked ?  [...state.likedPosts, postId] : state.likedPosts.filter((id) => id !== postId);
                return { likedPosts: updatedLikedPosts };
            })
        } catch(error) {
            console.log(error)
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            console.log(res)
        } catch (error) {
            console.log(error.response.data.message)
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });

            toast.success("Loggedin successfully", { 
                position: 'bottom-center',
                duration: 5000,            
                className: 'font-roboto text-[12px] font-bold cursor-pointer',
                style: {
                    color: '#fff',        
                    backgroundColor: '#15B392',
                    padding: '6px 20px', 
                },
            });

            get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message || "Login Failed", { 
                position: 'bottom-center',
                duration: 5000,            
                className: 'font-roboto text-[12px] font-bold cursor-pointer',
                style: {
                    color: '#fff',        
                    backgroundColor: '#CC2B52',
                    padding: '6px 20px', 
                },
            });
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Loggedout successfully", { 
                position: 'bottom-center',
                duration: 5000,            
                className: 'font-roboto text-[12px] font-bold cursor-pointer',
                style: {
                    color: '#fff',        
                    backgroundColor: '#15B392',
                    padding: '6px 20px', 
                },
            });
            get().disconnectSocket();
            console.log(res)
        } catch (error) {
            console.log(error.response.data.message)
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
    
        const socket = io(BASE_URL, {
          query: {
            userId: authUser._id,
          },
        });
        socket.connect();
    
        set({ socket: socket });
    
        socket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },

}))
