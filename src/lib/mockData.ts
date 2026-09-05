// SMN SYNERGY — Unified Enterprise Data Engine & Real-Time Simulator
// All simulated datasets are strictly labeled for prototype fidelity.

export type RoleType = "MANAGEMENT" | "OPERATOR" | "MAINTENANCE" | "ESG TEAM" | "HR / WORKFORCE" | "AUDITOR";

export type HealthStatus = "normal" | "warning" | "critical";

export interface SensorCondition {
  vibrationStatus: "normal" | "warning" | "critical";
  tempStatus: "normal" | "warning" | "critical";
  powerStatus: "normal" | "warning" | "critical";
  note: string;
}

export interface MaintenanceTask {
  id: string;
  machineId: string;
  machineName: string;
  title: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  assignedTo: string;
  createdAt: string;
  recommendedAction: string;
}

export interface MachineData {
  id: string;
  name: string;
  line: "Line 1" | "Line 2";
  type: string;
  status: HealthStatus;
  healthScore: number; // 0-100%
  vibration: number; // mm/s
  temp: number; // °C
  power: number; // kW
  state: "RUNNING" | "IDLE" | "STANDBY" | "STOP";
  downtimeHours: number; // hrs/mo
  cycleTime: number; // min/batch
  defectRate: number; // %
  energyTodayKwh: number;
  lastMaintenance: string;
  retrofitSensors: string[];
  sensorCondition: SensorCondition;
  aiRiskDetection: {
    riskLevel: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
    anomalyType: string;
    failurePredictionWindow: string;
    recommendedAction: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  };
  trend24h: { time: string; vibration: number; temp: number; power: number }[];
  maintenanceHistory: { date: string; action: string; technician: string; result: string }[];
}

// Circular Resource Management Loops
export interface WaterLoopData {
  inflowM3Day: number;
  coolingConsumptionM3Day: number;
  treatedM3Day: number;
  recycledM3Day: number;
  recyclingRatePercent: number; // 64%
  waterSavingsRpMonth: number;
  activeAlerts: {
    id: string;
    line: string;
    severity: "WARNING" | "CRITICAL";
    title: string;
    flowRateDiff: string;
    recommendation: string;
    timestamp: string;
  }[];
}

export interface WasteBatchRecord {
  batchId: string;
  source: string;
  productionLine: string;
  wasteType: string;
  isB3: boolean;
  quantityKg: number;
  pickupDate: string;
  authorizedVendor: string;
  manifestCode: string;
  trackingStatus: "GENERATED" | "CONTAINED" | "PICKED_UP" | "IN_TRANSIT" | "VERIFIED_TREATED";
  esgVerified: boolean;
}

export interface EnergyLoopData {
  currentPowerKw: number;
  dailyConsumptionMwh: number;
  energyIntensityKwhPerUnit: number;
  peakUsageKw: number;
  renewableContributionPercent: number;
  idleLossKw: number;
  idleLossCostRpPerDay: number;
  line1ConsumptionKw: number;
  line2ConsumptionKw: number;
  activeAlerts: {
    id: string;
    title: string;
    line: string;
    severity: "WARNING" | "CRITICAL";
    excessKw: number;
    recommendation: string;
  }[];
}

export interface ESGScorecard {
  environment: {
    status: "GREEN" | "AMBER" | "RED";
    carbonFootprintScope1Tons: number;
    carbonFootprintScope2Tons: number;
    groundwaterReductionPercent: number;
    energyIdleReductionPercent: number;
    circularWaterPercent: number;
  };
  social: {
    status: "GREEN" | "AMBER" | "RED";
    reskillingBudgetRpB: number;
    workforceCertifiedCount: number;
    workforceTotal: number;
    layoffRiskPercent: number; // 0% Just Transition
    safetyIncidentFreeDays: number;
  };
  governance: {
    status: "GREEN" | "AMBER" | "RED";
    digitalTraceabilityRate: number; // 99.8%
    verifiedGreenBatchesPercent: number;
    auditComplianceScore: number;
    esgEvidenceReadiness: string;
  };
}

// Green Batch Passport & Traceability Lifecycle
export interface TraceabilityNode {
  step: string;
  title: string;
  description: string;
  timestamp: string;
  parameter: string;
  verified: boolean;
  evidenceCode: string;
}

export interface GreenBatchPassport {
  batchId: string;
  material: string;
  supplier: string;
  productionLine: "Line 1" | "Line 2";
  machineId: string;
  energyKwh: number;
  waterLiters: number;
  wasteKg: number;
  qualityStatus: "PASS" | "FLAGGED" | "FAIL";
  esgScore: "A" | "A+" | "B";
  carbonFootprintKgCO2e: number;
  status: "VERIFIED" | "PENDING_AUDIT" | "REJECTED";
  issuedDate: string;
  verifier: string;
  qrHash: string;
  lifecycle: TraceabilityNode[];
}

// Workforce: Grow with SMN & Human Readiness Gate
export interface SkillGapRole {
  id: string;
  currentRole: string;
  targetRole: string;
  enrolledCount: number;
  certifiedCount: number;
  targetCount: number;
  progressPercent: number;
  modules: string[];
}

export interface HumanReadinessGateItem {
  id: string;
  technologyName: string;
  deploymentTarget: string;
  technicalReadiness: "READY" | "IN_PROGRESS" | "NOT_READY";
  workforceReadiness: "READY" | "IN_PROGRESS" | "NOT_READY";
  safetyReadiness: "READY" | "IN_PROGRESS" | "NOT_READY";
  overallStatus: "READY FOR GO-LIVE" | "NOT READY FOR FULL GO-LIVE" | "HOLD";
  blockerReason: string;
  recommendedAction: string;
  affectedWorkers: number;
}

// Global Alert Notification Item
export interface AlertItem {
  id: string;
  category: "Machine" | "Energy" | "Water" | "Waste" | "ESG" | "Safety" | "Workforce";
  severity: "CRITICAL" | "WARNING" | "INFO";
  title: string;
  message: string;
  timestamp: string;
  sourceId?: string;
  actionLabel: string;
  actionRoute: string;
  isRead: boolean;
}

