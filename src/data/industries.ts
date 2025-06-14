import { Industry } from '../types';
import { supabase } from '../lib/supabase';

export const industries: { value: Industry; label: string }[] = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Financial Services', label: 'Financial Services' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Education', label: 'Education' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Agriculture', label: 'Agriculture' },
  { value: 'Transport & Logistics', label: 'Transport & Logistics' },
  { value: 'Construction', label: 'Construction' },
  { value: 'Hospitality & Tourism', label: 'Hospitality & Tourism' },
  { value: 'Mining', label: 'Mining' },
  { value: 'Professional Services', label: 'Professional Services' },
];

// Fetch questions from database
export const getIndustryQuestions = async (industry: Industry) => {
  try {
    const { data: questions, error } = await supabase
      .from('compliance_questions')
      .select('*')
      .eq('industry', industry)
      .order('question_key');

    if (error) {
      throw error;
    }

    return questions?.map(q => ({
      id: q.question_key,
      question: q.question,
      industry: q.industry,
      complianceRequirement: q.compliance_requirement,
      implementationSteps: q.implementation_steps,
      documentationRequired: q.documentation_required,
      submissionDetails: q.submission_details,
      deadlinesRenewals: q.deadlines_renewals,
      lawRequirement: q.law_requirement,
    })) || [];
  } catch (error) {
    console.error('Error fetching industry questions:', error);
    return [];
  }
};

export const getGeneralQuestions = async () => {
  try {
    const { data: questions, error } = await supabase
      .from('compliance_questions')
      .select('*')
      .is('industry', null)
      .order('question_key');

    if (error) {
      throw error;
    }

    return questions?.map(q => ({
      id: q.question_key,
      question: q.question,
      industry: q.industry,
      complianceRequirement: q.compliance_requirement,
      implementationSteps: q.implementation_steps,
      documentationRequired: q.documentation_required,
      submissionDetails: q.submission_details,
      deadlinesRenewals: q.deadlines_renewals,
      lawRequirement: q.law_requirement,
    })) || [];
  } catch (error) {
    console.error('Error fetching general questions:', error);
    return [];
  }
};

// Keep the static data as fallback
export const generalQuestions = [
  {
    id: 'gen-1',
    question: 'Have you appointed an Information Officer?',
    industry: null,
    complianceRequirement: 'Information Officer Appointment',
    implementationSteps: 'Appoint an Information Officer and register with Information Regulator',
    documentationRequired: 'Information Officer Registration Form',
    submissionDetails: 'Submit to Information Regulator',
    deadlinesRenewals: 'Update upon change of Information Officer',
    lawRequirement: 'POPIA Section 55',
  },
  {
    id: 'gen-2',
    question: 'Have you conducted a personal information assessment?',
    industry: null,
    complianceRequirement: 'Personal Information Impact Assessment',
    implementationSteps: 'Conduct a thorough assessment of personal information processing',
    documentationRequired: 'Impact Assessment Report',
    submissionDetails: 'Keep records available for inspection',
    deadlinesRenewals: 'Review annually',
    lawRequirement: 'POPIA Section 4',
  },
  {
    id: 'gen-3',
    question: 'Do you have a privacy policy?',
    industry: null,
    complianceRequirement: 'Privacy Policy',
    implementationSteps: 'Develop a comprehensive privacy policy',
    documentationRequired: 'Privacy Policy Document',
    submissionDetails: 'Make available to data subjects',
    deadlinesRenewals: 'Update as needed',
    lawRequirement: 'POPIA Section 18',
  },
  {
    id: 'gen-4',
    question: 'Is your business registered with CIPC?',
    industry: null,
    complianceRequirement: 'Business Registration',
    implementationSteps: 'Register business with CIPC',
    documentationRequired: 'CIPC Registration Certificate',
    submissionDetails: 'Not applicable after registration',
    deadlinesRenewals: 'Annual returns',
    lawRequirement: 'Companies Act',
  },
  {
    id: 'gen-5',
    question: 'Are you registered for tax with SARS?',
    industry: null,
    complianceRequirement: 'Tax Registration',
    implementationSteps: 'Register for Income Tax, VAT, PAYE as applicable',
    documentationRequired: 'Tax Registration Documents',
    submissionDetails: 'Submit returns according to SARS schedule',
    deadlinesRenewals: 'Various tax deadlines',
    lawRequirement: 'Income Tax Act, VAT Act',
  },
];