import { File } from 'expo-file-system';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

export type Media = { uri: string; kind: 'photo' | 'video'; mime: string; name: string };

export const MAX_PHOTOS = 3;
const MAX_SIDE = 1600; // px: suficiente para ver el detalle, ligero para subir
const VIDEO_MAX_SECONDS = 30;

// Foto: se redimensiona (lado mayor 1600) y se guarda en JPEG 0.6. La API
// acepta JPEG/PNG de hasta 10 MB; así queda muy por debajo.
async function compressPhoto(asset: ImagePicker.ImagePickerAsset): Promise<Media> {
  const big = Math.max(asset.width, asset.height);
  const ctx = ImageManipulator.manipulate(asset.uri);
  if (big > MAX_SIDE) {
    ctx.resize(asset.width >= asset.height ? { width: MAX_SIDE } : { height: MAX_SIDE });
  }
  const ref = await ctx.renderAsync();
  const out = await ref.saveAsync({ compress: 0.6, format: SaveFormat.JPEG });
  return { uri: out.uri, kind: 'photo', mime: 'image/jpeg', name: `foto-${Date.now()}.jpg` };
}

export type Source = 'camera' | 'library';

// Regresa null si el usuario cancela.
export async function pickMedia(kind: 'photo' | 'video', source: Source): Promise<Media | null> {
  const options: ImagePicker.ImagePickerOptions = {
    mediaTypes: kind === 'photo' ? 'images' : 'videos',
    quality: 1,
    videoMaxDuration: VIDEO_MAX_SECONDS,
    videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
    allowsEditing: false,
  };
  const result =
    source === 'camera'
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);
  const asset = result.canceled ? undefined : result.assets[0];
  if (!asset) return null;
  if (kind === 'photo') return compressPhoto(asset);
  return { uri: asset.uri, kind: 'video', mime: 'video/mp4', name: `video-${Date.now()}.mp4` };
}

// Permiso de cámara: 'ask' si todavía no se pregunta (se muestra primero la
// hoja propia del diseño), 'denied' si se negó y hay que ir a Ajustes.
export async function cameraPermission(): Promise<'granted' | 'ask' | 'denied'> {
  const p = await ImagePicker.getCameraPermissionsAsync();
  if (p.granted) return 'granted';
  if (p.canAskAgain) return 'ask';
  return 'denied';
}

export async function requestCamera(): Promise<boolean> {
  return (await ImagePicker.requestCameraPermissionsAsync()).granted;
}

// Parte multipart de un archivo local. El fetch global de Expo (SDK 57) no
// acepta el {uri, name, type} de React Native: necesita un Blob con bytes(),
// como el File de expo-file-system (nombre y tipo salen del archivo).
export function filePart(m: Media): Blob {
  return new File(m.uri);
}