// Baseline Initial 20 Machines Fleet
const initialMachines: MachineData[] = [
  // Line 1 (10 Machines)
  {
    id: "M01",
    name: "CNC Stamping Press 01",
    line: "Line 1",
    type: "Stamping Press",
    status: "normal",
    healthScore: 94,
    vibration: 1.8,
    temp: 42.5,
    power: 18.5,
    state: "RUNNING",
    downtimeHours: 12,
    cycleTime: 22,
    defectRate: 1.2,
    energyTodayKwh: 145,
    lastMaintenance: "2026-08-01",
    retrofitSensors: ["Vibration (Piezo)", "Temp (PT100)", "Power CT Meter", "PLC Modbus RS485"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Operasi poros dan bantalan dalam batas normal ISO 10816." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None detected", failurePredictionWindow: "> 180 Hari", recommendedAction: "Lanjutkan pemantauan periodik telemetri.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 1.7, temp: 41.0, power: 18.2 },
      { time: "06:00", vibration: 1.8, temp: 42.2, power: 18.5 },
      { time: "12:00", vibration: 1.9, temp: 43.1, power: 18.7 },
      { time: "18:00", vibration: 1.8, temp: 42.5, power: 18.5 },
    ],
    maintenanceHistory: [
      { date: "2026-08-01", action: "Pelumasan guide-pin hidrolik", technician: "Budi Santoso", result: "Selesai - Toleransi presisi tercapai" },
      { date: "2026-06-15", action: "Kalibrasi sensor getaran IoT", technician: "Ahmad Fauzi", result: "Akurasi 99.4%" },
    ],
  },
  {
    id: "M02",
    name: "Automated Milling Unit 02",
    line: "Line 1",
    type: "Milling",
    status: "normal",
    healthScore: 88,
    vibration: 2.3,
    temp: 48.0,
    power: 22.0,
    state: "RUNNING",
    downtimeHours: 18,
    cycleTime: 24,
    defectRate: 2.1,
    energyTodayKwh: 168,
    lastMaintenance: "2026-07-28",
    retrofitSensors: ["Vibration Sensor", "Temp PT100", "Smart Power CT"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Spindle motor beroperasi stabil." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "Minor harmonic wobble", failurePredictionWindow: "120 Hari", recommendedAction: "Jadwalkan pembersihan saringan pendingin.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 2.1, temp: 46.5, power: 21.5 },
      { time: "06:00", vibration: 2.2, temp: 47.8, power: 22.0 },
      { time: "12:00", vibration: 2.4, temp: 48.9, power: 22.4 },
      { time: "18:00", vibration: 2.3, temp: 48.0, power: 22.0 },
    ],
    maintenanceHistory: [{ date: "2026-07-28", action: "Penggantian coolant filter", technician: "Hendra Wijaya", result: "Aliran cairan normal" }],
  },
  {
    id: "M03",
    name: "Heavy Hydraulic Press 03",
    line: "Line 1",
    type: "Hydraulic Press",
    status: "warning",
    healthScore: 51,
    vibration: 6.7,
    temp: 78.4,
    power: 34.2,
    state: "IDLE",
    downtimeHours: 42,
    cycleTime: 29,
    defectRate: 5.8,
    energyTodayKwh: 210,
    lastMaintenance: "2026-07-10",
    retrofitSensors: ["Vibration (Piezo 3-Axis)", "High-Temp PT100", "Power CT Meter", "Pressure Transducer"],
    sensorCondition: { vibrationStatus: "warning", tempStatus: "warning", powerStatus: "normal", note: "Peningkatan getaran 48% di bearing utama dan suhu hidrolik mendekati ambang bahaya." },
    aiRiskDetection: {
      riskLevel: "HIGH",
      anomalyType: "Degradasi Bantalan Bearing Spindle & Kebocoran Pelumas Mikro",
      failurePredictionWindow: "14 - 21 Hari sebelum Breakdown Total",
      recommendedAction: "Jadwalkan inspeksi bearing & pelumasan ulang pada jendela shift 3 malam ini.",
      priority: "HIGH",
    },
    trend24h: [
      { time: "00:00", vibration: 4.8, temp: 68.0, power: 30.1 },
      { time: "06:00", vibration: 5.6, temp: 72.5, power: 32.5 },
      { time: "12:00", vibration: 6.4, temp: 77.0, power: 34.0 },
      { time: "18:00", vibration: 6.7, temp: 78.4, power: 34.2 },
    ],
    maintenanceHistory: [
      { date: "2026-07-10", action: "Penggantian silinder O-ring", technician: "Budi Santoso", result: "Sementara normal" },
      { date: "2026-05-18", action: "Penggantian oli hidrolik", technician: "Eko Prasetyo", result: "Selesai" },
    ],
  },
  {
    id: "M04",
    name: "Robotic Welding Station 04",
    line: "Line 1",
    type: "Welding",
    status: "normal",
    healthScore: 91,
    vibration: 1.2,
    temp: 39.1,
    power: 15.0,
    state: "RUNNING",
    downtimeHours: 8,
    cycleTime: 20,
    defectRate: 0.9,
    energyTodayKwh: 112,
    lastMaintenance: "2026-08-05",
    retrofitSensors: ["Vibration Sensor", "Current Transformer", "Temp Sensor"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Arus pengelasan stabil dan posisi servo lengan robotik akurat." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "> 150 Hari", recommendedAction: "Lakukan inspeksi nozel reguler.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 1.1, temp: 38.0, power: 14.8 },
      { time: "06:00", vibration: 1.2, temp: 39.0, power: 15.1 },
      { time: "12:00", vibration: 1.3, temp: 39.5, power: 15.2 },
      { time: "18:00", vibration: 1.2, temp: 39.1, power: 15.0 },
    ],
    maintenanceHistory: [{ date: "2026-08-05", action: "Pembersihan spatter tip las", technician: "Rian Hidayat", result: "Bersih" }],
  },
  {
    id: "M05",
    name: "Precision Lathe Machine 05",
    line: "Line 1",
    type: "Lathe",
    status: "normal",
    healthScore: 85,
    vibration: 2.9,
    temp: 52.0,
    power: 19.8,
    state: "RUNNING",
    downtimeHours: 22,
    cycleTime: 25,
    defectRate: 2.8,
    energyTodayKwh: 152,
    lastMaintenance: "2026-07-25",
    retrofitSensors: ["Vibration", "Temp PT100", "Power Meter"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Beban pemotongan presisi logam dalam batas aman." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "90 Hari", recommendedAction: "Cek ketajaman mata pahat pada shift berikutnya.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 2.7, temp: 50.0, power: 19.2 },
      { time: "06:00", vibration: 2.8, temp: 51.5, power: 19.6 },
      { time: "12:00", vibration: 3.0, temp: 53.0, power: 20.1 },
      { time: "18:00", vibration: 2.9, temp: 52.0, power: 19.8 },
    ],
    maintenanceHistory: [{ date: "2026-07-25", action: "Penggantian chuck jaw", technician: "Ahmad Fauzi", result: "Selesai" }],
  },
  {
    id: "M06",
    name: "Chemical Surface Treatment 06",
    line: "Line 1",
    type: "Chemical Tank",
    status: "normal",
    healthScore: 89,
    vibration: 0.5,
    temp: 65.0,
    power: 28.0,
    state: "RUNNING",
    downtimeHours: 15,
    cycleTime: 26,
    defectRate: 1.5,
    energyTodayKwh: 195,
    lastMaintenance: "2026-08-02",
    retrofitSensors: ["Temp Sensor", "pH & Chemical Sensor", "K3 Toxic Gas Sensor"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "pH larutan pencuci kimia terkontrol pada 6.8 - 7.2." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "> 120 Hari", recommendedAction: "Pantau pengisian larutan netralisir.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 0.4, temp: 64.0, power: 27.5 },
      { time: "06:00", vibration: 0.5, temp: 65.0, power: 28.0 },
      { time: "12:00", vibration: 0.6, temp: 65.5, power: 28.3 },
      { time: "18:00", vibration: 0.5, temp: 65.0, power: 28.0 },
    ],
    maintenanceHistory: [{ date: "2026-08-02", action: "Kalibrasi elektroda probe pH", technician: "Dewi Lestari", result: "Akurat" }],
  },
  {
    id: "M07",
    name: "High-Speed Conveyor Belt 07",
    line: "Line 1",
    type: "Conveyor",
    status: "normal",
    healthScore: 96,
    vibration: 1.1,
    temp: 34.0,
    power: 8.5,
    state: "RUNNING",
    downtimeHours: 5,
    cycleTime: 21,
    defectRate: 0.5,
    energyTodayKwh: 68,
    lastMaintenance: "2026-08-08",
    retrofitSensors: ["Vibration Sensor", "Power Meter", "Photoelectric Speed Sensor"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Tegangan sabuk konveyor optimal." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "> 200 Hari", recommendedAction: "Pemeriksaan visual rutin sabuk.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 1.0, temp: 33.0, power: 8.3 },
      { time: "06:00", vibration: 1.1, temp: 34.0, power: 8.5 },
      { time: "12:00", vibration: 1.2, temp: 34.5, power: 8.7 },
      { time: "18:00", vibration: 1.1, temp: 34.0, power: 8.5 },
    ],
    maintenanceHistory: [{ date: "2026-08-08", action: "Pemberian gemuk roller", technician: "Budi Santoso", result: "Lancar" }],
  },
  {
    id: "M08",
    name: "Automated Inspection Vision 08",
    line: "Line 1",
    type: "Quality Vision",
    status: "normal",
    healthScore: 98,
    vibration: 0.2,
    temp: 31.0,
    power: 4.2,
    state: "RUNNING",
    downtimeHours: 2,
    cycleTime: 20,
    defectRate: 0.1,
    energyTodayKwh: 34,
    lastMaintenance: "2026-08-10",
    retrofitSensors: ["Industrial Camera AI", "Power Meter", "Lux Sensor"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Pencahayaan ring-light 100% dan lensa bebas debu." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "> 300 Hari", recommendedAction: "Backup model deteksi defek ke Control Tower.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 0.2, temp: 30.5, power: 4.1 },
      { time: "06:00", vibration: 0.2, temp: 31.0, power: 4.2 },
      { time: "12:00", vibration: 0.3, temp: 31.5, power: 4.3 },
      { time: "18:00", vibration: 0.2, temp: 31.0, power: 4.2 },
    ],
    maintenanceHistory: [{ date: "2026-08-10", action: "Pembersihan optik sensor kamera", technician: "Hendra Wijaya", result: "Bersih" }],
  },
  {
    id: "M09",
    name: "Industrial Heat Oven 09",
    line: "Line 1",
    type: "Oven",
    status: "normal",
    healthScore: 82,
    vibration: 0.8,
    temp: 185.0,
    power: 45.0,
    state: "RUNNING",
    downtimeHours: 28,
    cycleTime: 30,
    defectRate: 3.2,
    energyTodayKwh: 340,
    lastMaintenance: "2026-07-20",
    retrofitSensors: ["High-Temp Thermocouple", "Power CT Meter", "Insulation Heat Sensor"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Termokopel bekerja dalam profil pemanasan 180°C - 190°C." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "Mild thermal dispersion", failurePredictionWindow: "75 Hari", recommendedAction: "Inspeksi perapat pintu oven untuk efisiensi energi.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 0.8, temp: 184.0, power: 44.5 },
      { time: "06:00", vibration: 0.8, temp: 185.0, power: 45.0 },
      { time: "12:00", vibration: 0.9, temp: 186.0, power: 45.5 },
      { time: "18:00", vibration: 0.8, temp: 185.0, power: 45.0 },
    ],
    maintenanceHistory: [{ date: "2026-07-20", action: "Inspeksi elemen pemanas nikel", technician: "Ahmad Fauzi", result: "Tahanan elemen stabil" }],
  },
  {
    id: "M10",
    name: "Packaging & Bundling Unit 10",
    line: "Line 1",
    type: "Packaging",
    status: "normal",
    healthScore: 93,
    vibration: 1.4,
    temp: 37.0,
    power: 11.0,
    state: "RUNNING",
    downtimeHours: 10,
    cycleTime: 22,
    defectRate: 1.0,
    energyTodayKwh: 88,
    lastMaintenance: "2026-08-04",
    retrofitSensors: ["Vibration Sensor", "Power Meter", "Barcode Reader"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Pneumatik strapping bergerak presisi." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "> 160 Hari", recommendedAction: "Pengecekan tekanan angin kompresor.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 1.3, temp: 36.5, power: 10.8 },
      { time: "06:00", vibration: 1.4, temp: 37.0, power: 11.0 },
      { time: "12:00", vibration: 1.5, temp: 37.5, power: 11.2 },
      { time: "18:00", vibration: 1.4, temp: 37.0, power: 11.0 },
    ],
    maintenanceHistory: [{ date: "2026-08-04", action: "Pelumasan piston pemotong strapping", technician: "Budi Santoso", result: "Normal" }],
  },

  // Line 2 (10 Machines)
  {
    id: "M11",
    name: "Primary Metal Shearing 11",
    line: "Line 2",
    type: "Shearing",
    status: "normal",
    healthScore: 87,
    vibration: 3.1,
    temp: 51.0,
    power: 25.0,
    state: "RUNNING",
    downtimeHours: 20,
    cycleTime: 23,
    defectRate: 2.4,
    energyTodayKwh: 180,
    lastMaintenance: "2026-07-29",
    retrofitSensors: ["Vibration Sensor", "Temp PT100", "Power Meter"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Torsi hidrolik bilah potong stabil." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "95 Hari", recommendedAction: "Lakukan kalibrasi celah pisau akhir pekan.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 3.0, temp: 50.0, power: 24.5 },
      { time: "06:00", vibration: 3.1, temp: 51.0, power: 25.0 },
      { time: "12:00", vibration: 3.3, temp: 52.0, power: 25.6 },
      { time: "18:00", vibration: 3.1, temp: 51.0, power: 25.0 },
    ],
    maintenanceHistory: [{ date: "2026-07-29", action: "Asah pisau potong baja", technician: "Eko Prasetyo", result: "Tajam dan simetris" }],
  },
  {
    id: "M12",
    name: "Multi-Axis Milling Press 12",
    line: "Line 2",
    type: "Milling",
    status: "normal",
    healthScore: 92,
    vibration: 1.7,
    temp: 44.0,
    power: 21.0,
    state: "RUNNING",
    downtimeHours: 11,
    cycleTime: 22,
    defectRate: 1.1,
    energyTodayKwh: 158,
    lastMaintenance: "2026-08-03",
    retrofitSensors: ["Vibration Sensor", "Temp PT100", "PLC Modbus RS485"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Poros 5-axis bergerak lancar." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "> 140 Hari", recommendedAction: "Pemeriksaan oli gearbox spindle.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 1.6, temp: 43.0, power: 20.6 },
      { time: "06:00", vibration: 1.7, temp: 44.0, power: 21.0 },
      { time: "12:00", vibration: 1.8, temp: 44.8, power: 21.4 },
      { time: "18:00", vibration: 1.7, temp: 44.0, power: 21.0 },
    ],
    maintenanceHistory: [{ date: "2026-08-03", action: "Kalibrasi sensor homing sumbu Z", technician: "Ahmad Fauzi", result: "Presisi < 0.01mm" }],
  },
  {
    id: "M13",
    name: "Secondary Stamping Unit 13",
    line: "Line 2",
    type: "Stamping Press",
    status: "critical",
    healthScore: 38,
    vibration: 8.9,
    temp: 92.1,
    power: 38.5,
    state: "STOP",
    downtimeHours: 58,
    cycleTime: 35,
    defectRate: 8.9,
    energyTodayKwh: 245,
    lastMaintenance: "2026-06-15",
    retrofitSensors: ["Vibration (Piezo 3-Axis)", "High-Temp PT100", "Power Meter", "Safety Interlock"],
    sensorCondition: { vibrationStatus: "critical", tempStatus: "critical", powerStatus: "warning", note: "Bantalan motor utama panas berlebih (92.1°C) dan getaran melampaui batas aman ISO (8.9 mm/s)." },
    aiRiskDetection: {
      riskLevel: "CRITICAL",
      anomalyType: "Kerusakan Kritis Bantalan Poros Utama & Risiko Macet Total (Catastrophic Lockup)",
      failurePredictionWindow: "< 48 Jam jika dipaksakan beroperasi",
      recommendedAction: "HENTIKAN OPERASI SEGERA. Lakukan penggantian bantalan bearing unit M13 dan uji perataan poros sebelum dinyalakan ulang.",
      priority: "URGENT",
    },
    trend24h: [
      { time: "00:00", vibration: 6.2, temp: 78.0, power: 34.0 },
      { time: "06:00", vibration: 7.4, temp: 84.5, power: 36.2 },
      { time: "12:00", vibration: 8.5, temp: 89.8, power: 38.0 },
      { time: "18:00", vibration: 8.9, temp: 92.1, power: 38.5 },
    ],
    maintenanceHistory: [
      { date: "2026-06-15", action: "Pengetatan baut pondasi", technician: "Budi Santoso", result: "Getaran berkurang sesaat" },
      { date: "2026-04-10", action: "Pemeriksaan kumparan motor", technician: "Eko Prasetyo", result: "Panas tinggi dicatat" },
    ],
  },
  {
    id: "M14",
    name: "Coating & Paint Bath 14",
    line: "Line 2",
    type: "Coating",
    status: "normal",
    healthScore: 86,
    vibration: 0.9,
    temp: 58.0,
    power: 29.0,
    state: "RUNNING",
    downtimeHours: 19,
    cycleTime: 27,
    defectRate: 2.7,
    energyTodayKwh: 205,
    lastMaintenance: "2026-07-22",
    retrofitSensors: ["Temp Sensor", "Chemical Concentration Detector", "K3 Exhaust Sensor"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Sirkulasi exhaust uap kimia berfungsi normal." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "100 Hari", recommendedAction: "Inspeksi filter HEPA ruang spray.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 0.9, temp: 57.0, power: 28.5 },
      { time: "06:00", vibration: 0.9, temp: 58.0, power: 29.0 },
      { time: "12:00", vibration: 1.0, temp: 58.5, power: 29.4 },
      { time: "18:00", vibration: 0.9, temp: 58.0, power: 29.0 },
    ],
    maintenanceHistory: [{ date: "2026-07-22", action: "Pembersihan nozzle semprot", technician: "Dewi Lestari", result: "Selesai" }],
  },
  {
    id: "M15",
    name: "Laser Cutting Robot 15",
    line: "Line 2",
    type: "Laser Cut",
    status: "normal",
    healthScore: 95,
    vibration: 0.6,
    temp: 38.0,
    power: 18.0,
    state: "RUNNING",
    downtimeHours: 6,
    cycleTime: 20,
    defectRate: 0.6,
    energyTodayKwh: 135,
    lastMaintenance: "2026-08-07",
    retrofitSensors: ["Power Meter", "Vibration", "Optic Lens Temp Sensor"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Fokus sinar laser stabil 99.8%." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "> 180 Hari", recommendedAction: "Ganti gas nitrogen pelindung saat tangki < 15%.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 0.5, temp: 37.5, power: 17.8 },
      { time: "06:00", vibration: 0.6, temp: 38.0, power: 18.0 },
      { time: "12:00", vibration: 0.6, temp: 38.5, power: 18.2 },
      { time: "18:00", vibration: 0.6, temp: 38.0, power: 18.0 },
    ],
    maintenanceHistory: [{ date: "2026-08-07", action: "Pembersihan lensa pelindung laser", technician: "Hendra Wijaya", result: "Optik bersih" }],
  },
  {
    id: "M16",
    name: "Component Assembly Robot 16",
    line: "Line 2",
    type: "Assembly",
    status: "normal",
    healthScore: 90,
    vibration: 1.3,
    temp: 36.5,
    power: 14.5,
    state: "RUNNING",
    downtimeHours: 14,
    cycleTime: 22,
    defectRate: 1.3,
    energyTodayKwh: 110,
    lastMaintenance: "2026-08-02",
    retrofitSensors: ["Vibration Sensor", "Pneumatic Gripper Pressure", "Power Meter"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Presisi jepit penjepit pneumatik 0.05 mm." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "> 130 Hari", recommendedAction: "Pemeriksaan kabel fleksibel sambungan arm robot.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 1.2, temp: 36.0, power: 14.2 },
      { time: "06:00", vibration: 1.3, temp: 36.5, power: 14.5 },
      { time: "12:00", vibration: 1.4, temp: 37.0, power: 14.8 },
      { time: "18:00", vibration: 1.3, temp: 36.5, power: 14.5 },
    ],
    maintenanceHistory: [{ date: "2026-08-02", action: "Kalibrasi teach pendant robot", technician: "Ahmad Fauzi", result: "Kalibrasi berhasil" }],
  },
  {
    id: "M17",
    name: "Water Cooling Loop Pump 17",
    line: "Line 2",
    type: "Cooling Pump",
    status: "warning",
    healthScore: 71,
    vibration: 4.8,
    temp: 54.0,
    power: 24.5,
    state: "RUNNING",
    downtimeHours: 17,
    cycleTime: 21,
    defectRate: 0.4,
    energyTodayKwh: 185,
    lastMaintenance: "2026-08-06",
    retrofitSensors: ["Flow Sensor", "Vibration Sensor", "Power CT Meter", "Pressure Gauge"],
    sensorCondition: { vibrationStatus: "warning", tempStatus: "normal", powerStatus: "warning", note: "Fluktuasi debit air pendingin terdeteksi (abnormal pressure drop pada Line 02)." },
    aiRiskDetection: {
      riskLevel: "MODERATE",
      anomalyType: "Kavitasi Impeller Pompa & Kebocoran Mikro Sambungan Pipa",
      failurePredictionWindow: "25 Hari sebelum Penurunan Kapasitas Pendinginan",
      recommendedAction: "Inspeksi seal pipa cooling line 02 dan periksa kebersihan filter suction.",
      priority: "MEDIUM",
    },
    trend24h: [
      { time: "00:00", vibration: 3.8, temp: 51.0, power: 22.0 },
      { time: "06:00", vibration: 4.2, temp: 52.5, power: 23.1 },
      { time: "12:00", vibration: 4.6, temp: 53.5, power: 24.0 },
      { time: "18:00", vibration: 4.8, temp: 54.0, power: 24.5 },
    ],
    maintenanceHistory: [{ date: "2026-08-06", action: "Pembersihan strainer inlet", technician: "Eko Prasetyo", result: "Debit membaik" }],
  },
  {
    id: "M18",
    name: "Effluent Water Filter 18",
    line: "Line 2",
    type: "Filter System",
    status: "normal",
    healthScore: 89,
    vibration: 1.0,
    temp: 29.5,
    power: 9.5,
    state: "RUNNING",
    downtimeHours: 12,
    cycleTime: 21,
    defectRate: 0.2,
    energyTodayKwh: 75,
    lastMaintenance: "2026-08-04",
    retrofitSensors: ["Turbidity NTU Sensor", "pH Probe", "Flow Meter"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Tingkat kekeruhan air hasil daur ulang sangat jernih (< 5 NTU, target < 10 NTU)." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "> 160 Hari", recommendedAction: "Lakukan backwash berkala membran filter.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 0.9, temp: 29.0, power: 9.3 },
      { time: "06:00", vibration: 1.0, temp: 29.5, power: 9.5 },
      { time: "12:00", vibration: 1.1, temp: 30.0, power: 9.8 },
      { time: "18:00", vibration: 1.0, temp: 29.5, power: 9.5 },
    ],
    maintenanceHistory: [{ date: "2026-08-04", action: "Siklus otomatis backwash membran", technician: "Dewi Lestari", result: "Diferensial tekanan rendah" }],
  },
  {
    id: "M19",
    name: "B3 Waste Shredder & Compactor 19",
    line: "Line 2",
    type: "Waste Processor",
    status: "normal",
    healthScore: 84,
    vibration: 4.2,
    temp: 55.0,
    power: 23.0,
    state: "RUNNING",
    downtimeHours: 24,
    cycleTime: 28,
    defectRate: 1.8,
    energyTodayKwh: 170,
    lastMaintenance: "2026-07-27",
    retrofitSensors: ["Weight Scale Load Cell", "Power Meter", "Vibration Sensor"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Kepadatan kompaksi limbah B3 sesuai standar manifest ISO 14001." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "80 Hari", recommendedAction: "Pelumasan roda gigi pemadat limbah.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 4.0, temp: 53.0, power: 22.5 },
      { time: "06:00", vibration: 4.1, temp: 54.2, power: 22.8 },
      { time: "12:00", vibration: 4.3, temp: 55.5, power: 23.4 },
      { time: "18:00", vibration: 4.2, temp: 55.0, power: 23.0 },
    ],
    maintenanceHistory: [{ date: "2026-07-27", action: "Inspeksi pisau shredder", technician: "Budi Santoso", result: "Kondisi baik" }],
  },
  {
    id: "M20",
    name: "Final Palletizing Unit 20",
    line: "Line 2",
    type: "Palletizer",
    status: "normal",
    healthScore: 97,
    vibration: 1.1,
    temp: 33.0,
    power: 12.0,
    state: "RUNNING",
    downtimeHours: 4,
    cycleTime: 20,
    defectRate: 0.3,
    energyTodayKwh: 92,
    lastMaintenance: "2026-08-09",
    retrofitSensors: ["Status Sensor", "Power Meter", "Weight Sensor"],
    sensorCondition: { vibrationStatus: "normal", tempStatus: "normal", powerStatus: "normal", note: "Sensor penimbang batch palet akurat dan penumpukan rapi." },
    aiRiskDetection: { riskLevel: "LOW", anomalyType: "None", failurePredictionWindow: "> 220 Hari", recommendedAction: "Pengecekan rutin sensor optik palet.", priority: "LOW" },
    trend24h: [
      { time: "00:00", vibration: 1.0, temp: 32.5, power: 11.8 },
      { time: "06:00", vibration: 1.1, temp: 33.0, power: 12.0 },
      { time: "12:00", vibration: 1.2, temp: 33.5, power: 12.3 },
      { time: "18:00", vibration: 1.1, temp: 33.0, power: 12.0 },
    ],
    maintenanceHistory: [{ date: "2026-08-09", action: "Pelumasan rantai pengangkat", technician: "Hendra Wijaya", result: "Lancar" }],
  },
];

