import { create } from 'zustand';

// Datos de paso entre pantallas de acceso (nunca se guardan en disco): el
// token de activación (15 min) y el correo/código de la recuperación.
type Flow = {
  activationToken: string | null;
  email: string;
  code: string;
  set: (p: Partial<Omit<Flow, 'set'>>) => void;
};

export const useAuthFlow = create<Flow>((set) => ({
  activationToken: null,
  email: '',
  code: '',
  set: (p) => set(p),
}));
