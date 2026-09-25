import { fireEvent, render, screen } from '@testing-library/react-native';

import i18n from '@/i18n';

import { Button } from '../Button';
import { StatusBadge, statusTone } from '../StatusBadge';
import { StepIndicator } from '../StepIndicator';

beforeAll(() => i18n.changeLanguage('es'));

describe('StatusBadge', () => {
  it('traduce el IdEstado y usa colores semánticos', () => {
    render(<StatusBadge statusId={8} />);
    expect(screen.getByText('Califica la reparación')).toBeTruthy();
    expect(statusTone(7)).toBe('warning');
    expect(statusTone(5)).toBe('success');
    expect(statusTone(9)).toBe('neutral');
  });

  it('cambia de idioma', async () => {
    await i18n.changeLanguage('en');
    render(<StatusBadge statusId={4} />);
    expect(screen.getByText('To schedule')).toBeTruthy();
    await i18n.changeLanguage('es');
  });
});

describe('StepIndicator', () => {
  it('anuncia el paso actual', () => {
    render(<StepIndicator current={3} total={7} />);
    expect(screen.getByText('Paso 3 de 7')).toBeTruthy();
    expect(screen.getByRole('progressbar').props.accessibilityValue).toEqual({ min: 1, max: 7, now: 3 });
  });
});

describe('Button', () => {
  it('no responde deshabilitado ni cargando', () => {
    const onPress = jest.fn();
    const { rerender } = render(<Button label="Enviar" onPress={onPress} />);
    fireEvent.press(screen.getByRole('button', { name: 'Enviar' }));
    expect(onPress).toHaveBeenCalledTimes(1);
    rerender(<Button label="Enviar" onPress={onPress} disabled />);
    fireEvent.press(screen.getByRole('button', { name: 'Enviar' }));
    rerender(<Button label="Enviar" onPress={onPress} loading />);
    fireEvent.press(screen.getByRole('button', { name: 'Enviar' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