// Initial Circular Resource Loops
export const initialWaterLoop: WaterLoopData = {
  inflowM3Day: 180,
  coolingConsumptionM3Day: 145,
  treatedM3Day: 120,
  recycledM3Day: 115.2, // 64% overall closed-loop rate
  recyclingRatePercent: 64.0,
  waterSavingsRpMonth: 150_000_000, // Rp 150 Juta / bulan
  activeAlerts: [
    {
      id: "WTR-01",
      line: "Line 2 (Cooling Loop M17)",
      severity: "WARNING",
      title: "Penyimpangan Debit Air Sirkulasi (Abnormal Flow Rate)",
      flowRateDiff: "-14.2 L/menit terhadap baseline",
      recommendation: "Periksa sambungan pipa seal Line 02 & bersihkan impeller pompa pendingin M17.",
      timestamp: "2026-09-05 08:30 WIB",
    },
  ],
};

export const initialWasteBatches: WasteBatchRecord[] = [
  {
    batchId: "WB-2026-0814-01",
    source: "Line 1 - Stamping Unit M03",
    productionLine: "Line 1",
    wasteType: "Limbah Oli Hidrolik Terkontaminasi (B3)",
    isB3: true,
    quantityKg: 140,
    pickupDate: "2026-09-08",
    authorizedVendor: "PT Prasadha Pamunah Limbah Industri (PPLI)",
    manifestCode: "KLHK-B3-2026-88391",
    trackingStatus: "CONTAINED",
    esgVerified: true,
  },
  {
    batchId: "WB-2026-0814-02",
    source: "Line 2 - Coating Bath M14",
    productionLine: "Line 2",
    wasteType: "Lumpur Sludge Kimia Fosfat (B3)",
    isB3: true,
    quantityKg: 320,
    pickupDate: "2026-09-07",
    authorizedVendor: "PT Wastec International",
    manifestCode: "KLHK-B3-2026-88392",
    trackingStatus: "GENERATED",
    esgVerified: false,
  },
  {
    batchId: "WB-2026-0813-03",
    source: "Line 2 - Shearing M11 & Lathe M05",
    productionLine: "Line 2",
    wasteType: "Scrap Besi & Baja Bekas (Non-B3 Didaur Ulang)",
    isB3: false,
    quantityKg: 1850,
    pickupDate: "2026-09-04",
    authorizedVendor: "PT Mitra Daur Ulang Nusantara",
    manifestCode: "SCRAP-REC-2026-104",
    trackingStatus: "VERIFIED_TREATED",
    esgVerified: true,
  },
  {
    batchId: "WB-2026-0812-04",
    source: "Line 1 - Packaging Unit M10",
    productionLine: "Line 1",
    wasteType: "Karton & Plastik Wrapping Bersih (Non-B3)",
    isB3: false,
    quantityKg: 420,
    pickupDate: "2026-09-03",
    authorizedVendor: "CV Bumi Lestari Daur Ulang",
    manifestCode: "SCRAP-REC-2026-098",
    trackingStatus: "VERIFIED_TREATED",
    esgVerified: true,
  },
];

