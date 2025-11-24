import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Check } from 'lucide-react-native';

export const SetRow = ({ index, prev, weight, reps, isCompleted }) => {
  const [completed, setCompleted] = useState(isCompleted);
  
  return (
    <View className="flex-row items-center py-2" style={{ opacity: completed ? 0.5 : 1 }}>
      <View className="flex-1 items-center">
        <Text className="text-slate-400 font-bold text-sm">{index + 1}</Text>
      </View>
      <View className="flex-[3] items-center">
        <Text className="text-xs text-slate-400 font-medium text-center">{prev || '-'}</Text>
      </View>
      <View className="flex-[2] px-1">
        <TextInput 
          keyboardType="numeric"
          placeholder={weight} 
          className={`w-full text-center font-bold text-slate-800 rounded-lg p-1.5 ${completed ? 'bg-green-50' : 'bg-slate-100'}`}
          style={{ minHeight: 36 }}
        />
      </View>
      <View className="flex-[2] px-1">
        <TextInput 
          keyboardType="numeric"
          placeholder={reps} 
          className={`w-full text-center font-bold text-slate-800 rounded-lg p-1.5 ${completed ? 'bg-green-50' : 'bg-slate-100'}`}
          style={{ minHeight: 36 }}
        />
      </View>
      <View className="flex-[2] items-center">
        <TouchableOpacity 
          onPress={() => setCompleted(!completed)}
          className={`rounded-lg items-center justify-center ${completed ? 'bg-green-500 shadow-lg shadow-green-200' : 'bg-slate-200'}`}
          style={{ minHeight: 44, minWidth: 44, height: 32, width: '90%' }}
        >
          <Check size={18} strokeWidth={3} color={completed ? 'white' : '#94a3b8'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

