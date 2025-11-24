import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

export const SetRow = ({ index, prev, weight, reps, isCompleted }) => {
  const [completed, setCompleted] = useState(isCompleted);
  
  return (
    <View style={[styles.container, { opacity: completed ? 0.5 : 1 }]}>
      <View style={styles.indexCell}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
      <View style={styles.prevCell}>
        <Text style={styles.prevText}>{prev || '-'}</Text>
      </View>
      <View style={styles.inputCell}>
        <TextInput 
          keyboardType="numeric"
          placeholder={weight} 
          style={[styles.textInput, completed && styles.completedInput]}
          placeholderTextColor="#64748b"
        />
      </View>
      <View style={styles.inputCell}>
        <TextInput 
          keyboardType="numeric"
          placeholder={reps} 
          style={[styles.textInput, completed && styles.completedInput]}
          placeholderTextColor="#64748b"
        />
      </View>
      <View style={styles.checkCell}>
        <TouchableOpacity 
          onPress={() => setCompleted(!completed)}
          style={[styles.checkButton, completed ? styles.checkButtonActive : styles.checkButtonInactive]}
        >
          <Check size={18} strokeWidth={3} color={completed ? 'white' : '#94a3b8'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  indexCell: {
    flex: 1,
    alignItems: 'center',
  },
  indexText: {
    color: '#94a3b8',
    fontWeight: 'bold',
    fontSize: 14,
  },
  prevCell: {
    flex: 3,
    alignItems: 'center',
  },
  prevText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
    textAlign: 'center',
  },
  inputCell: {
    flex: 2,
    paddingHorizontal: 4,
  },
  textInput: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1e293b',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 6,
    minHeight: 36,
    fontSize: 16,
  },
  completedInput: {
    backgroundColor: '#f0fdf4',
  },
  checkCell: {
    flex: 2,
    alignItems: 'center',
  },
  checkButton: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 44,
    height: 32,
    width: '90%',
  },
  checkButtonActive: {
    backgroundColor: '#22c55e',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  checkButtonInactive: {
    backgroundColor: '#e2e8f0',
  },
});
