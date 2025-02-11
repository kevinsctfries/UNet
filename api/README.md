# UNet API

Backend server for UNet - A social platform for building communities.

## 🚀 Features

- **Authentication**

  - JWT-based token authentication
  - Google OAuth verification
  - Session management

- **Database**

  - MySQL integration
  - Optimized queries
  - Data validation

- **Image Handling**
  - Cloudinary integration
  - Image upload processing
  - Secure file handling

## 🛠️ Tech Stack

- Node.js
- Express
- MySQL
- JWT
- Cloudinary

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
JWT_SECRET=your_jwt_secret_here
```

3. Start development server:

```bash
npm run dev
```

## 📚 API Endpoints

### Authentication

```
POST /api/auth/register    # Register new user
POST /api/auth/login      # Login user
POST /api/auth/logout     # Logout user
```

### Unions

```
GET    /api/unions        # Get all unions
GET    /api/unions/:slug  # Get specific union
POST   /api/unions        # Create union
PUT    /api/unions/:id    # Update union details
```

### Posts

```
GET    /api/posts         # Get posts
POST   /api/posts         # Create post
PUT    /api/posts/:id     # Update post
DELETE /api/posts/:id     # Delete post
```

### Comments

```
GET    /api/comments/:postId  # Get comments for post
POST   /api/comments         # Create comment
DELETE /api/comments/:id     # Delete comment
```

## 🔧 Development

### Project Structure

```
/api
├── /controllers     # Route controllers
├── /routes         # API routes
├── /middleware     # Custom middleware
├── /utils         # Helper functions
└── /config        # Configuration files
```

### Environment Variables

```properties
JWT_SECRET=                    # JWT signing secret
DB_HOST=                      # Database host
DB_USER=                      # Database user
DB_PASSWORD=                  # Database password
DB_NAME=                      # Database name
```

## 🧪 Testing

```bash
npm run test
```

## 📝 Dependencies

Core:

- express
- mysql2
- jsonwebtoken
- cookie-parser
- cors

Development:

- nodemon
- typescript
- ts-node
- @types/express
- @types/node
