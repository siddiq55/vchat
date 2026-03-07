import React, {useEffect, useRef, useContext, useState} from 'react';
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils';
import { CiImageOn } from "react-icons/ci";
import { IoSend } from "react-icons/io5";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

export const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);

  const { authUser, onlineUsers } = useContext(AuthContext);


const scrollEnd = useRef();
const [input, setInput] = useState("");
// Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;

    await sendMessage({ text: input.trim() });
    setInput("");
  };

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className='bg-white flex-1 flex flex-col h-full'>
      {/* Chat Header */}
      <div className='h-14 border-b flex items-center px-4 shrink-0 border-gray-200 shadow-sm'>
        <div className='flex items-center gap-3 flex-1'>
          <img src={selectedUser.profilePic || assets.avatar_icon} alt="profile" className='w-10 h-10 rounded-full object-cover' />
          <div className='flex flex-col'>
            <p className='text-sm font-semibold text-gray-900'>{selectedUser.fullName}
              {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
            </p>
            
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <button onClick={() => setSelectedUser(null)} className='md:hidden p-2 hover:bg-gray-100 rounded-lg transition'>
            <img src={assets.arrow_icon} alt="Close" className='w-5 h-5' />
          </button>
          <button className='max-md:hidden p-2 hover:bg-gray-100 rounded-lg transition'>
            <img src={assets.help_icon} alt="Help" className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 flex flex-col'>
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-3 w-full ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
            <div className={`flex flex-col max-w-[70%] ${msg.senderId === authUser._id ? 'items-start' : 'items-end'}`}>
              {msg.image ? (
                <img src={msg.image} alt="" className='max-w-[230] border border-gray-200 rounded-lg overflow-hidden mb-8'/>
              ):(
                <p className={`px-4 py-2 rounded-lg wrap-break-words text-sm ${msg.senderId === authUser._id ? 'bg-gray-200 text-gray-900' : 'bg-red-500 text-white'}`}>
                {msg.text}
                </p>
              )}
                
                <p className='text-[10px] text-gray-400 mt-1'>{formatMessageTime(msg.createdAt)}</p>
            </div>
            <img src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? assets.profile_martin : assets.avatar_icon} alt="" className='w-8 h-8 rounded-full object-cover shrink-0' />
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Message Input */}
      <div className='h-20 flex items-center px-4 border-t shrink-0 border-gray-200 bg-white'>
        <div className='flex-1 flex items-center bg-gray-50 rounded-full border border-gray-300 px-4 py-3'>
          <input onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
              type="text" 
              placeholder="Type a message..." 
              className='flex-1 outline-none focus:border-none bg-gray-50'
          />
          <input onChange={handleSendImage} type="file" id='image' accept='image/png, image/jpeg' hidden />
          <label htmlFor='image' className='cursor-pointer ml-2'>
            <CiImageOn className='w-6 h-6 text-gray-500 hover:text-gray-700 transition'/>
          </label>
        </div>
        <IoSend onClick={handleSendMessage} className='w-7 cursor-pointer ml-3 text-[#ff4141] size-7'/>
      </div>
    </div>
  ) : (
    <div className='hidden md:flex flex-col items-center justify-center gap-3 text-gray-500 bg-white h-full flex-1'>
      <h1 className='text-5xl font-bold text-red-500'>VChat</h1>
      <p className='text-lg font-medium text-gray-700'>Chat anytime, anywhere</p>
    </div>
  )
}