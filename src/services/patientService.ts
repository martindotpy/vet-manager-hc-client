import apiClient from "../client/apiClient";
import {
  MedicalHistoryResponseEntity,
  MedicalRecordResponseEntity,
  PatientAllResponse,
  PatientOneResponse,
  PatientResponseEntity,
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
