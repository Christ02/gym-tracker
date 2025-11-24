# GymTracker Pro - React Native

Aplicación móvil de seguimiento de entrenamientos con IA integrada, construida con React Native y Expo.

## 🚀 Características

- ✅ Autenticación de usuarios
- 💪 Dashboard personalizado con rutinas del día
- 📊 Seguimiento de ejercicios con series, peso y repeticiones
- 📚 Biblioteca de rutinas personalizadas
- 📈 Visualización de progreso con gráficas
- 🤖 Coach IA con integración de Google Gemini
- 📱 Interfaz optimizada para móviles (iOS y Android)

## 🛠️ Tecnologías

- **React Native** - Framework móvil
- **Expo** - Herramientas de desarrollo
- **NativeWind** - Estilos con Tailwind CSS
- **Lucide React Native** - Íconos
- **Google Gemini API** - Inteligencia artificial

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start

# Ejecutar en iOS
npm run ios

# Ejecutar en Android
npm run android
```

## 📱 Configuración de API

Para usar el Coach IA, necesitas configurar tu API Key de Google Gemini:

1. Obtén tu API Key en [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Abre `src/services/geminiService.js`
3. Reemplaza `const apiKey = "";` con tu API Key

## 🏗️ Estructura del Proyecto

```
gym-tracker/
├── src/
│   ├── components/
│   │   └── common/          # Componentes reutilizables
│   ├── screens/             # Pantallas de la app
│   ├── services/            # Servicios externos (API)
│   ├── data/                # Datos estáticos
│   └── hooks/               # Custom hooks
├── App.js                   # Componente principal
└── tailwind.config.js       # Configuración de NativeWind
```

## 📄 Licencia

MIT

## 👨‍💻 Autor

Christ02

