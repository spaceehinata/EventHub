import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export const GradientButton: React.FC<Props> = ({ title, onPress, style, disabled }) => {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [style, { opacity: pressed ? 0.85 : 1 }]}>      
      <LinearGradient colors={['#ec4899', '#9333ea']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 26,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
