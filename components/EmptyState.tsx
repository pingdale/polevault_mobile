import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TodoFilter } from '@/types/todo';
import { colors, spacing, typography } from '@/theme';

interface EmptyStateProps {
  filter: TodoFilter;
}

const messages: Record<TodoFilter, { emoji: string; title: string; subtitle: string }> = {
  all: { emoji: '✅', title: 'All clear!', subtitle: 'Add a task above to get started.' },
  active: { emoji: '🎉', title: 'Nothing left to do!', subtitle: "You've completed all your tasks." },
  completed: { emoji: '📝', title: 'No completed tasks yet', subtitle: 'Complete a task and it will show up here.' },
};

export function EmptyState({ filter }: EmptyStateProps) {
  const { emoji, title, subtitle } = messages[filter];
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: spacing.section * 2 },
  emoji: { fontSize: 52, marginBottom: spacing.lg },
  title: { fontSize: typography.size.xl, fontWeight: typography.weight.semibold, color: colors.textPrimary, marginBottom: spacing.sm, textAlign: 'center' },
  subtitle: { fontSize: typography.size.md, color: colors.textSecondary, textAlign: 'center', lineHeight: typography.size.md * typography.lineHeight.relaxed },
});
