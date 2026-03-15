import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Keyboard, LayoutAnimation, Platform, UIManager } from 'react-native';
import { colors, spacing, typography, radius, shadows } from '@/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AddTodoInputProps {
  onAdd: (text: string, description?: string) => void;
}

export function AddTodoInput({ onAdd }: AddTodoInputProps) {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text.trim(), description.trim() || undefined);
    setText('');
    setDescription('');
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowDescription(false);
    Keyboard.dismiss();
  };

  const toggleDescription = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowDescription(prev => !prev);
  };

  return (
    <View style={styles.wrapper}>
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
        <TouchableOpacity
          onPress={toggleDescription}
          activeOpacity={0.7}
          style={styles.toggleButton}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
        >
          <Text style={styles.toggleIcon}>{showDescription ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdd} activeOpacity={0.7} disabled={!text.trim()} style={[styles.addButton, !text.trim() && styles.addButtonDisabled]}>
          <Text style={styles.addButtonIcon}>+</Text>
        </TouchableOpacity>
      </View>
      {showDescription && (
        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.descriptionInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Add a description (optional)..."
            placeholderTextColor={colors.textTertiary}
            returnKeyType="done"
            onSubmitEditing={handleAdd}
            maxLength={500}
            multiline
            autoCorrect
            autoCapitalize="sentences"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.sm },
  container: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, paddingLeft: spacing.lg, paddingRight: spacing.sm, paddingVertical: spacing.sm, ...shadows.sm },
  input: { flex: 1, fontSize: typography.size.md, color: colors.textPrimary, paddingVertical: spacing.sm, minHeight: 44 },
  toggleButton: { width: 36, height: 44, alignItems: 'center', justifyContent: 'center', marginLeft: spacing.xs },
  toggleIcon: { fontSize: 10, color: colors.textTertiary },
  addButton: { width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginLeft: spacing.xs },
  addButtonDisabled: { backgroundColor: colors.primaryLight },
  addButtonIcon: { fontSize: 24, color: colors.textInverse, fontWeight: '300', lineHeight: 28 },
  descriptionContainer: { backgroundColor: colors.surface, borderRadius: radius.lg, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, ...shadows.sm },
  descriptionInput: { fontSize: typography.size.sm, color: colors.textPrimary, minHeight: 60, paddingVertical: spacing.sm, lineHeight: typography.size.sm * typography.lineHeight.relaxed },
});
