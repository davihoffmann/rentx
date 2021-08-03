export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string
  rent: {
    period: string;
    price: number;
  },
  fuel_type: string;
  thumbnail: string;
  accessories: ModelAccessory[];
  photos: string[];
};

interface ModelAccessory {
  type: string;
  name: string;
}