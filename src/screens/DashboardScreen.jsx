import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Dumbbell, Play, Flame, Timer, Check, Pause, Calendar, Award, Target } from 'lucide-react-native';
import { WorkoutCalendar } from '../components/common/WorkoutCalendar';
import { StatCard } from '../components/common/StatCard';

export const DashboardScreen = ({ user, startNewWorkout }) => {
  const [currentMonth] = useState(new Date());
  const [completedDays] = useState([1, 3, 5, 10, 12, 15, 17]);
  
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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hola, {user.name.split(' ')[0]}!</Text>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}` }} 
              style={styles.avatar}
            />
          </View>
        </View>

        {/* HERO CARD */}
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <View style={styles.heroHeader}>
              <View>
                <View style={styles.dayBadge}>
                  <Calendar size={12} color="#60a5fa" />
                  <Text style={styles.dayText}>{todayRoutine.day.toUpperCase()}</Text>
                </View>
                <Text style={styles.heroTitle}>{todayRoutine.name}</Text>
              </View>
              {todayRoutine.type === 'Rest' ? (
                <View style={styles.iconRestContainer}>
                  <Pause color="#94a3b8" size={24} />
                </View>
              ) : (
                <View style={styles.iconActiveContainer}>
                  <Dumbbell color="white" size={24} />
                </View>
              )}
            </View>
            {todayRoutine.type === 'Rest' ? (
              <View style={styles.restMessage}>
                <Text style={styles.restText}>
                  ¡Hoy toca recuperar! Estira o camina ligero.
                </Text>
              </View>
            ) : (
              <TouchableOpacity 
                onPress={() => startNewWorkout(todayRoutine.type)}
                style={styles.startButton}
              >
                <Play size={20} color="#2563eb" fill="#2563eb" />
                <Text style={styles.startButtonText}>Empezar Rutina Ahora</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* RESUMEN SEMANAL */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen Semanal</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weeklyContainer}>
            <View style={styles.dayItem}>
              <Text style={styles.dayLabel}>LUN</Text>
              <View style={[styles.dayCircle, styles.dayCircleCompleted]}>
                <Check size={20} strokeWidth={3} color="#3b82f6" />
              </View>
              <Text style={styles.dayTime}>50 min</Text>
            </View>
            <View style={styles.dayItem}>
              <Text style={styles.dayLabel}>MAR</Text>
              <View style={[styles.dayCircle, styles.dayCircleRest]}>
                <Pause size={20} color="#cbd5e1" fill="#cbd5e1" />
              </View>
              <Text style={styles.dayTimeRest}>Descanso</Text>
            </View>
            <View style={styles.dayItem}>
              <Text style={styles.dayLabel}>MIÉ</Text>
              <View style={[styles.dayCircle, styles.dayCircleCompleted]}>
                <Check size={20} strokeWidth={3} color="#3b82f6" />
              </View>
              <Text style={styles.dayTime}>45 min</Text>
            </View>
            <View style={[styles.dayItem, { opacity: 0.4 }]}>
              <Text style={styles.dayLabelInactive}>JUE</Text>
              <View style={styles.dayCircleInactive} />
              <Text style={styles.dayTimeInactive}>-</Text>
            </View>
          </ScrollView>
        </View>

        {/* STATS ROW */}
        <View style={styles.statsGrid}>
          <StatCard 
            title="Entrenamientos"
            value="12"
            icon={Dumbbell}
            change="+3"
            changeType="up"
            color="#3b82f6"
          />
          <StatCard 
            title="Récord Personal"
            value="125"
            unit="kg"
            icon={Award}
            change="+5kg"
            changeType="up"
            color="#8b5cf6"
          />
          <StatCard 
            title="Calorías"
            value="3.2K"
            icon={Flame}
            change="+12%"
            changeType="up"
            color="#f97316"
          />
          <StatCard 
            title="Tiempo Total"
            value="8.5"
            unit="hrs"
            icon={Timer}
            change="+2.5h"
            changeType="up"
            color="#22c55e"
          />
        </View>

        {/* CALENDARIO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Calendario de Entrenamientos</Text>
          <WorkoutCalendar 
            currentMonth={currentMonth}
            completedDays={completedDays}
            onDayPress={(day) => console.log('Day pressed:', day)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120,
    paddingTop: 8,
  },
  content: {
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  avatarContainer: {
    height: 36,
    width: 36,
    backgroundColor: '#e2e8f0',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  avatar: {
    width: 36,
    height: 36,
  },
  heroCard: {
    backgroundColor: '#0f172a',
    padding: 20,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#1e293b',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 24,
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  dayText: {
    color: '#60a5fa',
    fontWeight: 'bold',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 28,
  },
  iconRestContainer: {
    backgroundColor: '#1e293b',
    padding: 8,
    borderRadius: 12,
  },
  iconActiveContainer: {
    backgroundColor: '#2563eb',
    padding: 8,
    borderRadius: 12,
    shadowColor: '#1e40af',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  restMessage: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.5)',
  },
  restText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '500',
  },
  startButton: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 56,
  },
  startButtonText: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1e293b',
    marginBottom: 16,
  },
  weeklyContainer: {
    gap: 8,
  },
  dayItem: {
    alignItems: 'center',
    gap: 8,
    minWidth: 60,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  dayLabelInactive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  dayCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleCompleted: {
    backgroundColor: '#dbeafe',
    borderWidth: 2,
    borderColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  dayCircleRest: {
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#cbd5e1',
    borderStyle: 'dashed',
  },
  dayCircleInactive: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  dayTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  dayTimeRest: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  dayTimeInactive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
});
