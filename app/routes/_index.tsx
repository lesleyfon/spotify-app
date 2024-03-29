import { debounce } from '@mui/material/utils';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React, { useEffect, useMemo, useState, useRef, Fragment } from 'react';
import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import type { ARTIST_TYPE, OFFSET_LIMIT_OPTION_TYPE, Session } from '~/utils/APP_TYPES';
import ArtistCard from '~/components/artistcard';
import LoadingIndicator from '~/components/loadingIndicator';
import NavBar from '~/components/navbar';
import { authenticator } from '~/service/auth.server';
import { getArtist } from '~/utils/script.spotify';

export const meta: V2_MetaFunction = () => [{ title: 'Spotify App' }];

export const loader = async ({ request }: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  })) as Session | null;

  return json({ user });
};

export default function Index() {
  const { user: userSession } = useLoaderData<typeof loader>();

  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<readonly ARTIST_TYPE[]>([]);
  const sectionEndRef = useRef<HTMLDivElement>(null);

  const fetch = useMemo(
    () =>
      debounce(
        async (
          request: {
            inputValue: string;
            userSession: Session | null;
            options?: OFFSET_LIMIT_OPTION_TYPE;
          },
          callback: (result: readonly ARTIST_TYPE[]) => void
        ) => {
          if (window === undefined || userSession === null) {
            return;
          }

          const result = (await getArtist(request.inputValue, userSession, {
            limit: request.options?.limit ?? 10,
            offset: request.options?.offset ?? 0,
          })) as ARTIST_TYPE[];

          callback(result);
        },
        1000
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue.replace(/^\s+|\s+$/g, '') === '') {
      setOptions([]);
      return;
    }

    fetch({ inputValue, userSession }, (results?: readonly ARTIST_TYPE[]) => {
      if (active) {
        let newOptions: readonly ARTIST_TYPE[] = [];

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue]);

  useEffect(() => {
    if (sectionEndRef.current === null) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const opt: OFFSET_LIMIT_OPTION_TYPE = {
            limit: 10,
            offset: options.length,
          };

          fetch({ inputValue, userSession, options: opt }, (results?: readonly ARTIST_TYPE[]) => {
            if (results) {
              setOptions([...options, ...results]);
            }
          });
        }
      },
      {
        threshold: 0.75,
      }
    );
    if (options.length > 0) {
      observer.observe(sectionEndRef.current!);
    }
    return () => {
      observer.disconnect();
    };
  }, [sectionEndRef, options]);

  const isLoading = options.length === 0 && inputValue.trim().length > 0;
  return (
    <>
      <NavBar />
      <main className=" tw-container tw-h-screen">
        <h1 className="tw-font-sans tw-text-center tw-text-3xl tw-mx-auto">
          Welcome {userSession?.user?.name}!!!
        </h1>
        <form className=" tw-w-full tw-mx-auto tw-mt-12 " method="get">
          <div className="tw-relative">
            <input
              type="text"
              id="floating_filled"
              name="artist"
              placeholder=" "
              className="tw-peer tw-pointer-events-auto tw-block tw-w-full tw-appearance-none tw-border-0 tw-border-b-2 tw-border-gray-300 tw-bg-gray-50 tw-px-2.5 tw-pb-2.5 tw-pt-5 tw-text-lg tw-text-gray-900 focus:tw-border-blue-600 focus:tw-outline-none focus:tw-ring-0 dark:tw-border-gray-600 dark:tw-bg-gray-700 dark:tw-text-white dark:focus:tw-border-blue-500"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInputValue(event.target.value);
              }}
            />

            <label
              htmlFor="floating_filled"
              className="tw-transform tw-flex tw-cursor-text tw-items-center tw-absolute tw-w-full tw-left-2.5 tw-top-4 tw-z-10 tw-origin-[0] tw--translate-y-4 tw-scale-75 tw-text-lg tw-text-gray-500 tw-duration-300 peer-placeholder-shown:tw-translate-y-0 peer-placeholder-shown:tw-scale-100 peer-focus:tw--translate-y-4 peer-focus:tw-scale-75 peer-focus:tw-text-blue-600 dark:tw-text-gray-400 peer-focus:dark:tw-text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="tw-top-0 tw-bottom-0 tw-w-6 tw-h-6 tw-my-auto tw-text-black-400 tw-left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Search Artist</span>
            </label>
          </div>
        </form>
        <section className=" tw-mt-5">
          {isLoading && <LoadingIndicator />}
          {options.length ? (
            <>
              {options.map((artist) => (
                <Fragment key={artist.uri}>
                  <ArtistCard {...{ ...artist }} />
                </Fragment>
              ))}
              <div id="section-end" ref={sectionEndRef}>
                <LoadingIndicator />
              </div>
            </>
          ) : null}
        </section>
      </main>
    </>
  );
}
