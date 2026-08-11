// PT SMN SmartGreen Transformation Mock Data Simulator & Case Baseline Data Engine

export interface MachineData {
  id: string;
  name: string;
  line: "Line 1" | "Line 2";
  type: string;
  status: "normal" | "warning" | "critical";
  healthScore: number; // 0-100%
  vibration: number; // mm/s
  temp: number; // °C
  power: number; // kW
  state: "RUNNING" | "IDLE" | "STANDBY" | "STOP";
  downtimeHours: number; // hrs/mo (baseline 45)
  cycleTime: number; // min/batch (baseline 25)
  defectRate: number; // % (baseline 4.5)
  energyTodayKwh: number;
  lastMaintenance: string;
  retrofitSensors: string[];
}

export interface ESGCategoryMetrics {
  energyMonthlyMwh: number;
  energyIdlePercent: number;
  waterGroundwaterWithdrawalM3: number;
  waterRecycledPercent: number;
  wasteB3Tons: number;
  wasteRecyclablePercent: number;
  scope2CarbonTons: number;
}

export interface WorkerSkillProgression {
  level: number;
  title: string;
  desc: string;
  enrolledCount: number;
  certifiedCount: number;
  allocationRpB: number;
}

export interface TraceabilityBatch {
  batchId: string;
  supplier: string;
  materialId: string;
  lineId: string;
  machineId: string;
  timestamp: string;
  qualityStatus: "PASSED" | "REJECTED" | "FLAGGED";
  wasteGeneratedKg: number;
  carbonFootprintKg: number;
  esgAuditStatus: "VERIFIED" | "PENDING_AUDIT";
}

