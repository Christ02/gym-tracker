-- =====================================================
-- LIMPIAR TODO ANTES DE CREAR (ejecuta esto primero)
-- =====================================================

-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

DROP POLICY IF EXISTS "Users can view own workouts" ON public.workouts;
DROP POLICY IF EXISTS "Users can insert own workouts" ON public.workouts;
DROP POLICY IF EXISTS "Users can update own workouts" ON public.workouts;
DROP POLICY IF EXISTS "Users can delete own workouts" ON public.workouts;

DROP POLICY IF EXISTS "Users can view own routines" ON public.routines;
DROP POLICY IF EXISTS "Users can insert own routines" ON public.routines;
DROP POLICY IF EXISTS "Users can update own routines" ON public.routines;
DROP POLICY IF EXISTS "Users can delete own routines" ON public.routines;

DROP POLICY IF EXISTS "Users can view own PRs" ON public.personal_records;
DROP POLICY IF EXISTS "Users can insert own PRs" ON public.personal_records;
DROP POLICY IF EXISTS "Users can update own PRs" ON public.personal_records;
DROP POLICY IF EXISTS "Users can delete own PRs" ON public.personal_records;

-- Eliminar triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_routines_updated_at ON public.routines;

-- Eliminar función
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Eliminar índices
DROP INDEX IF EXISTS idx_workouts_user_id;
DROP INDEX IF EXISTS idx_workouts_date;
DROP INDEX IF EXISTS idx_workouts_user_date;
DROP INDEX IF EXISTS idx_routines_user_id;
DROP INDEX IF EXISTS idx_personal_records_user_id;
DROP INDEX IF EXISTS idx_personal_records_exercise;

-- Eliminar tablas (esto borrará todos los datos)
DROP TABLE IF EXISTS public.personal_records;
DROP TABLE IF EXISTS public.workouts;
DROP TABLE IF EXISTS public.routines;
DROP TABLE IF EXISTS public.users;

-- Mensaje de confirmación
SELECT 'Limpieza completada. Ahora ejecuta SUPABASE_SCHEMA.sql' as message;

