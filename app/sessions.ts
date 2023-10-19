import { createCookieSessionStorage, redirect } from '@remix-run/node';
import type { User } from './utils/APP_TYPES';

// Storage
const sessionSecret = 'SOME_STRONG_SECRET';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'spotify_app_session',
    secure: true,
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});
const { getSession, commitSession, destroySession } = sessionStorage;

async function createUserSession({ user, redirectTo }: { user: User; redirectTo: string }) {
  const session = await getSession();
  session.set('user', user);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

async function getUserSession(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));
  return session;
}

async function logout(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));

  session.unset('user');

  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(session, {
        expires: new Date(0),
      }),
    },
  });
}

export {
  getSession,
  commitSession,
  getUserSession,
  createUserSession,
  logout,
  sessionStorage,
  destroySession,
};