export const initialEnergyLoop: EnergyLoopData = {
  currentPowerKw: 382.4,
  dailyConsumptionMwh: 3.42,
  energyIntensityKwhPerUnit: 1.48,
  peakUsageKw: 480.0,
  renewableContributionPercent: 18.5, // Rooftop solar simulation
  idleLossKw: 48.2, // ~12.6% total
  idleLossCostRpPerDay: 1_850_000,
  line1ConsumptionKw: 198.2,
  line2ConsumptionKw: 184.2,
  activeAlerts: [
    {
      id: "NRG-01",
      title: "Konsumsi Energi Di Atas Garis Dasar Saat Idle (Line 2)",
      line: "Line 2 (M13 & M17)",
      severity: "WARNING",
      excessKw: 34.5,
      recommendation: "Unit M13 dalam kondisi henti namun motor auxiliary tetap menarik beban aktif. Terapkan auto-standby cut-off.",
    },
  ],
};

export const initialESGScorecard: ESGScorecard = {
  environment: {
    status: "GREEN",
    carbonFootprintScope1Tons: 8.4,
    carbonFootprintScope2Tons: 31.2,
    groundwaterReductionPercent: 64.0,
    energyIdleReductionPercent: 18.5,
    circularWaterPercent: 64.0,
  },
  social: {
    status: "GREEN",
    reskillingBudgetRpB: 1.6, // 20% of Rp 8.0 B CAPEX (Target >= 15%)
    workforceCertifiedCount: 114,
    workforceTotal: 120,
    layoffRiskPercent: 0.0, // Zero Layoff Just Transition commitment
    safetyIncidentFreeDays: 412,
  },
  governance: {
    status: "GREEN",
    digitalTraceabilityRate: 99.8,
    verifiedGreenBatchesPercent: 94.2,
    auditComplianceScore: 98.5,
    esgEvidenceReadiness: "Audit Ready (ISO 14001, ISO 50001, OHSAS)",
  },
};

