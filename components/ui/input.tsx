import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

export interface InputProps extends TextInputProps {
  hasError?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ style, hasError, editable = true, ...props }, ref) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const textColor = isDark ? '#fafafa' : '#18181b';
    const placeholderColor = isDark ? '#71717a' : '#a1a1aa';
    const borderColor = hasError ? '#ef4444' : isDark ? '#3f3f46' : '#e4e4e7';
    const disabledColor = isDark ? '#52525b' : '#a1a1aa';

    return (
      <TextInput
        ref={ref}
        style={[
          styles.input,
          {
            color: editable ? textColor : disabledColor,
            borderBottomColor: borderColor,
          },
          style,
        ]}
        placeholderTextColor={placeholderColor}
        editable={editable}
        autoCorrect={false}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    lineHeight: 22,
    paddingTop: 4,
    paddingBottom: 12,
    minHeight: 44, // Minimum touch target size
    borderBottomWidth: 1,
  },
});

export { Input };