// Initial 20 machines (10 per line)
const initialMachines: MachineData[] = [
  // Line 1 (10 Machines)
  { id: "M01", name: "CNC Stamping Press 01", line: "Line 1", type: "Stamping Press", status: "normal", healthScore: 94, vibration: 1.8, temp: 42.5, power: 18.5, state: "RUNNING", downtimeHours: 12, cycleTime: 22, defectRate: 1.2, energyTodayKwh: 145, lastMaintenance: "2026-08-01", retrofitSensors: ["Vibration", "Temp", "Power Meter", "PLC Modbus"] },
  { id: "M02", name: "Automated Milling Unit 02", line: "Line 1", type: "Milling", status: "normal", healthScore: 88, vibration: 2.3, temp: 48.0, power: 22.0, state: "RUNNING", downtimeHours: 18, cycleTime: 24, defectRate: 2.1, energyTodayKwh: 168, lastMaintenance: "2026-07-28", retrofitSensors: ["Vibration", "Temp", "Power Meter"] },
  { id: "M03", name: "Heavy Hydraulic Press 03", line: "Line 1", type: "Hydraulic Press", status: "warning", healthScore: 51, vibration: 6.7, temp: 78.4, power: 34.2, state: "IDLE", downtimeHours: 42, cycleTime: 29, defectRate: 5.8, energyTodayKwh: 210, lastMaintenance: "2026-07-10", retrofitSensors: ["Vibration", "Temp", "Power Meter", "Status Sensor"] },
  { id: "M04", name: "Robotic Welding Station 04", line: "Line 1", type: "Welding", status: "normal", healthScore: 91, vibration: 1.2, temp: 39.1, power: 15.0, state: "RUNNING", downtimeHours: 8, cycleTime: 20, defectRate: 0.9, energyTodayKwh: 112, lastMaintenance: "2026-08-05", retrofitSensors: ["Vibration", "Temp", "Current Sensor"] },
  { id: "M05", name: "Precision Lathe Machine 05", line: "Line 1", type: "Lathe", status: "normal", healthScore: 85, vibration: 2.9, temp: 52.0, power: 19.8, state: "RUNNING", downtimeHours: 22, cycleTime: 25, defectRate: 2.8, energyTodayKwh: 152, lastMaintenance: "2026-07-25", retrofitSensors: ["Vibration", "Temp", "Power Meter"] },
  { id: "M06", name: "Chemical Surface Treatment 06", line: "Line 1", type: "Chemical Tank", status: "normal", healthScore: 89, vibration: 0.5, temp: 65.0, power: 28.0, state: "RUNNING", downtimeHours: 15, cycleTime: 26, defectRate: 1.5, energyTodayKwh: 195, lastMaintenance: "2026-08-02", retrofitSensors: ["Temp", "Chemical Sensor", "K3 Sensor"] },
  { id: "M07", name: "High-Speed Conveyor Belt 07", line: "Line 1", type: "Conveyor", status: "normal", healthScore: 96, vibration: 1.1, temp: 34.0, power: 8.5, state: "RUNNING", downtimeHours: 5, cycleTime: 21, defectRate: 0.5, energyTodayKwh: 68, lastMaintenance: "2026-08-08", retrofitSensors: ["Vibration", "Power Meter"] },
  { id: "M08", name: "Automated Inspection Vision 08", line: "Line 1", type: "Quality Vision", status: "normal", healthScore: 98, vibration: 0.2, temp: 31.0, power: 4.2, state: "RUNNING", downtimeHours: 2, cycleTime: 20, defectRate: 0.1, energyTodayKwh: 34, lastMaintenance: "2026-08-10", retrofitSensors: ["Camera AI", "Power Meter"] },
  { id: "M09", name: "Industrial Heat Oven 09", line: "Line 1", type: "Oven", status: "normal", healthScore: 82, vibration: 0.8, temp: 185.0, power: 45.0, state: "RUNNING", downtimeHours: 28, cycleTime: 30, defectRate: 3.2, energyTodayKwh: 340, lastMaintenance: "2026-07-20", retrofitSensors: ["Thermal Sensor", "Power Meter"] },
  { id: "M10", name: "Packaging & Bundling Unit 10", line: "Line 1", type: "Packaging", status: "normal", healthScore: 93, vibration: 1.4, temp: 37.0, power: 11.0, state: "RUNNING", downtimeHours: 10, cycleTime: 22, defectRate: 1.0, energyTodayKwh: 88, lastMaintenance: "2026-08-04", retrofitSensors: ["Vibration", "Status Sensor"] },

  // Line 2 (10 Machines)
  { id: "M11", name: "Primary Metal Shearing 11", line: "Line 2", type: "Shearing", status: "normal", healthScore: 87, vibration: 3.1, temp: 51.0, power: 25.0, state: "RUNNING", downtimeHours: 20, cycleTime: 23, defectRate: 2.4, energyTodayKwh: 180, lastMaintenance: "2026-07-29", retrofitSensors: ["Vibration", "Temp", "Power Meter"] },
  { id: "M12", name: "Multi-Axis Milling Press 12", line: "Line 2", type: "Milling", status: "normal", healthScore: 92, vibration: 1.7, temp: 44.0, power: 21.0, state: "RUNNING", downtimeHours: 11, cycleTime: 22, defectRate: 1.1, energyTodayKwh: 158, lastMaintenance: "2026-08-03", retrofitSensors: ["Vibration", "Temp", "PLC Modbus"] },
  { id: "M13", name: "Secondary Stamping Unit 13", line: "Line 2", type: "Stamping Press", status: "critical", healthScore: 38, vibration: 8.9, temp: 92.1, power: 38.5, state: "STOP", downtimeHours: 58, cycleTime: 35, defectRate: 8.9, energyTodayKwh: 245, lastMaintenance: "2026-06-15", retrofitSensors: ["Vibration", "Temp", "Power Meter", "Safety Interlock"] },
  { id: "M14", name: "Coating & Paint Bath 14", line: "Line 2", type: "Coating", status: "normal", healthScore: 86, vibration: 0.9, temp: 58.0, power: 29.0, state: "RUNNING", downtimeHours: 19, cycleTime: 27, defectRate: 2.7, energyTodayKwh: 205, lastMaintenance: "2026-07-22", retrofitSensors: ["Temp", "Chemical Detector", "K3 Sensor"] },
  { id: "M15", name: "Laser Cutting Robot 15", line: "Line 2", type: "Laser Cut", status: "normal", healthScore: 95, vibration: 0.6, temp: 38.0, power: 18.0, state: "RUNNING", downtimeHours: 6, cycleTime: 20, defectRate: 0.6, energyTodayKwh: 135, lastMaintenance: "2026-08-07", retrofitSensors: ["Power Meter", "Vibration"] },
  { id: "M16", name: "Component Assembly Robot 16", line: "Line 2", type: "Assembly", status: "normal", healthScore: 90, vibration: 1.3, temp: 36.5, power: 14.5, state: "RUNNING", downtimeHours: 14, cycleTime: 22, defectRate: 1.3, energyTodayKwh: 110, lastMaintenance: "2026-08-02", retrofitSensors: ["Vibration", "Status Sensor"] },
  { id: "M17", name: "Water Cooling Loop Pump 17", line: "Line 2", type: "Cooling Pump", status: "normal", healthScore: 94, vibration: 2.0, temp: 32.0, power: 16.0, state: "RUNNING", downtimeHours: 7, cycleTime: 21, defectRate: 0.4, energyTodayKwh: 125, lastMaintenance: "2026-08-06", retrofitSensors: ["Flow Sensor", "Vibration", "Power Meter"] },
  { id: "M18", name: "Effluent Water Filter 18", line: "Line 2", type: "Filter System", status: "normal", healthScore: 89, vibration: 1.0, temp: 29.5, power: 9.5, state: "RUNNING", downtimeHours: 12, cycleTime: 21, defectRate: 0.2, energyTodayKwh: 75, lastMaintenance: "2026-08-04", retrofitSensors: ["Turbidity", "pH Sensor", "Flow Meter"] },
  { id: "M19", name: "B3 Waste Shredder & Compactor 19", line: "Line 2", type: "Waste Processor", status: "normal", healthScore: 84, vibration: 4.2, temp: 55.0, power: 23.0, state: "RUNNING", downtimeHours: 24, cycleTime: 28, defectRate: 1.8, energyTodayKwh: 170, lastMaintenance: "2026-07-27", retrofitSensors: ["Weight Sensor", "Power Meter", "Vibration"] },
  { id: "M20", name: "Final Palletizing Unit 20", line: "Line 2", type: "Palletizer", status: "normal", healthScore: 97, vibration: 1.1, temp: 33.0, power: 12.0, state: "RUNNING", downtimeHours: 4, cycleTime: 20, defectRate: 0.3, energyTodayKwh: 92, lastMaintenance: "2026-08-09", retrofitSensors: ["Status Sensor", "Power Meter"] },
];

