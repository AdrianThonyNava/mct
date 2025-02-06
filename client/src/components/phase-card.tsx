import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CyclePhase, type Phase } from "@shared/schema";
import { Progress } from "@/components/ui/progress";
import { getMetricLabel } from "@/lib/cycle-utils";

interface PhaseCardProps {
  phase: Phase;
  currentDay: number;
}

export function PhaseCard({ phase, currentDay }: PhaseCardProps) {
  const phaseData = CyclePhase[phase];
  const metrics = phaseData.metrics;

  const metricGroups = [
    {
      title: "Emotional State",
      metrics: [
        { label: "Mood", value: metrics.mood },
        { label: "Emotional Stability", value: metrics.emotional_stability },
        { label: "Stress Sensitivity", value: metrics.stress_sensitivity }
      ]
    },
    {
      title: "Physical State",
      metrics: [
        { label: "Energy Level", value: metrics.energy },
        { label: "Physical Comfort", value: metrics.physical_comfort },
        { label: "Sleep Quality", value: metrics.sleep_quality }
      ]
    },
    {
      title: "Social & Cognitive",
      metrics: [
        { label: "Social Preference", value: metrics.social_preference },
        { label: "Cognitive Clarity", value: metrics.cognitive_clarity },
        { label: "Self-Care Need", value: metrics.self_care_need }
      ]
    }
  ];

  return (
    <Card className="w-full card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl gradient-heading">{phaseData.name}</span>
          <span className="text-sm font-normal text-gray-500">
            Day {currentDay} of 28
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <p className="text-gray-600 leading-relaxed">{phaseData.description}</p>

        {metricGroups.map((group, index) => (
          <div key={index} className="space-y-4">
            <h3 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
              {group.title}
            </h3>
            {group.metrics.map((metric, metricIndex) => (
              <div key={metricIndex} className="space-y-2 group">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                    {metric.label}
                  </span>
                  <span className="font-medium text-primary">
                    {getMetricLabel(metric.value)}
                  </span>
                </div>
                <Progress 
                  value={metric.value} 
                  className="h-2 transition-all duration-300 group-hover:h-3" 
                />
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}