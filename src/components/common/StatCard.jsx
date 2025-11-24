import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';

export const StatCard = ({ title, value, unit, change, changeType, icon: Icon, color = '#3b82f6' }) => {
  const getChangeIcon = () => {
    if (changeType === 'up') return <TrendingUp size={12} color="#22c55e" />;
    if (changeType === 'down') return <TrendingDown size={12} color="#ef4444" />;
    return <Minus size={12} color="#94a3b8" />;
  };

  const getChangeColor = () => {
    if (changeType === 'up') return '#22c55e';
    if (changeType === 'down') return '#ef4444';
    return '#94a3b8';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        <Icon size={20} color={color} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
      {change && (
        <View style={[styles.changeContainer, { backgroundColor: `${getChangeColor()}15` }]}>
          {getChangeIcon()}
          <Text style={[styles.changeText, { color: getChangeColor() }]}>{change}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  unit: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '500',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  changeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
});

