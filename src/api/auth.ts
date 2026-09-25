import { z } from 'zod';

import { request } from './client';
import { appConfig, session } from './schemas';

const empty = z.unknown();

export const authApi = {
  login: (email: string, password: string) =>
    request('POST', '/auth/app/login', session, { body: { email, password }, authenticated: false }),
  // El token de activación (15 min) viene del login con la contraseña de alta.
  activate: (activationToken: string, password: string) =>
    request('POST', '/auth/activate', session, { body: { password }, bearer: activationToken }),
  refresh: (refreshToken: string) =>
    request('POST', '/auth/refresh', session, { body: { refreshToken }, authenticated: false }),
  logout: (refreshToken: string) =>
    request('POST', '/auth/logout', empty, { body: { refreshToken }, authenticated: false }),
  requestRecovery: (email: string) =>
    request('POST', '/auth/password-recovery', empty, { body: { email }, authenticated: false }),
  verifyRecovery: (email: string, code: string) =>
    request('POST', '/auth/password-recovery/verify', empty, { body: { email, code }, authenticated: false }),
  resetPassword: (email: string, code: string, newPassword: string) =>
    request('POST', '/auth/password-recovery/reset', empty, {
      body: { email, code, newPassword },
      authenticated: false,
    }),
  config: () => request('GET', '/app/config', appConfig, { authenticated: false }),
};
