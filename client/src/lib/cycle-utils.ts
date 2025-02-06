import { addDays, differenceInDays, startOfDay } from "date-fns";
import { CyclePhase, type Phase } from "@shared/schema";

export function getCurrentCycleDay(lastPeriodDate: Date): number {
  const today = startOfDay(new Date());
  const daysSinceStart = differenceInDays(today, lastPeriodDate);
  return (daysSinceStart % 28) + 1;
}

export function getCurrentPhase(cycleDay: number): Phase {
  for (const [phase, data] of Object.entries(CyclePhase)) {
    if (cycleDay >= data.range[0] && cycleDay <= data.range[1]) {
      return phase as Phase;
    }
  }
  return "MENSTRUAL";
}

export function getRecommendation(phase: Phase): string {
  switch (phase) {
    case "MENSTRUAL":
      return "🌙 Scientific Support Strategy:\n" +
             "- Hormonal Insight: Estrogen and serotonin are low, affecting mood\n" +
             "- Physical Support: Offer warm compress for cramps (improves blood flow)\n" +
             "- Emotional Support: Practice active listening, she may be more intuitive\n" +
             "- Activity Tip: Gentle activities like walking or yoga are ideal\n" +
             "- Diet Support: Iron-rich foods can help with energy levels";

    case "FOLLICULAR":
      return "🌱 Growth Phase Strategy:\n" +
             "- Hormonal Insight: Rising estrogen boosts learning and creativity\n" +
             "- Social Support: She's more open to new experiences now\n" +
             "- Activity Tip: Great time for starting new projects together\n" +
             "- Communication: She's highly receptive to deep conversations\n" +
             "- Energy Support: Match her increasing energy with active plans";

    case "OVULATORY":
      return "⭐ Peak Performance Support:\n" +
             "- Hormonal Insight: High estrogen and testosterone peak\n" +
             "- Social Support: Perfect for social events and gatherings\n" +
             "- Communication: She's most articulate and confident now\n" +
             "- Activity Tip: Engage in challenging or exciting activities\n" +
             "- Romance: Her natural charisma is at its peak";

    case "LUTEAL":
      return "🎭 Transition Phase Support:\n" +
             "- Hormonal Insight: Progesterone rises while estrogen drops\n" +
             "- Emotional Support: Practice extra patience and understanding\n" +
             "- Physical Support: Help reduce stress through calming activities\n" +
             "- Diet Tip: Complex carbs can help with serotonin production\n" +
             "- Communication: Keep conversations gentle and supportive";
  }
}

export function getMetricLabel(value: number): string {
  if (value >= 90) return "Exceptional";
  if (value >= 75) return "Very High";
  if (value >= 60) return "Above Average";
  if (value >= 45) return "Moderate";
  if (value >= 30) return "Below Average";
  if (value >= 15) return "Low";
  return "Very Low";
}