import { Button } from "@/components/ui/button";
import "@/styles/filter-bar.css";

export type ProjectFilterType = "All" | "Residential" | "Commercial" | "Completed" | "Ongoing" | "Upcoming";

interface ProjectFilterProps {
  selectedType: ProjectFilterType;
  onFilterChange: (type: ProjectFilterType) => void;
}

const FILTER_OPTIONS: { label: string; value: ProjectFilterType }[] = [
  { label: "All Projects", value: "All" },
  { label: "Residential", value: "Residential" },
  { label: "Commercial", value: "Commercial" },
  { label: "Completed", value: "Completed" },
  { label: "Ongoing", value: "Ongoing" },
  { label: "Upcoming", value: "Upcoming" },
];

export function ProjectFilter({ selectedType, onFilterChange }: ProjectFilterProps) {
  return (
    <nav className="filter-bar-container" aria-label="Project categories">
      <div className="filter-bar-wrapper">
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`filter-button ${selectedType === option.value ? "active" : ""}`}
            data-testid={`button-filter-${option.value.toLowerCase()}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
