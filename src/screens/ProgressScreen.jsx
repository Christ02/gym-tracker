import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, TrendingUp, Award, Flame, Zap, Target, Calendar } from 'lucide-react-native';
import Svg, { Line, Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { StatCard } from '../components/common/StatCard';

export const ProgressScreen = ({ setActiveTab }) => {
  const [period, setPeriod] = useState('Semana');

  const personalRecords = [
    { exercise: 'Press de Banca', weight: 125, date: 'Hace 2 días', change: '+5kg' },
    { exercise: 'Sentadilla', weight: 180, date: 'Hace 5 días', change: '+10kg' },
    { exercise: 'Peso Muerto', weight: 200, date: 'Hace 1 semana', change: '+15kg' },
    { exercise: 'Press Militar', weight: 75, date: 'Hace 3 días', change: '+2.5kg' },
  ];

  const weeklyStats = [
    { day: 'Lun', volume: 12500, duration: 65, exercises: 6 },
    { day: 'Mar', volume: 0, duration: 0, exercises: 0 },
    { day: 'Mié', volume: 11800, duration: 58, exercises: 5 },
    { day: 'Jue', volume: 0, duration: 0, exercises: 0 },
    { day: 'Vie', volume: 13200, duration: 70, exercises: 7 },
    { day: 'Sáb', volume: 10500, duration: 52, exercises: 5 },
    { day: 'Dom', volume: 0, duration: 0, exercises: 0 },
  ];

  const maxVolume = Math.max(...weeklyStats.map(s => s.volume));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => setActiveTab('dashboard')}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.title}>Mi Progreso</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.filterContainer}>
        {['Semana', 'Mes', '3 Meses', 'Año'].map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPeriod(p)}
            style={[styles.filterButton, period === p && styles.filterButtonActive]}
          >
            <Text style={[styles.filterText, period === p ? styles.filterTextActive : styles.filterTextInactive]}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* RESUMEN GENERAL */}
        <View style={styles.statsGrid}>
          <StatCard 
            title="Volumen Total"
            value="48.0"
            unit="ton"
            icon={Zap}
            change="+12%"
            changeType="up"
            color="#8b5cf6"
          />
          <StatCard 
            title="PRs Batidos"
            value="8"
            icon={Award}
            change="+3"
            changeType="up"
            color="#f59e0b"
          />
          <StatCard 
            title="Entrenamientos"
            value="4"
            icon={Calendar}
            change="+1"
            changeType="up"
            color="#3b82f6"
          />
          <StatCard 
            title="Calorías"
            value="3,240"
            icon={Flame}
            change="+8%"
            changeType="up"
            color="#ef4444"
          />
        </View>

        {/* GRÁFICA DE VOLUMEN SEMANAL */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Volumen de Entrenamiento</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={styles.chartLabel}>Peso Total Levantado</Text>
                <View style={styles.chartValueRow}>
                  <Text style={styles.chartValue}>48,000 </Text>
                  <Text style={styles.chartUnit}>kg</Text>
                </View>
              </View>
              <View style={styles.badge}>
                <TrendingUp size={12} color="#22c55e" />
                <Text style={styles.badgeText}>+12%</Text>
              </View>
            </View>

            <View style={styles.barChartContainer}>
              {weeklyStats.map((stat, idx) => (
                <View key={idx} style={styles.barWrapper}>
                  <View style={styles.barContainer}>
                    {stat.volume > 0 && (
                      <View 
                        style={[
                          styles.bar, 
                          { height: `${(stat.volume / maxVolume) * 100}%` }
                        ]} 
                      />
                    )}
                  </View>
                  <Text style={styles.barLabel}>{stat.day.slice(0, 1)}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* RÉCORDS PERSONALES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Récords Personales</Text>
          {personalRecords.map((pr, idx) => (
            <View key={idx} style={styles.prCard}>
              <View style={styles.prIconContainer}>
                <Award size={20} color="#f59e0b" fill="#fef3c7" />
              </View>
              <View style={styles.prInfo}>
                <Text style={styles.prExercise}>{pr.exercise}</Text>
                <Text style={styles.prDate}>{pr.date}</Text>
              </View>
              <View style={styles.prStats}>
                <Text style={styles.prWeight}>{pr.weight}kg</Text>
                <View style={styles.prChange}>
                  <Text style={styles.prChangeText}>{pr.change}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* GRÁFICA DE PROGRESIÓN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progresión de Fuerza</Text>
          <View style={styles.chartCard}>
            <View style={styles.lineChartContainer}>
              <Svg viewBox="0 0 350 150" style={styles.svg}>
                <Defs>
                  <LinearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <Stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </LinearGradient>
                </Defs>
                
                <Line x1="0" y1="150" x2="350" y2="150" stroke="#F1F5F9" strokeWidth="1" />
                <Line x1="0" y1="100" x2="350" y2="100" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                <Line x1="0" y1="50" x2="350" y2="50" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
                
                <Path 
                  d="M0,130 L50,120 L100,100 L150,110 L200,85 L250,70 L300,50 L350,40"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <Path 
                  d="M0,130 L50,120 L100,100 L150,110 L200,85 L250,70 L300,50 L350,40 V150 H0 Z"
                  fill="url(#progressGradient)"
                />
                
                <Circle cx="350" cy="40" r="5" fill="white" stroke="#8b5cf6" strokeWidth="3" />
              </Svg>
            </View>
            <View style={styles.chartLabels}>
              {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'].map((month, idx) => (
                <Text key={idx} style={styles.chartLabelText}>{month}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* DISTRIBUCIÓN MUSCULAR */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distribución por Grupo Muscular</Text>
          <View style={styles.muscleCard}>
            <View style={styles.muscleRow}>
              <Text style={styles.muscleLabel}>Pecho</Text>
              <View style={styles.muscleBarContainer}>
                <View style={[styles.muscleBar, { width: '85%', backgroundColor: '#3b82f6' }]} />
              </View>
              <Text style={styles.muscleValue}>85%</Text>
            </View>
            <View style={styles.muscleRow}>
              <Text style={styles.muscleLabel}>Espalda</Text>
              <View style={styles.muscleBarContainer}>
                <View style={[styles.muscleBar, { width: '92%', backgroundColor: '#8b5cf6' }]} />
              </View>
              <Text style={styles.muscleValue}>92%</Text>
            </View>
            <View style={styles.muscleRow}>
              <Text style={styles.muscleLabel}>Pierna</Text>
              <View style={styles.muscleBarContainer}>
                <View style={[styles.muscleBar, { width: '78%', backgroundColor: '#22c55e' }]} />
              </View>
              <Text style={styles.muscleValue}>78%</Text>
            </View>
            <View style={styles.muscleRow}>
              <Text style={styles.muscleLabel}>Hombro</Text>
              <View style={styles.muscleBarContainer}>
                <View style={[styles.muscleBar, { width: '65%', backgroundColor: '#f59e0b' }]} />
              </View>
              <Text style={styles.muscleValue}>65%</Text>
            </View>
            <View style={styles.muscleRow}>
              <Text style={styles.muscleLabel}>Brazos</Text>
              <View style={styles.muscleBarContainer}>
                <View style={[styles.muscleBar, { width: '70%', backgroundColor: '#ef4444' }]} />
              </View>
              <Text style={styles.muscleValue}>70%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  filterContainer: {
    backgroundColor: '#f1f5f9',
    padding: 4,
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 24,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  filterButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: '#1e293b',
  },
  filterTextInactive: {
    color: '#94a3b8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  chartCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  chartLabel: {
    color: '#94a3b8',
    fontWeight: '500',
    fontSize: 13,
  },
  chartValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  chartValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  chartUnit: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: 'bold',
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    marginBottom: 8,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  barContainer: {
    flex: 1,
    width: '70%',
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bar: {
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },
  prCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  prIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fef3c7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prInfo: {
    flex: 1,
  },
  prExercise: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  prDate: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  prStats: {
    alignItems: 'flex-end',
    gap: 4,
  },
  prWeight: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  prChange: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  prChangeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  lineChartContainer: {
    height: 150,
    marginBottom: 8,
  },
  svg: {
    width: '100%',
    height: '100%',
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  chartLabelText: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '500',
  },
  muscleCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    gap: 16,
  },
  muscleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  muscleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    width: 60,
  },
  muscleBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  muscleBar: {
    height: '100%',
    borderRadius: 4,
  },
  muscleValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#64748b',
    width: 40,
    textAlign: 'right',
  },
});
