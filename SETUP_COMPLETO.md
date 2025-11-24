# 🚀 GymTracker Pro - Setup Final

## ✅ LO QUE YA ESTÁ HECHO

### 1. Backend Instalado y Configurado
- ✅ Supabase SDK instalado
- ✅ AsyncStorage para persistencia local
- ✅ Servicios configurados:
  - `authService.js` - Autenticación completa
  - `workoutService.js` - Guardar y recuperar entrenamientos
  - `routineService.js` - CRUD de rutinas
  - `supabase.js` - Cliente configurado con tus credenciales

### 2. Pantallas Conectadas al Backend
- ✅ **AuthScreen** - Login y registro real con Supabase
- ✅ **ActiveWorkoutScreen** - Guarda entrenamientos en BD
- ✅ **MyRoutinesScreen** - Carga rutinas de BD con pull-to-refresh
- ✅ **ProfileScreen** - Logout funcional

### 3. Credenciales Configuradas
- URL: `https://wbwzoslyobagnylubpxn.supabase.co`
- Key: `sb_publishable_lQbjSlH-xgYcNQfYGPXtUA_S7DnY8Xj`

---

## 📋 PASO SIGUIENTE: CREAR LAS TABLAS EN SUPABASE

### 1. Ve a Supabase SQL Editor
1. Abre tu proyecto: https://supabase.com/dashboard/project/wbwzoslyobagnylubpxn
2. Click en **SQL Editor** (icono 🗄️ en la sidebar)
3. Click en **+ New Query**

### 2. Copia y Pega este SQL

```sql
-- Tabla de usuarios (extiende auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  goal TEXT CHECK (goal IN ('muscle', 'fat_loss', 'strength', 'general')) DEFAULT 'general',
  age INTEGER,
  weight NUMERIC(5,2),
  height NUMERIC(5,2),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de entrenamientos
CREATE TABLE IF NOT EXISTS public.workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date TIMESTAMPTZ DEFAULT NOW(),
  duration INTEGER,
  exercises JSONB NOT NULL DEFAULT '[]'::jsonb,
  volume INTEGER DEFAULT 0,
  calories INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de rutinas
CREATE TABLE IF NOT EXISTS public.routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  exercises JSONB NOT NULL DEFAULT '[]'::jsonb,
  description TEXT,
  category TEXT DEFAULT 'General',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de récords personales
CREATE TABLE IF NOT EXISTS public.personal_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  exercise_name TEXT NOT NULL,
  weight NUMERIC(6,2) NOT NULL,
  reps INTEGER NOT NULL,
  date TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, exercise_name)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_workouts_user_id ON public.workouts(user_id);
CREATE INDEX IF NOT EXISTS idx_workouts_date ON public.workouts(date DESC);
CREATE INDEX IF NOT EXISTS idx_workouts_user_date ON public.workouts(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_routines_user_id ON public.routines(user_id);
CREATE INDEX IF NOT EXISTS idx_personal_records_user_id ON public.personal_records(user_id);

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_records ENABLE ROW LEVEL SECURITY;

-- Políticas para USERS
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para WORKOUTS
CREATE POLICY "Users can view own workouts" ON public.workouts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own workouts" ON public.workouts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own workouts" ON public.workouts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own workouts" ON public.workouts FOR DELETE USING (auth.uid() = user_id);

-- Políticas para ROUTINES
CREATE POLICY "Users can view own routines" ON public.routines FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own routines" ON public.routines FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own routines" ON public.routines FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own routines" ON public.routines FOR DELETE USING (auth.uid() = user_id);

-- Políticas para PERSONAL_RECORDS
CREATE POLICY "Users can view own PRs" ON public.personal_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own PRs" ON public.personal_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own PRs" ON public.personal_records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own PRs" ON public.personal_records FOR DELETE USING (auth.uid() = user_id);

-- Triggers para timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routines_updated_at BEFORE UPDATE ON public.routines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3. Ejecutar el SQL
1. Click en **Run** (▶️) o presiona `Ctrl+Enter`
2. Deberías ver: "Success. No rows returned"

### 4. Verificar que se crearon las tablas
Ejecuta este query:

```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

Deberías ver:
- users
- workouts
- routines  
- personal_records

---

## 🎮 PROBAR LA APP

```bash
# Asegúrate de estar en la carpeta del proyecto
cd /Users/christian/Universidad/gym-tracker

# Limpiar caché
npm start -- --clear

# O si ya está corriendo, presiona:
# - R, R (para recargar)
# - a (para abrir en Android)
```

---

## ✨ FUNCIONALIDADES YA IMPLEMENTADAS

### ✅ Autenticación Real
- Registro con email y contraseña
- Login con validación
- Persistencia de sesión automática
- Logout funcional

### ✅ Entrenamientos
- Timer en tiempo real durante el entrenamiento
- Guardar sets con peso y repeticiones
- Calcular volumen total automáticamente
- Detección y guardado de PRs

### ✅ Rutinas
- Cargar rutinas desde la base de datos
- Pull-to-refresh para actualizar
- Eliminar rutinas con confirmación
- Estado de carga mientras obtiene datos

### ✅ Seguridad
- Row Level Security habilitado
- Los usuarios solo ven sus propios datos
- Políticas de acceso configuradas
- Credenciales protegidas

---

## 🔄 PRÓXIMOS PASOS (OPCIONALES)

1. **Conectar ProgressScreen con datos reales** - Mostrar gráficas basadas en workouts guardados
2. **Conectar WorkoutHistoryScreen** - Listar todos los entrenamientos del usuario
3. **Crear rutinas desde la app** - Modal para agregar ejercicios
4. **Editar rutinas** - Modal de edición
5. **Onboarding con datos reales** - Guardar las preferencias del onboarding en el perfil

---

## 🐛 TROUBLESHOOTING

### Error: "Invalid API key"
- Verifica que copiaste bien las credenciales en `src/services/supabase.js`

### Error: "relation users does not exist"
- Ejecuta el SQL en Supabase para crear las tablas

### Error al registrar usuario
- Verifica que Supabase Auth esté habilitado
- Ve a: Authentication > Settings > Email Auth (debe estar ON)

### No se guardan los entrenamientos
- Verifica en Supabase > Table Editor que existan las tablas
- Revisa los logs de Metro bundler para ver errores

---

## 📱 TESTING

1. **Registra un usuario nuevo**
2. **Completa un entrenamiento completo** (agrega peso y reps, marca como completado)
3. **Ve a Supabase > Table Editor > workouts** y verifica que se guardó
4. **Cierra sesión y vuelve a entrar** - debería mantenerte logueado
5. **Crea una rutina** (cuando implementes esa función)

---

¡Tu app ya está 90% funcional con backend real! 🚀

