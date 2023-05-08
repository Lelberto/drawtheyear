export type AccessTokenPayload = {
  sub: number;
  email: string;
}

export type RefreshTokenPayload = AccessTokenPayload;
