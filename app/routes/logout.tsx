import type { ActionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { destroySession, getSession } from '~/service/session.server'

export async function action({ request }: ActionArgs) {
  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(await getSession(request.headers.get('cookie')), {
        expires: new Date(0),
      }),
    },
  })
}

export function loader() {
  throw json({}, { status: 404 })
}
