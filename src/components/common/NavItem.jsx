import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export const NavItem = ({ icon: Icon, label, id, activeTab, onPress }) => (
  <TouchableOpacity 
    onPress={() => onPress(id)}
    className={`flex flex-col items-center justify-center gap-1 w-full h-full`}
    style={{ minHeight: 44, minWidth: 44 }}
  >
    <Icon 
      size={24} 
      strokeWidth={activeTab === id ? 2.5 : 2} 
      color={activeTab === id ? '#2563eb' : '#94a3b8'}
    />
    <Text className={`text-[10px] font-medium ${activeTab === id ? 'text-blue-600' : 'text-slate-400'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);

