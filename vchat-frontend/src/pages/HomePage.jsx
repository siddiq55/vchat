import React, { useState} from 'react'
import { Sidebar } from '../components/Sidebar'
import { ChatContainer } from '../components/ChatContainer'






export const HomePage = () => {

  const [selectedUser, setSelectedUser] = useState(false);


  return (
    
      <div className={`
          w-full 
          h-screen
         
          flex
          max-h-900px
          border 
          border-gray-300 
          shadow-xl 
          p-6
          overflow-hidden 
          
          
          
          
          ${selectedUser 
            ? 'md:grid-cols-[400px_1fr]' 
            : 'md:grid-cols-[400px_1fr]' 
          }
        `}>
      <Sidebar />
      <ChatContainer />
      </div>
    
  )
}
