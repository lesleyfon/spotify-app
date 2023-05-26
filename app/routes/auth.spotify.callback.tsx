import type { LoaderArgs } from '@remix-run/node';
import { authenticator } from '~/service/auth.server';

export async function loader({ request }: LoaderArgs) {
  return authenticator.authenticate('spotify', request, {
    successRedirect: '/',
    failureRedirect: '/login',
  });
}
