import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Dumbbell, Target, Award, TrendingUp, ArrowRight, Check } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export const OnboardingScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    goal: 'muscle',
    level: 'beginner',
    frequency: 3,
  });

  const steps = [
    {
      title: '¡Bienvenido a GymTracker Pro!',
      subtitle: 'Tu compañero perfecto para alcanzar tus metas fitness',
      icon: Dumbbell,
      color: '#3b82f6',
    },
    {
      title: 'Cuéntanos sobre ti',
      subtitle: 'Personaliza tu experiencia',
      icon: Target,
      color: '#8b5cf6',
    },
    {
      title: '¿Cuál es tu objetivo?',
      subtitle: 'Adaptaremos tus entrenamientos',
      icon: Award,
      color: '#f59e0b',
    },
    {
      title: '¡Todo listo!',
      subtitle: 'Comencemos tu transformación',
      icon: TrendingUp,
      color: '#22c55e',
    },
  ];

  const goals = [
    { id: 'muscle', label: 'Ganar Músculo', icon: '💪' },
    { id: 'lose_weight', label: 'Perder Peso', icon: '🔥' },
    { id: 'strength', label: 'Fuerza', icon: '⚡' },
    { id: 'endurance', label: 'Resistencia', icon: '🏃' },
  ];

  const levels = [
    { id: 'beginner', label: 'Principiante', subtitle: '0-6 meses' },
    { id: 'intermediate', label: 'Intermedio', subtitle: '6-24 meses' },
    { id: 'advanced', label: 'Avanzado', subtitle: '+24 meses' },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(userData);
    }
  };

  const canProceed = () => {
    if (step === 1) return userData.name && userData.age;
    return true;
  };

  const CurrentIcon = steps[step].icon;

  return (
    <View style={styles.container}>
      {/* PROGRESS BAR */}
      <View style={styles.progressBar}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index <= step && styles.progressDotActive,
              { backgroundColor: index <= step ? steps[step].color : '#e2e8f0' }
            ]}
          />
        ))}
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: `${steps[step].color}15` }]}>
          <CurrentIcon size={48} color={steps[step].color} />
        </View>

        <Text style={styles.title}>{steps[step].title}</Text>
        <Text style={styles.subtitle}>{steps[step].subtitle}</Text>

        {/* STEP 0: WELCOME */}
        {step === 0 && (
          <View style={styles.features}>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Check size={20} color="#22c55e" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Seguimiento Completo</Text>
                <Text style={styles.featureSubtitle}>Registra cada entreno y progreso</Text>
              </View>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Check size={20} color="#22c55e" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Coach IA</Text>
                <Text style={styles.featureSubtitle}>Asistencia personalizada 24/7</Text>
              </View>
            </View>
            <View style={styles.feature}>
              <View style={styles.featureIcon}>
                <Check size={20} color="#22c55e" />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>Estadísticas Pro</Text>
                <Text style={styles.featureSubtitle}>Analiza tu rendimiento</Text>
              </View>
            </View>
          </View>
        )}

        {/* STEP 1: PERSONAL INFO */}
        {step === 1 && (
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tu Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Alex"
                value={userData.name}
                onChangeText={(text) => setUserData({ ...userData, name: text })}
                placeholderTextColor="#94a3b8"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Edad</Text>
              <TextInput
                style={styles.input}
                placeholder="25"
                keyboardType="numeric"
                value={userData.age}
                onChangeText={(text) => setUserData({ ...userData, age: text })}
                placeholderTextColor="#94a3b8"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nivel de Experiencia</Text>
              {levels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  onPress={() => setUserData({ ...userData, level: level.id })}
                  style={[
                    styles.option,
                    userData.level === level.id && styles.optionActive
                  ]}
                >
                  <View style={styles.optionInfo}>
                    <Text style={[
                      styles.optionLabel,
                      userData.level === level.id && styles.optionLabelActive
                    ]}>
                      {level.label}
                    </Text>
                    <Text style={styles.optionSubtitle}>{level.subtitle}</Text>
                  </View>
                  {userData.level === level.id && (
                    <Check size={20} color="#3b82f6" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* STEP 2: GOALS */}
        {step === 2 && (
          <View style={styles.goalsGrid}>
            {goals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                onPress={() => setUserData({ ...userData, goal: goal.id })}
                style={[
                  styles.goalCard,
                  userData.goal === goal.id && styles.goalCardActive
                ]}
              >
                <Text style={styles.goalEmoji}>{goal.icon}</Text>
                <Text style={[
                  styles.goalLabel,
                  userData.goal === goal.id && styles.goalLabelActive
                ]}>
                  {goal.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* STEP 3: READY */}
        {step === 3 && (
          <View style={styles.readyContainer}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Tu Perfil</Text>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Nombre:</Text>
                <Text style={styles.summaryValue}>{userData.name}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Objetivo:</Text>
                <Text style={styles.summaryValue}>
                  {goals.find(g => g.id === userData.goal)?.label}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Nivel:</Text>
                <Text style={styles.summaryValue}>
                  {levels.find(l => l.id === userData.level)?.label}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* BUTTONS */}
      <View style={styles.buttonContainer}>
        {step > 0 && (
          <TouchableOpacity
            onPress={() => setStep(step - 1)}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Atrás</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleNext}
          disabled={!canProceed()}
          style={[
            styles.primaryButton,
            !canProceed() && styles.primaryButtonDisabled,
            { backgroundColor: steps[step].color }
          ]}
        >
          <Text style={styles.primaryButtonText}>
            {step === steps.length - 1 ? '¡Empezar!' : 'Continuar'}
          </Text>
          <ArrowRight size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 60,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  progressDot: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  progressDotActive: {
    height: 6,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 40,
  },
  features: {
    width: '100%',
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  form: {
    width: '100%',
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 8,
  },
  optionActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  optionInfo: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  optionLabelActive: {
    color: '#3b82f6',
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
  },
  goalCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 12,
  },
  goalCardActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#3b82f6',
  },
  goalEmoji: {
    fontSize: 48,
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  goalLabelActive: {
    color: '#3b82f6',
  },
  readyContainer: {
    width: '100%',
  },
  summaryCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 24,
    gap: 16,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 24,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    minHeight: 56,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  secondaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
});

