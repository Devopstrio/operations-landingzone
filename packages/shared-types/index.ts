export enum IncidentSeverity {
  SEV_1 = "SEV_1", // Critical, business halting
  SEV_2 = "SEV_2", // High, degraded performance
  SEV_3 = "SEV_3", // Medium, partial impact
  SEV_4 = "SEV_4"  // Low, cosmetic or minor
}

export enum IncidentStatus {
  OPEN = "OPEN",
  INVESTIGATING = "INVESTIGATING",
  IDENTIFIED = "IDENTIFIED",
  MONITORING = "MONITORING",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED"
}

export interface OperationsIncident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  primaryService: string;
  commanderId?: string;
  openedAt: string;
  resolvedAt?: string;
  jiraTicketId?: string;
  slackChannelId?: string;
}

export enum RunbookStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  MANUAL_INTERVENTION = "MANUAL_INTERVENTION"
}

export interface RunbookExecution {
  executionId: string;
  runbookId: string;
  incidentId?: string; // If triggered by an incident
  triggeredBy: string; // User ID or "SYSTEM"
  status: RunbookStatus;
  startedAt: string;
  completedAt?: string;
  logs: string[];
}

export interface OperationsKPIs {
  activeIncidents: number;
  mttrMinutes: number;
  mttaMinutes: number;
  automatedRemediationRate: number; // Percentage
  runbooksExecutedToday: number;
}
