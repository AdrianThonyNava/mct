import { Card, CardContent } from "@/components/ui/card";
import { getRecommendation } from "@/lib/cycle-utils";
import { type Phase } from "@shared/schema";

interface InsightsProps {
  phase: Phase;
}

export function DailyInsights({ phase }: InsightsProps) {
  const recommendation = getRecommendation(phase);

  return (
    <Card className="w-full bg-gray-50">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Today's Insights</h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium mb-2">Recommendation</h4>
            <p className="text-gray-600">{recommendation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