export const initialESGMetrics: ESGCategoryMetrics = {
  energyMonthlyMwh: 40.0, // baseline
  energyIdlePercent: 16.5, // decreased from 30% baseline
  waterGroundwaterWithdrawalM3: 4200, // m3/mo reduced via circular loop
  waterRecycledPercent: 64.0, // % recycled
  wasteB3Tons: 12.4, // tons/mo
  wasteRecyclablePercent: 78.5,
  scope2CarbonTons: 31.2, // tCO2e / mo
};

export const workerUpskillingProgram: WorkerSkillProgression[] = [
  { level: 1, title: "Level 01 — Digital Manufacturing Fundamentals", desc: "Basic touch UI, digital work order reading, basic safety sensors awareness.", enrolledCount: 48, certifiedCount: 48, allocationRpB: 0.2 },
  { level: 2, title: "Level 02 — IoT & Industrial Networking", desc: "Sensor diagnostics, Modbus/MQTT understanding, basic edge gateway troubleshooting.", enrolledCount: 35, certifiedCount: 30, allocationRpB: 0.3 },
  { level: 3, title: "Level 03 — Predictive Maintenance Technician", desc: "Vibration analysis, thermal imaging, machine health score monitoring.", enrolledCount: 22, certifiedCount: 18, allocationRpB: 0.3 },
  { level: 4, title: "Level 04 — Digital Quality & Traceability Inspector", desc: "Computer vision calibration, digital batch logging, audit compliance tracking.", enrolledCount: 15, certifiedCount: 12, allocationRpB: 0.2 },
  { level: 5, title: "Level 05 — SmartGreen System Specialist", desc: "Cross-domain optimization across energy, water, machine productivity & safety.", enrolledCount: 8, certifiedCount: 6, allocationRpB: 0.2 },
];

