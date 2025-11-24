import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowLeft, TrendingUp } from 'lucide-react-native';
import Svg, { Line, Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

export const ProgressScreen = ({ setActiveTab }) => {
  const [period, setPeriod] = useState('Semana');

  return (
    <View className="flex-1 pt-2 relative">
      <View className="flex-row items-center mb-6 relative px-6">
        <TouchableOpacity 
          onPress={() => setActiveTab('dashboard')}
          className="p-2 rounded-full absolute left-6"
          style={{ minHeight: 44, minWidth: 44 }}
        >
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900 w-full text-center">Mi Progreso</Text>
      </View>

      <View className="bg-slate-100 p-1 rounded-xl flex-row mb-6 mx-8">
        {['Semana', 'Mes', '6 Meses', 'Año'].map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPeriod(p)}
            className={`flex-1 py-1.5 rounded-lg ${period === p ? 'bg-white shadow-sm' : ''}`}
            style={{ minHeight: 44 }}
          >
            <Text className={`text-xs font-bold text-center ${period === p ? 'text-slate-900' : 'text-slate-400'}`}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="bg-white p-5 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-50 mb-8 relative overflow-hidden">
          <View className="flex-row justify-between items-start mb-6">
            <View>
              <Text className="text-slate-400 font-medium text-sm">Peso Total Levantado</Text>
              <View className="flex-row items-baseline mt-1">
                <Text className="text-3xl font-bold text-slate-900">15,450 </Text>
                <Text className="text-lg text-slate-400 font-medium">kg</Text>
              </View>
            </View>
            <View className="bg-blue-50 px-2 py-1 rounded-lg flex-row items-center gap-1">
              <TrendingUp size={12} color="#3b82f6" />
              <Text className="text-blue-500 text-xs font-bold">+12.5%</Text>
            </View>
          </View>

          <View style={{ height: 192 }}>
            <Svg viewBox="0 0 350 150" style={{ width: '100%', height: '100%' }}>
              <Defs>
                <LinearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <Stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </LinearGradient>
              </Defs>
              
              <Line x1="0" y1="150" x2="350" y2="150" stroke="#F1F5F9" strokeWidth="1" />
              <Line x1="0" y1="100" x2="350" y2="100" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
              <Line x1="0" y1="50" x2="350" y2="50" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
              
              <Path 
                d="M0,120 C40,40 60,80 100,110 C140,140 160,50 200,80 C240,110 260,10 300,50 L350,20"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <Path 
                d="M0,120 C40,40 60,80 100,110 C140,140 160,50 200,80 C240,110 260,10 300,50 L350,20 V150 H0 Z"
                fill="url(#chartGradient)"
              />
              
              <Circle cx="200" cy="80" r="5" fill="white" stroke="#3B82F6" strokeWidth="3" />
            </Svg>
          </View>

          <View className="flex-row justify-between mt-2 px-2">
            <Text className="text-xs text-slate-400 font-medium">L</Text>
            <Text className="text-xs text-slate-400 font-medium">M</Text>
            <Text className="text-xs text-slate-400 font-medium">X</Text>
            <Text className="text-xs text-slate-400 font-medium">J</Text>
            <Text className="text-xs text-slate-400 font-medium">V</Text>
            <Text className="text-xs text-slate-400 font-medium">S</Text>
            <Text className="text-xs text-slate-400 font-medium">D</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

