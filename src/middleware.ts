/* eslint-disable no-console */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from './services/AuthService'


const AuthRoutes = ['/login','/register']

type Role = keyof typeof roleBasedRoutes

const roleBasedRoutes = {
    USER:[/^\/profile/],
    ADMIN:[/^\/admin/],

}

 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const {pathname} =request.nextUrl

    const userToken = await getCurrentUser()
    console.log(userToken)

    // const user = {
    //     name:"asif",
    //     role:"ADMIN"
    // }

    const user = undefined
    

    

    if(!user){
        if(AuthRoutes.includes(pathname)){
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url))
        }
    }

    if(user?.role && roleBasedRoutes[user?.role as Role] ){
        const routes = roleBasedRoutes[user?.role as Role]

        if(routes.some((route) => pathname.match(route))){
            return NextResponse.next()
        }
    }


  return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login','/register','/profile',"/profile/:page*",'/admin'],
}