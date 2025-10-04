import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
  right?: React.ReactNode;
}

export const HeroHeader: React.FC<Props> = ({ title, subtitle, style, children, right }) => {
  return (
    <LinearGradient colors={['#ec4899', '#9333ea']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.gradient, style]}>
      <View style={styles.topRow}>
        <Text style={styles.brand}>EventHub</Text>
        {right}
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={{ marginTop: 20 }}>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingTop: 28,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  brand: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 38,
    color: '#fff',
  },
  subtitle: {
    fontSize: 15,
    color: '#fce7f3',
    marginTop: 10,
    lineHeight: 20,
    maxWidth: 380,
  },
});
