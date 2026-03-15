export const colors = {
  primary: '#007AFF',
  primaryLight: '#E8F0FE',
  primaryDark: '#0056CC',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  surfaceSecondary: '#F8F8F8',
  textPrimary: '#1C1C1E',
  textSecondary: '#6C6C70',
  textTertiary: '#AEAEB2',
  textInverse: '#FFFFFF',
  border: '#E5E5EA',
  borderLight: '#F2F2F7',
  completedText: '#AEAEB2',
  completedBg: '#F8F8F8',
} as const;

export const spacing = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32, section: 40,
} as const;

export const typography = {
  size: { xs: 11, sm: 13, md: 15, lg: 17, xl: 20, xxl: 24, xxxl: 28, display: 34 },
  weight: { regular: '400' as const, medium: '500' as const, semibold: '600' as const, bold: '700' as const, heavy: '800' as const },
  lineHeight: { tight: 1.2, normal: 1.4, relaxed: 1.6 },
} as const;

export const radius = {
  sm: 8, md: 12, lg: 16, xl: 20, full: 999,
} as const;

export const shadows = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 8 },
} as const;

export default { colors, spacing, typography, radius, shadows };
