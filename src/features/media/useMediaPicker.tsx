import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';

import { BottomSheet } from '@/ui';

import { cameraPermission, pickMedia, requestCamera, type Media, type Source } from './media';

// iOS no presenta la cámara mientras un Modal todavía se está cerrando.
const sheetClosed = () => new Promise((r) => setTimeout(r, 350));

// Hojas para agregar evidencia: elegir origen (cámara o dispositivo), el
// permiso propio antes del aviso del sistema, y la liga a Ajustes si se negó.
export function useMediaPicker(onPicked: (m: Media) => void) {
  const { t } = useTranslation();
  const [kind, setKind] = useState<'photo' | 'video' | null>(null);
  const [perm, setPerm] = useState<'ask' | 'denied' | null>(null);
  const [pending, setPending] = useState<'photo' | 'video'>('photo');

  const run = async (k: 'photo' | 'video', source: Source) => {
    setKind(null);
    await sheetClosed();
    if (source === 'camera') {
      const p = await cameraPermission();
      if (p !== 'granted') {
        setPending(k);
        setPerm(p);
        return;
      }
    }
    const m = await pickMedia(k, source);
    if (m) onPicked(m);
  };

  const sheets = (
    <>
      <BottomSheet
        visible={kind !== null}
        onClose={() => setKind(null)}
        title={t('report.mediaSheet')}
        options={
          kind === 'video'
            ? [
                { label: t('report.takeVideo'), tone: 'primary', onPress: () => void run('video', 'camera') },
                { label: t('report.pickVideo'), onPress: () => void run('video', 'library') },
              ]
            : [
                { label: t('report.takePhoto'), tone: 'primary', onPress: () => void run('photo', 'camera') },
                { label: t('report.pickPhoto'), onPress: () => void run('photo', 'library') },
              ]
        }
      />
      <BottomSheet
        visible={perm !== null}
        onClose={() => setPerm(null)}
        title={t('report.permTitle')}
        body={t('report.permBody')}
        cancelLabel={t('report.permLater')}
        options={[
          {
            label: perm === 'denied' ? t('report.openSettings') : t('report.permAllow'),
            tone: 'primary',
            onPress: async () => {
              const was = perm;
              setPerm(null);
              if (was === 'denied') return void Linking.openSettings();
              await sheetClosed();
              if (await requestCamera()) {
                const m = await pickMedia(pending, 'camera');
                if (m) onPicked(m);
              }
            },
          },
        ]}
      />
    </>
  );

  return { open: (k: 'photo' | 'video') => setKind(k), sheets };
}
