import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Search, Pencil, Trash2, Plus } from 'lucide-react-native';
import { MY_ROUTINES } from '../data/routines';

export const MyRoutinesScreen = ({ startNewWorkout }) => {
  const renderRoutineItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => startNewWorkout('Pecho')}
      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex-row items-center justify-between mb-3"
      style={{ minHeight: 80 }}
    >
      <View>
        <Text className="text-slate-900 font-bold text-lg mb-1">{item.name}</Text>
        <Text className="text-slate-500 text-sm">{item.count}</Text>
      </View>
      
      <View className="flex-row items-center gap-3">
        <TouchableOpacity 
          className="p-2 rounded-full"
          style={{ minHeight: 44, minWidth: 44 }}
        >
          <Pencil size={18} color="#1e293b" />
        </TouchableOpacity>
        <TouchableOpacity 
          className="p-2 rounded-full"
          style={{ minHeight: 44, minWidth: 44 }}
        >
          <Trash2 size={18} color="#1e293b" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 pt-2 relative">
      <View className="flex-row justify-between items-center mb-6 px-6">
        <Text className="text-2xl font-bold text-slate-900">Mis Rutinas</Text>
        <TouchableOpacity 
          className="p-2 rounded-full"
          style={{ minHeight: 44, minWidth: 44 }}
        >
          <Search size={24} color="#1e293b" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MY_ROUTINES}
        renderItem={renderRoutineItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <View className="absolute bottom-6 right-8">
        <TouchableOpacity 
          className="h-14 w-14 bg-blue-500 rounded-full shadow-xl shadow-blue-300 items-center justify-center"
          style={{ minHeight: 56, minWidth: 56 }}
        >
          <Plus size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

