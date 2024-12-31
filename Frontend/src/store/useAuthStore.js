import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'
import toast from 'react-hot-toast'


export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/loggedin-user");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
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

            navigate('/')
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
            console.log(res)
        } catch (error) {
            console.log(error.response.data.message)
        }
    },

}))