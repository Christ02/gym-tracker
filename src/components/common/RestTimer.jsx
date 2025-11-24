import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Play, Pause, RotateCcw } from 'lucide-react-native';

export const RestTimer = ({ duration = 90, onComplete }) => {
  const [seconds, setSeconds] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - seconds) / duration) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.timerCircle}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
        <Text style={styles.timeText}>{formatTime(seconds)}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity 
          onPress={() => setIsRunning(!isRunning)}
          style={styles.controlButton}
        >
          {isRunning ? (
            <Pause size={20} color="#2563eb" fill="#2563eb" />
          ) : (
            <Play size={20} color="#2563eb" fill="#2563eb" />
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {
            setSeconds(duration);
            setIsRunning(false);
          }}
          style={styles.controlButton}
        >
          <RotateCcw size={20} color="#64748b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
  timerCircle: {
    width: '100%',
    height: 40,
    backgroundColor: '#e2e8f0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#3b82f6',
    opacity: 0.3,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    zIndex: 1,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
  },
  controlButton: {
    backgroundColor: 'white',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

