// Detection related types
export interface Detection {
  id: number;
  class: string;
  confidence: number;
  box: BoundingBox;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

// History related types
export interface HistoryItem {
  id: number;
  timestamp: string;
  thumbnail: string;
  detections: number;
  confidence: number;
  source: 'upload' | 'camera';
}

// Statistics and dashboard related types
export interface StatisticsSummary {
  totalDetections: number;
  avgConfidence: number;
  sessions: number;
  detectionsPerSession: number;
}

export interface DamageTypeDistribution {
  type: string;
  count: number;
  percentage: number;
}

export interface RegionalDistribution {
  region: string;
  count: number;
  percentage: number;
}

export interface PerformanceMetrics {
  precision: number;
  recall: number;
  f1Score: number;
  iou: number;
}