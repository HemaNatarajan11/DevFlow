import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(
      "JWT_SECRET is not defined"
    );
  }

  return secret;
}

export function generateToken(
  userId: string
): string {
  return jwt.sign(
    { userId },
    getJwtSecret(),
    {
      expiresIn:
        (process.env.JWT_EXPIRES_IN ??
          "7d") as jwt.SignOptions["expiresIn"],
    }
  );
}

export function verifyToken(
  token: string
): JwtPayload {
  return jwt.verify(
    token,
    getJwtSecret()
  ) as JwtPayload;
}