// Green Batch Passports (Full Lifecycle Traceability)
export const sampleGreenBatchPassports: GreenBatchPassport[] = [
  {
    batchId: "SMN-2026-00124",
    material: "High-Strength Cold Rolled Steel Coil (Grade CR-02)",
    supplier: "PT Sinar Baja Utama (Tier-1 Green Certified)",
    productionLine: "Line 1",
    machineId: "CNC Stamping Press 01 (M01)",
    energyKwh: 420.5,
    waterLiters: 180,
    wasteKg: 4.2,
    qualityStatus: "PASS",
    esgScore: "A+",
    carbonFootprintKgCO2e: 18.5,
    status: "VERIFIED",
    issuedDate: "2026-09-04 14:30 WIB",
    verifier: "Sistem Audit Digital ESG PT SMN",
    qrHash: "SMN-GB-20260904-A19F88",
    lifecycle: [
      { step: "SUPPLIER", title: "Pemasok Bahan Baku", description: "PT Sinar Baja Utama — Sertifikat ISO 14001 Terverifikasi", timestamp: "2026-09-02 08:00 WIB", parameter: "Grade CR-02 / Lot #9921", verified: true, evidenceCode: "SUPP-DOC-9921" },
      { step: "MATERIAL", title: "Penerimaan & QC Masuk", description: "Inspeksi ketebalan dan spektrometri logam lolos standar", timestamp: "2026-09-02 13:45 WIB", parameter: "Ketebalan: 2.00 ± 0.01 mm", verified: true, evidenceCode: "QC-IN-0412" },
      { step: "PRODUCTION", title: "Penjadwalan Lini", description: "Work order dirilis ke Lini 1 untuk 1.200 komponen presisi", timestamp: "2026-09-03 07:30 WIB", parameter: "Target: 1.200 pcs / Shift 1", verified: true, evidenceCode: "WO-2026-0891" },
      { step: "MACHINE", title: "Proses Stamping Mesin", description: "Diproses pada CNC Press M01 dengan sensor getaran normal", timestamp: "2026-09-03 09:15 WIB", parameter: "Vibrasi: 1.8 mm/s, Suhu: 42.5°C", verified: true, evidenceCode: "IOT-M01-TEL-99" },
      { step: "ENERGY", title: "Pencatatan Telemetri Daya", description: "Konsumsi energi real-time terhubung ke Power Meter CT", timestamp: "2026-09-03 11:30 WIB", parameter: "Energi Spesifik: 0.35 kWh/pc", verified: true, evidenceCode: "CT-PWR-M01" },
      { step: "WATER", title: "Sirkulasi Pendinginan Daur Ulang", description: "Air pendingin menggunakan 100% siklus circular loop tertutup", timestamp: "2026-09-03 11:35 WIB", parameter: "Water Reuse: 100%, 0 m³ groundwater", verified: true, evidenceCode: "WTR-LOOP-L1" },
      { step: "WASTE", title: "Minimisasi Scrap & Daur Ulang", description: "Scrap logam dipotong bersih dan disalurkan ke vendor daur ulang", timestamp: "2026-09-03 13:00 WIB", parameter: "Scrap: 4.2 kg (0.35% scrap rate)", verified: true, evidenceCode: "WST-REC-2026" },
      { step: "QUALITY", title: "Inspeksi Kamera Vision AI", description: "Pemeriksaan visual otomatis unit M08 mendeteksi 0 defek mikro", timestamp: "2026-09-03 15:20 WIB", parameter: "Tingkat Defek: 0.00% (Zero Defect)", verified: true, evidenceCode: "VIS-AI-PASS" },
      { step: "ESG", title: "Kalkulasi Jejak Karbon", description: "Intensitas karbon batch dihitung otomatis dari data kWh & limbah", timestamp: "2026-09-04 10:00 WIB", parameter: "Emisi: 18.5 kgCO₂e (32% < Baseline)", verified: true, evidenceCode: "ESG-CALC-A1" },
      { step: "FINAL PRODUCT", title: "Green Batch Passport Issuance", description: "Batch dinyatakan VERIFIED dan siap didistribusikan dengan Digital Product Passport", timestamp: "2026-09-04 14:30 WIB", parameter: "Passport Status: VERIFIED GREEN", verified: true, evidenceCode: "PASSPORT-SMN-00124" },
    ],
  },
  {
    batchId: "SMN-2026-00125",
    material: "Aluminium Alloy Sheet 6061-T6",
    supplier: "PT Alumindo Presisi Prima",
    productionLine: "Line 2",
    machineId: "Laser Cutting Robot 15 (M15)",
    energyKwh: 380.0,
    waterLiters: 120,
    wasteKg: 2.8,
    qualityStatus: "PASS",
    esgScore: "A",
    carbonFootprintKgCO2e: 14.2,
    status: "VERIFIED",
    issuedDate: "2026-09-04 17:00 WIB",
    verifier: "Sistem Audit Digital ESG PT SMN",
    qrHash: "SMN-GB-20260904-B44C12",
    lifecycle: [
      { step: "SUPPLIER", title: "Pemasok Bahan Baku", description: "PT Alumindo Presisi Prima", timestamp: "2026-09-03 08:30 WIB", parameter: "Lot AL-6061-44", verified: true, evidenceCode: "SUPP-DOC-4412" },
      { step: "MATERIAL", title: "Penerimaan & QC Masuk", description: "Uji toleransi presisi lolos", timestamp: "2026-09-03 11:00 WIB", parameter: "Dimensi: 1.50 mm", verified: true, evidenceCode: "QC-IN-0415" },
      { step: "PRODUCTION", title: "Penjadwalan Lini", description: "Work order potong presisi", timestamp: "2026-09-04 08:00 WIB", parameter: "800 bracket unit", verified: true, evidenceCode: "WO-2026-0895" },
      { step: "MACHINE", title: "Laser Cutting Robot", description: "M15 beroperasi optimal", timestamp: "2026-09-04 10:00 WIB", parameter: "Kecepatan potong stabil", verified: true, evidenceCode: "IOT-M15-TEL" },
      { step: "ENERGY", title: "Pencatatan Daya", description: "Efisiensi pemotongan laser terdata", timestamp: "2026-09-04 12:00 WIB", parameter: "0.475 kWh/pc", verified: true, evidenceCode: "CT-PWR-M15" },
      { step: "WATER", title: "Chiller Air Tertutup", description: "Loop sirkulasi chiller bekerja", timestamp: "2026-09-04 12:00 WIB", parameter: "Zero net withdrawal", verified: true, evidenceCode: "WTR-CHL-L2" },
      { step: "WASTE", title: "Scrap Aluminium Murni", description: "Dikumpulkan 100% untuk remelting", timestamp: "2026-09-04 14:00 WIB", parameter: "Scrap: 2.8 kg", verified: true, evidenceCode: "WST-REC-AL" },
      { step: "QUALITY", title: "Inspeksi Laser Profile", description: "Dimensi potong presisi", timestamp: "2026-09-04 15:30 WIB", parameter: "Toleransi ±0.02 mm", verified: true, evidenceCode: "QC-OPT-089" },
      { step: "ESG", title: "Kalkulasi Emisi", description: "Jejak karbon rendah", timestamp: "2026-09-04 16:30 WIB", parameter: "14.2 kgCO₂e", verified: true, evidenceCode: "ESG-CALC-B2" },
      { step: "FINAL PRODUCT", title: "Green Batch Passport Issuance", description: "Green Batch Passport disetujui & diverifikasi", timestamp: "2026-09-04 17:00 WIB", parameter: "STATUS: VERIFIED", verified: true, evidenceCode: "PASSPORT-SMN-00125" },
    ],
  },
  {
    batchId: "SMN-2026-00126",
    material: "Hot Rolled Carbon Steel Plate (SPHC)",
    supplier: "PT Cakra Metalurgi",
    productionLine: "Line 1",
    machineId: "Heavy Hydraulic Press 03 (M03)",
    energyKwh: 680.0,
    waterLiters: 310,
    wasteKg: 18.9,
    qualityStatus: "FLAGGED",
    esgScore: "B",
    carbonFootprintKgCO2e: 34.2,
    status: "PENDING_AUDIT",
    issuedDate: "2026-09-04 11:15 WIB",
    verifier: "Sistem Audit Digital ESG PT SMN",
    qrHash: "SMN-GB-20260904-F99201",
    lifecycle: [
      { step: "SUPPLIER", title: "Pemasok Bahan Baku", description: "PT Cakra Metalurgi", timestamp: "2026-09-01 09:00 WIB", parameter: "Grade SPHC", verified: true, evidenceCode: "SUPP-DOC-1102" },
      { step: "MATERIAL", title: "Penerimaan QC", description: "Kadar permukaan normal", timestamp: "2026-09-01 14:00 WIB", parameter: "Toleransi lolos", verified: true, evidenceCode: "QC-IN-0401" },
      { step: "PRODUCTION", title: "Penjadwalan Lini", description: "Batch produksi braket tebal", timestamp: "2026-09-03 08:00 WIB", parameter: "600 unit", verified: true, evidenceCode: "WO-2026-0888" },
      { step: "MACHINE", title: "Press Unit M03 Anomali", description: "Sensor getaran M03 terdeteksi tinggi (6.7 mm/s)", timestamp: "2026-09-03 11:00 WIB", parameter: "Peringatan Vibrasi Aktif", verified: false, evidenceCode: "IOT-M03-WARN" },
      { step: "ENERGY", title: "Daya Tinggi Idle", description: "Konsumsi daya berlebih terdeteksi pada motor pompa", timestamp: "2026-09-03 12:00 WIB", parameter: "34.2 kW (Boros)", verified: false, evidenceCode: "CT-PWR-M03" },
      { step: "WATER", title: "Air Pendingin", description: "Air loop normal", timestamp: "2026-09-03 12:00 WIB", parameter: "Normal loop", verified: true, evidenceCode: "WTR-LOOP-L1" },
      { step: "WASTE", title: "Scrap Berlebih", description: "Scrap mencapai 18.9 kg karena getaran mesin", timestamp: "2026-09-03 14:00 WIB", parameter: "Scrap: 18.9 kg", verified: false, evidenceCode: "WST-FLAG-18" },
      { step: "QUALITY", title: "QC Flagger", description: "5.8% unit membutuhkan pengerjaan ulang mikro", timestamp: "2026-09-03 16:00 WIB", parameter: "Perlu Re-inspeksi", verified: false, evidenceCode: "QC-FLAG-03" },
      { step: "ESG", title: "Audit Tertunda", description: "Intensitas karbon melebihi target green threshold", timestamp: "2026-09-04 09:00 WIB", parameter: "34.2 kgCO₂e", verified: false, evidenceCode: "ESG-AUDIT-HOLD" },
      { step: "FINAL PRODUCT", title: "Audit Trail Flagged", description: "Green Passport ditahan hingga teknisi menyelesaikan review investigasi M03", timestamp: "2026-09-04 11:15 WIB", parameter: "STATUS: PENDING AUDIT", verified: false, evidenceCode: "PASSPORT-SMN-HOLD" },
    ],
  },
];

