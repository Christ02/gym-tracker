import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ArrowLeft, Clock, MoreVertical, Plus } from 'lucide-react-native';
import { SetRow } from '../components/common/SetRow';

export const ActiveWorkoutScreen = ({ activeWorkout, setActiveTab, setActiveWorkout, setStats }) => {
  const handleFinish = () => {
    setActiveWorkout(null);
    setStats(prev => ({...prev, workoutsCompleted: prev.workoutsCompleted + 1}));
    setActiveTab('dashboard');
  };

  return (
    <View className="flex-1 bg-slate-50/50">
      <View className="bg-white p-4 pb-2 rounded-b-2xl shadow-sm flex-row justify-between items-center">
        <TouchableOpacity 
          onPress={() => setActiveTab('library')}
          className="p-2 rounded-full"
          style={{ minHeight: 44, minWidth: 44 }}
        >
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-lg font-bold text-slate-900">Día 1: Pecho</Text>
          <View className="flex-row items-center gap-1">
            <Clock size={12} color="#3b82f6" />
            <Text className="text-xs text-blue-500 font-medium">45:12</Text>
          </View>
        </View>
        <TouchableOpacity 
          onPress={handleFinish}
          className="bg-blue-500 px-4 py-1.5 rounded-full shadow-md shadow-blue-200"
          style={{ minHeight: 44 }}
        >
          <Text className="text-sm font-bold text-white">Terminar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-2" contentContainerStyle={{ paddingBottom: 100, gap: 16 }}>
        {activeWorkout.exercises.map((ex, index) => (
          <View key={index} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <View className="flex-row gap-4 mb-4">
              <View className="h-14 w-14 rounded-xl overflow-hidden bg-slate-100">
                <Image 
                  source={{ uri: ex.img }} 
                  style={{ width: 56, height: 56 }}
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1 flex-row justify-between items-start">
                <View>
                  <Text className="font-bold text-slate-900 text-lg leading-tight">{ex.name}</Text>
                  <Text className="text-blue-500 text-xs font-medium mt-1">Descanso: 90s</Text>
                </View>
                <TouchableOpacity 
                  className="bg-slate-50 p-2 rounded-full"
                  style={{ minHeight: 44, minWidth: 44 }}
                >
                  <MoreVertical size={18} color="#94a3b8" />
                </TouchableOpacity>
              </View>
            </View>
            
            <View className="mb-2">
              <View className="flex-row">
                <View className="flex-1 items-center">
                  <Text className="text-[10px] font-bold text-slate-400 uppercase">Set</Text>
                </View>
                <View className="flex-[3] items-center">
                  <Text className="text-[10px] font-bold text-slate-400 uppercase">Previo</Text>
                </View>
                <View className="flex-[2] items-center">
                  <Text className="text-[10px] font-bold text-slate-400 uppercase">Kg</Text>
                </View>
                <View className="flex-[2] items-center">
                  <Text className="text-[10px] font-bold text-slate-400 uppercase">Reps</Text>
                </View>
                <View className="flex-[2] items-center">
                  <Text className="text-[10px] font-bold text-slate-400 uppercase">Ok</Text>
                </View>
              </View>
            </View>

            <View className="space-y-1">
              <SetRow index={0} prev="80kg x 10" weight="80" reps="10" isCompleted={true} />
              <SetRow index={1} prev="80kg x 10" weight="80" reps="10" isCompleted={false} />
              <SetRow index={2} prev="80kg x 9" weight="80" reps="10" isCompleted={false} />
            </View>

            <View className="mt-4 items-center">
              <TouchableOpacity 
                className="bg-blue-50 px-4 py-2 rounded-lg flex-row items-center gap-1"
                style={{ minHeight: 44 }}
              >
                <Plus size={14} color="#3b82f6" />
                <Text className="text-xs font-bold text-blue-500">Añadir Serie</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

