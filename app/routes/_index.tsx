import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
	return [{ title: "Spotify App" }];
};

export default function Index() {
	return (
		<main>
			<h1>Welcome!!!</h1>
		</main>
	);
}