export const sampleTraceabilityBatches: TraceabilityBatch[] = [
  { batchId: "BAT-2026-0811-A1", supplier: "PT Sinar Baja Utama", materialId: "MAT-STEEL-CR-02", lineId: "Line 1", machineId: "M01", timestamp: "2026-08-11 09:15:20", qualityStatus: "PASSED", wasteGeneratedKg: 4.2, carbonFootprintKg: 18.5, esgAuditStatus: "VERIFIED" },
  { batchId: "BAT-2026-0811-A2", supplier: "PT Sinar Baja Utama", materialId: "MAT-STEEL-CR-02", lineId: "Line 1", machineId: "M03", timestamp: "2026-08-11 10:22:45", qualityStatus: "FLAGGED", wasteGeneratedKg: 18.9, carbonFootprintKg: 34.2, esgAuditStatus: "PENDING_AUDIT" },
  { batchId: "BAT-2026-0811-B1", supplier: "CV PolyChem Indonesia", materialId: "MAT-CHEM-COAT-09", lineId: "Line 2", machineId: "M14", timestamp: "2026-08-11 11:05:12", qualityStatus: "PASSED", wasteGeneratedKg: 2.1, carbonFootprintKg: 12.0, esgAuditStatus: "VERIFIED" },
  { batchId: "BAT-2026-0811-B2", supplier: "PT Alumindo Presisi", materialId: "MAT-ALU-6061-T6", lineId: "Line 2", machineId: "M13", timestamp: "2026-08-11 13:40:00", qualityStatus: "REJECTED", wasteGeneratedKg: 32.5, carbonFootprintKg: 45.0, esgAuditStatus: "PENDING_AUDIT" },
];

// Baseline Case Financial Constants
export const CASE_FINANCIALS = {
  baselineOpexAnnualRpB: 16.0,
  electricityAnnualRpB: 9.6,
  waterAnnualRpB: 1.8,
  wasteB3AnnualRpB: 2.4,
  maintenanceAnnualRpB: 2.2,
  
  maxCapexRpB: 8.0,
  minSocialPercent: 15,
  minSocialRpB: 1.2,
  waccPercent: 12,
  projectYears: 5,
  maxPaybackYears: 3.5,
  minIrrPercent: 15,
};

// Simulator State Engine
class DataSimulator {
  private machines: MachineData[] = [...initialMachines];
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      setInterval(() => {
        this.updateTick();
      }, 4000);
    }
  }

  private updateTick() {
    this.machines = this.machines.map((m) => {
      // Slightly fluctuate sensor readings for realistic interactive experience
      const vibDelta = (Math.random() - 0.5) * 0.2;
      const tempDelta = (Math.random() - 0.5) * 0.4;
      const powerDelta = (Math.random() - 0.5) * 0.5;

      const newVib = Math.max(0.2, parseFloat((m.vibration + vibDelta).toFixed(2)));
      const newTemp = Math.max(25, parseFloat((m.temp + tempDelta).toFixed(1)));
      const newPower = Math.max(2, parseFloat((m.power + powerDelta).toFixed(1)));

      let newStatus = m.status;
      let newHealth = m.healthScore;

      if (newVib > 7.0 || newTemp > 85) {
        newStatus = "critical";
        newHealth = Math.max(30, newHealth - 1);
      } else if (newVib > 4.5 || newTemp > 70) {
        newStatus = "warning";
        newHealth = Math.max(50, Math.min(88, newHealth));
      } else {
        newStatus = "normal";
        newHealth = Math.min(99, newHealth + (Math.random() > 0.7 ? 1 : 0));
      }

      return {
        ...m,
        vibration: newVib,
        temp: newTemp,
        power: newPower,
        status: newStatus,
        healthScore: newHealth,
      };
    });

    this.notify();
  }

  public getMachines(): MachineData[] {
    return this.machines;
  }

  public subscribe(fn: () => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }
}

export const simulator = new DataSimulator();
