import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useTodos } from '@/hooks/useTodos';
import { TodoItem } from '@/components/TodoItem';
import { AddTodoInput } from '@/components/AddTodoInput';
import { FilterTabs } from '@/components/FilterTabs';
import { EmptyState } from '@/components/EmptyState';
import { ScreenContainer } from '@/components/ScreenContainer';
import { colors, spacing, typography } from '@/theme';

export function TodoScreen() {
  const { todos, filter, setFilter, isLoading, addTodo, toggleTodo, deleteTodo, clearCompleted, stats } = useTodos();

  const counts = { all: stats.total, active: stats.active, completed: stats.completed };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>My Tasks</Text>
            <Text style={styles.headerSubtitle}>
              {stats.active === 0 ? 'All done!' : `${stats.active} task${stats.active !== 1 ? 's' : ''} remaining`}
            </Text>
          </View>
          {stats.completed > 0 && (
            <TouchableOpacity onPress={clearCompleted} activeOpacity={0.7} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear done</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.inputSection}>
          <AddTodoInput onAdd={addTodo} />
        </View>
        <View style={styles.filterSection}>
          <FilterTabs filter={filter} onFilterChange={setFilter} counts={counts} />
        </View>
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TodoItem todo={item} onToggle={toggleTodo} onDelete={deleteTodo} />}
          contentContainerStyle={[styles.listContent, todos.length === 0 && styles.listContentEmpty]}
          ListEmptyComponent={isLoading ? null : <EmptyState filter={filter} />}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: spacing.lg },
  headerTitle: { fontSize: typography.size.xxxl, fontWeight: typography.weight.bold, color: colors.textPrimary, letterSpacing: -0.5 },
  headerSubtitle: { fontSize: typography.size.sm, color: colors.textSecondary, marginTop: spacing.xs, fontWeight: typography.weight.medium },
  clearButton: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: 8, backgroundColor: colors.surface },
  clearButtonText: { fontSize: typography.size.sm, color: colors.danger, fontWeight: typography.weight.medium },
  inputSection: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  filterSection: { paddingHorizontal: spacing.xl, marginBottom: spacing.md },
  listContent: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  listContentEmpty: { flex: 1 },
});
