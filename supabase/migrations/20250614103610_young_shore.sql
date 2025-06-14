/*
  # Seed Compliance Questions

  1. General Questions
    - Questions that apply to all businesses
    
  2. Industry-Specific Questions
    - Technology industry questions
    - Financial Services questions
    - Default questions for other industries
*/

-- Insert general compliance questions
INSERT INTO compliance_questions (
  question_key,
  question,
  industry,
  compliance_requirement,
  implementation_steps,
  documentation_required,
  submission_details,
  deadlines_renewals,
  law_requirement
) VALUES
  (
    'gen-1',
    'Have you appointed an Information Officer?',
    NULL,
    'Information Officer Appointment',
    'Appoint an Information Officer and register with Information Regulator',
    'Information Officer Registration Form',
    'Submit to Information Regulator',
    'Update upon change of Information Officer',
    'POPIA Section 55'
  ),
  (
    'gen-2',
    'Have you conducted a personal information assessment?',
    NULL,
    'Personal Information Impact Assessment',
    'Conduct a thorough assessment of personal information processing',
    'Impact Assessment Report',
    'Keep records available for inspection',
    'Review annually',
    'POPIA Section 4'
  ),
  (
    'gen-3',
    'Do you have a privacy policy?',
    NULL,
    'Privacy Policy',
    'Develop a comprehensive privacy policy',
    'Privacy Policy Document',
    'Make available to data subjects',
    'Update as needed',
    'POPIA Section 18'
  ),
  (
    'gen-4',
    'Is your business registered with CIPC?',
    NULL,
    'Business Registration',
    'Register business with CIPC',
    'CIPC Registration Certificate',
    'Not applicable after registration',
    'Annual returns',
    'Companies Act'
  ),
  (
    'gen-5',
    'Are you registered for tax with SARS?',
    NULL,
    'Tax Registration',
    'Register for Income Tax, VAT, PAYE as applicable',
    'Tax Registration Documents',
    'Submit returns according to SARS schedule',
    'Various tax deadlines',
    'Income Tax Act, VAT Act'
  )
ON CONFLICT (question_key) DO NOTHING;

-- Insert Technology industry questions
INSERT INTO compliance_questions (
  question_key,
  question,
  industry,
  compliance_requirement,
  implementation_steps,
  documentation_required,
  submission_details,
  deadlines_renewals,
  law_requirement
) VALUES
  (
    'tech-1',
    'Are you registering data processing activities?',
    'Technology',
    'Data Processing Records',
    'Document all data processing activities',
    'Data Processing Register',
    'Keep records available for inspection',
    'Update continuously',
    'POPIA Section 17'
  ),
  (
    'tech-2',
    'Have you implemented security measures to protect personal information?',
    'Technology',
    'Data Security',
    'Implement encryption, access controls, etc.',
    'Security Policy',
    'Not required for submission',
    'Review annually',
    'POPIA Section 19'
  ),
  (
    'tech-3',
    'Do you have a data breach notification procedure?',
    'Technology',
    'Data Breach Notification',
    'Create data breach response plan',
    'Data Breach Policy',
    'Notify Information Regulator within 72 hours of breach',
    'Review annually',
    'POPIA Section 22'
  )
ON CONFLICT (question_key) DO NOTHING;

-- Insert Financial Services industry questions
INSERT INTO compliance_questions (
  question_key,
  question,
  industry,
  compliance_requirement,
  implementation_steps,
  documentation_required,
  submission_details,
  deadlines_renewals,
  law_requirement
) VALUES
  (
    'fin-1',
    'Have you registered with the Financial Sector Conduct Authority (FSCA)?',
    'Financial Services',
    'FSCA Registration',
    'Complete FSCA registration forms',
    'FSCA Registration Certificate',
    'Submit to FSCA',
    'Renew annually',
    'Financial Advisory and Intermediary Services Act (FAIS)'
  ),
  (
    'fin-2',
    'Do you have FICA compliance procedures in place?',
    'Financial Services',
    'FICA Compliance',
    'Implement KYC procedures',
    'FICA Policy',
    'Keep records available for inspection',
    'Review annually',
    'Financial Intelligence Centre Act (FICA)'
  ),
  (
    'fin-3',
    'Have you appointed a compliance officer?',
    'Financial Services',
    'Compliance Officer',
    'Appoint qualified compliance officer',
    'Appointment Letter',
    'Notify FSCA',
    'Update upon change',
    'FAIS Act Section 17'
  )
ON CONFLICT (question_key) DO NOTHING;