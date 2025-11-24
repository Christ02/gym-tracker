import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Dumbbell, Play, Flame, Timer, Check, Pause, Calendar } from 'lucide-react-native';

export const DashboardScreen = ({ user, startNewWorkout }) => {
  const getTodayRoutine = () => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const today = new Date();
    const dayName = days[today.getDay()];
    
    const routines = {
      'Lunes': { name: 'Pecho y Tríceps', type: 'Pecho' },
      'Martes': { name: 'Espalda y Bíceps', type: 'Espalda' },
      'Miércoles': { name: 'Pierna y Glúteo', type: 'Pierna' },
      'Jueves': { name: 'Hombro y Abs', type: 'Pecho' },
      'Viernes': { name: 'Full Body', type: 'Espalda' },
      'Sábado': { name: 'Cardio y Core', type: 'Pecho' },
      'Domingo': { name: 'Descanso Activo', type: 'Rest' }
    };
    return { day: dayName, ...routines[dayName] || routines['Lunes'] };
  };

  const todayRoutine = getTodayRoutine();

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100, paddingTop: 8 }}>
      <View className="px-6 space-y-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-slate-900">Hola, {user.name.split(' ')[0]}!</Text>
          <View className="h-9 w-9 bg-slate-200 rounded-full items-center justify-center overflow-hidden border border-slate-300">
            <Image 
              source={{ uri: `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}` }} 
              style={{ width: 36, height: 36 }}
            />
          </View>
        </View>

        {/* HERO CARD */}
        <View className="bg-slate-900 p-5 rounded-[2rem] border border-slate-800 relative overflow-hidden shadow-xl shadow-slate-200">
          <View className="relative z-10">
            <View className="flex-row justify-between items-start mb-4">
              <View>
                <View className="flex-row items-center gap-1 mb-1">
                  <Calendar size={12} color="#60a5fa" />
                  <Text className="text-blue-400 font-bold text-xs uppercase tracking-wider">
                    {todayRoutine.day}
                  </Text>
                </View>
                <Text className="text-2xl font-bold text-white leading-tight">{todayRoutine.name}</Text>
              </View>
              {todayRoutine.type === 'Rest' ? (
                <View className="bg-slate-800 p-2 rounded-xl">
                  <Pause color="#94a3b8" size={24} />
                </View>
              ) : (
                <View className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/50">
                  <Dumbbell color="white" size={24} />
                </View>
              )}
            </View>
            {todayRoutine.type === 'Rest' ? (
              <View className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                <Text className="text-slate-300 text-sm font-medium">
                  ¡Hoy toca recuperar! Estira o camina ligero.
                </Text>
              </View>
            ) : (
              <TouchableOpacity 
                onPress={() => startNewWorkout(todayRoutine.type)}
                className="w-full bg-white py-3.5 rounded-xl shadow-lg flex-row items-center justify-center gap-2"
                style={{ minHeight: 56 }}
              >
                <Play size={20} color="#2563eb" fill="#2563eb" />
                <Text className="text-slate-900 font-bold">Empezar Rutina Ahora</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* RESUMEN SEMANAL */}
        <View>
          <Text className="font-bold text-lg text-slate-900 mb-4">Resumen Semanal</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            <View className="items-center gap-2" style={{ minWidth: 60 }}>
              <Text className="text-xs font-bold text-slate-500 uppercase">Lun</Text>
              <View className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-500 items-center justify-center shadow-sm">
                <Check size={20} strokeWidth={3} color="#3b82f6" />
              </View>
              <Text className="text-xs font-bold text-slate-900">50 min</Text>
            </View>
            <View className="items-center gap-2" style={{ minWidth: 60 }}>
              <Text className="text-xs font-bold text-slate-500 uppercase">Mar</Text>
              <View className="w-12 h-12 rounded-full bg-slate-50 border-2 border-dashed border-slate-300 items-center justify-center">
                <Pause size={20} color="#cbd5e1" fill="#cbd5e1" />
              </View>
              <Text className="text-xs font-bold text-slate-400">Descanso</Text>
            </View>
            <View className="items-center gap-2" style={{ minWidth: 60 }}>
              <Text className="text-xs font-bold text-slate-500 uppercase">Mié</Text>
              <View className="w-12 h-12 rounded-full bg-blue-50 border-2 border-blue-500 items-center justify-center shadow-sm">
                <Check size={20} strokeWidth={3} color="#3b82f6" />
              </View>
              <Text className="text-xs font-bold text-slate-900">45 min</Text>
            </View>
            <View className="items-center gap-2 opacity-40" style={{ minWidth: 60 }}>
              <Text className="text-xs font-bold text-slate-400 uppercase">Jue</Text>
              <View className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-200" />
              <Text className="text-xs font-bold text-slate-400">-</Text>
            </View>
          </ScrollView>
        </View>

        {/* STATS ROW */}
        <View className="flex-row gap-4">
          <View className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
            <View className="w-9 h-9 rounded-full bg-orange-50 items-center justify-center mb-2">
              <Flame size={18} color="#f97316" fill="#f97316" />
            </View>
            <Text className="text-2xl font-bold text-slate-900">325</Text>
            <Text className="text-xs font-semibold text-slate-500 leading-tight">Calorías{'\n'}quemadas</Text>
          </View>
          <View className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
            <View className="w-9 h-9 rounded-full bg-green-50 items-center justify-center mb-2">
              <Timer size={18} color="#16a34a" strokeWidth={2.5} />
            </View>
            <Text className="text-2xl font-bold text-slate-900">48 min</Text>
            <Text className="text-xs font-semibold text-slate-500 leading-tight">Tiempo de{'\n'}entreno</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

