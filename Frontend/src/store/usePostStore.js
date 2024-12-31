import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'

export const usePostStore = create((set) => ({
    loggedInUserPosts: [],

    createPost: async (data) => {
        try {
            const res = await axiosInstance.post('/posts/create-post', data)
            console.log(res)
        } catch(error) {
            console.log(error)
        }
    },

    fetchLoginedUserPosts: async () => {
        try {
            const res = await axiosInstance.get('/posts/loggedin/posts')
            console.log(res.data)
            set({ loggedInUserPosts: res.data.posts });
        } catch(error) {
            console.log(error)
        }
    }
}))