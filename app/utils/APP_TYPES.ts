import type { SessionStorage } from '@remix-run/server-runtime'
import type { AuthenticateOptions, StrategyVerifyCallback } from 'remix-auth'
import type { OAuth2Profile, OAuth2StrategyVerifyParams } from 'remix-auth-oauth2'
import { OAuth2Strategy } from 'remix-auth-oauth2'

export interface SpotifyStrategyOptions {
  clientID: string
  clientSecret: string
  callbackURL: string
  scope?: string
  sessionStorage: SessionStorage
  sessionKey?: string
  sessionStrategyKey?: string
  sessionErrorKey?: string
}

export interface SpotifyImage {
  url: string
  height: number | null
  width: number | null
}

export interface SpotifyProfile extends OAuth2Profile {
  id: string
  displayName: string
  emails: [{ value: string }]
  photos?: [{ value: string }]
  __json: {
    id: string
    display_name: string
    email: string
    country: string
    explicit_content: {
      filter_enabled: boolean
      filter_locked: boolean
    }
    external_urls: {
      spotify: string
    }
    followers: {
      href: string | null
      total: number
    }
    href: string
    images: Array<SpotifyImage>
    product: string
    type: string
    uri: string
  }
}

export interface SpotifyExtraParams extends Record<string, string | number> {
  expiresIn: number
  tokenType: string
}

export interface User {
  id: string
  email: string
  name?: string
  image?: string
}
export interface Session {
  accessToken: string
  expiresAt: number
  refreshToken?: string
  tokenType?: string
  user: User | null
}

export interface RefreshTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
}

export type CheckOptions =
  | { successRedirect?: never; failureRedirect?: never }
  | { successRedirect: string; failureRedirect?: never }
  | { successRedirect?: never; failureRedirect: string }

export type ENV_VARIABLE = {
  CLIENT_ID: string
  CLIENT_SECRET: string
}

export interface ARTIST_TYPE {
  external_urls: ExternalUrls
  followers: Followers
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}

export interface ExternalUrls {
  spotify: string
}

export interface Followers {
  href: null
  total: number
}

export interface Image {
  height: number
  url: string
  width: number
}