// Workforce: Grow with SMN & Human Readiness Gate
export const initialSkillGapRoles: SkillGapRole[] = [
  {
    id: "SG-01",
    currentRole: "Manual Machine Operator",
    targetRole: "Smart Machine Operator",
    enrolledCount: 36,
    certifiedCount: 32,
    targetCount: 40,
    progressPercent: 80,
    modules: ["Dasar Antarmuka Layar Sentuh HMI", "Interpretasi Sensor IoT & Kode Status Mesin", "Protokol Keselamatan Terintegrasi K3"],
  },
  {
    id: "SG-02",
    currentRole: "Quality Inspector Konvensional",
    targetRole: "Digital Quality & Vision AI Operator",
    enrolledCount: 16,
    certifiedCount: 14,
    targetCount: 18,
    progressPercent: 78,
    modules: ["Kalibrasi Kamera Inspeksi Vision AI", "Logging Green Batch Passport", "Audit Bukti Ketertelusuran Material"],
  },
  {
    id: "SG-03",
    currentRole: "Maintenance Helper Reaktif",
    targetRole: "Predictive Maintenance Technician",
    enrolledCount: 20,
    certifiedCount: 16,
    targetCount: 22,
    progressPercent: 73,
    modules: ["Analisis Spektrum Getaran 3-Axis", "Diagnosa Termografi & Suhu Sensor PT100", "Manajemen Tiket Pemeliharaan Prediktif"],
  },
  {
    id: "SG-04",
    currentRole: "Utility & Boiler Worker",
    targetRole: "Green Operation & Circularity Technician",
    enrolledCount: 14,
    certifiedCount: 12,
    targetCount: 15,
    progressPercent: 80,
    modules: ["Pengoperasian Circular Water Loop (pH & Turbiditas)", "Pemisahan & Penanganan Digital Manifest B3", "Monitoring Efisiensi Energi Idle"],
  },
  {
    id: "SG-05",
    currentRole: "Material & Warehouse Admin",
    targetRole: "Traceability & ESG Data Steward",
    enrolledCount: 12,
    certifiedCount: 10,
    targetCount: 12,
    progressPercent: 83,
    modules: ["Verifikasi QR Batch Lifecycle Rantai Pasok", "Sertifikasi Data Audit Single Source of Truth", "Kalkulasi Emisi Karbon Scope 1 & 2"],
  },
];

export const initialHumanReadinessGates: HumanReadinessGateItem[] = [
  {
    id: "GATE-01",
    technologyName: "Sistem Pemeliharaan Prediktif IoT (Predictive Maintenance)",
    deploymentTarget: "Line 1 & Line 2 (20 Unit Mesin)",
    technicalReadiness: "READY",
    workforceReadiness: "IN_PROGRESS",
    safetyReadiness: "READY",
    overallStatus: "NOT READY FOR FULL GO-LIVE",
    blockerReason: "4 teknisi pemeliharaan pada Lini 2 belum menyelesaikan modul 'Analisis Spektrum Getaran 3-Axis'.",
    recommendedAction: "Tuntaskan pelatihan dan sertifikasi untuk 4 teknisi sebelum aktivasi kontrol otomatis pengereman prediktif.",
    affectedWorkers: 4,
  },
  {
    id: "GATE-02",
    technologyName: "Sistem Daur Ulang Air Tertutup (Circular Water Loop 64%)",
    deploymentTarget: "Area Utilitas & Cooling Tower M17-M18",
    technicalReadiness: "READY",
    workforceReadiness: "READY",
    safetyReadiness: "READY",
    overallStatus: "READY FOR GO-LIVE",
    blockerReason: "Semua operator utilitas telah tersertifikasi protokol pengawasan kimia pH dan turbiditas.",
    recommendedAction: "Lanjutkan operasional penuh closed-loop dan pantau telemetri flow harian.",
    affectedWorkers: 0,
  },
  {
    id: "GATE-03",
    technologyName: "Inspeksi Kualitas Visual Kamera AI (Vision Defect Detection)",
    deploymentTarget: "Lini 1 Akhir (M08)",
    technicalReadiness: "READY",
    workforceReadiness: "IN_PROGRESS",
    safetyReadiness: "READY",
    overallStatus: "NOT READY FOR FULL GO-LIVE",
    blockerReason: "2 operator QC shift malam belum menyelesaikan uji mandiri penandaan anomali digital.",
    recommendedAction: "Jadwalkan mentoring praktikum simulator bagi 2 operator QC pada tanggal 6 September.",
    affectedWorkers: 2,
  },
];

