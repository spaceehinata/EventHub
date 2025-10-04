import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export const LoadingFooter: React.FC<{ loading: boolean }> = ({ loading }) => {
  if (!loading) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
});
