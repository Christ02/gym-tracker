import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const WorkoutCalendar = ({ currentMonth, onDayPress, completedDays = [] }) => {
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    // Días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() &&
           currentMonth.getFullYear() === today.getFullYear();
  };

  const days = getDaysInMonth();
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <View style={styles.container}>
      <View style={styles.weekDays}>
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
          <Text key={i} style={styles.weekDayText}>{day}</Text>
        ))}
      </View>
      {weeks.map((week, weekIdx) => (
        <View key={weekIdx} style={styles.week}>
          {week.map((day, dayIdx) => (
            <TouchableOpacity
              key={dayIdx}
              onPress={() => day && onDayPress(day)}
              style={[
                styles.day,
                !day && styles.dayEmpty,
                isToday(day) && styles.dayToday,
                completedDays.includes(day) && styles.dayCompleted,
              ]}
              disabled={!day}
            >
              {day && <Text style={[
                styles.dayText,
                isToday(day) && styles.dayTextToday,
                completedDays.includes(day) && styles.dayTextCompleted,
              ]}>{day}</Text>}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8',
    width: 36,
    textAlign: 'center',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  day: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayEmpty: {
    backgroundColor: 'transparent',
  },
  dayToday: {
    backgroundColor: '#dbeafe',
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  dayCompleted: {
    backgroundColor: '#22c55e',
  },
  dayText: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  dayTextToday: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  dayTextCompleted: {
    color: 'white',
    fontWeight: 'bold',
  },
});

