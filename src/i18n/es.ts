// Textos finales del rediseño (objeto T del prototipo). Las claves se agrupan
// por pantalla o componente.
const es = {
  tabs: { home: 'Inicio', reports: 'Reportes', documents: 'Documentos', profile: 'Perfil' },
  common: {
    back: 'Regresar',
    next: 'Siguiente',
    send: 'Enviar',
    cancel: 'Cancelar',
    retry: 'Reintentar',
    seeAll: 'Ver todos',
    step: 'Paso {{current}} de {{total}}',
    loading: 'Cargando',
    notifications: 'Notificaciones',
    unreadNotifications: 'Tienes notificaciones sin leer',
  },
  status: {
    1: 'Pendiente',
    2: 'Aplica garantía',
    3: 'No aplica garantía',
    4: 'Por agendar',
    5: 'Programada',
    6: 'Cancelada',
    7: 'Realizado',
    8: 'Por valorar',
    9: 'Finalizada',
    10: 'En pausa',
  },
  time: {
    now: 'Ahora',
    minutes_one: 'Hace {{count}} min',
    minutes_other: 'Hace {{count}} min',
    hours_one: 'Hace {{count}} h',
    hours_other: 'Hace {{count}} h',
    yesterday: 'Ayer',
    days_one: 'Hace {{count}} día',
    days_other: 'Hace {{count}} días',
  },
  media: { photo: 'Foto {{n}}', video: 'Video', loaded: 'Cargado' },
  offline: {
    banner: 'Sin conexión · solo consulta',
    lastData: 'Datos de las {{time}}',
    back: 'Conexión recuperada',
  },
};

export default es;
export type Translations = typeof es;