// Initial Alerts Center Data
export const initialAlerts: AlertItem[] = [
  {
    id: "ALT-01",
    category: "Machine",
    severity: "CRITICAL",
    title: "Unit M13: Peningkatan Suhu & Getaran Ekstrem",
    message: "Getaran 8.9 mm/s dan suhu kumparan motor 92.1°C melampaui batas aman. Risiko kerusakan poros fatal.",
    timestamp: "10 menit yang lalu",
    sourceId: "M13",
    actionLabel: "Buka Sense & Predict",
    actionRoute: "/admin/machines",
    isRead: false,
  },
  {
    id: "ALT-02",
    category: "Water",
    severity: "WARNING",
    title: "Kebocoran / Fluktuasi Debit Sirkulasi Air Line 02",
    message: "Debit air pendingin pada pompa M17 drop -14.2 L/menit. Daur ulang air tetap berjalan 64% namun butuh inspeksi seal.",
    timestamp: "25 menit yang lalu",
    sourceId: "M17",
    actionLabel: "Periksa Close The Loop",
    actionRoute: "/admin/esg",
    isRead: false,
  },
  {
    id: "ALT-03",
    category: "Energy",
    severity: "WARNING",
    title: "Beban Idle Energi Berlebih di Line 2",
    message: "Mesin M03 dan M13 dalam status non-produksi menarik daya idle 48.2 kW. Potensi pemborosan Rp1.85jt/hari.",
    timestamp: "45 menit yang lalu",
    sourceId: "M03",
    actionLabel: "Optimasi Daya",
    actionRoute: "/admin/esg",
    isRead: false,
  },
  {
    id: "ALT-04",
    category: "Workforce",
    severity: "WARNING",
    title: "Human Readiness Gate: Predictive Maintenance Tertahan",
    message: "Sistem IoT siap secara teknis, tetapi 4 teknisi Lini 2 belum lulus sertifikasi vibrasi. Go-live otomatis ditunda.",
    timestamp: "1 jam yang lalu",
    sourceId: "GATE-01",
    actionLabel: "Buka Grow with SMN",
    actionRoute: "/admin/workforce",
    isRead: false,
  },
  {
    id: "ALT-05",
    category: "ESG",
    severity: "INFO",
    title: "Batch SMN-2026-00124 Lolos Verifikasi Green Passport",
    message: "Jejak karbon 18.5 kgCO₂e tercatat rapi dengan 0 m³ ekstraksi air tanah. Sertifikat Green Audit A+ diterbitkan.",
    timestamp: "2 jam yang lalu",
    sourceId: "SMN-2026-00124",
    actionLabel: "View Green Passport",
    actionRoute: "/admin/green-batch",
    isRead: false,
  },
  {
    id: "ALT-06",
    category: "Waste",
    severity: "INFO",
    title: "Manifest Limbah B3 Siap Dijemput PPLI",
    message: "Batch WB-2026-0814-01 (140 kg oli hidrolik bekas) telah disegel dan menunggu penjemputan resmi vendor berizin.",
    timestamp: "3 jam yang lalu",
    sourceId: "WB-2026-0814-01",
    actionLabel: "Lacak Limbah",
    actionRoute: "/admin/esg",
    isRead: false,
  },
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

// AI Copilot Knowledge Base & Query Engine
export interface AICopilotResponse {
  insight: string;
  evidence: string;
  recommendation: string;
  actionText: string;
  actionRoute: string;
  actionPayload?: any;
}

export const COPILOT_PRESET_PROMPTS: { question: string; response: AICopilotResponse }[] = [
  {
    question: "Mesin mana saja yang membutuhkan perhatian segera hari ini?",
    response: {
      insight: "Terdapat 2 mesin yang membutuhkan perhatian: Unit M13 (CRITICAL) dan Unit M03 (WARNING).",
      evidence: "Unit M13 mengalami lonjakan getaran 8.9 mm/s dan suhu bearing 92.1°C. Unit M03 menunjukkan degradasi vibrasi bearing 6.7 mm/s dengan downtime 42 jam/bulan.",
      recommendation: "Kunci keamanan (lockout-tagout) segera pada M13 untuk mencegah lockup bearing. Jadwalkan pelumasan ulang dan penggantian bearing M03 pada shift 3 malam ini.",
      actionText: "Buka Fleet Sense & Predict",
      actionRoute: "/admin/machines",
    },
  },
  {
    question: "Mengapa utilisasi Lini 2 terpantau lebih rendah dibanding Lini 1?",
    response: {
      insight: "Utilisasi Lini 2 turun menjadi 68% terutama diakibatkan oleh penghentian darurat unit M13 dan fluktuasi debit air pendingin pada pompa M17.",
      evidence: "Mesin M13 menyumbang downtime 58 jam/bulan (tertinggi di pabrik). Penurunan debit air pompa M17 sebesar -14.2 L/menit juga memicu pembatasan kecepatan pemrosesan.",
      recommendation: "Prioritaskan penggantian bearing M13 dan inspeksi seal pendingin pompa M17 agar Lini 2 dapat kembali ke target kapasitas normal 85%.",
      actionText: "Inspeksi Masalah Lini 2",
      actionRoute: "/admin/machines",
    },
  },
  {
    question: "Mesin mana yang memiliki risiko kerusakan (maintenance risk) tertinggi?",
    response: {
      insight: "Secondary Stamping Unit 13 (M13) memegang skor risiko tertinggi dengan Health Score terendah (38%).",
      evidence: "Prediksi kegagalan sistem memperkirakan kerusakan katastropik dalam waktu kurang dari 48 jam jika dipaksakan berjalan terus tanpa pergantian bearing poros.",
      recommendation: "Buat tiket pemeliharaan darurat prioritas URGENT untuk tim mekanik Lini 2.",
      actionText: "Buat Tiket Perbaikan M13",
      actionRoute: "/admin/machines",
    },
  },
  {
    question: "Di mana pos kehilangan energi (energy losses) terbesar kita?",
    response: {
      insight: "Kehilangan energi terbesar berasal dari konsumsi daya idle (idle state power draw) pada mesin berat saat jeda produksi, mencapai 48.2 kW.",
      evidence: "Mesin M03 dan M13 tetap menyerap daya listrik 34.2 kW dan 38.5 kW meskipun tidak sedang memotong benda kerja. Ini setara dengan pemborosan Rp 1.85 Juta per hari.",
      recommendation: "Terapkan mode auto-standby cut-off 10 menit pada inverter motor hidrolik M03 dan M13.",
      actionText: "Optimasi Loop Energi",
      actionRoute: "/admin/esg",
    },
  },
  {
    question: "Batch limbah mana yang belum diverifikasi atau belum dijemput?",
    response: {
      insight: "Batch WB-2026-0814-02 (Lumpur Sludge Kimia Fosfat 320 kg dari M14) berstatus GENERATED dan belum diverifikasi manifestnya.",
      evidence: "Manifest limbah B3 belum dikonfirmasi oleh vendor berizin (PT Wastec) dan sertifikasi digital ESG masih berstatus PENDING_AUDIT.",
      recommendation: "Lakukan verifikasi timbangan digital dan terbitkan QR Manifest sebelum batas waktu penyimpanan sementara berakhir.",
      actionText: "Verifikasi Manifest Limbah",
      actionRoute: "/admin/esg",
    },
  },
  {
    question: "Karyawan mana yang belum siap untuk penerapan teknologi baru?",
    response: {
      insight: "Human Readiness Gate mendeteksi 4 teknisi pada Lini 2 belum siap untuk modul Sistem Pemeliharaan Prediktif IoT.",
      evidence: "Sistem perangkat keras dan sensor IoT sudah READY, namun pekerja bersangkutan belum lulus uji kompetensi 'Analisis Spektrum Getaran 3-Axis'.",
      recommendation: "Buka sesi kelas kilat reskilling shift sore ini agar target Go-Live penuh dapat disetujui akhir pekan.",
      actionText: "Akselerasi Pelatihan SDM",
      actionRoute: "/admin/workforce",
    },
  },
  {
    question: "Apa komponen yang menyebabkan biaya operasional (OPEX) terbesar?",
    response: {
      insight: "Konsumsi listrik menyerap 60.0% dari total OPEX tahunan PT SMN (Rp 9.6 Miliar dari total Rp 16.0 Miliar).",
      evidence: "Tingginya daya idle state dan mesin beroperasi di luar kurva efisiensi optimal menjadi penyebab utama. Diikuti oleh biaya pengelolaan limbah B3 (Rp 2.4 Miliar).",
      recommendation: "Fokuskan intervensi sensor daya retrofit dan deteksi idle untuk merealisasikan penghematan OPEX 18% (senilai Rp 2.88 Miliar/tahun).",
      actionText: "Buka Model Finansial",
      actionRoute: "/admin/financials",
    },
  },
];

// Unified Central Data Engine Simulator
class DataSimulator {
  private machines: MachineData[] = [...initialMachines];
  private waterLoop: WaterLoopData = { ...initialWaterLoop };
  private wasteBatches: WasteBatchRecord[] = [...initialWasteBatches];
  private energyLoop: EnergyLoopData = { ...initialEnergyLoop };
  private esgScorecard: ESGScorecard = { ...initialESGScorecard };
  private greenBatchPassports: GreenBatchPassport[] = [...sampleGreenBatchPassports];
  private skillGapRoles: SkillGapRole[] = [...initialSkillGapRoles];
  private humanReadinessGates: HumanReadinessGateItem[] = [...initialHumanReadinessGates];
  private alerts: AlertItem[] = [...initialAlerts];
  private maintenanceTasks: MaintenanceTask[] = [
    {
      id: "TSK-01",
      machineId: "M13",
      machineName: "Secondary Stamping Unit 13",
      title: "Ganti Bearing Poros Utama & Uji Presisi Poros",
      priority: "URGENT",
      status: "IN_PROGRESS",
      assignedTo: "Budi Santoso (Lead Mekanik Lini 2)",
      createdAt: "2026-09-05 07:00 WIB",
      recommendedAction: "Hentikan motor utama, buka housing bearing #6214, pasang suku cadang baru berpelumas sintetis.",
    },
    {
      id: "TSK-02",
      machineId: "M03",
      machineName: "Heavy Hydraulic Press 03",
      title: "Inspeksi Bearing Spindle & Pelumasan Ulang",
      priority: "HIGH",
      status: "PENDING",
      assignedTo: "Eko Prasetyo",
      createdAt: "2026-09-05 08:15 WIB",
      recommendedAction: "Periksa celah bantalan vibrasi dan tambahkan oli pelumas hidrolik ISO VG 46.",
    },
  ];
  private currentRole: RoleType = "MANAGEMENT";
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
      // Fluktuasi sensor halus
      const vibDelta = (Math.random() - 0.5) * 0.15;
      const tempDelta = (Math.random() - 0.5) * 0.3;
      const powerDelta = (Math.random() - 0.5) * 0.4;

      let newVib = Math.max(0.2, parseFloat((m.vibration + vibDelta).toFixed(2)));
      let newTemp = Math.max(25, parseFloat((m.temp + tempDelta).toFixed(1)));
      let newPower = Math.max(2, parseFloat((m.power + powerDelta).toFixed(1)));

      // Pertahankan anomali mesin bermasalah
      if (m.id === "M13") {
        newVib = Math.max(8.0, newVib);
        newTemp = Math.max(90.0, newTemp);
      } else if (m.id === "M03") {
        newVib = Math.max(6.0, Math.min(7.5, newVib));
        newTemp = Math.max(75.0, Math.min(82.0, newTemp));
      }

      let newStatus = m.status;
      let newHealth = m.healthScore;

      if (newVib > 7.0 || newTemp > 88) {
        newStatus = "critical";
        newHealth = Math.max(30, newHealth);
      } else if (newVib > 4.5 || newTemp > 68) {
        newStatus = "warning";
        newHealth = Math.max(50, Math.min(75, newHealth));
      } else {
        newStatus = "normal";
        newHealth = Math.min(99, Math.max(80, newHealth));
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

    // Fluktuasi daya total
    const totalKw = this.machines.reduce((acc, cur) => acc + cur.power, 0);
    this.energyLoop = {
      ...this.energyLoop,
      currentPowerKw: parseFloat(totalKw.toFixed(1)),
    };

    this.notify();
  }

  // Getters
  public getMachines(): MachineData[] {
    return this.machines;
  }
  public getWaterLoop(): WaterLoopData {
    return this.waterLoop;
  }
  public getWasteBatches(): WasteBatchRecord[] {
    return this.wasteBatches;
  }
  public getEnergyLoop(): EnergyLoopData {
    return this.energyLoop;
  }
  public getESGScorecard(): ESGScorecard {
    return this.esgScorecard;
  }
  public getGreenBatchPassports(): GreenBatchPassport[] {
    return this.greenBatchPassports;
  }
  public getSkillGapRoles(): SkillGapRole[] {
    return this.skillGapRoles;
  }
  public getHumanReadinessGates(): HumanReadinessGateItem[] {
    return this.humanReadinessGates;
  }
  public getAlerts(): AlertItem[] {
    return this.alerts;
  }
  public getMaintenanceTasks(): MaintenanceTask[] {
    return this.maintenanceTasks;
  }
  public getCurrentRole(): RoleType {
    return this.currentRole;
  }

  // Interactive Actions
  public setCurrentRole(role: RoleType) {
    this.currentRole = role;
    this.notify();
  }

  public createMaintenanceTask(machineId: string, title?: string, recommendedAction?: string): MaintenanceTask {
    const target = this.machines.find((m) => m.id === machineId);
    const newTask: MaintenanceTask = {
      id: `TSK-0${this.maintenanceTasks.length + 1}`,
      machineId: machineId,
      machineName: target ? target.name : `Machine ${machineId}`,
      title: title || `Inspeksi Prediktif Segera - ${target?.name || machineId}`,
      priority: target?.status === "critical" ? "URGENT" : "HIGH",
      status: "PENDING",
      assignedTo: "Tim Maintenance Bertugas",
      createdAt: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB Hari Ini",
      recommendedAction: recommendedAction || target?.aiRiskDetection.recommendedAction || "Lakukan inspeksi komponen sensor dan bearing.",
    };
    this.maintenanceTasks = [newTask, ...this.maintenanceTasks];

    // Buat alert terkait
    this.alerts = [
      {
        id: `ALT-GEN-${Date.now()}`,
        category: "Machine",
        severity: "INFO",
        title: `Tiket Perbaikan Dibuat: ${newTask.id}`,
        message: `${newTask.title} untuk unit ${target?.name || machineId} telah diteruskan ke teknisi.`,
        timestamp: "Baru saja",
        sourceId: machineId,
        actionLabel: "Lihat Mesin",
        actionRoute: "/admin/machines",
        isRead: false,
      },
      ...this.alerts,
    ];

    this.notify();
    return newTask;
  }

  public markAlertReviewed(alertId: string) {
    this.alerts = this.alerts.map((a) => (a.id === alertId ? { ...a, isRead: true } : a));
    this.notify();
  }

  public enrollWorkerTraining(gateId: string) {
    this.humanReadinessGates = this.humanReadinessGates.map((g) => {
      if (g.id === gateId) {
        return {
          ...g,
          workforceReadiness: "READY",
          overallStatus: "READY FOR GO-LIVE",
          blockerReason: "Semua pekerja telah menuntaskan pelatihan kilat reskilling.",
          recommendedAction: "Otorisasi aktivasi sistem pemeliharaan prediktif otomatis.",
          affectedWorkers: 0,
        };
      }
      return g;
    });

    // Update alert
    this.alerts = [
      {
        id: `ALT-WORKFORCE-${Date.now()}`,
        category: "Workforce",
        severity: "INFO",
        title: "Human Readiness Gate Disetujui: Ready for Go-Live",
        message: "Seluruh pekerja telah tersertifikasi modul prediktif. Sistem siap diaktifkan penuh.",
        timestamp: "Baru saja",
        sourceId: gateId,
        actionLabel: "Lihat Kesiapan SDM",
        actionRoute: "/admin/workforce",
        isRead: false,
      },
      ...this.alerts,
    ];

    this.notify();
  }

  public verifyWasteBatch(batchId: string) {
    this.wasteBatches = this.wasteBatches.map((w) => {
      if (w.batchId === batchId) {
        return {
          ...w,
          trackingStatus: "VERIFIED_TREATED",
          esgVerified: true,
        };
      }
      return w;
    });
    this.notify();
  }

  public triggerAndonCall(
    line: string,
    assistanceType: string,
    urgency: "NORMAL" | "WARNING" | "CRITICAL",
    notes?: string
  ) {
    const alertId = `ALT-ANDON-${Date.now()}`;
    const newAlert: AlertItem = {
      id: alertId,
      category: "Machine",
      severity: urgency === "CRITICAL" ? "CRITICAL" : urgency === "WARNING" ? "WARNING" : "INFO",
      title: `Panggilan Andon: ${assistanceType}`,
      message: `${line} — ${notes || "Operator lini membutuhkan intervensi personil di area kerja."}`,
      timestamp: "Baru saja",
      sourceId: line,
      actionLabel: "Buka Telemetri Lini",
      actionRoute: `/admin/machines?line=${encodeURIComponent(line)}`,
      isRead: false,
    };
    this.alerts = [newAlert, ...this.alerts];
    this.notify();
    return newAlert;
  }

  public queryCopilot(question: string): AICopilotResponse {
    const found = COPILOT_PRESET_PROMPTS.find((p) => p.question.toLowerCase().includes(question.toLowerCase()) || question.toLowerCase().includes(p.question.toLowerCase().slice(0, 15)));
    if (found) return found.response;

    // Dynamic fallback response
    return {
      insight: `Analisis cerdas SMN Control Tower untuk pertanyaan: "${question}".`,
      evidence: "Berdasarkan integrasi 20 sensor mesin, loop daur ulang air 64%, dan data beban daya aktif.",
      recommendation: "Lakukan sinkronisasi telemetri ke modul terkait dan periksa status anomali pada dasbor.",
      actionText: "Buka SMN Control Tower",
      actionRoute: "/admin/dashboard",
    };
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
