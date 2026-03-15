import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { Todo } from '@/types/todo';
import { colors, spacing, typography, radius, shadows } from '@/theme';

interface TodoDetailModalProps {
  todo: Todo | null;
  visible: boolean;
  onClose: () => void;
  onSave: (id: string, changes: { text?: string; description?: string }) => void;
}

export function TodoDetailModal({ todo, visible, onClose, onSave }: TodoDetailModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.text);
      setDescription(todo.description ?? '');
    }
  }, [todo]);

  const handleSave = () => {
    if (!todo || !title.trim()) return;
    onSave(todo.id, { text: title, description });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>Edit Task</Text>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Task title..."
            placeholderTextColor={colors.textTertiary}
            maxLength={200}
            autoCorrect
            autoCapitalize="sentences"
          />
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Add a description (optional)..."
            placeholderTextColor={colors.textTertiary}
            maxLength={500}
            multiline
            autoCorrect
            autoCapitalize="sentences"
          />
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} activeOpacity={0.7} disabled={!title.trim()} style={[styles.saveButton, !title.trim() && styles.saveButtonDisabled]}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' },
  keyboardView: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  sheet: { backgroundColor: colors.surface, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: Platform.OS === 'ios' ? spacing.xxxl : spacing.xl, ...shadows.lg },
  handle: { width: 40, height: 4, borderRadius: radius.full, backgroundColor: colors.border, alignSelf: 'center', marginBottom: spacing.lg },
  sheetTitle: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: colors.textPrimary, marginBottom: spacing.lg },
  label: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.textSecondary, marginBottom: spacing.xs },
  titleInput: { backgroundColor: colors.surfaceSecondary, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, fontSize: typography.size.md, color: colors.textPrimary, marginBottom: spacing.md, minHeight: 44 },
  descriptionInput: { backgroundColor: colors.surfaceSecondary, borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, fontSize: typography.size.sm, color: colors.textPrimary, minHeight: 100, lineHeight: typography.size.sm * typography.lineHeight.relaxed, marginBottom: spacing.xl },
  actions: { flexDirection: 'row', gap: spacing.sm },
  cancelButton: { flex: 1, paddingVertical: spacing.md, borderRadius: radius.md, alignItems: 'center', backgroundColor: colors.surfaceSecondary },
  cancelText: { fontSize: typography.size.md, fontWeight: typography.weight.medium, color: colors.textSecondary },
  saveButton: { flex: 1, paddingVertical: spacing.md, borderRadius: radius.md, alignItems: 'center', backgroundColor: colors.primary },
  saveButtonDisabled: { backgroundColor: colors.primaryLight },
  saveText: { fontSize: typography.size.md, fontWeight: typography.weight.semibold, color: colors.textInverse },
});
