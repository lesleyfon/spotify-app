import type { SessionStorage } from '@remix-run/server-runtime';
import type { CSSProperties } from 'react';
import type { OAuth2Profile } from 'remix-auth-oauth2';

export interface CustomCSSProperties extends CSSProperties {
  '--artist-image-url': string;
  '--image-url': string;
  '--bg-position': string;
  '--min-jumbotron-height': string;
}
export interface SpotifyStrategyOptions {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope?: string;
  sessionStorage: SessionStorage;
  sessionKey?: string;
  sessionStrategyKey?: string;
  sessionErrorKey?: string;
}

export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyProfile extends OAuth2Profile {
  id: string;
  displayName: string;
  emails: [{ value: string }];
  photos?: [{ value: string }];
  __json: {
    id: string;
    display_name: string;
    email: string;
    country: string;
    explicit_content: {
      filter_enabled: boolean;
      filter_locked: boolean;
    };
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string | null;
      total: number;
    };
    href: string;
    images: Array<SpotifyImage>;
    product: string;
    type: string;
    uri: string;
  };
}

export interface SpotifyExtraParams extends Record<string, string | number> {
  expiresIn: number;
  tokenType: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

export interface Session {
  accessToken: string;
  expiresAt: number;
  refreshToken?: string;
  tokenType?: string;
  user: User | null;
}

export interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export type CheckOptions =
  | { successRedirect?: never; failureRedirect?: never }
  | { successRedirect: string; failureRedirect?: never }
  | { successRedirect?: never; failureRedirect: string };

export type ENV_VARIABLE = {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
};

export interface ARTIST_TYPE {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface OFFSET_LIMIT_OPTION_TYPE {
  limit: number;
  offset: number;
}

export interface ExternalIdObject {
  isrc?: string | undefined;
  ean?: string | undefined;
  upc?: string | undefined;
}

export interface ExternalUrlObject {
  spotify: string;
}

export interface ContextObject {
  type: 'artist' | 'playlist' | 'album' | 'show' | 'episode';
  href: string;
  external_urls: ExternalUrlObject;
  uri: string;
}

export interface ArtistObjectSimplified extends ContextObject {
  name: string;
  id: string;
  type: 'artist';
}

export interface TrackLinkObject {
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  type: 'track';
  uri: string;
}

export interface RestrictionsObject {
  reason: string;
}

export interface TrackObjectSimplified {
  artists: ArtistObjectSimplified[];
  available_markets?: string[] | undefined;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  is_playable?: boolean | undefined;
  linked_from?: TrackLinkObject | undefined;
  restrictions?: RestrictionsObject | undefined;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
}

export interface TRACK_TYPE extends TrackObjectSimplified {
  album: AlbumObjectSimplified;

  external_ids: ExternalIdObject;
  popularity: number;
  is_local?: boolean | undefined;
}
export interface ARTIST_TOP_TRACKS_TYPE {
  tracks: TRACK_TYPE[];
}

interface AlbumObjectSimplified extends ContextObject {
  album_group?: 'album' | 'single' | 'compilation' | 'appears_on' | undefined;
  album_type: 'album' | 'single' | 'compilation';
  artists: ArtistObjectSimplified[];
  available_markets?: string[] | undefined;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  restrictions?: RestrictionsObject | undefined;
  type: 'album';
  total_tracks: number;
}
