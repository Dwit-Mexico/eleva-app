import { useDraft, withArea, withEquipment } from '../draft';

const area = { id: 10, areaId: 1, name: { es: 'Cocina', en: 'Kitchen' } };
const equipment = { id: 20, equipmentId: 5, name: { es: 'Tarja', en: 'Sink' } };
const problem = { id: 8, name: { es: 'Fuga', en: 'Leak' } };

beforeEach(() => useDraft.getState().clear());

it('cambiar el área limpia equipo y problema', () => {
  const { update } = useDraft.getState();
  update({ area, equipment, problem, description: 'gotea' });
  update(withArea({ ...area, id: 11, areaId: 2 }));
  expect(useDraft.getState().draft).toMatchObject({ description: 'gotea', equipment: undefined, problem: undefined });
});

it('cambiar el equipo limpia solo el problema', () => {
  const { update } = useDraft.getState();
  update({ area, equipment, problem });
  update(withEquipment({ ...equipment, id: 21 }));
  expect(useDraft.getState().draft).toMatchObject({ area, problem: undefined });
});
