import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { AlertCircle, Paperclip, SendHorizontal, X } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appApi } from '@/api/app';
import { errorText } from '@/api/client';
import { keys, useMessages } from '@/api/queries';
import type { ChatMessage } from '@/api/schemas';
import { filePart, type Media } from '@/features/media/media';
import { MediaViewer } from '@/features/media/MediaViewer';
import { useMediaPicker } from '@/features/media/useMediaPicker';
import { currentLanguage } from '@/store/prefs';
import { BottomSheet, ConnectionBanner, Header, Skeleton, useTheme } from '@/ui';
import { needsNetwork } from '@/features/offline/guard';

const pad = (n: number) => String(n).padStart(2, '0');
const stamp = (iso: string) => {
  const d = new Date(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// Mensajes del reporte (prototipo: isChat). Burbujas del propietario en brand a
// la derecha, las del equipo en surface-1 con su nombre; foto opcional.
export default function Messages() {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { palette } = useTheme();
  const lang = currentLanguage();
  const { id } = useLocalSearchParams<{ id: string }>();
  const rid = Number(id);
  const messages = useMessages(rid);
  const list = messages.data ?? [];
  const scroll = useRef<ScrollView>(null);
  const [draft, setDraft] = useState('');
  const [photo, setPhoto] = useState<Media | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string>();
  const [viewer, setViewer] = useState<{ uri: string } | null>(null);
  const [removing, setRemoving] = useState<ChatMessage | null>(null);
  const picker = useMediaPicker((m) => setPhoto(m));
  const canSend = (draft.trim() !== '' || photo !== null) && !sending;

  // Leer el hilo marca los mensajes: se actualiza el contador del detalle.
  const count = list.length;
  useEffect(() => {
    if (count) void qc.invalidateQueries({ queryKey: keys.threads });
  }, [count, qc]);

  const send = async () => {
    if (!canSend) return;
    setSending(true);
    setError(undefined);
    try {
      const form = new FormData();
      if (draft.trim()) form.append('text', draft.trim());
      if (photo) form.append('image', filePart(photo));
      const { data } = await appApi.sendMessage(rid, form);
      qc.setQueryData<ChatMessage[]>(keys.messages(rid), (prev) => [...(prev ?? []), data]);
      setDraft('');
      setPhoto(null);
    } catch (e) {
      setError(errorText(e, lang));
    } finally {
      setSending(false);
    }
  };

  // Borrar un mensaje propio (dentro de los 15 minutos; lo valida la API).
  const remove = async () => {
    const m = removing;
    setRemoving(null);
    if (!m) return;
    setError(undefined);
    try {
      await appApi.deleteMessage(rid, m.id);
      qc.setQueryData<ChatMessage[]>(keys.messages(rid), (prev) =>
        prev?.map((x) => (x.id === m.id ? { ...x, deleted: true, text: '', imageUrl: null } : x)),
      );
      void qc.invalidateQueries({ queryKey: keys.threads });
    } catch (e) {
      setError(errorText(e, lang));
    }
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-bg">
      <Header title={t('chat.title')} back />
      <ConnectionBanner />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scroll}
          className="flex-1"
          contentContainerClassName="gap-3 px-5 pb-3 pt-4"
          onContentSizeChange={() => scroll.current?.scrollToEnd({ animated: false })}
          keyboardShouldPersistTaps="handled"
        >
          {messages.isLoading ? (
            <>
              <Skeleton height={64} />
              <Skeleton height={48} />
            </>
          ) : list.length === 0 ? (
            <Text className="py-8 text-center text-body leading-[1.375rem] text-text-soft">
              {t('chat.empty')}
            </Text>
          ) : (
            list.map((m) => (
              <Bubble
                key={m.id}
                m={m}
                onImage={(uri) => setViewer({ uri })}
                onLongPress={canDelete(m) ? needsNetwork(() => setRemoving(m)) : undefined}
              />
            ))
          )}
        </ScrollView>

        {photo ? (
          <View className="flex-row items-center gap-3 border-t border-surface-1 px-4 pt-2.5">
            <Pressable
              onPress={() => setViewer({ uri: photo.uri })}
              accessibilityRole="imagebutton"
              accessibilityLabel={t('chat.photo')}
            >
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 56, height: 56, borderRadius: 8 }}
                contentFit="cover"
              />
            </Pressable>
            <Text className="flex-1 text-caption text-text-soft">{t('chat.photo')}</Text>
            <Pressable
              onPress={() => setPhoto(null)}
              accessibilityRole="button"
              accessibilityLabel={t('report.remove')}
              className="h-11 w-11 items-center justify-center"
            >
              <X size={18} color={palette.danger} strokeWidth={2.5} />
            </Pressable>
          </View>
        ) : null}
        {error ? (
          <View className="flex-row items-center gap-2 px-4 pt-2" accessibilityRole="alert">
            <AlertCircle size={16} color={palette.danger} strokeWidth={2} />
            <Text className="flex-1 text-caption text-danger">{error}</Text>
          </View>
        ) : null}

        <View
          className={`flex-row items-end gap-2 bg-bg px-4 pb-5 pt-2.5 ${photo ? '' : 'border-t border-surface-1'}`}
        >
          <Pressable
            onPress={() => picker.open('photo')}
            accessibilityRole="button"
            accessibilityLabel={t('chat.attach')}
            className="h-11 w-11 items-center justify-center rounded-pill border border-border"
          >
            <Paperclip size={18} color={palette.brandSoft} strokeWidth={2} />
          </Pressable>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder={t('chat.placeholder')}
            placeholderTextColor={palette.textMute}
            selectionColor={palette.brand}
            multiline
            maxLength={2000}
            accessibilityLabel={t('chat.placeholder')}
            className="max-h-32 min-h-11 flex-1 rounded-md border border-border bg-surface-2 px-3.5 py-2.5 text-body leading-[1.375rem] text-text"
          />
          <Pressable
            onPress={needsNetwork(send)}
            disabled={!canSend}
            accessibilityRole="button"
            accessibilityLabel={sending ? t('chat.sending') : t('chat.send')}
            accessibilityState={{ disabled: !canSend, busy: sending }}
            className={`h-11 w-11 items-center justify-center rounded-pill ${canSend ? 'bg-brand' : 'bg-surface-2'}`}
          >
            <SendHorizontal size={18} color={canSend ? palette.ink : palette.textDisabled} strokeWidth={2} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      {picker.sheets}
      <BottomSheet
        visible={removing !== null}
        onClose={() => setRemoving(null)}
        title={t('chat.deleteQ')}
        body={t('chat.deleteBody')}
        options={[{ label: t('chat.deleteCta'), tone: 'danger', onPress: remove }]}
      />
      <MediaViewer
        items={viewer ? [{ kind: 'photo', uri: viewer.uri }] : []}
        index={viewer ? 0 : null}
        onIndex={() => undefined}
        onClose={() => setViewer(null)}
        caption={photo && viewer?.uri === photo.uri ? t('media.pending') : t('chat.photo')}
      />
    </SafeAreaView>
  );
}

