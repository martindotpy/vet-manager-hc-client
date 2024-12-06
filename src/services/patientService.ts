import apiClient from "../client/apiClient";
import {
  MedicalHistoryResponseEntity,
  MedicalRecordResponseEntity,
  PatientAllResponse,
  PatientOneResponse,
  PatientResponseEntity,
  RaceResponseEntity,
  racesAllResponse,
  SpeciesResponseEntity,
  VaccineResponseEntity,
} from "../types";

export async function getAllPatients({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<PatientAllResponse> {
  const response = await apiClient.get(`/patient`, {
    params: { page, size },
  });
  return response.data;
}

export async function getPatientById({
  id,
}: {
  id: number;
}): Promise<PatientOneResponse> {
  const response = await apiClient.get(`/patient/${id}`);
  return response.data;
}

export async function createPatient(
  patient: Omit<
    PatientResponseEntity,
    | "id"
    | "age"
    | "deceased"
    | "vaccines"
    | "medical_histories"
    | "medical_records"
  >
): Promise<PatientOneResponse> {
  const response = await apiClient.post(`/patient`, patient);
  return response.data;
}

export async function updatePatient(
  patient: Omit<
    PatientResponseEntity,
    "age" | "deceased" | "vaccines" | "medical_histories" | "medical_records"
  >
): Promise<PatientOneResponse> {
  const response = await apiClient.put(`/patient/${patient.id}`, patient);
  return response.data;
}

export async function deletePatient({
  id,
}: {
  id: number;
}): Promise<{ message: string }> {
  const response = await apiClient.delete(`/patient/${id}`);
  return response.data;
}
export async function addMedicalHistory({
  id,
  content,
}: Omit<MedicalHistoryResponseEntity, "id" | "created_at"> & {
  id: number;
}): Promise<MedicalHistoryResponseEntity> {
  const response = await apiClient.post(`/patient/${id}/medicalhistory`, {
    content,
  });
  return response.data;
}

export async function updateMedicalHistory({
  id,
  content,
}: Omit<
  MedicalHistoryResponseEntity,
  "created_at"
>): Promise<MedicalHistoryResponseEntity> {
  const response = await apiClient.put(`/patient/medicalhistory/${id}`, {
    content,
  });
  return response.data;
}

export async function deleteMedicalHistory({
  id,
}: {
  id: number;
}): Promise<{ message: string }> {
  const response = await apiClient.delete(`/patient/medicalhistory/${id}`);
  return response.data;
}

export async function addMedicalRecord(
  record: Omit<MedicalRecordResponseEntity, "id" | "vet" | "treatments"> & {
    vet_id: number;
    patient_id: number;
  }
): Promise<MedicalRecordResponseEntity> {
  const response = await apiClient.post(
    `/patient/${record.patient_id}/medicalrecord`,
    record
  );
  return response.data;
}

export async function addVaccine({
  id,
  name,
  dose,
  vaccinated_at,
  vaccinator,
}: Omit<VaccineResponseEntity, "id"> & {
  id: number;
  vaccinator_id: number;
}): Promise<VaccineResponseEntity> {
  const response = await apiClient.post(`/patient/${id}/vaccine`, {
    name,
    dose,
    vaccinated_at,
    vaccinator_id: vaccinator.id,
  });
  return response.data;
}

export async function generatePatientExcel(): Promise<void> {
  await apiClient.get(`/patient/excel`);
}

export async function getAllRaces(): Promise<racesAllResponse>{
  const response = await apiClient.get(`/patient/race`);
  return response.data;
}

export async function createRace(data: { name: string; species_id: number }): Promise<RaceResponseEntity> {
  const response = await apiClient.post<RaceResponseEntity>("/patient/race", data);
  return response.data;
}

export async function updateRace(
  id: number,
  data: { name: string; species_id: number }
): Promise<RaceResponseEntity> {
  const response = await apiClient.put<RaceResponseEntity>(`/patient/race/${id}`, data);
  return response.data;
}

export async function deleteRace(id: number): Promise<{ message: string }> {
  const response = await apiClient.delete<{ message: string }>(`/patient/race/${id}`);
  return response.data;
}

export async function getAllSpecies(): Promise<SpeciesResponseEntity[]> {
  const response = await apiClient.get<SpeciesResponseEntity[]>("/patient/species");
  return response.data;
}

export async function createSpecies(data: { name: string }): Promise<SpeciesResponseEntity> {
  const response = await apiClient.post<SpeciesResponseEntity>("/patient/species", data);
  return response.data;
}

export async function updateSpecies(id: number, data: { name: string }): Promise<SpeciesResponseEntity> {
  const response = await apiClient.put<SpeciesResponseEntity>(`/patient/species/${id}`, data);
  return response.data;
}

export async function deleteSpecies(id: number): Promise<{ message: string }> {
  const response = await apiClient.delete<{ message: string }>(`/patient/species/${id}`);
  return response.data;
}