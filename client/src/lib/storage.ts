import { type Cycle } from "@shared/schema";

const STORAGE_KEY = "cycle_data";

export function saveCycleData(data: Cycle): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getCycleData(): Cycle | null {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}
