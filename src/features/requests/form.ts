import { filePart, type Media } from '@/features/media/media';

// Multipart de alta de reporte (v1): images[] (≤3, JPEG/PNG) y video (MP4).
export function requestForm(fields: Record<string, string | number | undefined>, media: Media[]): FormData {
  const form = new FormData();
  Object.entries(fields).forEach(([k, v]) => {
    if (v !== undefined && v !== '') form.append(k, String(v));
  });
  media.forEach((m) => form.append(m.kind === 'photo' ? 'images' : 'video', filePart(m)));
  return form;
}
