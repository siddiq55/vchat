import {useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineDotsVertical } from "react-icons/hi";
import assets from '../assets/assets';
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";


export const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  
  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState(false);
  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div className={`w-100 bg-white text-black flex flex-col ${selectedUser ? 'max-md:hidden' : ''}`}>
      <div className='p-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-[#ff4141]'>VChat</h1>
          <div className='relative group'>
            <HiOutlineDotsVertical className='w-6 h-6 cursor-pointer hover:text-gray-300 transition' />
            <div className='absolute top-full right-0 z-20 w-32 p-2 bg-white border border-gray-200 rounded-md  text-black hidden group-hover:block '>
              <p onClick={() => navigate('/profile')} className='px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer rounded-md transition'>
                Edit Profile
              </p>
              <p onClick={() => logout()} className='px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer rounded-md transition'>
                Logout
              </p>
            </div>
          </div>
        </div>
              <div className='bg-white rounded-full flex items-center mt-6 px-4 py-2 border border-gray-200'>
        <input onChange={(e)=>setInput(e.target.value)}
          type='text'
          placeholder='Search users...'
          className='w-full outline-none text-sm bg-transparent' />
        
             </div>
      </div>
        <div className='flex flex-col overflow-y-auto'>
        {filteredUsers.map((user, index) => (
          <div onClick={()=> {setSelectedUser(user)}}
          key={index} className={`relative flex items-center gap-3 p-3 pl-4 rounded cursor-pointer max-sm:text-sm
          ${selectedUser?._id === user._id && 'bg-gray-100'}`} >
          
          
             <img src={user?.profilePic || assets.avatar_icon} alt="" 
             className='w-8.5 rounded-full'/>
             <div className='flex flex-col leading-5'>
               <p>{user.fullName}</p>
               {onlineUsers.includes(user._id) ? <span className='text-xs text-green-500'>Online</span> : <span className='text-xs text-gray-500'>Offline</span>}
             </div>
             {unseenMessages[user._id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5
             flex justify-center items-center rounded-full bg-green-200'>{unseenMessages[user._id]}</p>}
          </div>

        ))}
        </div>





    </div>
  );
};