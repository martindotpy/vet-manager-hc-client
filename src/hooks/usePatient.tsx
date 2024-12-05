import { useEffect, useState } from "react";
import {
    MedicalHistoryResponseEntity,
    MedicalRecordResponseEntity,
  PatientAllResponse,
  PatientOneResponse,
  PatientResponseEntity,
  VaccineResponseEntity,
} from "../types";
import {
    addMedicalHistory,
    addMedicalRecord,
    addVaccine,
  createPatient,
  deleteMedicalHistory,
  deletePatient,
  getAllPatients,
  getPatientById,
  updateMedicalHistory,
  updatePatient,
} from "../services/patientService";

export function usePatient() {
  const [patients, setPatients] = useState<PatientResponseEntity[]>([]);
  const [patient, setPatient] = useState<PatientResponseEntity | null>(null);

  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async ({ page = 0, size = 10 } = {}) => {
    try {
      const response: PatientAllResponse = await getAllPatients({ page, size });
      setPatients(response.content);
    } catch (err) {
      setError("Error al cargar los pacientes");
      console.error(err);
    }
  };

  const fetchPatientById = async (id: number) => {
    try {
      const response = await getPatientById({ id });
      setPatient(response.content);
    } catch (err) {
      setError("Error al cargar el paciente");
      console.error(err);
    }
  };

  const handleCreatePatient = async (
    patient: Omit<
      PatientResponseEntity,
      | "id"
      | "age"
      | "deceased"
      | "vaccines"
      | "medical_histories"
      | "medical_records"
    >
  ) => {
    try {
      const response: PatientOneResponse = await createPatient(patient);
      setPatient(response.content);
    } catch (err) {
      setError("Error al crear el paciente");
      console.error(err);
    }
  };

  const handleUpdatePatient = async (
    patient: Omit<
      PatientResponseEntity,
      "age" | "deceased" | "vaccines" | "medical_histories" | "medical_records"
    >
  ) => {
    try {
      const response: PatientOneResponse = await updatePatient(patient);
      setPatients((prev) =>
        prev.map((p) => (p.id === response.content.id ? response.content : p))
      );
    } catch (err) {
      setError("Error al actualizar el paciente");
      console.error(err);
    }
  };

  const handleDeletePatient = async (id: number) => {
    try {
      await deletePatient({ id });
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError("Error al eliminar el paciente");
      console.error(err);
    }
  };

  const handleAddMedicalHistory = async (
    id: number,
    content: string
  ) => {
    try {
      const response: MedicalHistoryResponseEntity = await addMedicalHistory({
        id,
        content,
      });
      if (patient) {
        setPatient({
          ...patient,
          medical_histories: [...patient.medical_histories, response],
        });
      }
    } catch (err) {
      setError("Error al añadir el historial médico");
      console.error(err);
    }
  };

  const handleUpdateMedicalHistory = async (
    id: number,
    content: string
  ) => {
    try {
      const response: MedicalHistoryResponseEntity = await updateMedicalHistory({
        id,
        content,
      });
      if (patient) {
        setPatient({
          ...patient,
          medical_histories: patient.medical_histories.map((mh) =>
            mh.id === id ? response : mh
          ),
        });
      }
    } catch (err) {
      setError("Error al actualizar el historial médico");
      console.error(err);
    }
  };

  const handleDeleteMedicalHistory = async (id: number) => {
    try {
      await deleteMedicalHistory({ id });
      if (patient) {
        setPatient({
          ...patient,
          medical_histories: patient.medical_histories.filter((mh) => mh.id !== id),
        });
      }
    } catch (err) {
      setError("Error al eliminar el historial médico");
      console.error(err);
    }
  };

  const handleAddMedicalRecord = async (
    record: Omit<MedicalRecordResponseEntity, "id" | "vet" | "treatments"> & {
      vet_id: number;
      patient_id: number;
    }
  ) => {
    try {
      const response: MedicalRecordResponseEntity = await addMedicalRecord(record);
      if (patient) {
        setPatient({
          ...patient,
          medical_records: [...patient.medical_records, response],
        });
      }
    } catch (err) {
      setError("Error al añadir el registro médico");
      console.error(err);
    }
  };

  
  

  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    patients,
    patient,
    error,
    fetchPatients,
    fetchPatientById,
    handleCreatePatient,
    handleUpdatePatient,
    handleDeletePatient,
    handleAddMedicalHistory,
    handleUpdateMedicalHistory,
    handleDeleteMedicalHistory,
    handleAddMedicalRecord,
  };
}