// Se ofrece borrar los propios de los últimos 15 minutos (la API lo vuelve a
// revisar).
const DELETE_WINDOW = 15 * 60 * 1000;
const canDelete = (m: ChatMessage) =>
  !!m.mine && !m.deleted && Date.now() - new Date(m.sentAt).getTime() < DELETE_WINDOW;

function Bubble({
  m,
  onImage,
  onLongPress,
}: {
  m: ChatMessage;
  onImage: (uri: string) => void;
  onLongPress?: () => void;
}) {
  const { t } = useTranslation();
  const mine = m.mine ?? m.author === 'owner';
  // Del equipo: "Customer Service" en dorado. De otra persona de la vivienda
  // (propietario o invitado): su nombre, en gris.
  const label = mine ? null : m.author === 'team' ? t('chat.team') : m.authorName || t('chat.household');
  return (
    <View className={`flex-row ${mine ? 'justify-end' : 'justify-start'}`}>
      <Pressable
        onLongPress={onLongPress}
        disabled={!onLongPress}
        accessibilityHint={onLongPress ? t('chat.deleteHint') : undefined}
        className={`max-w-[80%] gap-1 rounded-[14px] px-3.5 py-3 ${m.deleted ? 'border border-dashed border-border' : mine ? 'bg-brand' : 'border border-border bg-surface-1'}`}
      >
        {label ? (
          <Text
            className={`text-label font-semibold tracking-[0.24px] ${m.author === 'team' ? 'text-brand-soft' : 'text-text-soft'}`}
          >
            {label}
          </Text>
        ) : null}
        {m.imageUrl ? (
          <Pressable
            onPress={() => onImage(m.imageUrl!)}
            accessibilityRole="imagebutton"
            accessibilityLabel={t('chat.photo')}
          >
            <Image
              source={{ uri: m.imageUrl }}
              style={{ width: 200, height: 150, borderRadius: 8 }}
              contentFit="cover"
            />
          </Pressable>
        ) : null}
        {m.deleted ? (
          <Text className="text-body italic leading-[1.375rem] text-text-mute">{t('chat.deleted')}</Text>
        ) : m.text ? (
          <Text className={`text-body leading-[1.375rem] ${mine ? 'text-ink' : 'text-text'}`}>{m.text}</Text>
        ) : null}
        <Text
          className={`text-[0.6875rem] leading-[0.875rem] ${mine && !m.deleted ? 'text-ink/60' : 'text-text-mute'}`}
        >
          {stamp(m.sentAt)}
        </Text>
      </Pressable>
    </View>
  );
}
