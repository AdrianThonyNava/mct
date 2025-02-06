import { pgTable, text, serial, date, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cycles = pgTable("cycles", {
  id: serial("id").primaryKey(),
  lastPeriodDate: date("last_period_date").notNull(),
  cycleLength: integer("cycle_length").notNull().default(28),
});

export const insertCycleSchema = createInsertSchema(cycles).pick({
  lastPeriodDate: true,
  cycleLength: true,
});

export type InsertCycle = z.infer<typeof insertCycleSchema>;
export type Cycle = typeof cycles.$inferSelect;

export const CyclePhase = {
  MENSTRUAL: {
    name: "Menstrual Phase",
    range: [1, 5],
    color: "hsl(340, 82%, 52%)",
    description: "🌙 Rest & Restore Phase: Physical energy is lower as the body focuses on renewal. Estrogen and serotonin are at their lowest, which may affect mood and comfort levels. Extra support and understanding are key during this time.",
    metrics: {
      mood: 35, // Lower due to decreased serotonin and estrogen
      energy: 30, // Lower due to iron loss and hormonal changes
      libido: 25, // Typically lower due to discomfort and hormonal levels
      stress_sensitivity: 75, // Higher sensitivity to stress
      social_preference: 40, // Often prefer solitude or close relationships only
      sleep_quality: 60, // May experience better sleep due to progesterone drop
      cognitive_clarity: 55, // Can experience increased intuition despite fatigue
      emotional_stability: 45, // More sensitive but also more intuitive
      physical_comfort: 30, // May experience cramps and discomfort
      self_care_need: 85 // High need for self-care and comfort
    }
  },
  FOLLICULAR: {
    name: "Follicular Phase",
    range: [6, 14],
    color: "hsl(47, 95%, 53%)",
    description: "🌱 Growth & Creativity Phase: Rising estrogen levels boost energy, creativity, and learning ability. You'll notice increased optimism and social energy as hormones begin their upward trend.",
    metrics: {
      mood: 75, // Rising due to increasing estrogen
      energy: 80, // Increasing energy levels
      libido: 65, // Gradually increasing
      stress_sensitivity: 45, // More resilient to stress
      social_preference: 80, // Higher desire for social interaction
      sleep_quality: 70, // Generally good sleep quality
      cognitive_clarity: 85, // Enhanced learning and creativity
      emotional_stability: 75, // More stable emotions
      physical_comfort: 75, // Generally comfortable
      self_care_need: 50 // Moderate need for self-care
    }
  },
  OVULATORY: {
    name: "Ovulatory Phase",
    range: [15, 21],
    color: "hsl(142, 71%, 45%)",
    description: "⭐ Peak Performance Phase: Estrogen, testosterone, and serotonin reach their peak. Communication skills, confidence, and social energy are at their highest. Ideal time for important social events and decisions.",
    metrics: {
      mood: 90, // Peak mood due to high estrogen and serotonin
      energy: 95, // Highest energy levels
      libido: 95, // Peak due to hormonal surge
      stress_sensitivity: 35, // Most resilient to stress
      social_preference: 95, // Highest social drive
      sleep_quality: 75, // Good sleep quality
      cognitive_clarity: 90, // Peak mental clarity
      emotional_stability: 85, // High emotional resilience
      physical_comfort: 85, // Generally very comfortable
      self_care_need: 40 // Lower need for self-care
    }
  },
  LUTEAL: {
    name: "Luteal Phase",
    range: [22, 28],
    color: "hsl(271, 91%, 65%)",
    description: "🎭 Transition Phase: Progesterone rises while estrogen and serotonin decrease. This can lead to increased sensitivity and introspection. Focus on stress management and emotional awareness during this time.",
    metrics: {
      mood: 50, // Variable due to hormonal changes
      energy: 45, // Decreasing energy
      libido: 40, // Generally lower
      stress_sensitivity: 85, // Highest sensitivity to stress
      social_preference: 50, // May prefer smaller social groups
      sleep_quality: 55, // May experience sleep disruption
      cognitive_clarity: 60, // May experience some brain fog
      emotional_stability: 45, // More emotional sensitivity
      physical_comfort: 50, // May experience PMS symptoms
      self_care_need: 80 // Higher need for self-care
    }
  }
} as const;

export type Phase = keyof typeof CyclePhase;

export interface PhaseMetrics {
  mood: number;
  energy: number;
  libido: number;
  stress_sensitivity: number;
  social_preference: number;
  sleep_quality: number;
  cognitive_clarity: number;
  emotional_stability: number;
  physical_comfort: number;
  self_care_need: number;
}