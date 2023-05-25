import { createCookieSessionStorage } from '@remix-run/node'

const envSecrete = process.env.SESSION_SECRETE

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'app-session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secretes: [envSecrete],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const { getSession, commitSession, destroySession } = sessionStorage
