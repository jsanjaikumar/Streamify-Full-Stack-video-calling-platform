# 🎥 Streamify - Video Calling Platform

<div align="center">
  
  
  <p>A modern, full-stack video calling platform built with React, Node.js, and Stream.io</p>
  
  [![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Made with Node.js](https://img.shields.io/badge/Made%20with-Node.js-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![Stream.io](https://img.shields.io/badge/Powered%20by-Stream.io-005FFF?style=for-the-badge&logo=stream)](https://getstream.io/)
</div>

## 🚀 Features

### � Core Features

- **📞 High-Quality Video Calls** - Crystal clear video calling with Stream.io integration
- **💬 Real-time Chat** - Instant messaging with typing indicators & reactions
- **� Friend Management** - Send and manage friend requests
- **🔐 Secure Authentication** - JWT-based authentication with bcrypt password hashing
- **📱 Responsive Design** - Beautiful UI that works on all devices
- **🌙 Theme Support** - 32 unique UI themes (dark and light options)
- **🔔 Notifications** - Real-time notifications for friend requests and messages
- **🎬 Screen Sharing & Recording** - Share your screen during video calls

### �️ Technical Features

- **Real-time Communication** - WebRTC for video calls and Socket.io for chat
- **RESTful API** - Clean and organized backend API structure
- **MongoDB Integration** - Scalable NoSQL database solution
- **State Management** - Zustand for efficient client-side state management
- **Modern UI** - TailwindCSS and DaisyUI for stunning interfaces
- **Error Handling** - Comprehensive error handling on frontend and backend

## 🏗️ Technology Stack

### Frontend

- **React 19** - Latest React with hooks and modern patterns
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS + DaisyUI** - Utility-first CSS with beautiful components
- **React Router** - Client-side routing
- **React Query (TanStack Query)** - Server state management
- **Zustand** - Lightweight state management
- **Stream.io Video SDK** - Professional video calling features
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful notifications
- **Lucide React** - Beautiful icons

### Backend

- **Node.js + Express** - Fast and minimalist web framework
- **MongoDB + Mongoose** - NoSQL database with elegant object modeling
- **JWT Authentication** - Secure token-based authentication
- **bcryptjs** - Password hashing and security
- **Stream Chat** - Real-time chat functionality
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - HTTP cookie parsing middleware

## 📁 Project Structure

```
streamify-video-calls/
├── backend/                    # Backend API server
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── chat.controller.js
│   │   │   └── user.controller.js
│   │   ├── lib/               # Utilities and configurations
│   │   │   ├── db.js
│   │   │   └── stream.js
│   │   ├── middleware/        # Custom middleware
│   │   │   └── auth.middleware.js
│   │   ├── models/           # Database models
│   │   │   ├── FriendRequest.js
│   │   │   └── User.js
│   │   ├── routes/           # API routes
│   │   │   ├── auth.route.js
│   │   │   ├── chat.route.js
│   │   │   └── user.route.js
│   │   └── server.js         # Main server file
│   └── package.json
├── frontend/                  # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── constants/        # App constants
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and API clients
│   │   ├── pages/           # Application pages
│   │   ├── store/           # State management
│   │   └── App.jsx
│   └── package.json
└── package.json              # Root package.json
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Stream.io Account** (for video calling and chat features)

### 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jsanjaikumar/Streamify-video-calling-platform.git
   cd streamify-video-calls
   ```

2. **Install dependencies**

   ```bash
   # Install all dependencies (root, backend, and frontend)
   npm run build
   ```

3. **Environment Setup**

   Create a `.env` file in the `backend` directory:

   ```bash
   cp backend/.env.example backend/.env
   ```

   Update the `.env` file with your credentials:

   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/streamify

   # Get these from https://getstream.io/
   STEAM_API_KEY=your_stream_api_key
   STEAM_API_SECRET=your_stream_api_secret

   JWT_SECRET_KEY=your_super_secret_jwt_key
   NODE_ENV=development
   ```

   Create a `.env` file in the `frontend` directory:

   ```env
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

4. **Start the development servers**

   **Backend (Terminal 1):**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   **Frontend (Terminal 2):**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running!

## 🎯 Usage

### Getting Started with Streamify

1. **Sign Up** - Create a new account with your email and password
2. **Complete Onboarding** - Add your profile information
3. **Add Friends** - Send friend requests to other users
4. **Start Calling** - Click the call button next to any friend
5. **Chat Away** - Send messages during calls or use standalone chat

### Key Features Guide

- **🎥 Video Calls**: High-quality video calling with screen sharing capabilities
- **� Chat**: Real-time messaging with typing indicators and emoji support
- **👥 Friends**: Manage your connections and see who's online
- **🔔 Notifications**: Stay updated with friend requests and messages
- **🌙 Themes**: Choose from 32 unique themes including dark and light options

## 🛠️ API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/friends` - Get friends list
- `POST /api/users/friend-request` - Send friend request

### Chat

- `GET /api/chat/token` - Get Stream chat token
- `POST /api/chat/create` - Create chat channel

## 🚀 Deployment

### Production Build

```bash
# Build the entire application
npm run build

# Start production server
npm start
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5001
MONGO_URI=your_production_mongo_uri
STEAM_API_KEY=your_production_stream_key
STEAM_API_SECRET=your_production_stream_secret
JWT_SECRET_KEY=your_production_jwt_secret
```

## 🤝 Contributing

We welcome contributions to Streamify! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and patterns
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Stream.io** - For providing excellent video calling and chat SDKs
- **React Team** - For the amazing React framework
- **Node.js Community** - For the robust backend ecosystem
- **MongoDB** - For the flexible NoSQL database solution

## 📞 Support

If you have any questions or need help getting started:

- **GitHub Issues** - [Create an issue](https://github.com/jsanjaikumar/Streamify-video-calling-platform/issues)
- **Documentation** - Check out the inline code documentation
- **Stream.io Docs** - [Stream.io Documentation](https://getstream.io/video/docs/)

---

<div align="center">
  <p>Made with ❤️ by the Streamify team</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
