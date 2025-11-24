import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Dumbbell, User, Mail, Lock, ArrowRight } from 'lucide-react-native';
import { authService } from '../services/authService';

export const AuthScreen = () => {
  const [authMode, setAuthMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    goal: 'muscle'
  });

  const handleSubmit = async () => {
    // Validaciones
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (authMode === 'signup' && !formData.name) {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      if (authMode === 'signup') {
        // Registrar nuevo usuario
        await authService.signUp(formData.email, formData.password, {
          name: formData.name,
          goal: formData.goal,
          age: formData.age ? parseInt(formData.age) : null,
        });
        Alert.alert(
          '¡Éxito!', 
          'Cuenta creada exitosamente. Revisa tu email para verificar tu cuenta.',
          [{ text: 'OK', onPress: () => setAuthMode('login') }]
        );
      } else {
        // Iniciar sesión
        await authService.signIn(formData.email, formData.password);
        // El listener en App.js detectará el cambio de sesión automáticamente
      }
    } catch (error) {
      console.error('Auth Error:', error);
      let errorMessage = 'Ocurrió un error. Intenta de nuevo.';
      
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Email o contraseña incorrectos';
      } else if (error.message.includes('User already registered')) {
        errorMessage = 'Este email ya está registrado';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Por favor verifica tu email antes de iniciar sesión';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <Text style={styles.submitButtonText}>
                  {authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </Text>
                <ArrowRight size={18} color="white" />
              </>
            )}
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
