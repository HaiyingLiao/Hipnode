import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/sign-up', '/sign-in', '/', '/api/uploadthing'],
  ignoredRoutes: ['/api/webhooks'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
