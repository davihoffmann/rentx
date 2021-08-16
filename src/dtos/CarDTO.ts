export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
  accessories: ModelAccessory[];
  photos: ModelPhotos[];
};

interface ModelAccessory {
  id: string;
  type: string;
  name: string;
}

interface ModelPhotos {
  id: string;
  photo: string;
}