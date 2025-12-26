import { MapPin, Hospital, Train, Bus, Store, Building2, type LucideIcon } from "lucide-react";
import { type Connectivity } from "@shared/schema";

interface ConnectivitySectionProps {
  connectivity: Connectivity[];
}

const iconMap: Record<string, LucideIcon> = {
  "Hospital": Hospital,
  "Metro Station": Building2,
  "Railway Station": Train,
  "Bus Stop": Bus,
  "Market/School": Store,
};

export function ConnectivitySection({ connectivity }: ConnectivitySectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {connectivity.map((item, index) => {
        const IconComponent = iconMap[item.type] || MapPin;
        return (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            data-testid={`card-connectivity-${item.type}`}
          >
            <div className="flex-shrink-0">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm" data-testid={`text-connectivity-type-${item.type}`}>
                {item.type}
              </h4>
              <p className="text-muted-foreground text-sm" data-testid={`text-connectivity-distance-${item.type}`}>
                {item.distance}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
