/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const AuthRoutes = ["/login","/register"]
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl

    const user = {
        name:"asif"
    }

    // const user = undefined

   if(!user){
        if(AuthRoutes.includes(pathname)){
            return NextResponse.next()
        } else{
            return NextResponse.redirect(new URL('/login', request.url))
        }
   }

  return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile',"/login","/register"],
}