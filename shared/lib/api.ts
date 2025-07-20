// Mock API functions for health data

// Error messages that will be translated by the components
export const API_ERRORS = {
  HEALTH_STATS_FAILED: "Failed to fetch health stats",
  RECENT_ACTIVITY_FAILED: "Failed to fetch recent activity", 
  ADD_ENTRY_FAILED: "Failed to add health entry",
} as const;

export interface HealthStats {
  weight: {
    value: number;
    unit: string;
    lastUpdated: string;
  };
  heartRate: {
    value: number;
    unit: string;
    lastUpdated: string;
  };
  sleep: {
    value: number;
    unit: string;
    lastUpdated: string;
  };
  steps: {
    value: number;
    unit: string;
    lastUpdated: string;
  };
}

export interface RecentActivity {
  id: string;
  type: 'weight' | 'heart-rate' | 'sleep' | 'steps';
  value: number;
  unit: string;
  timestamp: string;
  description: string;
}

// Mock data
const mockHealthStats: HealthStats = {
  weight: {
    value: 75.2,
    unit: 'kg',
    lastUpdated: '2024-01-15T10:30:00Z',
  },
  heartRate: {
    value: 72,
    unit: 'bpm',
    lastUpdated: '2024-01-15T14:45:00Z',
  },
  sleep: {
    value: 7.5,
    unit: 'hours',
    lastUpdated: '2024-01-15T06:00:00Z',
  },
  steps: {
    value: 8432,
    unit: 'steps',
    lastUpdated: '2024-01-15T23:59:59Z',
  },
};

const mockRecentActivity: RecentActivity[] = [
  {
    id: '1',
    type: 'weight',
    value: 75.2,
    unit: 'kg',
    timestamp: '2024-01-15T10:30:00Z',
    description: 'Weight logged: 75.2 kg',
  },
  {
    id: '2',
    type: 'heart-rate',
    value: 72,
    unit: 'bpm',
    timestamp: '2024-01-15T14:45:00Z',
    description: 'Heart rate: 72 bpm',
  },
  {
    id: '3',
    type: 'sleep',
    value: 7.5,
    unit: 'hours',
    timestamp: '2024-01-14T06:00:00Z',
    description: 'Sleep logged: 7.5 hours',
  },
];

// Mock API functions
export async function fetchHealthStats(): Promise<HealthStats> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate occasional API errors (10% chance)
  if (Math.random() < 0.1) {
    throw new Error(API_ERRORS.HEALTH_STATS_FAILED);
  }
  
  return mockHealthStats;
}

export async function fetchRecentActivity(): Promise<RecentActivity[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Simulate occasional API errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error(API_ERRORS.RECENT_ACTIVITY_FAILED);
  }
  
  return mockRecentActivity;
}

export async function addHealthEntry(data: {
  type: string;
  value: number;
}): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate occasional API errors (15% chance)
  if (Math.random() < 0.15) {
    throw new Error(API_ERRORS.ADD_ENTRY_FAILED);
  }
  
  console.log('Health entry added:', data);
  
  // In a real app, this would update the backend
  // For now, we just log the data
} 