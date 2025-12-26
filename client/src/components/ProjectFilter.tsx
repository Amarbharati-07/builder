import { Button } from "@/components/ui/button";

interface ProjectFilterProps {
  selectedType: "All" | "Residential" | "Commercial";
  onFilterChange: (type: "All" | "Residential" | "Commercial") => void;
}

export function ProjectFilter({ selectedType, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-12">
      <Button
        variant={selectedType === "All" ? "default" : "outline"}
        onClick={() => onFilterChange("All")}
        data-testid="button-filter-all"
        className={selectedType === "All" ? "bg-primary text-white" : "border-foreground"}
      >
        All Projects
      </Button>
      <Button
        variant={selectedType === "Residential" ? "default" : "outline"}
        onClick={() => onFilterChange("Residential")}
        data-testid="button-filter-residential"
        className={selectedType === "Residential" ? "bg-primary text-white" : "border-foreground"}
      >
        Residential
      </Button>
      <Button
        variant={selectedType === "Commercial" ? "default" : "outline"}
        onClick={() => onFilterChange("Commercial")}
        data-testid="button-filter-commercial"
        className={selectedType === "Commercial" ? "bg-primary text-white" : "border-foreground"}
      >
        Commercial
      </Button>
    </div>
  );
}
