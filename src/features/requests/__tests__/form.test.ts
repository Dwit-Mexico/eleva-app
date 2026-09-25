import { requestForm } from '../form';

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
  expect(appended[1]![1]).toEqual({ uri: 'file:///a.jpg', name: 'a.jpg', type: 'image/jpeg' });
  spy.mockRestore();
});
