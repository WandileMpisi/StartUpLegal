import { Industry } from '../types';

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

export const getIndustryQuestions = (industry: Industry) => {
  switch (industry) {
    case 'Technology':
      return [
        {
          id: 'tech-1',
          question: 'Are you registering data processing activities?',
          industry: 'Technology',
          complianceRequirement: 'Data Processing Records',
          implementationSteps: 'Document all data processing activities',
          documentationRequired: 'Data Processing Register',
          submissionDetails: 'Keep records available for inspection',
          deadlinesRenewals: 'Update continuously',
          lawRequirement: 'POPIA Section 17',
        },
        {
          id: 'tech-2',
          question: 'Have you implemented security measures to protect personal information?',
          industry: 'Technology',
          complianceRequirement: 'Data Security',
          implementationSteps: 'Implement encryption, access controls, etc.',
          documentationRequired: 'Security Policy',
          submissionDetails: 'Not required for submission',
          deadlinesRenewals: 'Review annually',
          lawRequirement: 'POPIA Section 19',
        },
        {
          id: 'tech-3',
          question: 'Do you have a data breach notification procedure?',
          industry: 'Technology',
          complianceRequirement: 'Data Breach Notification',
          implementationSteps: 'Create data breach response plan',
          documentationRequired: 'Data Breach Policy',
          submissionDetails: 'Notify Information Regulator within 72 hours of breach',
          deadlinesRenewals: 'Review annually',
          lawRequirement: 'POPIA Section 22',
        },
      ];
    case 'Financial Services':
      return [
        {
          id: 'fin-1',
          question: 'Have you registered with the Financial Sector Conduct Authority (FSCA)?',
          industry: 'Financial Services',
          complianceRequirement: 'FSCA Registration',
          implementationSteps: 'Complete FSCA registration forms',
          documentationRequired: 'FSCA Registration Certificate',
          submissionDetails: 'Submit to FSCA',
          deadlinesRenewals: 'Renew annually',
          lawRequirement: 'Financial Advisory and Intermediary Services Act (FAIS)',
        },
        {
          id: 'fin-2',
          question: 'Do you have FICA compliance procedures in place?',
          industry: 'Financial Services',
          complianceRequirement: 'FICA Compliance',
          implementationSteps: 'Implement KYC procedures',
          documentationRequired: 'FICA Policy',
          submissionDetails: 'Keep records available for inspection',
          deadlinesRenewals: 'Review annually',
          lawRequirement: 'Financial Intelligence Centre Act (FICA)',
        },
        {
          id: 'fin-3',
          question: 'Have you appointed a compliance officer?',
          industry: 'Financial Services',
          complianceRequirement: 'Compliance Officer',
          implementationSteps: 'Appoint qualified compliance officer',
          documentationRequired: 'Appointment Letter',
          submissionDetails: 'Notify FSCA',
          deadlinesRenewals: 'Update upon change',
          lawRequirement: 'FAIS Act Section 17',
        },
      ];
    default:
      return [
        {
          id: `${industry.toLowerCase().replace(/\s+/g, '-')}-1`,
          question: `Does your ${industry} business handle customer data?`,
          industry: industry,
          complianceRequirement: 'Data Protection',
          implementationSteps: 'Implement data protection measures',
          documentationRequired: 'Data Protection Policy',
          submissionDetails: 'Not required for submission',
          deadlinesRenewals: 'Review annually',
          lawRequirement: 'POPIA',
        },
        {
          id: `${industry.toLowerCase().replace(/\s+/g, '-')}-2`,
          question: `Have you conducted industry-specific risk assessments for your ${industry} business?`,
          industry: industry,
          complianceRequirement: 'Risk Assessment',
          implementationSteps: 'Conduct comprehensive risk assessment',
          documentationRequired: 'Risk Assessment Report',
          submissionDetails: 'Keep records available for inspection',
          deadlinesRenewals: 'Update annually',
          lawRequirement: 'Various',
        },
        {
          id: `${industry.toLowerCase().replace(/\s+/g, '-')}-3`,
          question: `Do you have industry-specific permits or licenses for operating in the ${industry} sector?`,
          industry: industry,
          complianceRequirement: 'Industry Licensing',
          implementationSteps: 'Apply for relevant licenses',
          documentationRequired: 'License Documentation',
          submissionDetails: 'Submit to regulatory bodies',
          deadlinesRenewals: 'Varies by license type',
          lawRequirement: 'Industry-specific regulations',
        },
      ];
  }
};

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