import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../utils/constants';

interface OfflineNoticeProps {
  visible: boolean;
}

/**
 * Componente que muestra un aviso cuando no hay conexión a internet
 */
export function OfflineNotice({ visible }: OfflineNoticeProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sin conexion a Internet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.warning,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: BORDER_RADIUS.md,
    borderBottomRightRadius: BORDER_RADIUS.md,
  },
  text: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text950,
  },
});
