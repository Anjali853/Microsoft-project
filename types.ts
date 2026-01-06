
export interface EnergyReading {
  timestamp: string;
  usage: number; // in kWh
  cost: number; // in currency units
}

export interface ApplianceData {
  name: string;
  usage: number;
  percentage: number;
  status: 'optimal' | 'inefficient' | 'off';
  history: number[];
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: string;
  type: 'saving' | 'behavior' | 'maintenance';
}

export interface Challenge {
  id: string;
  title: string;
  reward: string;
  progress: number;
  deadline: string;
}

export interface Alert {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export interface AppState {
  currentUsage: number;
  dailyGoal: number;
  ecoScore: number;
  savingStreak: number;
  predictedBill: number;
  predictedIncrease: number;
  co2Saved: number; // in kg
  readings: EnergyReading[];
  appliances: ApplianceData[];
  alerts: Alert[];
  challenges: Challenge[];
}
