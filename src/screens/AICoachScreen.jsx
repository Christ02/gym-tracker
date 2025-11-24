import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Sparkles, Dumbbell, ChefHat, Lightbulb, Bot, Send, Loader2 } from 'lucide-react-native';
import { callGeminiAPI } from '../services/geminiService';

export const AICoachScreen = ({ user }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '¡Hola! Soy tu Coach IA. ¿En qué te puedo ayudar hoy? ¿Rutina, dieta o dudas?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userMsg = inputText;
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const aiResponse = await callGeminiAPI(
      `Eres un entrenador personal experto y nutricionista deportivo amable y motivador. Responde de forma concisa (máximo 3 párrafos).
       Contexto del usuario: Objetivo: ${user.goal}, Nombre: ${user.name}.
       Pregunta del usuario: ${userMsg}`
    );

    setLoading(false);
    setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
  };

  const handleQuickAction = (action) => {
    let prompt = "";
    if (action === 'routine') prompt = `Crea una rutina de 30 minutos para ${user.goal} usando solo mancuernas. Dame lista de ejercicios.`;
    if (action === 'diet') prompt = `Dame una idea de comida post-entreno alta en proteína para ${user.goal}.`;
    if (action === 'tips') prompt = `Dame 3 consejos clave para mejorar en ${user.goal}.`;
    
    setInputText(prompt);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-50"
      keyboardVerticalOffset={100}
    >
      <View className="flex-1 pt-2">
        <View className="items-center mb-4 px-1">
          <View className="flex-row items-center justify-center gap-2">
            <Sparkles color="#2563eb" size={24} />
            <Text className="text-xl font-bold text-slate-900">Coach IA</Text>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16, gap: 8 }}
          className="flex-shrink-0"
        >
          <TouchableOpacity 
            onPress={() => handleQuickAction('routine')} 
            className="bg-white border border-blue-100 px-4 py-2 rounded-full shadow-sm flex-row items-center gap-2"
            style={{ minHeight: 44 }}
          >
            <Dumbbell size={14} color="#2563eb" />
            <Text className="text-blue-600 text-xs font-bold whitespace-nowrap">Generar Rutina</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleQuickAction('diet')} 
            className="bg-white border border-green-100 px-4 py-2 rounded-full shadow-sm flex-row items-center gap-2"
            style={{ minHeight: 44 }}
          >
            <ChefHat size={14} color="#16a34a" />
            <Text className="text-green-600 text-xs font-bold whitespace-nowrap">Receta Fit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleQuickAction('tips')} 
            className="bg-white border border-orange-100 px-4 py-2 rounded-full shadow-sm flex-row items-center gap-2"
            style={{ minHeight: 44 }}
          >
            <Lightbulb size={14} color="#ea580c" />
            <Text className="text-orange-600 text-xs font-bold whitespace-nowrap">Consejos</Text>
          </TouchableOpacity>
        </ScrollView>

        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 px-4 py-2"
          contentContainerStyle={{ gap: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, i) => (
            <View key={i} className={`flex ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <View className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-blue-600 rounded-br-none shadow-md shadow-blue-200' 
                  : 'bg-white rounded-bl-none shadow-sm border border-slate-100'
              }`}>
                {msg.role === 'assistant' && (
                  <View className="flex-row items-center gap-2 mb-2">
                    <Bot size={14} color="#2563eb" />
                    <Text className="text-blue-600 font-bold text-xs uppercase tracking-wider">Coach Gemini</Text>
                  </View>
                )}
                <Text className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-slate-700'}`}>
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}
          {loading && (
            <View className="flex items-start">
              <View className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 flex-row items-center gap-2">
                <Loader2 size={16} color="#94a3b8" />
                <Text className="text-slate-400 text-sm">Pensando...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View className="p-4 bg-white border-t border-slate-100 pb-6">
          <View className="relative">
            <TextInput 
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              placeholder="Pregúntame lo que quieras..."
              className="w-full bg-slate-100 rounded-2xl py-4 pl-4 pr-12 text-slate-800"
              multiline
              maxHeight={100}
            />
            <TouchableOpacity 
              onPress={handleSend}
              disabled={!inputText.trim() || loading}
              className="absolute right-2 top-2 p-2 bg-blue-600 rounded-xl"
              style={{ minHeight: 44, minWidth: 44 }}
            >
              <Send size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

