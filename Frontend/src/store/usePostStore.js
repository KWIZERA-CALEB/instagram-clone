import { create } from 'zustand'
import { axiosInstance } from '../utils/axios'
import { useAuthStore } from './useAuthStore'

export const usePostStore = create((set) => ({
    loggedInUserPosts: [],
    isFetchingAllPosts: false,
    allPosts: [],

    fetchAllPosts: async () => {
        set({ isFetchingAllPosts: true })
        try {
            const res = await axiosInstance.get('/posts/all')
            set({ allPosts: res.data.posts })
            set({ isFetchingAllPosts: false })
        } catch(error) {
            console.log(`Error occured ${error}`)
        }
    },

    toggleLikePost: async (postId) => {
        const { likedPosts, updateLikedPosts } = useAuthStore.getState();
        const isLiked = likedPosts.includes(postId);

        try {
            const res = isLiked
                ? await axiosInstance.post(`/dislike/post/${postId}`)
                : await axiosInstance.post(`/like/post/${postId}`);

            updateLikedPosts(postId, !isLiked);

            set((state) => {
                const updatedPosts = state.allPosts.map(post =>
                    post._id === postId
                        ? { ...post, likes: isLiked ? post.likes - 1 : post.likes + 1 }
                        : post
                );
                return { allPosts: updatedPosts };
            });
        } catch (error) {
            console.log("Error occurred while toggling like/dislike:", error);
        }
    },

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