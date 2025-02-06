import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { getCurrentCycleDay, getCurrentPhase } from "@/lib/cycle-utils";
import { CycleTimeline } from "@/components/cycle-timeline";
import { PhaseCard } from "@/components/phase-card";
import { DailyInsights } from "@/components/daily-insights";
import { saveCycleData, getCycleData } from "@/lib/storage";

export default function Home() {
  const [lastPeriodDate, setLastPeriodDate] = useState<Date>(() => {
    const savedData = getCycleData();
    return savedData ? new Date(savedData.lastPeriodDate) : new Date();
  });

  const currentDay = getCurrentCycleDay(lastPeriodDate);
  const currentPhase = getCurrentPhase(currentDay);

  // Save to localStorage whenever date changes
  useEffect(() => {
    saveCycleData({
      id: 1,
      lastPeriodDate: lastPeriodDate.toISOString(),
      cycleLength: 28,
    });
  }, [lastPeriodDate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm py-8 px-4 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3 gradient-heading">
            Menstrual Cycle Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Understanding your partner's cycle
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 space-y-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="space-y-6">
            <Card className="card-hover">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Last Period Start Date
                </h2>
                <Calendar
                  mode="single"
                  selected={lastPeriodDate}
                  onSelect={(date) => date && setLastPeriodDate(date)}
                  className="rounded-md border shadow-sm"
                />
              </CardContent>
            </Card>

            {/* Timeline Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Cycle Progress
              </h2>
              <CycleTimeline currentDay={currentDay} />
            </div>
          </div>

          {/* Phase Info Section */}
          <div className="space-y-6">
            <PhaseCard phase={currentPhase} currentDay={currentDay} />
            <DailyInsights phase={currentPhase} />
          </div>
        </div>
      </div>
    </div>
  );
}