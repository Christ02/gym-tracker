import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ArrowLeft, TrendingUp } from 'lucide-react-native';
import Svg, { Line, Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

export const ProgressScreen = ({ setActiveTab }) => {
  const [period, setPeriod] = useState('Semana');

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
        {['Semana', 'Mes', '6 Meses', 'Año'].map((p) => (
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
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartLabel}>Peso Total Levantado</Text>
              <View style={styles.chartValueRow}>
                <Text style={styles.chartValue}>15,450 </Text>
                <Text style={styles.chartUnit}>kg</Text>
              </View>
            </View>
            <View style={styles.badge}>
              <TrendingUp size={12} color="#3b82f6" />
              <Text style={styles.badgeText}>+12.5%</Text>
            </View>
          </View>

          <View style={styles.chartContainer}>
            <Svg viewBox="0 0 350 150" style={styles.svg}>
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

          <View style={styles.chartLabels}>
            <Text style={styles.chartLabelText}>L</Text>
            <Text style={styles.chartLabelText}>M</Text>
            <Text style={styles.chartLabelText}>X</Text>
            <Text style={styles.chartLabelText}>J</Text>
            <Text style={styles.chartLabelText}>V</Text>
            <Text style={styles.chartLabelText}>S</Text>
            <Text style={styles.chartLabelText}>D</Text>
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
    marginBottom: 24,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  filterContainer: {
    backgroundColor: '#f1f5f9',
    padding: 4,
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 32,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 6,
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
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  chartCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f8fafc',
    marginBottom: 32,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  chartLabel: {
    color: '#94a3b8',
    fontWeight: '500',
    fontSize: 14,
  },
  chartValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  chartValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  chartUnit: {
    fontSize: 18,
    color: '#94a3b8',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chartContainer: {
    height: 192,
  },
  svg: {
    width: '100%',
    height: '100%',
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  chartLabelText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
});
