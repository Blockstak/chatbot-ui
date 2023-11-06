interface JwtPayload {
  sub: string;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  version: number;
  user_type: number;
  account_id: string;
}
