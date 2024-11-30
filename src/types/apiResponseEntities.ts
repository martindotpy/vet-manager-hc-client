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
  roles: "ADMIN"[]; // TODO: Add more roles
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

export type PacientResponseEntity = {
  id: number;
  name: string;
  birth_date: string;
  age: number;
  characteristics: string;
  deceased: boolean;
  gender: "MALE" | "FAMELE";
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
  pacient: PacientResponseEntity;
  vet: UserResponseEntity;
};
