import type { Translations } from './es';

const en: Translations = {
  tabs: { home: 'Home', reports: 'Reports', documents: 'Documents', profile: 'Profile' },
  common: {
    back: 'Back',
    next: 'Next',
    send: 'Send',
    cancel: 'Cancel',
    retry: 'Retry',
    seeAll: 'See all',
    step: 'Step {{current}} of {{total}}',
    loading: 'Loading',
    notifications: 'Notifications',
    unreadNotifications: 'You have unread notifications',
  },
  status: {
    1: 'Pending',
    2: 'Warranty applies',
    3: 'Warranty does not apply',
    4: 'To schedule',
    5: 'Scheduled',
    6: 'Canceled',
    7: 'Done',
    8: 'To rate',
    9: 'Completed',
    10: 'Paused',
  },
  time: {
    now: 'Now',
    minutes_one: '{{count}} min ago',
    minutes_other: '{{count}} min ago',
    hours_one: '{{count}} h ago',
    hours_other: '{{count}} h ago',
    yesterday: 'Yesterday',
    days_one: '{{count}} day ago',
    days_other: '{{count}} days ago',
  },
  media: { photo: 'Photo {{n}}', video: 'Video', loaded: 'Loaded' },
  offline: {
    banner: 'Offline · read only',
    lastData: 'Data from {{time}}',
    back: 'Back online',
  },
};

export default en;
