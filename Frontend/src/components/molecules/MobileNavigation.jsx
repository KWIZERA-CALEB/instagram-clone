import { useLocation, Link } from "react-router-dom"
import { useAuthStore } from "../../store/useAuthStore"

const MobileNavigation = () => {
   const currentPath = useLocation()
   const { authUser } = useAuthStore()
  return (
    <div className='flex justify-between items-center z-50 bottom-0 right-0 left-0 bg-[#000] border-t-[1px] border-[#333]/[50%] border-solid w-full fixed md:hidden h-[50px] p-[15px]'>
       <div className={currentPath.pathname == '/' ? 'rounded-[6px] cursor-pointer bg-[#333]/[50%] p-[6px]' : 'rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'}>
            <Link to='/'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                    <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path>
                </svg>
            </Link>
        </div>
       <div className="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
            </svg>
        </div>
       <div className={currentPath.pathname == '/inbox' ? 'rounded-[6px] cursor-pointer bg-[#333]/[50%] p-[6px]' : 'rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'}>
            <Link to='/inbox'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                    <path d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3ZM12 17H14C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17Z"></path>
                </svg>
            </Link>
        </div>
       <div className={currentPath.pathname == '/watch' ? 'rounded-[6px] cursor-pointer bg-[#333]/[50%] p-[6px]' : 'rounded-[6px] cursor-pointer hover:bg-[#333]/[50%] p-[6px]'}>
            <Link to='/watch'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='20' width='20' fill="#fff">
                    <path d="M15.4142 4.99998H21.0082C21.556 4.99998 22 5.44461 22 6.00085V19.9991C22 20.5519 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5553 2 19.9991V6.00085C2 5.44808 2.45531 4.99998 2.9918 4.99998H8.58579L6.05025 2.46445L7.46447 1.05023L11.4142 4.99998H12.5858L16.5355 1.05023L17.9497 2.46445L15.4142 4.99998ZM4 6.99998V19H20V6.99998H4Z"></path>
                </svg>
            </Link>
        </div>
        {authUser ? 
            <div>
                <div className='w-[20px] h-[20px] bg-slate-500 overflow-hidden rounded-full'>
                    <Link to='/profile'>
                        <img src={authUser?.profileImage || "/images/pic.webp"} className='w-full h-full object-cover object-center' alt="Profile" />
                    </Link>
                </div>
            </div>
        : 
            <div>
                <Link to='/login'>
                    <div className='w-[20px] h-[20px] bg-slate-500 overflow-hidden rounded-full'>
                        <img src={authUser?.profileImage || "/images/pic.webp"} className='w-full h-full object-cover object-center' alt="Profile" />
                    </div>
                </Link>
            </div>
        }
    </div>
  )
}

export default MobileNavigation
