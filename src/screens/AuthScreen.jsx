import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
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
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Dumbbell color="white" size={32} />
          </View>
          <Text style={styles.title}>GymTracker Pro</Text>
          <Text style={styles.subtitle}>Tu evolución empieza aquí.</Text>
        </View>

        <View style={styles.form}>
          {authMode === 'signup' && (
            <View>
              <View style={styles.inputWrapper}>
                <View style={styles.iconContainer}>
                  <User color="#94a3b8" size={18} />
                </View>
                <TextInput 
                  placeholder="Tu Nombre (ej. Alex)" 
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(text) => setFormData({...formData, name: text})}
                  placeholderTextColor="#94a3b8"
                />
              </View>
              <View style={styles.row}>
                <TextInput 
                  keyboardType="numeric"
                  placeholder="Edad" 
                  style={[styles.input, styles.halfInput]}
                  value={formData.age}
                  onChangeText={(text) => setFormData({...formData, age: text})}
                  placeholderTextColor="#94a3b8"
                />
                <View style={[styles.input, styles.halfInput, styles.pickerPlaceholder]}>
                  <Text style={styles.pickerText}>Ganar Músculo</Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.inputWrapper}>
            <View style={styles.iconContainer}>
              <Mail color="#94a3b8" size={18} />
            </View>
            <TextInput 
              keyboardType="email-address"
              placeholder="correo@ejemplo.com" 
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.inputWrapper}>
            <View style={styles.iconContainer}>
              <Lock color="#94a3b8" size={18} />
            </View>
            <TextInput 
              secureTextEntry
              placeholder="Contraseña" 
              style={styles.input}
              value={formData.password}
              onChangeText={(text) => setFormData({...formData, password: text})}
              placeholderTextColor="#94a3b8"
            />
          </View>

          <TouchableOpacity 
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>
              {authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Text>
            <ArrowRight size={18} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {authMode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          </Text>
          <TouchableOpacity 
            onPress={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
          >
            <Text style={styles.footerLink}>
              {authMode === 'login' ? ' Regístrate' : ' Ingresa aquí'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logo: {
    backgroundColor: '#2563eb',
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    color: '#64748b',
    marginTop: 8,
    fontSize: 16,
  },
  form: {
    gap: 16,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  iconContainer: {
    position: 'absolute',
    left: 12,
    top: 14,
    zIndex: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    paddingLeft: 40,
    fontSize: 16,
    color: '#1e293b',
    minHeight: 48,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
    paddingLeft: 12,
  },
  pickerPlaceholder: {
    justifyContent: 'center',
  },
  pickerText: {
    fontSize: 14,
    color: '#475569',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#0f172a',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 56,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#64748b',
    fontSize: 14,
  },
  footerLink: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
