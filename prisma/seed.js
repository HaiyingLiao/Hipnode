const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.report.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.interviews.deleteMany();
  await prisma.meetups.deleteMany();
  await prisma.podcasts.deleteMany();
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleared existing data');

  // Create 10 demo users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        clerkId: 'user_2abc123def456',
        email: 'sarah.chen@techstartup.com',
        name: 'Sarah Chen',
        image:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        onboardingProgress: 'completed',
        businessStage: 'growth',
        codingLevel: 'intermediate',
        businessTypes: ['SaaS', 'E-commerce'],
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_3def456ghi789',
        email: 'mike.rodriguez@innovate.com',
        name: 'Mike Rodriguez',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        onboardingProgress: 'completed',
        businessStage: 'startup',
        codingLevel: 'beginner',
        businessTypes: ['Mobile App', 'AI/ML'],
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_4ghi789jkl012',
        email: 'emma.wilson@webdev.co',
        name: 'Emma Wilson',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        onboardingProgress: 'completed',
        businessStage: 'established',
        codingLevel: 'advanced',
        businessTypes: ['Web Development', 'Consulting'],
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_5jkl012mno345',
        email: 'alex.kumar@crypto.io',
        name: 'Alex Kumar',
        image:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        onboardingProgress: 'completed',
        businessStage: 'scaling',
        codingLevel: 'expert',
        businessTypes: ['Blockchain', 'FinTech'],
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_6mno345pqr678',
        email: 'lisa.thompson@design.studio',
        name: 'Lisa Thompson',
        image:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        onboardingProgress: 'completed',
        businessStage: 'startup',
        codingLevel: 'beginner',
        businessTypes: ['Design Agency', 'Creative Services'],
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_7pqr678stu901',
        email: 'david.kim@ai.tech',
        name: 'David Kim',
        image:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        onboardingProgress: 'completed',
        businessStage: 'growth',
        codingLevel: 'expert',
        businessTypes: ['AI/ML', 'Enterprise Software'],
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_8stu901vwx234',
        email: 'maria.garcia@edutech.com',
        name: 'Maria Garcia',
        image:
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        onboardingProgress: 'completed',
        businessStage: 'established',
        codingLevel: 'intermediate',
        businessTypes: ['EdTech', 'Online Learning'],
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_9vwx234yza567',
        email: 'james.lee@healthtech.io',
        name: 'James Lee',
        image:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        onboardingProgress: 'completed',
        businessStage: 'startup',
        codingLevel: 'advanced',
        businessTypes: ['HealthTech', 'Mobile App'],
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_0yza567bcd890',
        email: 'anna.kovac@green.tech',
        name: 'Anna Kovac',
        image:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        onboardingProgress: 'completed',
        businessStage: 'scaling',
        codingLevel: 'intermediate',
        businessTypes: ['CleanTech', 'Sustainability'],
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'user_1bcd890efg123',
        email: 'robert.nguyen@gaming.studio',
        name: 'Robert Nguyen',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        onboardingProgress: 'completed',
        businessStage: 'growth',
        codingLevel: 'advanced',
        businessTypes: ['Gaming', 'Entertainment'],
      },
    }),
  ]);

  console.log('👥 Created 10 demo users');

  // Create 20 demo posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        authorclerkId: users[0].clerkId,
        title: 'How I Built a $50K MRR SaaS in 6 Months',
        body: "Starting a SaaS business was always my dream, but I never thought it would happen this fast. Here's my journey from idea to $50K monthly recurring revenue in just 6 months...",
        role: 'Founder',
        views: 1247,
        likes: [users[1].clerkId, users[2].clerkId, users[3].clerkId],
        image:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
        altText: 'SaaS dashboard showing growth metrics',
        tags: ['SaaS', 'Startup', 'Growth', 'Revenue'],
        country: 'United States',
        share: 23,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[1].clerkId,
        title: 'The Complete Guide to Mobile App Development for Beginners',
        body: "Mobile app development can seem overwhelming at first, but with the right approach, anyone can learn it. In this comprehensive guide, I'll walk you through everything you need to know...",
        role: 'Developer',
        views: 892,
        likes: [users[0].clerkId, users[2].clerkId],
        image:
          'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
        altText: 'Mobile app development workspace',
        tags: ['Mobile Development', 'Beginner', 'Tutorial', 'App Store'],
        country: 'Canada',
        share: 15,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[2].clerkId,
        title: 'Web Development Trends That Will Dominate 2024',
        body: 'As we approach 2024, the web development landscape is evolving rapidly. From AI-powered tools to new frameworks, here are the trends that will shape the future of web development...',
        role: 'Senior Developer',
        views: 2156,
        likes: [
          users[0].clerkId,
          users[1].clerkId,
          users[3].clerkId,
          users[4].clerkId,
        ],
        image:
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
        altText: 'Modern web development setup',
        tags: ['Web Development', 'Trends', '2024', 'Technology'],
        country: 'United Kingdom',
        share: 67,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[3].clerkId,
        title: 'Building a DeFi Protocol: Lessons from the Front Lines',
        body: "DeFi is revolutionizing finance, but building protocols isn't for the faint of heart. After launching three successful protocols, here are the critical lessons I've learned...",
        role: 'Blockchain Developer',
        views: 1834,
        likes: [users[0].clerkId, users[2].clerkId, users[4].clerkId],
        image:
          'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
        altText: 'Blockchain and cryptocurrency concept',
        tags: ['Blockchain', 'DeFi', 'Cryptocurrency', 'Smart Contracts'],
        country: 'Singapore',
        share: 42,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[4].clerkId,
        title: "Design Thinking in the Digital Age: A Designer's Perspective",
        body: "Design isn't just about aesthetics anymore. In today's digital landscape, design thinking is crucial for business success. Here's how I approach design challenges...",
        role: 'Designer',
        views: 756,
        likes: [users[0].clerkId, users[1].clerkId],
        image:
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
        altText: 'Design thinking process visualization',
        tags: ['Design', 'UX/UI', 'Design Thinking', 'Creative Process'],
        country: 'Australia',
        share: 18,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[5].clerkId,
        title: 'AI in Enterprise: Building Scalable Machine Learning Systems',
        body: "Enterprise AI adoption is accelerating, but building scalable ML systems requires careful architecture decisions. Here's how we built a system that processes millions of predictions daily...",
        role: 'AI Engineer',
        views: 3421,
        likes: [
          users[0].clerkId,
          users[2].clerkId,
          users[6].clerkId,
          users[7].clerkId,
        ],
        image:
          'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=800&h=400&fit=crop',
        altText: 'AI and machine learning infrastructure',
        tags: ['AI/ML', 'Enterprise', 'Machine Learning', 'Scalability'],
        country: 'United States',
        share: 89,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[6].clerkId,
        title: 'Revolutionizing Education with Technology: Our EdTech Journey',
        body: "Education technology has the power to democratize learning worldwide. Here's how we built a platform that's helping millions of students access quality education...",
        role: 'Product Manager',
        views: 1567,
        likes: [users[1].clerkId, users[4].clerkId, users[8].clerkId],
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
        altText: 'Students using digital learning tools',
        tags: ['EdTech', 'Education', 'Technology', 'Learning'],
        country: 'Canada',
        share: 34,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[7].clerkId,
        title: 'HealthTech Innovation: Building Apps That Save Lives',
        body: "Mobile health applications are transforming patient care. Here's how we developed a telemedicine platform that's improving healthcare access in rural communities...",
        role: 'HealthTech Developer',
        views: 2891,
        likes: [users[2].clerkId, users[5].clerkId, users[9].clerkId],
        image:
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
        altText: 'Healthcare professionals using mobile devices',
        tags: ['HealthTech', 'Telemedicine', 'Mobile App', 'Healthcare'],
        country: 'United Kingdom',
        share: 56,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[8].clerkId,
        title: 'Sustainable Technology: Building Green Solutions for Tomorrow',
        body: "Climate change requires innovative technological solutions. Here's how we're building software that helps companies reduce their carbon footprint and operate sustainably...",
        role: 'Sustainability Engineer',
        views: 1123,
        likes: [users[3].clerkId, users[6].clerkId, users[7].clerkId],
        image:
          'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop',
        altText: 'Green technology and sustainability concept',
        tags: ['CleanTech', 'Sustainability', 'Climate Change', 'Green Tech'],
        country: 'Sweden',
        share: 28,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[9].clerkId,
        title: 'Gaming Industry Evolution: From Indie to AAA Success',
        body: "The gaming industry is experiencing unprecedented growth. Here's how we transitioned from a small indie studio to a successful game development company...",
        role: 'Game Developer',
        views: 1987,
        likes: [users[1].clerkId, users[4].clerkId, users[5].clerkId],
        image:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
        altText: 'Gaming development studio setup',
        tags: ['Gaming', 'Indie Games', 'Game Development', 'Entertainment'],
        country: 'Japan',
        share: 45,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[0].clerkId,
        title: 'E-commerce Growth Strategies: Lessons from Scaling to $1M',
        body: 'E-commerce success requires more than just a good product. Here are the strategies that helped us scale from $0 to $1M in annual revenue...',
        role: 'E-commerce Founder',
        views: 2765,
        likes: [users[1].clerkId, users[6].clerkId, users[8].clerkId],
        image:
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
        altText: 'E-commerce analytics dashboard',
        tags: ['E-commerce', 'Growth', 'Marketing', 'Strategy'],
        country: 'United States',
        share: 73,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[1].clerkId,
        title: 'Cross-Platform Mobile Development: React Native vs Flutter',
        body: "Choosing the right cross-platform framework can make or break your mobile app. Here's a comprehensive comparison based on real-world experience...",
        role: 'Mobile Developer',
        views: 1892,
        likes: [users[2].clerkId, users[5].clerkId, users[7].clerkId],
        image:
          'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
        altText: 'Mobile app development comparison',
        tags: [
          'Mobile Development',
          'React Native',
          'Flutter',
          'Cross-Platform',
        ],
        country: 'Canada',
        share: 41,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[2].clerkId,
        title: 'Microservices Architecture: Lessons from Building at Scale',
        body: "Microservices can improve scalability and maintainability, but they come with their own challenges. Here's what we learned building a system that handles millions of requests...",
        role: 'Backend Engineer',
        views: 3245,
        likes: [
          users[0].clerkId,
          users[3].clerkId,
          users[6].clerkId,
          users[9].clerkId,
        ],
        image:
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
        altText: 'Microservices architecture diagram',
        tags: ['Backend', 'Microservices', 'Architecture', 'Scalability'],
        country: 'United Kingdom',
        share: 92,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[3].clerkId,
        title: 'NFT Marketplace Development: Technical Deep Dive',
        body: "Building an NFT marketplace requires understanding blockchain technology, smart contracts, and user experience. Here's our technical approach...",
        role: 'Blockchain Developer',
        views: 2134,
        likes: [users[2].clerkId, users[5].clerkId, users[8].clerkId],
        image:
          'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
        altText: 'NFT marketplace interface',
        tags: ['Blockchain', 'NFTs', 'Smart Contracts', 'Marketplace'],
        country: 'Singapore',
        share: 58,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[4].clerkId,
        title: 'User Experience Design: Creating Intuitive Digital Products',
        body: "Great UX design is invisible to users but crucial for product success. Here's our framework for designing user experiences that delight and convert...",
        role: 'UX Designer',
        views: 1678,
        likes: [users[0].clerkId, users[6].clerkId, users[7].clerkId],
        image:
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
        altText: 'UX design process and wireframes',
        tags: [
          'UX Design',
          'User Experience',
          'Design Process',
          'Product Design',
        ],
        country: 'Australia',
        share: 37,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[5].clerkId,
        title: 'Machine Learning in Production: From Research to Reality',
        body: "Taking ML models from research to production is challenging. Here's our approach to building reliable, scalable machine learning systems...",
        role: 'ML Engineer',
        views: 2987,
        likes: [
          users[0].clerkId,
          users[2].clerkId,
          users[6].clerkId,
          users[8].clerkId,
        ],
        image:
          'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=800&h=400&fit=crop',
        altText: 'Machine learning model deployment',
        tags: ['Machine Learning', 'MLOps', 'Production', 'AI'],
        country: 'United States',
        share: 78,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[6].clerkId,
        title:
          'Digital Learning Platforms: Engaging Students in the Virtual Age',
        body: "Online education requires innovative approaches to keep students engaged. Here's how we built interactive learning experiences that rival in-person education...",
        role: 'EdTech Product Manager',
        views: 1432,
        likes: [users[1].clerkId, users[4].clerkId, users[9].clerkId],
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
        altText: 'Interactive online learning interface',
        tags: [
          'EdTech',
          'Online Learning',
          'Student Engagement',
          'Virtual Education',
        ],
        country: 'Canada',
        share: 31,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[7].clerkId,
        title: 'Telemedicine Technology: Building Healthcare Apps That Work',
        body: "Telemedicine apps must be reliable, secure, and user-friendly. Here's our approach to building healthcare applications that doctors and patients trust...",
        role: 'HealthTech Developer',
        views: 2654,
        likes: [users[2].clerkId, users[5].clerkId, users[8].clerkId],
        image:
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
        altText: 'Telemedicine app interface',
        tags: ['HealthTech', 'Telemedicine', 'Healthcare Apps', 'Patient Care'],
        country: 'United Kingdom',
        share: 64,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[8].clerkId,
        title: 'Carbon Tracking Software: Helping Companies Go Green',
        body: "Sustainability reporting is becoming mandatory for businesses. Here's how we built software that makes carbon tracking simple and actionable...",
        role: 'Sustainability Engineer',
        views: 987,
        likes: [users[3].clerkId, users[6].clerkId, users[7].clerkId],
        image:
          'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop',
        altText: 'Carbon footprint tracking dashboard',
        tags: [
          'CleanTech',
          'Carbon Tracking',
          'Sustainability',
          'Green Business',
        ],
        country: 'Sweden',
        share: 22,
      },
    }),
    prisma.post.create({
      data: {
        authorclerkId: users[9].clerkId,
        title: 'Game Monetization Strategies: From Free-to-Play to Premium',
        body: "Monetizing games requires balancing player experience with revenue generation. Here's how we successfully monetized our indie games...",
        role: 'Game Developer',
        views: 1789,
        likes: [users[1].clerkId, users[4].clerkId, users[5].clerkId],
        image:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
        altText: 'Game monetization analytics',
        tags: ['Gaming', 'Monetization', 'Indie Games', 'Game Business'],
        country: 'Japan',
        share: 39,
      },
    }),
  ]);

  console.log('📝 Created 20 demo posts');

  // Create 15 demo comments
  const comments = await Promise.all([
    prisma.comment.create({
      data: {
        name: users[1].name,
        authorImage: users[1].image,
        comment:
          'This is exactly what I needed to read! The timeline breakdown is incredibly helpful.',
        likes: [users[0].clerkId],
        postId: posts[0].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[2].name,
        authorImage: users[2].image,
        comment:
          'Love the actionable insights here. What was your biggest challenge during month 3?',
        likes: [],
        postId: posts[0].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[3].name,
        authorImage: users[3].image,
        comment:
          "Great guide! I'm just starting with mobile development and this gives me a clear roadmap.",
        likes: [users[1].clerkId],
        postId: posts[1].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[0].name,
        authorImage: users[0].image,
        comment:
          "These trends are spot on. I'm particularly excited about the AI integration possibilities.",
        likes: [users[2].clerkId, users[4].clerkId],
        postId: posts[2].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[4].name,
        authorImage: users[4].image,
        comment:
          'As a designer, I appreciate the technical depth while keeping it accessible.',
        likes: [users[2].clerkId],
        postId: posts[2].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[6].name,
        authorImage: users[6].image,
        comment:
          'The scalability insights here are gold. How do you handle model versioning in production?',
        likes: [users[5].clerkId, users[7].clerkId],
        postId: posts[5].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[7].name,
        authorImage: users[7].image,
        comment:
          'This resonates with our experience building health apps. Security is absolutely critical.',
        likes: [users[2].clerkId],
        postId: posts[7].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[8].name,
        authorImage: users[8].image,
        comment:
          'Sustainability in tech is so important. Love seeing more content about this topic.',
        likes: [users[3].clerkId, users[6].clerkId],
        postId: posts[8].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[9].name,
        authorImage: users[9].image,
        comment:
          'The indie to AAA journey is fascinating. What was your biggest breakthrough moment?',
        likes: [users[1].clerkId],
        postId: posts[9].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[0].name,
        authorImage: users[0].image,
        comment:
          'E-commerce growth is all about understanding your customer journey. Great insights here.',
        likes: [users[6].clerkId],
        postId: posts[10].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[2].name,
        authorImage: users[2].image,
        comment:
          'Microservices can be tricky but the benefits are worth it. Great architecture breakdown.',
        likes: [users[0].clerkId, users[3].clerkId],
        postId: posts[12].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[5].name,
        authorImage: users[5].image,
        comment:
          'MLOps is the future. This post covers the key challenges perfectly.',
        likes: [users[0].clerkId, users[2].clerkId],
        postId: posts[15].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[1].name,
        authorImage: users[1].image,
        comment:
          'Cross-platform development is getting better every year. Great comparison!',
        likes: [users[2].clerkId],
        postId: posts[11].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[3].name,
        authorImage: users[3].image,
        comment:
          'Smart contracts are complex but this explanation makes it much clearer.',
        likes: [users[2].clerkId, users[8].clerkId],
        postId: posts[13].id,
        type: 'comment',
      },
    }),
    prisma.comment.create({
      data: {
        name: users[4].name,
        authorImage: users[4].image,
        comment:
          "UX design is often overlooked but it's crucial for product success. Great framework!",
        likes: [users[0].clerkId, users[6].clerkId],
        postId: posts[14].id,
        type: 'comment',
      },
    }),
  ]);

  console.log('💬 Created 15 demo comments');

  // Create 15 demo interviews
  const interviews = await Promise.all([
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
        title: 'From Zero to $100K: The Story of TechFlow',
        post: "TechFlow started as a simple idea in a coffee shop. Today, it's a thriving SaaS platform helping businesses streamline their workflow. Founder Sarah Chen shares her journey...",
        revenue: 85000,
        updates: 12,
        website: 'https://techflow.com',
        category: 'SaaS',
        tags: ['SaaS', 'Startup', 'Success Story', 'Workflow'],
        authorclerkId: users[0].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
        title: 'Building the Future of Mobile Commerce',
        post: 'Mobile commerce is evolving rapidly, and our team at InnovateMobile is at the forefront. CEO Mike Rodriguez discusses the challenges and opportunities...',
        revenue: 120000,
        updates: 8,
        website: 'https://innovatemobile.com',
        category: 'Mobile App',
        tags: ['Mobile Commerce', 'E-commerce', 'Innovation', 'Mobile App'],
        authorclerkId: users[1].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
        title: 'Web Development in the AI Era',
        post: 'AI is transforming how we build websites and applications. Senior Developer Emma Wilson explores the intersection of artificial intelligence and web development...',
        revenue: 95000,
        updates: 15,
        website: 'https://webdev.co',
        category: 'Web Development',
        tags: ['AI', 'Web Development', 'Future Tech', 'Automation'],
        authorclerkId: users[2].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
        title: 'DeFi Revolution: Building the Future of Finance',
        post: 'Decentralized finance is reshaping traditional banking. Blockchain developer Alex Kumar shares insights from building DeFi protocols that process millions in transactions...',
        revenue: 250000,
        updates: 20,
        website: 'https://defi-protocol.io',
        category: 'Blockchain',
        tags: ['DeFi', 'Blockchain', 'Finance', 'Cryptocurrency'],
        authorclerkId: users[3].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
        title: 'Design Agency Success: Scaling Creative Services',
        post: 'Building a successful design agency requires more than just talent. Lisa Thompson shares how she scaled her agency from a solo designer to a team of 15...',
        revenue: 180000,
        updates: 10,
        website: 'https://designstudio.com',
        category: 'Design',
        tags: [
          'Design Agency',
          'Creative Services',
          'Scaling',
          'Business Growth',
        ],
        authorclerkId: users[4].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=800&h=400&fit=crop',
        title: 'Enterprise AI: Building Solutions for Fortune 500 Companies',
        post: 'Enterprise AI adoption is accelerating rapidly. David Kim discusses the challenges and opportunities of building AI solutions for large corporations...',
        revenue: 500000,
        updates: 25,
        website: 'https://ai-enterprise.tech',
        category: 'AI/ML',
        tags: ['Enterprise AI', 'Machine Learning', 'Fortune 500', 'B2B'],
        authorclerkId: users[5].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
        title: 'EdTech Innovation: Revolutionizing Online Learning',
        post: 'Online education is evolving beyond simple video lectures. Maria Garcia shares how her platform is using AI and gamification to improve learning outcomes...',
        revenue: 320000,
        updates: 18,
        website: 'https://edutech-platform.com',
        category: 'EdTech',
        tags: ['EdTech', 'Online Learning', 'AI', 'Gamification'],
        authorclerkId: users[6].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
        title:
          'HealthTech Breakthrough: Improving Patient Care with Technology',
        post: 'Mobile health applications are transforming patient care. James Lee discusses how his telemedicine platform is improving healthcare access...',
        revenue: 280000,
        updates: 14,
        website: 'https://healthtech.io',
        category: 'HealthTech',
        tags: ['HealthTech', 'Telemedicine', 'Patient Care', 'Mobile Health'],
        authorclerkId: users[7].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop',
        title: 'CleanTech Solutions: Building a Sustainable Future',
        post: 'Climate change requires innovative technological solutions. Anna Kovac shares how her software helps companies reduce their carbon footprint...',
        revenue: 150000,
        updates: 12,
        website: 'https://greentech.solutions',
        category: 'CleanTech',
        tags: [
          'CleanTech',
          'Sustainability',
          'Climate Change',
          'Green Business',
        ],
        authorclerkId: users[8].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
        title: 'Gaming Industry Success: From Indie to AAA',
        post: 'The gaming industry is experiencing unprecedented growth. Robert Nguyen shares his journey from a small indie studio to a successful game development company...',
        revenue: 420000,
        updates: 22,
        website: 'https://gaming.studio',
        category: 'Gaming',
        tags: ['Gaming', 'Indie Games', 'Game Development', 'Entertainment'],
        authorclerkId: users[9].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
        title: 'E-commerce Growth: Scaling to $1M in Annual Revenue',
        post: 'E-commerce success requires more than just a good product. Sarah Chen shares the strategies that helped her scale from $0 to $1M in annual revenue...',
        revenue: 1000000,
        updates: 30,
        website: 'https://ecommerce-success.com',
        category: 'E-commerce',
        tags: ['E-commerce', 'Growth', 'Revenue', 'Scaling'],
        authorclerkId: users[0].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
        title: 'Mobile App Success: Building Apps That Users Love',
        post: 'Creating successful mobile apps requires understanding user behavior and market trends. Mike Rodriguez shares his approach to app development...',
        revenue: 180000,
        updates: 16,
        website: 'https://mobile-apps.com',
        category: 'Mobile App',
        tags: [
          'Mobile Apps',
          'User Experience',
          'App Store',
          'Mobile Development',
        ],
        authorclerkId: users[1].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
        title: 'Web Development Agency: Building Digital Solutions',
        post: 'Running a successful web development agency requires technical expertise and business acumen. Emma Wilson shares her insights...',
        revenue: 450000,
        updates: 28,
        website: 'https://webdev-agency.co',
        category: 'Web Development',
        tags: [
          'Web Development',
          'Digital Agency',
          'Client Services',
          'Business Growth',
        ],
        authorclerkId: users[2].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
        title: 'Blockchain Consulting: Advising on Digital Transformation',
        post: 'Blockchain technology is transforming industries beyond cryptocurrency. Alex Kumar discusses his consulting work with traditional businesses...',
        revenue: 350000,
        updates: 19,
        website: 'https://blockchain-consulting.io',
        category: 'Blockchain',
        tags: [
          'Blockchain',
          'Consulting',
          'Digital Transformation',
          'Enterprise',
        ],
        authorclerkId: users[3].clerkId,
      },
    }),
    prisma.interviews.create({
      data: {
        image:
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
        title: 'Design Thinking: Transforming Business Through Design',
        post: 'Design thinking is revolutionizing how businesses approach problem-solving. Lisa Thompson shares how she helps companies innovate through design...',
        revenue: 220000,
        updates: 15,
        website: 'https://design-thinking.studio',
        category: 'Design',
        tags: [
          'Design Thinking',
          'Innovation',
          'Business Strategy',
          'Problem Solving',
        ],
        authorclerkId: users[4].clerkId,
      },
    }),
  ]);

  console.log('🎤 Created 15 demo interviews');

  // Create 20 demo meetups
  const meetups = await Promise.all([
    prisma.meetups.create({
      data: {
        title: 'Startup Networking Night',
        companyName: 'TechHub Community',
        location: 'San Francisco, CA',
        description:
          'Join fellow entrepreneurs and developers for an evening of networking, knowledge sharing, and collaboration opportunities.',
        tags: ['Networking', 'Startup', 'Entrepreneurship', 'Tech'],
        image:
          'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop',
        category: 'Networking',
        authorclerkId: users[0].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'Mobile App Development Workshop',
        companyName: 'CodeCraft Academy',
        location: 'Toronto, ON',
        description:
          'Hands-on workshop covering the fundamentals of mobile app development, from concept to deployment.',
        tags: ['Workshop', 'Mobile Development', 'Hands-on', 'Learning'],
        image:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
        category: 'Workshop',
        authorclerkId: users[1].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'AI in Web Development Conference',
        companyName: 'FutureWeb Summit',
        location: 'London, UK',
        description:
          'Explore the latest developments in AI-powered web development tools and techniques.',
        tags: ['Conference', 'AI', 'Web Development', 'Innovation'],
        image:
          'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
        category: 'Conference',
        authorclerkId: users[2].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'Blockchain Developer Meetup',
        companyName: 'CryptoDev Community',
        location: 'Singapore',
        description:
          'Connect with fellow blockchain developers and discuss the latest in DeFi, NFTs, and smart contracts.',
        tags: ['Blockchain', 'DeFi', 'Smart Contracts', 'Developer Meetup'],
        image:
          'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
        category: 'Developer Meetup',
        authorclerkId: users[3].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'Design Thinking Workshop',
        companyName: 'Design Innovation Lab',
        location: 'Sydney, Australia',
        description:
          'Learn design thinking methodologies and apply them to real business challenges.',
        tags: [
          'Design Thinking',
          'Workshop',
          'Innovation',
          'Business Strategy',
        ],
        image:
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
        category: 'Design',
        authorclerkId: users[4].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'AI/ML Innovation Summit',
        companyName: 'AI Tech Community',
        location: 'New York, NY',
        description:
          'Join AI researchers, engineers, and entrepreneurs to explore the latest breakthroughs in machine learning and artificial intelligence.',
        tags: ['AI/ML', 'Machine Learning', 'Innovation', 'Research'],
        image:
          'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=800&h=400&fit=crop',
        category: 'Summit',
        authorclerkId: users[5].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'EdTech Innovation Workshop',
        companyName: 'Learning Technology Institute',
        location: 'Vancouver, BC',
        description:
          'Explore cutting-edge educational technologies and learn how to create engaging digital learning experiences.',
        tags: ['EdTech', 'Education', 'Digital Learning', 'Innovation'],
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
        category: 'Workshop',
        authorclerkId: users[6].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'HealthTech Networking Event',
        companyName: 'Digital Health Association',
        location: 'Boston, MA',
        description:
          'Connect with healthcare professionals, developers, and entrepreneurs in the digital health space.',
        tags: ['HealthTech', 'Digital Health', 'Networking', 'Healthcare'],
        image:
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
        category: 'Networking',
        authorclerkId: users[7].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'Sustainability in Tech Conference',
        companyName: 'Green Tech Alliance',
        location: 'Stockholm, Sweden',
        description:
          'Learn how technology can drive sustainability and help combat climate change.',
        tags: [
          'CleanTech',
          'Sustainability',
          'Climate Change',
          'Green Technology',
        ],
        image:
          'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop',
        category: 'Conference',
        authorclerkId: users[8].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'Game Development Bootcamp',
        companyName: 'GameDev Academy',
        location: 'Tokyo, Japan',
        description:
          'Intensive bootcamp covering game development fundamentals, from concept to publishing.',
        tags: ['Gaming', 'Game Development', 'Bootcamp', 'Indie Games'],
        image:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
        category: 'Bootcamp',
        authorclerkId: users[9].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'E-commerce Growth Strategies',
        companyName: 'Digital Commerce Institute',
        location: 'Austin, TX',
        description:
          'Learn proven strategies for scaling your e-commerce business and increasing conversion rates.',
        tags: ['E-commerce', 'Growth', 'Digital Marketing', 'Conversion'],
        image:
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
        category: 'Workshop',
        authorclerkId: users[0].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'Mobile App Marketing Summit',
        companyName: 'App Growth Network',
        location: 'Berlin, Germany',
        description:
          'Discover the latest mobile app marketing strategies and user acquisition techniques.',
        tags: ['Mobile Apps', 'Marketing', 'User Acquisition', 'App Store'],
        image:
          'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
        category: 'Summit',
        authorclerkId: users[1].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'Full-Stack Development Workshop',
        companyName: 'Code Masters Academy',
        location: 'Amsterdam, Netherlands',
        description:
          'Comprehensive workshop covering both frontend and backend development technologies.',
        tags: ['Full-Stack', 'Web Development', 'Workshop', 'Coding'],
        image:
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
        category: 'Workshop',
        authorclerkId: users[2].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'DeFi Protocol Development',
        companyName: 'DeFi Developers Guild',
        location: 'Dubai, UAE',
        description:
          'Learn how to build and deploy decentralized finance protocols on various blockchain networks.',
        tags: ['DeFi', 'Blockchain', 'Smart Contracts', 'Protocol Development'],
        image:
          'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
        category: 'Developer Meetup',
        authorclerkId: users[3].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'UX/UI Design Masterclass',
        companyName: 'Design Excellence Institute',
        location: 'Melbourne, Australia',
        description:
          'Master the principles of user experience and interface design through hands-on exercises.',
        tags: ['UX/UI', 'Design', 'User Experience', 'Interface Design'],
        image:
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
        category: 'Masterclass',
        authorclerkId: users[4].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'Data Science for Business',
        companyName: 'Data Insights Academy',
        location: 'Chicago, IL',
        description:
          'Learn how to apply data science techniques to solve real business problems.',
        tags: [
          'Data Science',
          'Business Intelligence',
          'Analytics',
          'Machine Learning',
        ],
        image:
          'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=800&h=400&fit=crop',
        category: 'Workshop',
        authorclerkId: users[5].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'Remote Team Collaboration',
        companyName: 'Remote Work Institute',
        location: 'Virtual Event',
        description:
          'Learn best practices for managing and collaborating with remote development teams.',
        tags: [
          'Remote Work',
          'Team Collaboration',
          'Management',
          'Virtual Teams',
        ],
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
        category: 'Virtual Workshop',
        authorclerkId: users[6].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'Cybersecurity in Healthcare',
        companyName: 'Health Security Alliance',
        location: 'Washington, DC',
        description:
          'Explore the unique cybersecurity challenges facing healthcare organizations and how to address them.',
        tags: ['Cybersecurity', 'Healthcare', 'Security', 'Compliance'],
        image:
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
        category: 'Conference',
        authorclerkId: users[7].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'Green Software Development',
        companyName: 'Sustainable Tech Collective',
        location: 'Copenhagen, Denmark',
        description:
          'Learn how to develop software that minimizes environmental impact and promotes sustainability.',
        tags: [
          'Green Software',
          'Sustainability',
          'Eco-friendly',
          'Software Development',
        ],
        image:
          'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop',
        category: 'Workshop',
        authorclerkId: users[8].clerkId,
      },
    }),
    prisma.meetups.create({
      data: {
        title: 'Indie Game Publishing',
        companyName: 'Indie Game Publishers Guild',
        location: 'Seoul, South Korea',
        description:
          'Learn the ins and outs of publishing indie games and reaching your target audience.',
        tags: ['Indie Games', 'Game Publishing', 'Marketing', 'Distribution'],
        image:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
        category: 'Workshop',
        authorclerkId: users[9].clerkId,
      },
    }),
  ]);

  console.log('🤝 Created 20 demo meetups');

  // Create 20 demo podcasts
  const podcasts = await Promise.all([
    prisma.podcasts.create({
      data: {
        title: 'The Startup Journey Podcast',
        location: 'Global',
        post: 'Weekly conversations with successful entrepreneurs about their startup journey, challenges, and lessons learned.',
        category: 'Entrepreneurship',
        image:
          'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['Startup', 'Entrepreneurship', 'Business', 'Success Stories'],
        authorclerkId: users[0].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'Code & Coffee',
        location: 'Global',
        post: 'A casual conversation about coding, development best practices, and the latest in tech.',
        category: 'Development',
        image:
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['Coding', 'Development', 'Tech Talk', 'Best Practices'],
        authorclerkId: users[2].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'Design Matters',
        location: 'Global',
        post: 'Exploring the intersection of design, technology, and business with industry experts.',
        category: 'Design',
        image:
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['Design', 'UX/UI', 'Business', 'Technology'],
        authorclerkId: users[4].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'AI Insights Weekly',
        location: 'Global',
        post: 'Deep dives into artificial intelligence, machine learning, and their real-world applications.',
        category: 'AI/ML',
        image:
          'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['AI', 'Machine Learning', 'Technology', 'Innovation'],
        authorclerkId: users[5].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'EdTech Innovations',
        location: 'Global',
        post: 'Exploring the latest developments in educational technology and their impact on learning.',
        category: 'EdTech',
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['EdTech', 'Education', 'Technology', 'Learning'],
        authorclerkId: users[6].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'HealthTech Today',
        location: 'Global',
        post: 'Covering the latest developments in healthcare technology and digital health solutions.',
        category: 'HealthTech',
        image:
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['HealthTech', 'Digital Health', 'Healthcare', 'Technology'],
        authorclerkId: users[7].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'Sustainable Tech Talk',
        location: 'Global',
        post: 'Discussing how technology can drive sustainability and combat climate change.',
        category: 'CleanTech',
        image:
          'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: [
          'CleanTech',
          'Sustainability',
          'Climate Change',
          'Green Technology',
        ],
        authorclerkId: users[8].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'Game Dev Stories',
        location: 'Global',
        post: 'Behind-the-scenes stories from game developers about their creative process and industry insights.',
        category: 'Gaming',
        image:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['Gaming', 'Game Development', 'Indie Games', 'Creative Process'],
        authorclerkId: users[9].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'E-commerce Growth Hacks',
        location: 'Global',
        post: 'Actionable strategies for growing your e-commerce business and increasing sales.',
        category: 'E-commerce',
        image:
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['E-commerce', 'Growth', 'Marketing', 'Sales'],
        authorclerkId: users[0].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'Mobile App Success',
        location: 'Global',
        post: 'Tips and strategies for building successful mobile applications and growing your user base.',
        category: 'Mobile Development',
        image:
          'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['Mobile Apps', 'App Development', 'User Growth', 'App Store'],
        authorclerkId: users[1].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'Web Development Weekly',
        location: 'Global',
        post: 'Weekly updates on web development trends, tools, and best practices.',
        category: 'Web Development',
        image:
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['Web Development', 'Frontend', 'Backend', 'Best Practices'],
        authorclerkId: users[2].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'Blockchain Deep Dive',
        location: 'Global',
        post: 'In-depth discussions about blockchain technology, cryptocurrencies, and decentralized applications.',
        category: 'Blockchain',
        image:
          'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['Blockchain', 'Cryptocurrency', 'DeFi', 'Smart Contracts'],
        authorclerkId: users[3].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'UX Design Insights',
        location: 'Global',
        post: 'Exploring user experience design principles and how they impact product success.',
        category: 'UX Design',
        image:
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: [
          'UX Design',
          'User Experience',
          'Product Design',
          'User Research',
        ],
        authorclerkId: users[4].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'Machine Learning in Practice',
        location: 'Global',
        post: 'Real-world applications of machine learning and how to implement ML solutions.',
        category: 'Machine Learning',
        image:
          'https://images.unsplash.com/photo-1677442136019-21780ecadf41?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['Machine Learning', 'AI', 'Data Science', 'Implementation'],
        authorclerkId: users[5].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'Digital Learning Revolution',
        location: 'Global',
        post: 'Exploring how technology is transforming education and creating new learning opportunities.',
        category: 'EdTech',
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['Digital Learning', 'EdTech', 'Online Education', 'Technology'],
        authorclerkId: users[6].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'Healthcare Innovation',
        location: 'Global',
        post: 'Discussing the latest innovations in healthcare technology and their impact on patient care.',
        category: 'HealthTech',
        image:
          'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: ['Healthcare', 'Innovation', 'Technology', 'Patient Care'],
        authorclerkId: users[7].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'Green Technology Solutions',
        location: 'Global',
        post: 'Exploring sustainable technology solutions and their environmental impact.',
        category: 'CleanTech',
        image:
          'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: [
          'Green Technology',
          'Sustainability',
          'Environmental Impact',
          'CleanTech',
        ],
        authorclerkId: users[8].clerkId,
      },
    }),
    prisma.podcasts.create({
      data: {
        title: 'Indie Game Development',
        location: 'Global',
        post: 'Stories and insights from independent game developers about their creative journey.',
        category: 'Gaming',
        image:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        tags: [
          'Indie Games',
          'Game Development',
          'Creative Process',
          'Gaming Industry',
        ],
        authorclerkId: users[9].clerkId,
      },
    }),
  ]);

  console.log('🎧 Created 20 demo podcasts');

  // Create 5 demo notifications
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        postTitle: 'How I Built a $50K MRR SaaS in 6 Months',
        authorName: users[0].name,
        authorImage: users[0].image,
        message: 'Sarah Chen liked your comment',
        isRead: false,
        typeText: 'reaction',
        postId: posts[0].id,
        type: 'reactions',
        userId: users[1].id,
      },
    }),
    prisma.notification.create({
      data: {
        postTitle: 'Web Development Trends That Will Dominate 2024',
        authorName: users[2].name,
        authorImage: users[2].image,
        message: 'Emma Wilson commented on your post',
        isRead: false,
        typeText: 'comment',
        postId: posts[2].id,
        type: 'comment',
        userId: users[0].id,
      },
    }),
    prisma.notification.create({
      data: {
        postTitle: 'Mobile App Development for Beginners',
        authorName: users[1].name,
        authorImage: users[1].image,
        message: 'Mike Rodriguez published a new post',
        isRead: false,
        typeText: 'publish',
        postId: posts[1].id,
        type: 'publish',
        userId: users[2].id,
      },
    }),
    prisma.notification.create({
      data: {
        postTitle:
          'AI in Enterprise: Building Scalable Machine Learning Systems',
        authorName: users[5].name,
        authorImage: users[5].image,
        message: 'David Kim mentioned you in a comment',
        isRead: false,
        typeText: 'mentions',
        postId: posts[5].id,
        type: 'mentions',
        userId: users[0].id,
      },
    }),
    prisma.notification.create({
      data: {
        postTitle: 'Building a DeFi Protocol: Lessons from the Front Lines',
        authorName: users[3].name,
        authorImage: users[3].image,
        message: 'Alex Kumar shared your post',
        isRead: false,
        typeText: 'share',
        postId: posts[3].id,
        type: 'publish',
        userId: users[2].id,
      },
    }),
  ]);

  console.log('🔔 Created 5 demo notifications');

  // Create 10 demo tags
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        title: 'SaaS',
        postIds: [posts[0].id, posts[5].id, posts[10].id],
      },
    }),
    prisma.tag.create({
      data: {
        title: 'Startup',
        postIds: [posts[0].id, posts[1].id, posts[9].id],
      },
    }),
    prisma.tag.create({
      data: {
        title: 'Web Development',
        postIds: [posts[2].id, posts[12].id, posts[16].id],
      },
    }),
    prisma.tag.create({
      data: {
        title: 'Mobile Development',
        postIds: [posts[1].id, posts[11].id, posts[17].id],
      },
    }),
    prisma.tag.create({
      data: {
        title: 'Blockchain',
        postIds: [posts[3].id, posts[13].id, posts[18].id],
      },
    }),
    prisma.tag.create({
      data: {
        title: 'Design',
        postIds: [posts[4].id, posts[14].id, posts[19].id],
      },
    }),
    prisma.tag.create({
      data: {
        title: 'AI/ML',
        postIds: [posts[5].id, posts[15].id, posts[19].id],
      },
    }),
    prisma.tag.create({
      data: {
        title: 'EdTech',
        postIds: [posts[6].id, posts[16].id, posts[18].id],
      },
    }),
    prisma.tag.create({
      data: {
        title: 'HealthTech',
        postIds: [posts[7].id, posts[17].id, posts[15].id],
      },
    }),
    prisma.tag.create({
      data: {
        title: 'CleanTech',
        postIds: [posts[8].id, posts[14].id, posts[13].id],
      },
    }),
  ]);

  console.log('🏷️ Created 10 demo tags');

  console.log('✅ Database seeding completed successfully!');
  console.log(
    `📊 Created: ${users.length} users, ${posts.length} posts, ${comments.length} comments, ${interviews.length} interviews, ${meetups.length} meetups, ${podcasts.length} podcasts, ${notifications.length} notifications, ${tags.length} tags`,
  );
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
