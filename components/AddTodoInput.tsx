import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Keyboard } from 'react-native';
import { colors, spacing, typography, radius, shadows } from '@/theme';

interface AddTodoInputProps {
  onAdd: (text: string) => void;
}

export function AddTodoInput({ onAdd }: AddTodoInputProps) {
  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Add a new task..."
        placeholderTextColor={colors.textTertiary}
        returnKeyType="done"
        onSubmitEditing={handleAdd}
        maxLength={200}
        autoCorrect
        autoCapitalize="sentences"
      />
      <TouchableOpacity onPress={handleAdd} activeOpacity={0.7} disabled={!text.trim()} style={[styles.addButton, !text.trim() && styles.addButtonDisabled]}>
        <Text style={styles.addButtonIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, paddingLeft: spacing.lg, paddingRight: spacing.sm, paddingVertical: spacing.sm, ...shadows.sm },
  input: { flex: 1, fontSize: typography.size.md, color: colors.textPrimary, paddingVertical: spacing.sm, minHeight: 44 },
  addButton: { width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginLeft: spacing.sm },
  addButtonDisabled: { backgroundColor: colors.primaryLight },
  addButtonIcon: { fontSize: 24, color: colors.textInverse, fontWeight: '300', lineHeight: 28 },
});
