import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function validateIdMiddleware(request: NextRequest, auth: any) {
  const path = request.nextUrl.pathname;
  const authDetails = await auth();
  // eslint-disable-next-line no-useless-escape
  const idRegex = /\/projects\/([^\/]+)(?:\/|$)/;
  const match = path.match(idRegex);
  if (!match) {
    return NextResponse.next();
  }

  const [, projectId] = match;
  if (projectId) {
    const validateRes = await fetch(`${request.nextUrl.origin}/api/validate-project-access?id=${projectId}`, {
      headers: {
        'user-id': authDetails.sessionClaims.sub,
        'x-middleware-request': 'true',
      },
    });
    if (validateRes.status !== 200) {
      return NextResponse.redirect(new URL('/404', request.url));
    }
  }
  return NextResponse.next();
}
export default clerkMiddleware(
  async (auth, req: NextRequest) => validateIdMiddleware(req, auth),
  {
  },
);

export const config = {
  matcher: [
    '/projects/:path*',
    '/api/validate-project-access',
    '/api/:path*',
    '/service-worker.js',
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
