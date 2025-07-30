export interface App {
  id: string;
  name: string;
  icon: string;
  isRunning: boolean;
  gestureEnabled: boolean;
  lastUsed?: Date;
  category: 'browser' | 'editor' | 'media' | 'productivity' | 'system' | 'other';
}

export interface GestureConfig {
  sensitivity: number;
  confirmationDelay: number;
  enabledGestures: {
    screenshot: boolean;
    closeTab: boolean;
    previousTab: boolean;
    nextTab: boolean;
  };
}

export interface SystemStatus {
  connected: boolean;
  gestureRecognitionActive: boolean;
  activeApp: string | null;
  lastGestureDetected?: string;
  lastGestureTime?: Date;
}
