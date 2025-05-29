export interface User {
  id: string;
  fullName: string;
  email: string;
  company?: string;
}

export interface ComplianceQuestion {
  id: string;
  question: string;
  industry: string | null; // null for "All Industries"
  complianceRequirement: string;
  implementationSteps: string;
  documentationRequired: string;
  submissionDetails: string;
  deadlinesRenewals: string;
  lawRequirement: string;
}

export interface ComplianceResponse {
  questionId: string;
  response: 'Yes' | 'No' | 'NotApplicable';
}

export interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  type: 'Required' | 'Recommended' | 'Optional';
  status: 'Completed' | 'Pending';
  industry: string | null;
  documentUrl?: string;
  officialSiteUrl?: string;
}

export interface OnboardingState {
  industry: string;
  generalResponses: ComplianceResponse[];
  industryResponses: ComplianceResponse[];
  currentStep: number;
}

export type Industry = 
  | 'Technology'
  | 'Financial Services'
  | 'Healthcare'
  | 'Education'
  | 'Manufacturing'
  | 'Agriculture'
  | 'Transport & Logistics'
  | 'Construction'
  | 'Hospitality & Tourism'
  | 'Mining'
  | 'Professional Services';

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};