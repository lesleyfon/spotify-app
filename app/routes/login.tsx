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
    <div className="tw-relative tw-flex tw-flex-col tw-justify-center tw-content-center tw-items-center tw-m-0 tw-h-screen">
      <Form
        action={user ? '/logout' : '/auth/spotify'}
        method="post"
        className=" tw-shadow-custom tw-h-[500px] tw-flex tw-justify-center tw-content-center tw-items-center tw-w-[500px]"
      >
        <button className="tw-bg-wedgewood-500 hover:tw-bg-wedgewood-600 tw-text-wedgewood-50 tw-font-bold tw-py-2 tw-px-4 tw-rounded tw-transition tw-duration-300">
          {user ? 'Logout ' : 'Log in with Spotify →'}
        </button>

        <div
          className="tw-absolute tw-inset-x-0 -tw-top-40 -tw-z-10 tw-transform-gpu tw-overflow-hidden tw-blur-2xl sm:-tw-top-80"
          aria-hidden="true"
        >
          <div
            className="tw-relative tw-left-[calc(50%-11rem)] tw-aspect-[1155/678] tw-w-[36.125rem] -tw-translate-x-1/2 tw-rotate-[30deg] tw-bg-gradient-to-tr tw-from-[#ff80b5] tw-to-[#9089fc] tw-opacity-30 sm:tw-left-[calc(50%-30rem)] sm:tw-w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </Form>
    </div>
  );
}
