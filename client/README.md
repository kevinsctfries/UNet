# UNet Client

Frontend for UNet - A social platform for building communities.

## 🚀 Features

- **Authentication**

  - JWT-based auth with persistent sessions
  - Google OAuth integration

- **Unions (Communities)**

  - Join and interact with communities
  - Custom profile and cover images
  - Role-based access control

- **Content**
  - Create posts with text and images
  - Sort by popularity, trending, or newest
  - Filter by timeframe
  - Like and comment system

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite
- TailwindCSS
- Axios
- React Query
- Cloudinary SDK

## 📦 Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
# Create .env file
touch .env

# Add required variables
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

3. Start development server:

```bash
npm run dev
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Project Structure

```
/src
├── /components     # Reusable UI components
├── /context       # React Context providers
├── /hooks         # Custom React hooks
├── /pages         # Route components
├── /types         # TypeScript definitions
├── /utils         # Helper functions
└── /assets        # Static assets
```

### Environment Variables

```properties
VITE_CLOUDINARY_CLOUD_NAME=           # Your Cloudinary cloud name
VITE_CLOUDINARY_UPLOAD_PRESET=        # Your Cloudinary upload preset
```

## 🧪 Testing

```bash
npm run test
```

## 📚 Dependencies

Core:

- react
- react-dom
- react-router-dom
- axios
- @tanstack/react-query

UI:

- tailwindcss
- @mui/icons-material
- @mui/material

Development:

- typescript
- vite
- @vitejs/plugin-react
- eslint
- prettier

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use ESLint and Prettier for code formatting
3. Add appropriate tests for new features
4. Follow the existing component patterns
