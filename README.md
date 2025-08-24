# Hipnode - Developer Community Platform

A modern, full-stack developer community platform built with Next.js 14, featuring social networking, content creation, and professional development tools.

<img width="1705" height="974" alt="Screenshot 2025-08-24 at 11 09 17" src="https://github.com/user-attachments/assets/485edc8f-c206-4b08-ac32-0050e95c005e" />

## 🚀 Features

### Core Functionality

- **Social Networking**: Create posts, share content, and interact with other developers
- **User Authentication**: Secure authentication powered by Clerk
- **Content Management**: Rich text editor with TinyMCE integration
- **File Uploads**: Image and audio uploads via UploadThing and AWS S3
- **Real-time Notifications**: Stay updated with likes, comments, and mentions

### Community Features

- **Groups**: Create and join developer communities
- **Meetups**: Organize and discover local developer events
- **Podcasts**: Share and listen to developer-focused audio content
- **Interviews**: Showcase developer success stories and experiences
- **Content Moderation**: Report system and content filtering

### Developer Tools

- **Onboarding Flow**: Progressive user onboarding with skill assessment
- **Profile Management**: Comprehensive user profiles with performance metrics
- **Search & Discovery**: Advanced search with filters and categories
- **Responsive Design**: Mobile-first design with dark/light theme support

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation

### Backend & Database

- **Prisma** - Database ORM
- **MongoDB** - NoSQL database
- **Next.js API Routes** - Server-side API endpoints
- **Clerk** - Authentication and user management

### File Storage & Media

- **UploadThing** - File upload service
- **TinyMCE** - Rich text editor

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## 📁 Project Structure

```
Hipnode/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (questionaire)/    # Onboarding flow
│   ├── (site)/            # Main application routes
│   └── api/               # API endpoints
├── components/             # Reusable React components
│   ├── forms/             # Form components
│   ├── group/             # Group-related components
│   ├── Home/              # Home page components
│   ├── Post/              # Post-related components
│   ├── ProfilePage/       # Profile components
│   ├── shared/            # Shared/common components
│   └── ui/                # UI component library
├── lib/                    # Utility functions and actions
├── prisma/                 # Database schema and migrations
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Clerk account for authentication
- AWS S3 bucket (optional, for file storage)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Hipnode
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with the following variables:

   ```env
   DATABASE_URL="your-mongodb-connection-string"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
   CLERK_SECRET_KEY="your-clerk-secret-key"
   UPLOADTHING_SECRET="your-uploadthing-secret"
   UPLOADTHING_APP_ID="your-uploadthing-app-id"
   AWS_ACCESS_KEY_ID="your-aws-access-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
   AWS_REGION="your-aws-region"
   AWS_S3_BUCKET="your-s3-bucket-name"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run postinstall` - Generate Prisma client

## 🗄️ Database Schema

The application uses MongoDB with the following main models:

- **User** - User profiles and authentication
- **Post** - User-generated content
- **Comment** - Post comments and replies
- **Group** - Community groups
- **Meetups** - Local developer events
- **Podcasts** - Audio content
- **Interviews** - Developer success stories
- **Notification** - User notifications

## 🔐 Authentication

Authentication is handled by Clerk, providing:

- Social login (Google, GitHub, etc.)
- Email/password authentication
- User profile management
- Session management

## 📤 File Uploads

The platform supports file uploads through:

- **UploadThing** - For general file uploads

## 🎨 UI Components

Built with a comprehensive component library including:

- Form components with validation
- Modal dialogs and overlays
- Navigation components
- Data display components
- Interactive elements (buttons, inputs, etc.)

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

- Check the [Issues](https://github.com/your-username/Hipnode/issues) page
- Create a new issue with detailed information
- Contact the development team
