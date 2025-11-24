import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Switch, Alert } from 'react-native';
import { User, Settings, Award, Target, Bell, Moon, Globe, LogOut, ChevronRight, Edit } from 'lucide-react-native';
import { authService } from '../services/authService';

export const ProfileScreen = ({ user }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const stats = [
    { label: 'Entrenamientos', value: '142', icon: Award, color: '#3b82f6' },
    { label: 'Días de Racha', value: '28', icon: Target, color: '#22c55e' },
    { label: 'PRs Batidos', value: '15', icon: Award, color: '#f59e0b' },
  ];

  const menuItems = [
    { icon: User, label: 'Información Personal', action: 'edit-profile', color: '#3b82f6' },
    { icon: Target, label: 'Mis Objetivos', action: 'goals', color: '#8b5cf6' },
    { icon: Bell, label: 'Notificaciones', action: 'notifications', color: '#f59e0b', toggle: true },
    { icon: Moon, label: 'Modo Oscuro', action: 'dark-mode', color: '#64748b', toggle: true },
    { icon: Globe, label: 'Idioma', action: 'language', color: '#22c55e' },
    { icon: Settings, label: 'Configuración', action: 'settings', color: '#ef4444' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: async () => {
            try {
              await authService.signOut();
              // El listener en App.js detectará el cambio automáticamente
            } catch (error) {
              console.error('Error logging out:', error);
              Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.');
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* HEADER CON AVATAR */}
      <View style={styles.header}>
        <View style={styles.avatarLarge}>
          <Image 
            source={{ uri: `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}` }} 
            style={styles.avatarImage}
          />
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Edit size={16} color="#3b82f6" />
        </TouchableOpacity>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <View style={styles.badge}>
          <Award size={12} color="#f59e0b" fill="#fef3c7" />
          <Text style={styles.badgeText}>Miembro Activo</Text>
        </View>
      </View>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <View style={styles.statsRow}>
        {stats.map((stat, idx) => (
          <View key={idx} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
              <stat.icon size={20} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* OBJETIVOS ACTUALES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Objetivos Actuales</Text>
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>Ganar Músculo</Text>
            <Text style={styles.goalProgress}>75%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
          <Text style={styles.goalSubtitle}>Objetivo: +5kg de músculo • Faltan 1.5kg</Text>
        </View>
      </View>

      {/* MENÚ DE CONFIGURACIÓN */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        <View style={styles.menuContainer}>
          {menuItems.map((item, idx) => (
            <TouchableOpacity 
              key={idx}
              style={[styles.menuItem, idx === menuItems.length - 1 && styles.menuItemLast]}
            >
              <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                <item.icon size={20} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              {item.toggle ? (
                <Switch 
                  value={item.action === 'notifications' ? notifications : darkMode}
                  onValueChange={(val) => item.action === 'notifications' ? setNotifications(val) : setDarkMode(val)}
                  trackColor={{ false: '#cbd5e1', true: '#3b82f6' }}
                  thumbColor="white"
                />
              ) : (
                <ChevronRight size={20} color="#94a3b8" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* BOTÓN DE CERRAR SESIÓN */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <LogOut size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Versión 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarImage: {
    width: 100,
    height: 100,
  },
  editButton: {
    position: 'absolute',
    right: '35%',
    top: 70,
    backgroundColor: 'white',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 12,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  goalCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  goalProgress: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  goalSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: '#fef2f2',
    borderRadius: 16,
    marginTop: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 24,
  },
});

