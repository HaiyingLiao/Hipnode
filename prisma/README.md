# Database Seeding

This directory contains the database seed script for populating your database with demo data.

## Running the Seed Script

1. Make sure your database is running and accessible
2. Ensure your environment variables are set (especially `DATABASE_URL`)
3. Run the seed script using one of these methods:

### Method 1: Using Prisma's built-in seeding (Recommended)

```bash
npx prisma db seed
```

### Method 2: Direct Node.js execution

```bash
node prisma/seed.js
```

## What Gets Created

The seed script creates realistic demo data for all your models:

- **10 Users** with different roles, business stages, and coding levels
- **20 Posts** covering various topics like SaaS, mobile development, web development, blockchain, and design
- **15 Comments** with realistic interactions between users
- **15 Interviews** featuring success stories and business insights
- **20 Meetups** for networking and learning opportunities
- **20 Podcasts** covering different aspects of tech and business
- **5 Notifications** showing various types of user interactions
- **10 Tags** to categorize and organize content

## User Profiles Created

1. **Sarah Chen** - SaaS Founder (Growth stage, Intermediate coding level)
2. **Mike Rodriguez** - Mobile App Developer (Startup stage, Beginner coding level)
3. **Emma Wilson** - Senior Web Developer (Established stage, Advanced coding level)
4. **Alex Kumar** - Blockchain Developer (Scaling stage, Expert coding level)
5. **Lisa Thompson** - Design Agency Owner (Startup stage, Beginner coding level)
6. **David Kim** - AI Engineer (Growth stage, Expert coding level)
7. **Maria Garcia** - EdTech Product Manager (Established stage, Intermediate coding level)
8. **James Lee** - HealthTech Developer (Startup stage, Advanced coding level)
9. **Anna Kovac** - Sustainability Engineer (Scaling stage, Intermediate coding level)
10. **Robert Nguyen** - Game Developer (Growth stage, Advanced coding level)

## Customizing the Data

You can modify the `seed.js` file to:

- Add more users with different characteristics
- Create posts with different topics and engagement levels
- Adjust the business stages, coding levels, and business types
- Modify the content to match your specific use case
- Change image URLs to use your own assets
- Update audio URLs for podcasts
- Add more diverse business types and industries
- Customize the geographic locations for meetups
- Expand the notification types and interactions

## Resetting the Database

If you want to start fresh, you can:

1. **Delete all data and reset schema:**

   ```bash
   npx prisma db push --force-reset
   ```

2. **Run the seed script again:**
   ```bash
   npx prisma db seed
   ```

## Troubleshooting

### Common Issues

1. **Database connection error:**

   - Check your `DATABASE_URL` environment variable
   - Ensure your database is running and accessible

2. **Permission errors:**

   - Make sure you have write access to your database
   - Check if your database user has the necessary privileges

3. **Schema mismatch:**

   - Run `npx prisma generate` to update the Prisma client
   - Ensure your schema.prisma file matches your database

4. **Post index errors:**
   - Ensure all tag references point to valid post indices (0-19 for 20 posts)
   - Check that all array references are within bounds

## Notes

- The script clears existing data before seeding to avoid conflicts
- All images use Unsplash URLs for realistic placeholder images
- Audio files use sample URLs (replace with actual audio files in production)
- Clerk IDs are fictional - replace with actual Clerk user IDs in production
- The script handles relationships between models automatically
- All timestamps are set to realistic recent dates
- Post indices range from 0-19 (20 total posts)
- All tag references are validated to prevent undefined errors

## Next Steps

After running the seed script:

1. **Verify the data** by checking your database
2. **Test your application** with the demo data
3. **Customize the content** to match your needs
4. **Add more realistic data** as your application grows
5. **Update business types and stages** to match your target audience
