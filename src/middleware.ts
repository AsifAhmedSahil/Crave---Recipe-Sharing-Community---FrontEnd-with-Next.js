/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from './services/AuthService';

const AuthRoutes = ['/login', '/register'];

const roleBasedRoutes = {
    USER: [/^\/profile/],
    ADMIN: [/^\/admin/],
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
        // Allow access to user profile routes only
        if (pathname.match(roleBasedRoutes.USER[0])) {
            return NextResponse.next();
        }
        // Redirect users trying to access admin routes
        if (pathname.match(roleBasedRoutes.ADMIN[0])) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (user.role === 'ADMIN') {
        // Allow access to admin routes only
        if (pathname.match(roleBasedRoutes.ADMIN[0])) {
            return NextResponse.next();
        }
        // Redirect admins trying to access user profile routes
        if (pathname.match(roleBasedRoutes.USER[0])) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // If the route doesn't match any criteria, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', '/register', '/profile', '/profile/:page*', '/admin', '/admin/:page*'],
};
