// Reglas de la contraseña nueva (el servidor pide mínimo 8; la letra y el
// número son del diseño).
export const passwordRules = {
  length: (p: string) => p.length >= 8,
  letterAndNumber: (p: string) => /[A-Za-zÁÉÍÓÚÑáéíóúñ]/.test(p) && /\d/.test(p),
};

export const passwordOk = (p: string) => passwordRules.length(p) && passwordRules.letterAndNumber(p);

export const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());
