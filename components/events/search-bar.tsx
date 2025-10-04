import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Props {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  debounce?: number;
}

export const SearchBar: React.FC<Props> = ({ value, onChange, placeholder = 'Search events', debounce = 350 }) => {
  const [internal, setInternal] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setInternal(value);
  }, [value]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      onChange(internal);
    }, debounce);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [internal, debounce, onChange]);

  return (
    <View style={[styles.wrapper, { backgroundColor: c.card, borderColor: focused ? c.tint : c.border, shadowColor: focused ? c.tint : '#000' }, focused && styles.wrapperFocused]}>
      <TextInput
        value={internal}
        onChangeText={setInternal}
        placeholder={placeholder}
        style={[styles.input, { color: c.text }]}
        autoCapitalize="none"
        returnKeyType="search"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={c.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    elevation: 2,
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  wrapperFocused: {
    elevation: 4,
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  input: {
    fontSize: 16,
  },
});
