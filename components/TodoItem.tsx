import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Todo } from '@/types/todo';
import { colors, spacing, typography, radius, shadows } from '@/theme';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleToggle = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
    onToggle(todo.id);
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity onPress={handleToggle} activeOpacity={0.8} style={styles.checkArea} hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}>
        <View style={[styles.checkbox, todo.completed && styles.checkboxChecked]}>
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleToggle} activeOpacity={0.7} style={styles.textArea}>
        <Text style={[styles.todoText, todo.completed && styles.todoTextCompleted]} numberOfLines={3}>
          {todo.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(todo.id)} activeOpacity={0.6} style={styles.deleteButton} hitSlop={{ top: 8, bottom: 8, left: 8, right: 4 }}>
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, paddingVertical: spacing.lg, paddingHorizontal: spacing.lg, marginBottom: spacing.sm, ...shadows.sm },
  checkArea: { marginRight: spacing.md },
  checkbox: { width: 26, height: 26, borderRadius: radius.full, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  checkboxChecked: { backgroundColor: colors.success, borderColor: colors.success },
  checkmark: { color: colors.textInverse, fontSize: 13, fontWeight: typography.weight.bold, lineHeight: 16 },
  textArea: { flex: 1, paddingRight: spacing.sm },
  todoText: { fontSize: typography.size.md, fontWeight: typography.weight.regular, color: colors.textPrimary, lineHeight: typography.size.md * typography.lineHeight.normal },
  todoTextCompleted: { color: colors.completedText, textDecorationLine: 'line-through' },
  deleteButton: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: radius.full, backgroundColor: colors.surfaceSecondary },
  deleteIcon: { fontSize: 11, color: colors.textTertiary, fontWeight: typography.weight.bold },
});
