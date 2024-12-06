import { useEffect, useState } from "react";
import {
  MedicalHistoryResponseEntity,
  MedicalRecordResponseEntity,
  PatientAllResponse,
  PatientOneResponse,
  PatientResponseEntity,
  RaceResponseEntity,
  SpeciesResponseEntity,
  VaccineResponseEntity,
} from "../types";
import {
  addMedicalHistory,
  addMedicalRecord,
  addVaccine,
  createPatient,
  createRace,
  createSpecies,
  deleteMedicalHistory,
  deletePatient,
  deleteRace,
  deleteSpecies,
  getAllPatients,
  getAllRaces,
  getAllSpecies,
  getPatientById,
  updateMedicalHistory,
  updatePatient,
  updateRace,
  updateSpecies,
} from "../services/patientService";

export function usePatient() {
  const [patients, setPatients] = useState<PatientResponseEntity[]>([]);
  const [patient, setPatient] = useState<PatientResponseEntity | null>(null);
  const [species, setSpecies] = useState<SpeciesResponseEntity[]>([]);
  const [races, setRaces] = useState<RaceResponseEntity[]>([]);

  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async ({ page = 1, size = 10 } = {}) => {
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

  const fetchSpecies = async () => {
    try {
      const response = await getAllSpecies();
      setSpecies(response);
    } catch (err) {
      setError("Error al cargar las especies");
      console.error(err);
    }
  };

  const handleCreateSpecies = async (data: { name: string }) => {
    try {
      const newSpecies = await createSpecies(data);
      setSpecies((prev) => [...prev, newSpecies]);
      return newSpecies;
    } catch (err) {
      setError("Error al crear la especie");
      console.error(err);
      throw err;
    }
  };

  const handleUpdateSpecies = async (id: number, data: { name: string }) => {
    try {
      const updatedSpecies = await updateSpecies(id, data);
      setSpecies((prev) =>
        prev.map((s) => (s.id === id ? updatedSpecies : s))
      );
      return updatedSpecies;
    } catch (err) {
      setError("Error al actualizar la especie");
      console.error(err);
      throw err;
    }
  };

  const handleDeleteSpecies = async (id: number) => {
    try {
      await deleteSpecies(id);
      setSpecies((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError("Error al eliminar la especie");
      console.error(err);
      throw err;
    }
  };

  const fetchRaces = async () => {
    try {
      const response = await getAllRaces();
      setRaces(response.content);
    } catch (err) {
      setError("Error al cargar las razas");
      console.error(err);
    }

    const handleCreateRace = async (data: { name: string; species_id: number }) => {
      try {

        const newRace = await createRace(data);
        setRaces((prev) => [...prev, newRace]);
        return newRace;
      } catch (err) {
        setError("Error al crear la raza");
        console.error(err);
        throw err;
      }
    };

    const handleUpdateRace = async (id: number, data: { name: string; species_id: number }) => {
      try {
        const updatedRace = await updateRace(id, data);
        setRaces((prev) =>
          prev.map((r) => (r.id === id ? updatedRace : r))
        );
        return updatedRace;
      } catch (err) {
        setError("Error al actualizar la raza");
        console.error(err);
        throw err;
      }
    };

    const handleDeleteRace = async (id: number) => {
      try {
        await deleteRace(id);
        setRaces((prev) => prev.filter((r) => r.id !== id));
      } catch (err) {
        setError("Error al eliminar la raza");
        console.error(err);
        throw err;
      }
    };


    useEffect(() => {
      fetchPatients();
      fetchSpecies();
      fetchRaces();
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
      fetchRaces,
      handleCreateRace,
      handleUpdateRace,
      handleDeleteRace,
      fetchSpecies,
      handleCreateSpecies,
      handleUpdateSpecies,
      handleDeleteSpecies,
    };
  }
}