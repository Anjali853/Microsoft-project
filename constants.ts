
import { AppState, ApplianceData, EnergyReading, Alert, Challenge } from './types';

export const MOCK_READINGS: EnergyReading[] = Array.from({ length: 24 }, (_, i) => ({
  timestamp: `${i}:00`,
  usage: Math.random() * 2 + (i > 18 && i < 22 ? 3 : 1),
  cost: 0
})).map(r => ({ ...r, cost: r.usage * 0.15 }));

export const MOCK_APPLIANCES: ApplianceData[] = [
  { name: 'Air Conditioner', usage: 12.4, percentage: 45, status: 'inefficient', history: [10, 11, 14, 12, 13] },
  { name: 'Refrigerator', usage: 4.2, percentage: 15, status: 'optimal', history: [4, 4.1, 4.2, 4, 4.2] },
  { name: 'Washing Machine', usage: 2.8, percentage: 10, status: 'optimal', history: [0, 2, 0, 3, 0] },
  { name: 'Lighting', usage: 2.1, percentage: 8, status: 'optimal', history: [2, 2.1, 2, 2.2, 2.1] },
  { name: 'Entertainment', usage: 5.5, percentage: 22, status: 'optimal', history: [5, 5.5, 6, 5.5, 5] },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: '1',
    timestamp: '10 mins ago',
    title: 'Wastage Detected!',
    message: 'AC is running while Living Room window is sensed open. Energy loss: ₹12/hr.',
    severity: 'high'
  }
];

export const MOCK_CHALLENGES: Challenge[] = [
  { id: 'c1', title: 'Peak Hour Hero', reward: '500 XP', progress: 80, deadline: 'Tonight 9PM' },
  { id: 'c2', title: 'Off-Peak Laundry', reward: '₹50 Cashback', progress: 0, deadline: 'Tomorrow 10AM' }
];

export const INITIAL_STATE: AppState = {
  currentUsage: 2.4,
  dailyGoal: 15,
  ecoScore: 78,
  savingStreak: 5,
  predictedBill: 4580,
  predictedIncrease: 120,
  co2Saved: 142,
  readings: MOCK_READINGS,
  appliances: MOCK_APPLIANCES,
  alerts: MOCK_ALERTS,
  challenges: MOCK_CHALLENGES
};
