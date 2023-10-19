import { redirect } from '@remix-run/node';
import type { ActionArgs } from '@remix-run/node';
import { logout } from '~/sessions';

export async function action({ request }: ActionArgs) {
  return await logout(request);
}

export async function loader() {
  return redirect('/login', {});
}
