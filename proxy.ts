import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  // 保護されたルートへのアクセスをログインページにリダイレクト
  if (req.nextUrl.pathname.startsWith('/protected')) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ['/protected/:path*'] }; // Protect routes starting with /protected