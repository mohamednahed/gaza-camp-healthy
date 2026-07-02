export interface QuizQuestion {
  id: number;
  question: string;
  choices: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Disease {
  id: string;
  name: string;
  scientificName?: string;
  dangerLevel: "critical" | "high" | "moderate";
  transmission: string[];
  symptoms: string[];
  prevention: string;
  description: string;
}

export interface HealthCenter {
  id: string;
  name: string;
  region: string;
  type: "مستشفى" | "مركز صحي" | "عيادة متنقلة" | "نقطة إسعاف";
  phone: string;
  hours: string;
  services: string[];
}

export interface SafetyChecklist {
  id: string;
  title: string;
  description: string;
  category: "طعام" | "نفايات" | "خيمة" | "نظافة شخصية";
  checked: boolean;
}
