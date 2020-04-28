import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // Validacao do token JWT

  const authHeader = request.headers.authorization;

  // Se header nao existir
  if (!authHeader) {
    throw new Error('JWT token is missing.');
  }

  // Bearer sauidhasudh

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload; // Forcar o tipo de uma variavel.

    // Passando o usuario que ta fazendo requisicao
    request.user = {
      id: sub,
    };

    console.log(decoded);

    return next();
  } catch {
    throw new Error('Invalid JWT token.');
  }
}
