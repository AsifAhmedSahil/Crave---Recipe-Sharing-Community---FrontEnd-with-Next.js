/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from './services/AuthService';

const AuthRoutes = ['/login', '/register'];

const roleBasedRoutes = {
    USER: [/^\/dashboard$/, /^\/dashboard\/.*/],
    ADMIN: [/^\/admin/, /^\/admin\/.*/, /^\/admin-dashboard$/],
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const user = await getCurrentUser();

    // If user is not logged in
    if (!user) {
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
        }
    }

    // If user is logged in, check their role
    if (user.role === 'USER') {
        // Allow access to user dashboard routes
        if (roleBasedRoutes.USER.some(route => pathname.match(route))) {
            return NextResponse.next();
        }
        // Redirect users trying to access admin routes
        if (roleBasedRoutes.ADMIN.some(route => pathname.match(route))) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (user.role === 'ADMIN') {
        // Allow access to admin routes
        if (roleBasedRoutes.ADMIN.some(route => pathname.match(route))) {
            return NextResponse.next();
        }
        // Redirect admins trying to access user dashboard routes
        if (roleBasedRoutes.USER.some(route => pathname.match(route))) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // If the route doesn't match any criteria, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', '/register', '/profile', '/profile/:page*', '/admin', '/admin/:page*', '/admin-dashboard', '/dashboard/:page*'],
};
