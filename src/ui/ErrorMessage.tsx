import { AlertCircle } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { useTheme } from './ThemeProvider';

export function ErrorMessage({ message }: { message: string }) {
  const { palette } = useTheme();
  return (
    <View className="flex-row items-center gap-1.5" accessibilityRole="alert">
      <AlertCircle size={16} color={palette.danger} strokeWidth={2} />
      <Text className="flex-1 text-caption text-danger">{message}</Text>
    </View>
  );
}
