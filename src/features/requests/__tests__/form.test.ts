import { requestForm } from '../form';

jest.mock('expo-file-system', () => ({
  File: class {
    uri: string;
    constructor(mockUri: string) {
      this.uri = mockUri;
    }
  },
}));

it('arma el multipart con los nombres de campo de la API', () => {
  const appended: [string, unknown][] = [];
  const spy = jest.spyOn(FormData.prototype, 'append').mockImplementation(function (k: string, v: unknown) {
    appended.push([k, v]);
  });
  requestForm({ unitId: 342, areaId: undefined, description: '' }, [
    { uri: 'file:///a.jpg', kind: 'photo', mime: 'image/jpeg', name: 'a.jpg' },
    { uri: 'file:///b.mp4', kind: 'video', mime: 'video/mp4', name: 'b.mp4' },
  ]);
  expect(appended.map(([k]) => k)).toEqual(['unitId', 'images', 'video']);
  // El fetch de Expo necesita un File de expo-file-system (con bytes()).
  expect((appended[1]![1] as { uri: string }).uri).toBe('file:///a.jpg');
  spy.mockRestore();
});
