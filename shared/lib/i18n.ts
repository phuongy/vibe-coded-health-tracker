import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en",
    debug: process.env.NODE_ENV === "development",
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    
    detection: {
      order: ["localStorage", "htmlTag"],
      caches: ["localStorage"],
    },
    
    resources: {
      en: {
        translation: {
          // Common
          common: {
            loading: "Loading...",
            error: "Error",
            save: "Save",
            cancel: "Cancel",
            close: "Close",
            edit: "Edit",
            delete: "Delete",
            add: "Add",
            submit: "Submit",
            back: "Back",
            next: "Next",
            previous: "Previous",
            date: "Date",
            actions: "Actions",
          },
          
          // Error messages
          errors: {
            failedToLoadHealthStats: "Failed to load health stats",
            failedToLoadRecentActivity: "Failed to load recent activity",
            failedToAddHealthEntry: "Failed to add health entry",
            genericError: "An error occurred",
          },
          
          // Navigation
          nav: {
            home: "Home",
            dashboard: "Dashboard",
            profile: "Profile",
            settings: "Settings",
          },
          
          // Landing page
          landing: {
            welcome: "Welcome to",
            healthTracker: "Health Tracker",
            whatsNext: "What's next?",
            goToDashboard: "Go to Dashboard",
          },
          
          // Dashboard
          dashboard: {
            title: "Health Dashboard",
            subtitle: "Track your health metrics and progress",
            welcome: "Welcome back!",
            welcomeSubtitle: "Here's your health overview for today",
            quickActions: "Quick Actions",
            recentActivity: "Recent Activity",
            noActivity: "No recent activity to display.",
            addEntry: "Add Entry",
          },
          
          // Health Stats
          healthStats: {
            weight: "Weight",
            heartRate: "Heart Rate",
            sleep: "Sleep",
            steps: "Steps",
            logged: "logged",
            hours: "hours",
            ago: "ago",
            yesterday: "Yesterday",
            history: "History",
            entries: "Entries",
          },
          
          // Quick Actions
          quickActions: {
            logWeight: "Log Weight",
            recordHeartRate: "Record Heart Rate",
            logSleep: "Log Sleep",
          },
          
          // Add Entry Modal
          addEntry: {
            title: "Add Health Entry",
            subtitle: "Select the type of health data you want to log and enter the value.",
            statType: "Stat Type",
            selectStatType: "Select a stat type",
            value: "Value",
            enterValue: "Enter value",
            addEntry: "Add Entry",
            validation: {
              statTypeRequired: "Please select a stat type",
              valueRequired: "Value is required",
              valuePositive: "Please enter a valid positive number",
            },
          },
          
          // Stat Types
          statTypes: {
            weight: "Weight",
            heartRate: "Heart Rate",
            sleep: "Sleep",
            steps: "Steps",
          },
          
          // Units
          units: {
            kg: "kg",
            bpm: "bpm",
            hours: "hours",
            steps: "steps",
          },
          
          // Theme
          theme: {
            light: "Light",
            dark: "Dark",
            system: "System",
          },
        },
      },
      
      es: {
        translation: {
          // Common
          common: {
            loading: "Cargando...",
            error: "Error",
            save: "Guardar",
            cancel: "Cancelar",
            close: "Cerrar",
            edit: "Editar",
            delete: "Eliminar",
            add: "Agregar",
            submit: "Enviar",
            back: "Atrás",
            next: "Siguiente",
            previous: "Anterior",
            date: "Fecha",
            actions: "Acciones",
          },
          
          // Error messages
          errors: {
            failedToLoadHealthStats: "Error al cargar estadísticas de salud",
            failedToLoadRecentActivity: "Error al cargar actividad reciente",
            failedToAddHealthEntry: "Error al agregar entrada de salud",
            genericError: "Ocurrió un error",
          },
          
          // Navigation
          nav: {
            home: "Inicio",
            dashboard: "Panel",
            profile: "Perfil",
            settings: "Configuración",
          },
          
          // Landing page
          landing: {
            welcome: "Bienvenido a",
            healthTracker: "Rastreador de Salud",
            whatsNext: "¿Qué sigue?",
            goToDashboard: "Ir al Panel",
          },
          
          // Dashboard
          dashboard: {
            title: "Panel de Salud",
            subtitle: "Rastrea tus métricas de salud y progreso",
            welcome: "¡Bienvenido de vuelta!",
            welcomeSubtitle: "Aquí tienes tu resumen de salud para hoy",
            quickActions: "Acciones Rápidas",
            recentActivity: "Actividad Reciente",
            noActivity: "No hay actividad reciente para mostrar.",
            addEntry: "Agregar Entrada",
          },
          
          // Health Stats
          healthStats: {
            weight: "Peso",
            heartRate: "Frecuencia Cardíaca",
            sleep: "Sueño",
            steps: "Pasos",
            logged: "registrado",
            hours: "horas",
            ago: "hace",
            yesterday: "Ayer",
            history: "Historial",
            entries: "Entradas",
          },
          
          // Quick Actions
          quickActions: {
            logWeight: "Registrar Peso",
            recordHeartRate: "Registrar Frecuencia Cardíaca",
            logSleep: "Registrar Sueño",
          },
          
          // Add Entry Modal
          addEntry: {
            title: "Agregar Entrada de Salud",
            subtitle: "Selecciona el tipo de datos de salud que quieres registrar e ingresa el valor.",
            statType: "Tipo de Estadística",
            selectStatType: "Selecciona un tipo de estadística",
            value: "Valor",
            enterValue: "Ingresa el valor",
            addEntry: "Agregar Entrada",
            validation: {
              statTypeRequired: "Por favor selecciona un tipo de estadística",
              valueRequired: "El valor es requerido",
              valuePositive: "Por favor ingresa un número positivo válido",
            },
          },
          
          // Stat Types
          statTypes: {
            weight: "Peso",
            heartRate: "Frecuencia Cardíaca",
            sleep: "Sueño",
            steps: "Pasos",
          },
          
          // Units
          units: {
            kg: "kg",
            bpm: "lpm",
            hours: "horas",
            steps: "pasos",
          },
          
          // Theme
          theme: {
            light: "Claro",
            dark: "Oscuro",
            system: "Sistema",
          },
        },
      },
      
      fr: {
        translation: {
          // Common
          common: {
            loading: "Chargement...",
            error: "Erreur",
            save: "Enregistrer",
            cancel: "Annuler",
            close: "Fermer",
            edit: "Modifier",
            delete: "Supprimer",
            add: "Ajouter",
            submit: "Soumettre",
            back: "Retour",
            next: "Suivant",
            previous: "Précédent",
            date: "Date",
            actions: "Actions",
          },
          
          // Error messages
          errors: {
            failedToLoadHealthStats: "Échec du chargement des statistiques de santé",
            failedToLoadRecentActivity: "Échec du chargement de l'activité récente",
            failedToAddHealthEntry: "Échec de l'ajout de l'entrée de santé",
            genericError: "Une erreur s'est produite",
          },
          
          // Navigation
          nav: {
            home: "Accueil",
            dashboard: "Tableau de Bord",
            profile: "Profil",
            settings: "Paramètres",
          },
          
          // Landing page
          landing: {
            welcome: "Bienvenue sur",
            healthTracker: "Suivi de Santé",
            whatsNext: "Que faire ensuite ?",
            goToDashboard: "Aller au Tableau de Bord",
          },
          
          // Dashboard
          dashboard: {
            title: "Tableau de Bord Santé",
            subtitle: "Suivez vos métriques de santé et votre progression",
            welcome: "Bon retour !",
            welcomeSubtitle: "Voici votre aperçu de santé pour aujourd'hui",
            quickActions: "Actions Rapides",
            recentActivity: "Activité Récente",
            noActivity: "Aucune activité récente à afficher.",
            addEntry: "Ajouter une Entrée",
          },
          
          // Health Stats
          healthStats: {
            weight: "Poids",
            heartRate: "Fréquence Cardiaque",
            sleep: "Sommeil",
            steps: "Pas",
            logged: "enregistré",
            hours: "heures",
            ago: "il y a",
            yesterday: "Hier",
            history: "Historique",
            entries: "Entrées",
          },
          
          // Quick Actions
          quickActions: {
            logWeight: "Enregistrer le Poids",
            recordHeartRate: "Enregistrer la Fréquence Cardiaque",
            logSleep: "Enregistrer le Sommeil",
          },
          
          // Add Entry Modal
          addEntry: {
            title: "Ajouter une Entrée de Santé",
            subtitle: "Sélectionnez le type de données de santé que vous souhaitez enregistrer et saisissez la valeur.",
            statType: "Type de Statistique",
            selectStatType: "Sélectionnez un type de statistique",
            value: "Valeur",
            enterValue: "Saisissez la valeur",
            addEntry: "Ajouter une Entrée",
            validation: {
              statTypeRequired: "Veuillez sélectionner un type de statistique",
              valueRequired: "La valeur est requise",
              valuePositive: "Veuillez saisir un nombre positif valide",
            },
          },
          
          // Stat Types
          statTypes: {
            weight: "Poids",
            heartRate: "Fréquence Cardiaque",
            sleep: "Sommeil",
            steps: "Pas",
          },
          
          // Units
          units: {
            kg: "kg",
            bpm: "bpm",
            hours: "heures",
            steps: "pas",
          },
          
          // Theme
          theme: {
            light: "Clair",
            dark: "Sombre",
            system: "Système",
          },
        },
      },
    },
  });

export default i18n; 