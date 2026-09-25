import type { useRouter } from 'expo-router';

type Router = ReturnType<typeof useRouter>;

// Regresa al Inicio y deja la pila de Reportes en su lista, para que la
// pestaña no se quede abierta en la confirmación o en el formulario.
export function goHome(router: Router) {
  if (router.canDismiss()) router.dismissAll();
  router.navigate('/');
}
