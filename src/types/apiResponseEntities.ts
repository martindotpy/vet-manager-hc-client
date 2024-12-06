export type TreatmentResponseEntity = {
  id: number;
  order: number;
  description: string;
};

export type MedicalRecordResponseEntity = {
  id: number;
  entry_time: string;
  reason: string;
  physical_examination: string;
  celsius_temperature: 0;
  respiratory_rate: 0;
  heart_rate: 0;
  weight: 0;
  sterilized: boolean;
  supplementary_examination: string;
  recipe: string;
  diagnosis: string;
  vet: UserResponseEntity;
  treatments: TreatmentResponseEntity[];
};

export type MedicalHistoryResponseEntity = {
  id: number;
  content: string;
  created_at: string;
};

export type UserResponseEntity = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  roles: ("ADMIN" | "USER" | "VET")[];
};

export type VaccineResponseEntity = {
  id: number;
  name: string;
  dose: number;
  vaccinated_at: string;
  vaccinator: UserResponseEntity;
};

export type OwnerResponseEntity = {
  id: number;
  first_name: string;
  last_name: string;
  identification: number;
  identification_type: "DNI" | ""; // TODO: Add more types
  address: string;
};

export type SpeciesResponseEntity = {
  id: number;
  name: string;
};

export type RaceResponseEntity = {
  id: number;
  name: string;
  species: SpeciesResponseEntity;
};

export type PatientResponseEntity = {
  id: number;
  name: string;
  birth_date: string;
  age: number;
  characteristics: string;
  deceased: boolean;
  gender: "MALE" | "FEMALE";
  owner: OwnerResponseEntity;
  race: RaceResponseEntity;
  vaccines: VaccineResponseEntity[];
  medical_histories: MedicalHistoryResponseEntity[];
  medical_records: MedicalRecordResponseEntity[];
};

export type AppointementResponseType = {
  id: number;
  name: string;
  duration_in_minutes: number;
  price: number;
};

export type AppointmentResponseEntity = {
  id: number;
  created_at: string;
  start_at: string;
  description: string;
  details: {
    id: number;
    duration_in_minutes: number;
    price: number;
    type: AppointementResponseType;
  }[];
  patient: PatientResponseEntity;
  vet: UserResponseEntity;
};

export type ProductResponseEntity = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  updated_at: string;
};

export type CategoryResponseEntity = {
  id: number;
  name: string;
};


export type AppointmentSaleResponseEntity = {
  id: number;
  price: number;
  discount: number;
  appointment: AppointmentResponseEntity;
  seller: UserResponseEntity;
};

export type TreatmentSaleResponseEntity = {
  id: number;
  price: number;
  discount: number;
  treatment: TreatmentResponseEntity;
  seller: UserResponseEntity;
}

export type ProductSaleResponseEntity = {
  id: number;
  price: number;
  discount: number;
  quantity: number;
  product: ProductResponseEntity;
  seller: UserResponseEntity;
}

export type BillResponseEntity = {
  id: number;
  total: number;
  discount: number;
  total_paid: number;
  paid: boolean;
  last_paid_date_time: string;
  created_at: string;
  updated_at: string;
  created_by: UserResponseEntity;
  updated_by: UserResponseEntity;
  client: OwnerResponseEntity;
  appointment_sales: AppointmentSaleResponseEntity[];
  treatment_sales: TreatmentSaleResponseEntity[];
  product_sales: ProductSaleResponseEntity[];
};