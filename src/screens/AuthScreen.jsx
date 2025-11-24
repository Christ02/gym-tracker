import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Dumbbell, User, Mail, Lock, ArrowRight } from 'lucide-react-native';

export const AuthScreen = ({ setUser }) => {
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    goal: 'muscle'
  });

  const handleSubmit = () => {
    setUser({
      name: formData.name || 'Alex',
      email: formData.email,
      goal: formData.goal
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="px-6 bg-white"
      >
        <View className="mb-8 items-center">
          <View className="bg-blue-600 w-16 h-16 rounded-2xl items-center justify-center mb-4 shadow-lg shadow-blue-200">
            <Dumbbell color="white" size={32} />
          </View>
          <Text className="text-3xl font-bold text-slate-800">GymTracker Pro</Text>
          <Text className="text-slate-500 mt-2">Tu evolución empieza aquí.</Text>
        </View>

        <View className="space-y-4">
          {authMode === 'signup' && (
            <View className="space-y-4">
              <View className="relative">
                <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <TextInput 
                  placeholder="Tu Nombre (ej. Alex)" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pl-10"
                  value={formData.name}
                  onChangeText={(text) => setFormData({...formData, name: text})}
                  style={{ paddingLeft: 40 }}
                />
              </View>
              <View className="flex-row gap-3">
                <TextInput 
                  keyboardType="numeric"
                  placeholder="Edad" 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-center"
                  value={formData.age}
                  onChangeText={(text) => setFormData({...formData, age: text})}
                />
                <View className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 justify-center">
                  <Text className="text-sm text-slate-700">Ganar Músculo</Text>
                </View>
              </View>
            </View>
          )}

          <View className="relative">
            <View className="absolute left-3 top-3.5 z-10">
              <Mail color="#94a3b8" size={18} />
            </View>
            <TextInput 
              keyboardType="email-address"
              placeholder="correo@ejemplo.com" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              style={{ paddingLeft: 40 }}
            />
          </View>

          <View className="relative">
            <View className="absolute left-3 top-3.5 z-10">
              <Lock color="#94a3b8" size={18} />
            </View>
            <TextInput 
              secureTextEntry
              placeholder="Contraseña" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
              value={formData.password}
              onChangeText={(text) => setFormData({...formData, password: text})}
              style={{ paddingLeft: 40 }}
            />
          </View>

          <TouchableOpacity 
            onPress={handleSubmit}
            className="w-full bg-slate-900 py-4 rounded-xl mt-6 flex-row items-center justify-center gap-2"
            style={{ minHeight: 56 }}
          >
            <Text className="text-white font-bold">
              {authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Text>
            <ArrowRight size={18} color="white" />
          </TouchableOpacity>
        </View>

        <View className="mt-8 items-center">
          <Text className="text-slate-500 text-sm">
            {authMode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <TouchableOpacity 
              onPress={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            >
              <Text className="text-blue-600 font-bold ml-2">
                {authMode === 'login' ? ' Regístrate' : ' Ingresa aquí'}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

