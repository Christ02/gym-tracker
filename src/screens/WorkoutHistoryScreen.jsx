import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Calendar, Clock, Dumbbell, TrendingUp, Award } from 'lucide-react-native';

export const WorkoutHistoryScreen = ({ onClose }) => {
  const workoutHistory = [
    {
      id: 1,
      date: '2024-11-24',
      title: 'Pecho y Tríceps',
      duration: 65,
      exercises: 6,
      volume: 12500,
      calories: 420,
      notes: 'Gran sesión, nuevo PR en press de banca',
      isPR: true,
    },
    {
      id: 2,
      date: '2024-11-22',
      title: 'Pierna Completa',
      duration: 72,
      exercises: 7,
      volume: 15200,
      calories: 510,
      notes: 'Sentadilla profunda mejorada',
      isPR: false,
    },
    {
      id: 3,
      date: '2024-11-20',
      title: 'Espalda y Bíceps',
      duration: 58,
      exercises: 5,
      volume: 11800,
      calories: 385,
      notes: '',
      isPR: false,
    },
    {
      id: 4,
      date: '2024-11-18',
      title: 'Hombro y Abs',
      duration: 48,
      exercises: 6,
      volume: 8900,
      calories: 320,
      notes: 'Enfoque en forma',
      isPR: false,
    },
    {
      id: 5,
      date: '2024-11-16',
      title: 'Pecho y Tríceps',
      duration: 62,
      exercises: 6,
      volume: 11900,
      calories: 405,
      notes: '',
      isPR: false,
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Hoy';
    if (date.toDateString() === yesterday.toDateString()) return 'Ayer';

    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('es-ES', options);
  };

  const groupByMonth = (history) => {
    const groups = {};
    history.forEach(workout => {
      const date = new Date(workout.date);
      const monthYear = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(workout);
    });
    return groups;
  };

  const groupedWorkouts = groupByMonth(workoutHistory);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Historial</Text>
          <Text style={styles.subtitle}>{workoutHistory.length} entrenamientos</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.miniStat}>
            <Text style={styles.miniStatValue}>245</Text>
            <Text style={styles.miniStatLabel}>Total</Text>
          </View>
          <View style={styles.miniStat}>
            <Text style={styles.miniStatValue}>18</Text>
            <Text style={styles.miniStatLabel}>Este mes</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {Object.entries(groupedWorkouts).map(([month, workouts]) => (
          <View key={month} style={styles.monthSection}>
            <Text style={styles.monthTitle}>{month}</Text>
            {workouts.map((workout) => (
              <TouchableOpacity key={workout.id} style={styles.workoutCard}>
                {workout.isPR && (
                  <View style={styles.prBadge}>
                    <Award size={12} color="#f59e0b" fill="#fef3c7" />
                  </View>
                )}
                <View style={styles.workoutHeader}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateDay}>{formatDate(workout.date)}</Text>
                    <Text style={styles.dateTime}>
                      {new Date(workout.date).toLocaleDateString('es-ES', { weekday: 'short' })}
                    </Text>
                  </View>
                  <View style={styles.workoutInfo}>
                    <Text style={styles.workoutTitle}>{workout.title}</Text>
                    <View style={styles.workoutMeta}>
                      <View style={styles.metaItem}>
                        <Clock size={14} color="#64748b" />
                        <Text style={styles.metaText}>{workout.duration} min</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Dumbbell size={14} color="#64748b" />
                        <Text style={styles.metaText}>{workout.exercises} ejercicios</Text>
                      </View>
                    </View>
                    {workout.notes && (
                      <Text style={styles.notes}>{workout.notes}</Text>
                    )}
                  </View>
                </View>
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{(workout.volume / 1000).toFixed(1)}K</Text>
                    <Text style={styles.statLabel}>Volumen (kg)</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{workout.calories}</Text>
                    <Text style={styles.statLabel}>Calorías</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: 'white',
    padding: 24,
    paddingTop: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 16,
  },
  miniStat: {
    alignItems: 'center',
  },
  miniStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  miniStatLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  monthSection: {
    marginBottom: 24,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64748b',
    textTransform: 'capitalize',
    marginBottom: 12,
    marginLeft: 4,
  },
  workoutCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  prBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fef3c7',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  dateContainer: {
    width: 60,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  dateTime: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'capitalize',
    marginTop: 2,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  workoutMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#64748b',
  },
  notes: {
    fontSize: 13,
    color: '#64748b',
    fontStyle: 'italic',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  statItem: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
});

