import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const NavItem = ({ icon: Icon, label, id, activeTab, onPress }) => (
  <TouchableOpacity 
    onPress={() => onPress(id)}
    style={styles.container}
  >
    <Icon 
      size={24} 
      strokeWidth={activeTab === id ? 2.5 : 2} 
      color={activeTab === id ? '#2563eb' : '#94a3b8'}
    />
    <Text style={[styles.label, activeTab === id ? styles.labelActive : styles.labelInactive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: '100%',
    height: '100%',
    minHeight: 44,
    minWidth: 44,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
  },
  labelActive: {
    color: '#2563eb',
  },
  labelInactive: {
    color: '#94a3b8',
  },
});
