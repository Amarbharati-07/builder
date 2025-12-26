import { type Amenity } from "@shared/schema";

interface AmenitiesGridProps {
  amenities: Amenity[];
}

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  return (
    <div className="amenities-grid">
      {amenities.map((amenity, index) => (
        <div key={index} className="amenity-item">
          <div className="amenity-img-box">
            <img
              src={amenity.image}
              alt={amenity.name}
              className="amenity-img"
              data-testid={`image-amenity-${amenity.name}`}
            />
          </div>
          <h4 className="amenity-name" data-testid={`text-amenity-${amenity.name}`}>
            {amenity.name}
          </h4>
        </div>
      ))}
    </div>
  );
}
