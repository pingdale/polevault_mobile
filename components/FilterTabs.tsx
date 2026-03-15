import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TodoFilter } from '@/types/todo';
import { colors, spacing, typography, radius } from '@/theme';

interface FilterTabsProps {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  counts: { all: number; active: number; completed: number };
}

const TABS: { key: TodoFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Done' },
];

export function FilterTabs({ filter, onFilterChange, counts }: FilterTabsProps) {
  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = filter === tab.key;
        const count = counts[tab.key];
        return (
          <TouchableOpacity key={tab.key} onPress={() => onFilterChange(tab.key)} activeOpacity={0.7} style={[styles.tab, isActive && styles.tabActive]}>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
            {count > 0 && (
              <View style={[styles.badge, isActive && styles.badgeActive]}>
                <Text style={[styles.badgeText, isActive && styles.badgeTextActive]}>{count}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.xs },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.sm, paddingHorizontal: spacing.sm, borderRadius: radius.md, gap: spacing.xs },
  tabActive: { backgroundColor: colors.primary },
  tabLabel: { fontSize: typography.size.sm, fontWeight: typography.weight.medium, color: colors.textSecondary },
  tabLabelActive: { color: colors.textInverse, fontWeight: typography.weight.semibold },
  badge: { backgroundColor: colors.borderLight, borderRadius: radius.full, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 },
  badgeActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  badgeText: { fontSize: typography.size.xs, fontWeight: typography.weight.semibold, color: colors.textSecondary },
  badgeTextActive: { color: colors.textInverse },
});
