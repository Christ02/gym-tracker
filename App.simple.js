import React, { useState } from 'react';
import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <View style={styles.content}>
        <Text style={styles.title}>GymTracker Pro</Text>
        <Text style={styles.subtitle}>¡App funcionando correctamente!</Text>
        <Text style={styles.text}>React Native + Expo</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#94a3b8',
  },
});

