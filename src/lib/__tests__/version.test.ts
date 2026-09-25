import { compareVersions, isBelow } from '../version';

it('compara versiones', () => {
  expect(compareVersions('4.0.0', '4.0.0')).toBe(0);
  expect(compareVersions('3.6.4', '4.0.0')).toBe(-1);
  expect(compareVersions('4.10.0', '4.9.9')).toBe(1);
  expect(isBelow('4.0.0', '0.0.0')).toBe(false);
  expect(isBelow('4.0', '4.0.1')).toBe(true);
});
