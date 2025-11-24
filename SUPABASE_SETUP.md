# =====================================================
# CONFIGURACIÓN DE SUPABASE - GYMTRACKER PRO
# =====================================================

## 📋 PASO 1: Obtén tus credenciales de Supabase

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Click en **Settings** (⚙️ en la sidebar izquierda)
3. Click en **API**
4. Copia los siguientes valores:

   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 📋 PASO 2: Configura las credenciales en la app

Abre el archivo: `src/services/supabase.js`

Reemplaza estas líneas:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Pega tu Project URL aquí
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Pega tu anon key aquí
```

**Ejemplo:**
```javascript
const SUPABASE_URL = 'https://abcdefghijk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAwMDAwMDAsImV4cCI6MTg0NzY4MDAwMH0.xxxxx';
```

## 📋 PASO 3: Crea las tablas en Supabase

1. En tu proyecto de Supabase, ve a **SQL Editor** (icono 🗄️)
2. Abre el archivo `SUPABASE_SCHEMA.sql` que está en la raíz del proyecto
3. Copia TODO el contenido del archivo
4. Pégalo en el SQL Editor de Supabase
5. Click en **Run** (▶️) para ejecutar el script

**El script creará:**
- ✅ Tabla `users` (perfiles de usuarios)
- ✅ Tabla `workouts` (entrenamientos)
- ✅ Tabla `routines` (rutinas guardadas)
- ✅ Tabla `personal_records` (récords personales)
- ✅ Índices para optimizar queries
- ✅ Row Level Security (seguridad)
- ✅ Políticas de acceso

## 📋 PASO 4: Verifica que todo funciona

Ejecuta esta query en el SQL Editor:

```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

Deberías ver:
- users
- workouts
- routines
- personal_records

## 📋 PASO 5: Prueba la app

```bash
npm start
```

1. Regístrate con un nuevo usuario
2. Completa un entrenamiento
3. Guarda una rutina
4. Revisa tu progreso

## 🔒 SEGURIDAD

✅ **Row Level Security** está habilitado
✅ Los usuarios solo ven sus propios datos
✅ Las credenciales deben estar en variables de entorno en producción

## 🚨 IMPORTANTE PARA PRODUCCIÓN

**NO** subas las credenciales a GitHub. En producción usa:

```bash
npm install react-native-dotenv
```

Y crea un `.env`:
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## ✅ ¡LISTO!

Tu app ahora está completamente funcional con base de datos en la nube 🚀

