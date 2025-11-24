# 🔧 SOLUCIÓN AL ERROR: "Cannot coerce the result to a single JSON object"

## ❌ EL PROBLEMA:

Cuando un usuario se registra, el perfil no se crea automáticamente en la tabla `public.users`, causando este error:

```
Get User Profile Error: {"code":"PGRST116","details":"The result contains 0 rows"}
```

---

## ✅ SOLUCIÓN IMPLEMENTADA:

### **1. Creación Automática de Perfil con Database Trigger**

Ejecuta este SQL en Supabase para crear un trigger que automáticamente cree el perfil cuando un usuario se registre:

```sql
-- EJECUTA ESTO EN SUPABASE SQL EDITOR
-- Archivo: SUPABASE_TRIGGER.sql

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, goal, age, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'goal', 'general'),
    (NEW.raw_user_meta_data->>'age')::integer,
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### **2. Manejo Mejorado de Errores**

- ✅ Cambiado `.single()` a `.maybeSingle()` en `getUserProfile`
- ✅ Manejo seguro cuando el perfil no existe
- ✅ Fallback a `user.user_metadata` si no hay perfil en BD

---

## 🚀 PASOS PARA ARREGLAR TU APP:

### **Paso 1: Ejecutar el Trigger en Supabase**

1. Ve a: https://supabase.com/dashboard/project/wbwzoslyobagnylubpxn/sql
2. Copia y pega el contenido de `SUPABASE_TRIGGER.sql`
3. Click en **Run** ▶️
4. Deberías ver: `"Trigger creado exitosamente ✅"`

### **Paso 2: Verificar que existe el trigger**

```sql
SELECT trigger_name, event_object_table, action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
```

Deberías ver una fila con `on_auth_user_created`.

### **Paso 3: (OPCIONAL) Si ya tienes usuarios sin perfil**

Si ya registraste usuarios antes del trigger, créales el perfil manualmente:

```sql
-- Ver usuarios de Auth sin perfil en users
SELECT au.id, au.email, au.raw_user_meta_data
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;

-- Crear perfiles para usuarios existentes
INSERT INTO public.users (id, email, name, goal, created_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'name', split_part(au.email, '@', 1)) as name,
  COALESCE(au.raw_user_meta_data->>'goal', 'general') as goal,
  NOW() as created_at
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;
```

### **Paso 4: Reiniciar la App**

```bash
# Presiona R, R en el emulador
# O ejecuta:
npm start -- --clear
```

---

## 🧪 PROBAR QUE FUNCIONA:

1. **Registra un nuevo usuario**
2. **Verifica en Supabase** que se creó automáticamente en:
   - `auth.users` ✅
   - `public.users` ✅
3. **La app debería funcionar** sin errores

### Verificar en Supabase:

```sql
-- Ver usuarios con sus perfiles
SELECT 
  au.email,
  pu.name,
  pu.goal,
  pu.created_at
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id;
```

---

## 📝 LO QUE SE ARREGLÓ EN EL CÓDIGO:

### **authService.js:**
```javascript
// ANTES (causaba error):
.single()

// AHORA (maneja 0 filas):
.maybeSingle()
```

### **DashboardScreen.jsx, ProfileScreen.jsx, AICoachScreen.jsx:**
```javascript
// Fallback seguro para nombre de usuario:
const userName = user?.name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'Usuario';
```

---

## ✅ RESULTADO FINAL:

- ✅ Los usuarios nuevos se crean automáticamente en `public.users`
- ✅ No más errores "Cannot coerce the result"
- ✅ La app funciona con o sin perfil en BD
- ✅ Fallback inteligente a user_metadata

---

**¿Dudas? Ejecuta el trigger y prueba registrarte de nuevo!** 🚀

