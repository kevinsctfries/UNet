# UNet - Social Platform for Communities

A modern social networking platform built with React, Node.js, and TypeScript that allows users to create and join communities called "unions".

## 🚀 Features

- **User Authentication**

  - JWT-based authentication
  - Google OAuth integration
  - Secure password handling
  - Persistent sessions

- **Unions (Communities)**

  - Create and join communities
  - Custom cover and profile images
  - Role-based permissions
  - Union-specific posts and content

- **Posts & Interactions**

  - Create text and image posts
  - Like and comment on posts
  - Sort by popularity, trending, or newest
  - Filter by timeframe

- **Image Handling**
  - Cloudinary integration
  - Image optimization
  - Secure upload handling
  - Support for profile and cover photos

## 🛠️ Tech Stack

### Frontend

- React 19
- TypeScript
- TailwindCSS
- Axios
- React Query
- Cloudinary SDK

### Backend

- Node.js
- Express
- MySQL
- JWT Authentication
- Cloudinary

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/kevinsctfries/UNet.git
cd UNet
```

2. Install dependencies:

```bash
# Install API dependencies
cd api
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables:

```bash
# In /api/.env
JWT_SECRET=your_secret_here

# In /client/.env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

4. Start the development servers:

```bash
# Start API server (from /api directory)
npm run dev

# Start client server (from /client directory)
npm run dev
```

## 🌐 API Endpoints

### Auth

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Unions

- `GET /api/unions` - Get all unions
- `GET /api/unions/:slug` - Get specific union
- `POST /api/unions` - Create union
- `PUT /api/unions/:id` - Update union
- `PUT /api/unions/:id/image` - Update union images

### Posts

- `GET /api/posts` - Get posts
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## 🔐 Environment Variables

### API (.env)

```properties
JWT_SECRET=your_jwt_secret_here
```

### Client (.env)

```properties
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Cloudinary](https://cloudinary.com/)
