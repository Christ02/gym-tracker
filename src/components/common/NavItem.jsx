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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    minWidth: 70,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
  labelActive: {
    color: '#2563eb',
  },
  labelInactive: {
    color: '#94a3b8',
  },
});
