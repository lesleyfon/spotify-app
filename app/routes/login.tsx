import { Form, useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';

import { spotifyStrategy } from '~/service/auth.server';

export async function loader({ request }: LoaderArgs) {
  return spotifyStrategy.getSession(request);
}

export default function Login() {
  const data = useLoaderData<typeof loader>();
  const user = data?.user;

  return (
    <div>
      <h2>Login to utilize App</h2>
      <Form action={user ? '/logout' : '/auth/spotify'} method="post">
        <button className="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-border tw-border-blue-700 tw-rounded">
          {user ? 'Logout' : 'Log in with Spotify'}
        </button>
      </Form>
    </div>
  );
}
