import jwt from "jsonwebtoken";

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

const JWT_SECRET = (process.env.JWT_SECRET_KEY as string) || "DEFAULT";
const REFRESH_TOKEN_EXPIRATION =
  (process.env.REFRESH_TOKEN_EXPIRATION as string) || "7d";

export function generateJWT(
  payload: any,
  expiresIn: string = "10m",
): TokenPair {
  const ACCESS_TOKEN_EXPIRATION = expiresIn;

  const accessToken =
    "Bearer " +
    jwt.sign({ userId: payload.id }, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });

  const refreshToken =
    "Refresh " +
    jwt.sign({ userId: payload.id }, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });

  return { accessToken, refreshToken };
}
