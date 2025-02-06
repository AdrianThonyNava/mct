import { CyclePhase, type Phase } from "@shared/schema";

interface TimelineProps {
  currentDay: number;
}

export function CycleTimeline({ currentDay }: TimelineProps) {
  return (
    <div className="w-full space-y-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Timeline bar */}
      <div className="w-full h-12 rounded-lg bg-gray-50 relative overflow-hidden">
        {/* Phase sections */}
        {Object.entries(CyclePhase).map(([phase, data]) => (
          <div
            key={phase}
            className="absolute h-full flex items-center justify-center text-xs font-medium transition-all duration-300 hover:opacity-100 group"
            style={{
              left: `${((data.range[0] - 1) / 28) * 100}%`,
              width: `${((data.range[1] - data.range[0] + 1) / 28) * 100}%`,
              backgroundColor: data.color,
              color: 'white',
              opacity: 0.85
            }}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {data.name}
            </span>
          </div>
        ))}

        {/* Current day indicator */}
        <div
          className="absolute w-4 h-full bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out timeline-glow"
          style={{
            left: `${((currentDay - 1) / 28) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>

      {/* Day markers */}
      <div className="w-full relative flex justify-between px-2">
        {[0, 7, 14, 21, 28].map((day) => (
          <div
            key={day}
            className={`text-xs transition-colors duration-200 ${
              Math.abs(currentDay - day) <= 1 
                ? "font-bold text-primary" 
                : "text-gray-500"
            }`}
          >
            Day {day}
          </div>
        ))}
      </div>

      {/* Current day indicator */}
      <div className="text-center">
        <span className="inline-block px-6 py-2 bg-gradient-to-r from-primary to-primary/90 text-white rounded-full text-sm font-medium shadow-sm">
          Day {currentDay}
        </span>
      </div>
    </div>
  );
}