# 💬 VChat - Real-Time Messaging Application



---

## ✨ Features

- ⚡ **Instant Messaging**: Real-time communication powered by Socket.io for zero-delay chatting.
  
- 📱 **Mobile-First Design**: Fully responsive layout with a toggleable sidebar and independent scrolling containers.
  
- 🔐 **Secure Authentication**: User login and registration system to keep your conversations private.
 
- 👥 **Online Status**: See who's online and active in real-time.
  
- 🎨 **Clean UI/UX**: Built with Tailwind CSS for a modern, minimalist aesthetic.


---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS (Styling)
- Socket.io-client (Real-time updates)
- Lucide React (Icons)

**Backend:**
- Node.js & Express.js
- MongoDB (Database)
- Socket.io (WebSocket Server)
- JWT-base Authentication

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas or local MongoDB instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/siddiq55/vchat.git
   cd vchat
   ```
   
2. **Backend Setup:**
   ```bash
   cd vchat-backend
   npm install
   
   ```
   
3. **Frontend Setup:**
   ```bash
   cd ../vchat-frontend
   npm install
   ```
4. **Set up Environment Variables:**
Create a `.env` file in the `vchat-backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url


```

5. **Run the Application:**
```bash
# In /vchat-backend
npm start

# In /vchat-frontend (separate terminal)
npm run dev

```
