import { cycles, type Cycle, type InsertCycle } from "@shared/schema";

export interface IStorage {
  getCycle(id: number): Promise<Cycle | undefined>;
  createCycle(cycle: InsertCycle): Promise<Cycle>;
  updateCycle(id: number, cycle: InsertCycle): Promise<Cycle>;
}

export class MemStorage implements IStorage {
  private cycles: Map<number, Cycle>;
  currentId: number;

  constructor() {
    this.cycles = new Map();
    this.currentId = 1;
  }

  async getCycle(id: number): Promise<Cycle | undefined> {
    return this.cycles.get(id);
  }

  async createCycle(insertCycle: InsertCycle): Promise<Cycle> {
    const id = this.currentId++;
    const cycle: Cycle = { ...insertCycle, id };
    this.cycles.set(id, cycle);
    return cycle;
  }

  async updateCycle(id: number, insertCycle: InsertCycle): Promise<Cycle> {
    const cycle: Cycle = { ...insertCycle, id };
    this.cycles.set(id, cycle);
    return cycle;
  }
}

export const storage = new MemStorage();
