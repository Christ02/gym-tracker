import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Sparkles, Dumbbell, ChefHat, Lightbulb, Bot, Send, Loader2 } from 'lucide-react-native';
import { callGeminiAPI } from '../services/geminiService';

export const AICoachScreen = ({ user }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '¡Hola! Soy tu Coach IA. ¿En qué te puedo ayudar hoy? ¿Rutina, dieta o dudas?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);

  // Obtener datos del usuario de forma segura
  const userName = user?.name || user?.user_metadata?.name || 'Usuario';
  const userGoal = user?.goal || user?.user_metadata?.goal || 'fitness general';

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
       Contexto del usuario: Objetivo: ${userGoal}, Nombre: ${userName}.
       Pregunta del usuario: ${userMsg}`
    );

    setLoading(false);
    setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
  };

  const handleQuickAction = (action) => {
    let prompt = "";
    if (action === 'routine') prompt = `Crea una rutina de 30 minutos para ${userGoal} usando solo mancuernas. Dame lista de ejercicios.`;
    if (action === 'diet') prompt = `Dame una idea de comida post-entreno alta en proteína para ${userGoal}.`;
    if (action === 'tips') prompt = `Dame 3 consejos clave para mejorar en ${userGoal}.`;
    
    setInputText(prompt);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Sparkles color="#2563eb" size={24} />
            <Text style={styles.title}>Coach IA</Text>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsContent}
          style={styles.quickActions}
        >
          <TouchableOpacity 
            onPress={() => handleQuickAction('routine')} 
            style={[styles.quickButton, styles.quickButtonBlue]}
          >
            <Dumbbell size={14} color="#2563eb" />
            <Text style={styles.quickButtonTextBlue}>Generar Rutina</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleQuickAction('diet')} 
            style={[styles.quickButton, styles.quickButtonGreen]}
          >
            <ChefHat size={14} color="#16a34a" />
            <Text style={styles.quickButtonTextGreen}>Receta Fit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleQuickAction('tips')} 
            style={[styles.quickButton, styles.quickButtonOrange]}
          >
            <Lightbulb size={14} color="#ea580c" />
            <Text style={styles.quickButtonTextOrange}>Consejos</Text>
          </TouchableOpacity>
        </ScrollView>

        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, i) => (
            <View key={i} style={[styles.messageRow, msg.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant]}>
              <View style={[styles.messageBubble, msg.role === 'user' ? styles.messageBubbleUser : styles.messageBubbleAssistant]}>
                {msg.role === 'assistant' && (
                  <View style={styles.assistantBadge}>
                    <Bot size={14} color="#2563eb" />
                    <Text style={styles.assistantBadgeText}>Coach Gemini</Text>
                  </View>
                )}
                <Text style={[styles.messageText, msg.role === 'user' ? styles.messageTextUser : styles.messageTextAssistant]}>
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}
          {loading && (
            <View style={styles.messageRowAssistant}>
              <View style={styles.messageBubbleAssistant}>
                <View style={styles.loadingRow}>
                  <Loader2 size={16} color="#94a3b8" />
                  <Text style={styles.loadingText}>Pensando...</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput 
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              placeholder="Pregúntame lo que quieras..."
              style={styles.textInput}
              multiline
              maxHeight={100}
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity 
              onPress={handleSend}
              disabled={!inputText.trim() || loading}
              style={[styles.sendButton, (!inputText.trim() || loading) && styles.sendButtonDisabled]}
            >
              <Send size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  quickActions: {
    flexShrink: 0,
  },
  quickActionsContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
    gap: 8,
  },
  quickButton: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 44,
    backgroundColor: 'white',
  },
  quickButtonBlue: {
    borderColor: '#dbeafe',
  },
  quickButtonGreen: {
    borderColor: '#dcfce7',
  },
  quickButtonOrange: {
    borderColor: '#fed7aa',
  },
  quickButtonTextBlue: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quickButtonTextGreen: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quickButtonTextOrange: {
    color: '#ea580c',
    fontSize: 12,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messagesContent: {
    gap: 16,
  },
  messageRow: {
    flexDirection: 'row',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  messageRowAssistant: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 16,
    borderRadius: 16,
  },
  messageBubbleUser: {
    backgroundColor: '#2563eb',
    borderBottomRightRadius: 4,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  messageBubbleAssistant: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  assistantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  assistantBadgeText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  messageTextUser: {
    color: 'white',
  },
  messageTextAssistant: {
    color: '#475569',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  inputContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingBottom: 24,
  },
  inputWrapper: {
    position: 'relative',
  },
  textInput: {
    width: '100%',
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 56,
    color: '#1e293b',
    fontSize: 16,
  },
  sendButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 8,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
