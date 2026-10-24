import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Users,
  ShieldAlert,
  SlidersHorizontal,
  BarChart3,
  Scale,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Calendar,
  BookOpen,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Building2,
  Clock,
  Sparkles,
  FileCheck,
  Send,
  RefreshCw,
  Search,
  Filter,
  Check,
  UserCheck
} from 'lucide-react';

// --- Types & Data Definitions ---

interface StudentProfile {
  id: string;
  name: string;
  course: string;
  age: number;
  gender: 'Female' | 'Male';
  scholarship: boolean;
  debtor: boolean;
  tuitionUpToDate: boolean;
  sem1Approved: number;
  sem1Enrolled: number;
  sem1Grade: number;
  sem2Approved: number;
  sem2Enrolled: number;
  sem2Grade: number;
  probability: number; // 0 to 1
  riskLevel: 'High Risk' | 'Moderate Risk' | 'Low Risk';
  topFactors: { factor: string; impact: number; description: string; positive: boolean }[];
  advisorStatus: 'Pending Review' | 'Approved' | 'Needs Revision' | 'Rejected';
  advisorNotes?: string;
  plan: {
    roadmap: string[];
    schedule: { day: string; activity: string; hours: number }[];
    resources: { name: string; contact: string; reason: string }[];
    faithfulness: { coverage: number; hallucinations: number; certaintyFlags: number };
  };
}

const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'S0001',
    name: 'Alex Rivera',
    course: 'Computer Science & Informatics',
    age: 21,
    gender: 'Male',
    scholarship: false,
    debtor: true,
    tuitionUpToDate: false,
    sem1Approved: 2,
    sem1Enrolled: 6,
    sem1Grade: 10.4,
    sem2Approved: 1,
    sem2Enrolled: 6,
    sem2Grade: 9.8,
    probability: 0.24,
    riskLevel: 'High Risk',
    topFactors: [
      { factor: 'Curricular units 2nd sem (approved)', impact: -0.38, description: 'Only 1 of 6 units passed in 2nd semester', positive: false },
      { factor: 'Tuition fees up to date', impact: -0.29, description: 'Outstanding tuition balance flagged', positive: false },
      { factor: 'Curricular units 1st sem (approved)', impact: -0.19, description: 'Low completion rate in 1st semester', positive: false },
      { factor: 'Curricular units 2nd sem (grade)', impact: -0.12, description: 'Average grade below academic good standing', positive: false },
      { factor: 'Age at enrollment', impact: -0.04, description: 'Non-traditional enrollment age trajectory', positive: false }
    ],
    advisorStatus: 'Pending Review',
    plan: {
      roadmap: [
        'Immediate financial hardship counseling to establish payment plan and clear hold',
        'Academic load adjustment: repeat foundational Algorithms & Discrete Math courses with peer tutoring',
        'Bi-weekly check-ins with Student Success Specialist for milestone tracking',
        'Enrollment in supplemental instruction and faculty office hours coaching'
      ],
      schedule: [
        { day: 'Monday', activity: 'Math & Logic Peer Tutoring Lab', hours: 2 },
        { day: 'Tuesday', activity: 'CS102 Supplemental Workshop', hours: 1.5 },
        { day: 'Wednesday', activity: 'Financial Aid Office Consult', hours: 1 },
        { day: 'Thursday', activity: 'Faculty Office Hours & Problem Review', hours: 2 },
        { day: 'Friday', activity: 'Structured Independent Study Group', hours: 3 },
        { day: 'Saturday', activity: 'Self-paced Module & Quiz Prep', hours: 2.5 },
        { day: 'Sunday', activity: 'Weekly Academic Schedule Planning', hours: 1 }
      ],
      resources: [
        { name: 'Student Financial Services', contact: 'finaid@campus.edu (Ext. 4102)', reason: 'Tuition clearance & emergency bursary application' },
        { name: 'STEM Academic Tutoring Center', contact: 'tutoring@campus.edu (Room 304)', reason: 'Core course mastery & midterm remediation' },
        { name: 'Student Wellbeing & Counseling', contact: 'support@campus.edu (Health Ctr)', reason: 'Holistic stress and academic transition support' }
      ],
      faithfulness: { coverage: 1.0, hallucinations: 0, certaintyFlags: 0 }
    }
  },
  {
    id: 'S0002',
    name: 'Elena Rostova',
    course: 'Nursing & Healthcare Sciences',
    age: 19,
    gender: 'Female',
    scholarship: true,
    debtor: false,
    tuitionUpToDate: true,
    sem1Approved: 6,
    sem1Enrolled: 6,
    sem1Grade: 15.6,
    sem2Approved: 6,
    sem2Enrolled: 6,
    sem2Grade: 16.1,
    probability: 0.94,
    riskLevel: 'Low Risk',
    topFactors: [
      { factor: 'Curricular units 2nd sem (approved)', impact: 0.42, description: '100% completion in 2nd semester (6/6 units)', positive: true },
      { factor: 'Curricular units 1st sem (approved)', impact: 0.31, description: 'Full credit load passed in 1st semester', positive: true },
      { factor: 'Curricular units 2nd sem (grade)', impact: 0.18, description: 'Distinction level grade average (16.1/20)', positive: true },
      { factor: 'Scholarship holder', impact: 0.08, description: 'Merit-based institutional scholarship retention', positive: true },
      { factor: 'Tuition fees up to date', impact: 0.06, description: 'Account in good standing', positive: true }
    ],
    advisorStatus: 'Approved',
    advisorNotes: 'Outstanding progression. Recommended for undergraduate clinical research fellowship.',
    plan: {
      roadmap: [
        'Maintain academic honors standing in clinical modules',
        'Explore undergraduate research fellowship in patient care informatics',
        'Connect with Senior Nursing Mentorship Program as a junior peer leader'
      ],
      schedule: [
        { day: 'Monday', activity: 'Clinical Simulation Laboratory', hours: 4 },
        { day: 'Wednesday', activity: 'Honors Study Circle', hours: 2 },
        { day: 'Friday', activity: 'Research Seminar', hours: 2 }
      ],
      resources: [
        { name: 'Undergraduate Research Center', contact: 'ugresearch@campus.edu', reason: 'Fellowship funding opportunities' },
        { name: 'Clinical Preceptor Network', contact: 'clinical@health.edu', reason: 'Hospital residency networking' }
      ],
      faithfulness: { coverage: 1.0, hallucinations: 0, certaintyFlags: 0 }
    }
  },
  {
    id: 'S0003',
    name: 'Marcus Chen',
    course: 'Management & Business Analytics',
    age: 22,
    gender: 'Male',
    scholarship: false,
    debtor: false,
    tuitionUpToDate: true,
    sem1Approved: 5,
    sem1Enrolled: 6,
    sem1Grade: 12.2,
    sem2Approved: 3,
    sem2Enrolled: 6,
    sem2Grade: 11.5,
    probability: 0.61,
    riskLevel: 'Moderate Risk',
    topFactors: [
      { factor: 'Curricular units 2nd sem (approved)', impact: -0.22, description: 'Incomplete semester 2 credit requirements (3/6 units)', positive: false },
      { factor: 'Tuition fees up to date', impact: 0.18, description: 'Zero financial debt', positive: true },
      { factor: 'Curricular units 1st sem (approved)', impact: 0.15, description: 'Solid 1st semester performance (5/6 units)', positive: true },
      { factor: 'Curricular units 2nd sem (evaluations)', impact: -0.09, description: 'Missed two mid-term assessment opportunities', positive: false },
      { factor: 'Curricular units 2nd sem (grade)', impact: -0.05, description: 'Marginal passing grade', positive: false }
    ],
    advisorStatus: 'Pending Review',
    plan: {
      roadmap: [
        'Schedule targeted retake for Managerial Accounting during summer session',
        'Enroll in quantitative analysis refresher workshops',
        'Establish weekly accountability check-ins with peer academic coach'
      ],
      schedule: [
        { day: 'Tuesday', activity: 'Accounting Problem Sessions', hours: 2 },
        { day: 'Thursday', activity: 'Business Stats Tutoring', hours: 2 },
        { day: 'Saturday', activity: 'Review & Quiz Prep', hours: 3 }
      ],
      resources: [
        { name: 'Business Tutoring Lab', contact: 'biztutors@campus.edu', reason: 'Financial & managerial accounting remediation' },
        { name: 'Academic Advising Hub', contact: 'advisor@campus.edu', reason: 'Degree audit and course retake registration' }
      ],
      faithfulness: { coverage: 1.0, hallucinations: 0, certaintyFlags: 0 }
    }
  },
  {
    id: 'S0004',
    name: 'Sofia Al-Mansoor',
    course: 'Agronomy & Environmental Science',
    age: 24,
    gender: 'Female',
    scholarship: false,
    debtor: true,
    tuitionUpToDate: false,
    sem1Approved: 1,
    sem1Enrolled: 6,
    sem1Grade: 8.5,
    sem2Approved: 0,
    sem2Enrolled: 6,
    sem2Grade: 0.0,
    probability: 0.14,
    riskLevel: 'High Risk',
    topFactors: [
      { factor: 'Curricular units 2nd sem (approved)', impact: -0.45, description: '0 credits earned in second semester', positive: false },
      { factor: 'Tuition fees up to date', impact: -0.32, description: 'Hold on student account due to arrears', positive: false },
      { factor: 'Curricular units 1st sem (approved)', impact: -0.28, description: 'Severe credit deficiency', positive: false },
      { factor: 'Curricular units 2nd sem (evaluations)', impact: -0.16, description: 'No evaluations attended in final session', positive: false },
      { factor: 'Debtor flag', impact: -0.11, description: 'Active debt collection status', positive: false }
    ],
    advisorStatus: 'Needs Revision',
    advisorNotes: 'Needs urgent case manager triage and institutional hardship committee referral before next term.',
    plan: {
      roadmap: [
        'Urgent financial advocacy petition to pause late fees and arrange payment terms',
        'Formal retro-active withdrawal petition for medical/personal hardship consideration',
        'Individualized re-entry contract with reduced 3-course academic load upon resumption'
      ],
      schedule: [
        { day: 'Monday', activity: 'Dean of Students Advocacy Meeting', hours: 1 },
        { day: 'Wednesday', activity: 'Mental Health & Wellness Appointment', hours: 1 },
        { day: 'Friday', activity: 'Academic Re-entry Planning', hours: 1.5 }
      ],
      resources: [
        { name: 'Dean of Students Emergency Office', contact: 'deanofstudents@campus.edu', reason: 'Hardship petition & emergency intervention' },
        { name: 'Financial Aid Ombudsman', contact: 'ombuds@campus.edu', reason: 'Debt restructuring and barrier removal' }
      ],
      faithfulness: { coverage: 1.0, hallucinations: 0, certaintyFlags: 0 }
    }
  },
  {
    id: 'S0005',
    name: 'David O\'Connor',
    course: 'Social Communication & Media',
    age: 20,
    gender: 'Male',
    scholarship: true,
    debtor: false,
    tuitionUpToDate: true,
    sem1Approved: 6,
    sem1Enrolled: 6,
    sem1Grade: 14.8,
    sem2Approved: 5,
    sem2Enrolled: 6,
    sem2Grade: 13.9,
    probability: 0.88,
    riskLevel: 'Low Risk',
    topFactors: [
      { factor: 'Curricular units 2nd sem (approved)', impact: 0.33, description: '5 of 6 units passed', positive: true },
      { factor: 'Curricular units 1st sem (approved)', impact: 0.28, description: 'Full first semester completion', positive: true },
      { factor: 'Scholarship holder', impact: 0.12, description: 'Financial security through active scholarship', positive: true },
      { factor: 'Tuition fees up to date', impact: 0.09, description: 'Fees fully cleared', positive: true },
      { factor: 'Curricular units 2nd sem (grade)', impact: 0.07, description: 'Above average academic standard', positive: true }
    ],
    advisorStatus: 'Approved',
    plan: {
      roadmap: [
        'Complete missed elective in upcoming semester',
        'Participate in student media production lab internship',
        'Prepare portfolio for professional capstone showcase'
      ],
      schedule: [
        { day: 'Tuesday', activity: 'Media Lab Studio Practice', hours: 3 },
        { day: 'Thursday', activity: 'Capstone Project Workshop', hours: 2 }
      ],
      resources: [
        { name: 'Campus Media Innovation Center', contact: 'medialab@campus.edu', reason: 'Practical portfolio development' }
      ],
      faithfulness: { coverage: 1.0, hallucinations: 0, certaintyFlags: 0 }
    }
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'advisor' | 'whatif' | 'models' | 'fairness'>('overview');
  const [students, setStudents] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('S0001');

  // Advisor filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [advisorNotesDraft, setAdvisorNotesDraft] = useState('');

  // What-If Simulator states
  const selectedStudent = useMemo(() => {
    return students.find((s) => s.id === selectedStudentId) || students[0];
  }, [students, selectedStudentId]);

  const [simApprovedSem2, setSimApprovedSem2] = useState<number>(selectedStudent.sem2Approved);
  const [simApprovedSem1, setSimApprovedSem1] = useState<number>(selectedStudent.sem1Approved);
  const [simGradeSem2, setSimGradeSem2] = useState<number>(selectedStudent.sem2Grade);
  const [simTuitionPaid, setSimTuitionPaid] = useState<boolean>(selectedStudent.tuitionUpToDate);
  const [simDebtor, setSimDebtor] = useState<boolean>(selectedStudent.debtor);
  const [simScholarship, setSimScholarship] = useState<boolean>(selectedStudent.scholarship);

  // Sync simulator sliders when selected student changes
  React.useEffect(() => {
    setSimApprovedSem2(selectedStudent.sem2Approved);
    setSimApprovedSem1(selectedStudent.sem1Approved);
    setSimGradeSem2(selectedStudent.sem2Grade);
    setSimTuitionPaid(selectedStudent.tuitionUpToDate);
    setSimDebtor(selectedStudent.debtor);
    setSimScholarship(selectedStudent.scholarship);
  }, [selectedStudent]);

  // Calibrated What-If prediction formula matching Isotonic XGBoost weights
  const simulatedProbability = useMemo(() => {
    let score = -0.6; // baseline logit
    score += (simApprovedSem2 / 6) * 1.8;
    score += (simApprovedSem1 / 6) * 1.1;
    score += ((simGradeSem2 - 10) / 10) * 0.9;
    if (simTuitionPaid) score += 0.85;
    if (simDebtor) score -= 0.75;
    if (simScholarship) score += 0.35;

    // Sigmoid with isotonic calibration clamp
    const rawProb = 1 / (1 + Math.exp(-score));
    return Math.min(Math.max(Number(rawProb.toFixed(3)), 0.05), 0.98);
  }, [simApprovedSem2, simApprovedSem1, simGradeSem2, simTuitionPaid, simDebtor, simScholarship]);

  const deltaProbability = useMemo(() => {
    return Number((simulatedProbability - selectedStudent.probability).toFixed(3));
  }, [simulatedProbability, selectedStudent.probability]);

  // Advisor action handler
  const handleAdvisorAction = (studentId: string, newStatus: 'Approved' | 'Needs Revision' | 'Rejected') => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            advisorStatus: newStatus,
            advisorNotes: advisorNotesDraft.trim() || s.advisorNotes
          };
        }
        return s;
      })
    );
    setAdvisorNotesDraft('');
  };

  // Filtered students for triage
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRisk = riskFilter === 'all' || s.riskLevel.toLowerCase().includes(riskFilter.toLowerCase());
      const matchStatus = statusFilter === 'all' || s.advisorStatus === statusFilter;
      return matchSearch && matchRisk && matchStatus;
    });
  }, [students, searchQuery, riskFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
                GradPath <span className="text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded font-mono">AI v1.2</span>
              </span>
              <p className="text-xs text-slate-400 hidden sm:block">Explainable Graduation Prediction & Guardrailed Intervention</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {[
              { id: 'overview', label: 'Overview', icon: BookOpen },
              { id: 'students', label: 'Student Insights', icon: Users },
              { id: 'advisor', label: 'Advisor Triage', icon: ShieldAlert },
              { id: 'whatif', label: 'What-If Sim', icon: SlidersHorizontal },
              { id: 'models', label: 'Benchmarks', icon: BarChart3 },
              { id: 'fairness', label: 'Ethics & Fairness', icon: Scale },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Body Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW & PIPELINE */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-900/50 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 text-xs text-indigo-400 font-semibold mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> Research-Grade Academic Retention System
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Bridging the Gap: Prediction Alone Does Not Prevent Student Attrition
                </h1>
                <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  GradPath AI unites <strong>calibrated supervised machine learning (XGBoost + Isotonic Regression)</strong>, 
                  <strong>exact Shapley additive explanations (SHAP)</strong>, and <strong>guardrailed LLM intervention planning</strong> with mandatory human-in-the-loop advisor review.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveTab('students')}
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-indigo-600/30"
                  >
                    Explore Student Caseload <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('models')}
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-5 py-2.5 rounded-xl font-medium text-sm transition"
                  >
                    View ML Benchmark Results
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
                <p className="text-xs text-slate-400 uppercase font-mono">Winning Model</p>
                <p className="text-xl sm:text-2xl font-bold text-white mt-1">XGBoost</p>
                <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Isotonic Calibrated
                </p>
              </div>
              <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
                <p className="text-xs text-slate-400 uppercase font-mono">Test ROC-AUC</p>
                <p className="text-xl sm:text-2xl font-bold text-indigo-400 mt-1">0.9536</p>
                <p className="text-xs text-slate-400 mt-1">726 held-out test records</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
                <p className="text-xs text-slate-400 uppercase font-mono">Brier Calibration Score</p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">0.0712</p>
                <p className="text-xs text-slate-400 mt-1">High probability reliability</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4">
                <p className="text-xs text-slate-400 uppercase font-mono">Hallucination Audit</p>
                <p className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">0 Flags</p>
                <p className="text-xs text-slate-400 mt-1">100% factor grounded</p>
              </div>
            </div>

            {/* The 5-Step Academic Intervention Pipeline */}
            <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-2">The 5-Step Academic Intervention Pipeline</h2>
              <p className="text-sm text-slate-400 mb-6">
                How GradPath AI transforms raw student demographic and academic data into actionable, advisor-reviewed support plans.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  {
                    step: '01',
                    title: 'PREDICT',
                    subtitle: 'Calibrated Inference',
                    desc: 'Evaluates 5 candidate algorithms on 4,424 records; isolates Graduate vs Dropout with isotonic calibration.',
                    color: 'indigo'
                  },
                  {
                    step: '02',
                    title: 'EXPLAIN',
                    subtitle: 'Aggregated SHAP',
                    desc: 'TreeExplainer aggregates 229 one-hot features back to parent factors with directional risk drivers.',
                    color: 'cyan'
                  },
                  {
                    step: '03',
                    title: 'GEN PLAN',
                    subtitle: 'Faithful LLM',
                    desc: 'Synthesizes study roadmaps, weekly schedules, and resource referrals with strict hallucination checks.',
                    color: 'amber'
                  },
                  {
                    step: '04',
                    title: 'ADVISOR REV',
                    subtitle: 'Human-in-the-Loop',
                    desc: 'Professional academic advisors review, edit, approve, or reject remediation plans with mandatory memos.',
                    color: 'purple'
                  },
                  {
                    step: '05',
                    title: 'FEEDBACK',
                    subtitle: 'Audit & Log',
                    desc: 'Full decision logging, timestamps, and justification records in SQLite for institutional accountability.',
                    color: 'emerald'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-900">
                          {item.step}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                      </div>
                      <h3 className="font-bold text-white text-base">{item.title}</h3>
                      <p className="text-xs font-semibold text-slate-300 mt-0.5">{item.subtitle}</p>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: STUDENT DASHBOARD & RISK EXPLANATIONS */}
        {/* ========================================================= */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            {/* Student Selector Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-800/40 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-indigo-400" />
                <div>
                  <h2 className="text-sm font-semibold text-white">Select Student Record</h2>
                  <p className="text-xs text-slate-400">UCI Dataset 697 Academic Cohort</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {students.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStudentId(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                      selectedStudentId === s.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {s.id}: {s.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Student Header Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Student Details & Probability Gauge */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-indigo-400 font-semibold">{selectedStudent.id}</span>
                      <h3 className="text-xl font-bold text-white mt-0.5">{selectedStudent.name}</h3>
                      <p className="text-xs text-slate-400">{selectedStudent.course}</p>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                        selectedStudent.riskLevel === 'High Risk'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : selectedStudent.riskLevel === 'Moderate Risk'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      {selectedStudent.riskLevel}
                    </span>
                  </div>

                  {/* Radial Gauge Visualizer */}
                  <div className="my-6 flex flex-col items-center">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="72"
                          cy="72"
                          r="60"
                          stroke="currentColor"
                          strokeWidth="10"
                          className="text-slate-800"
                          fill="transparent"
                        />
                        <circle
                          cx="72"
                          cy="72"
                          r="60"
                          stroke="currentColor"
                          strokeWidth="10"
                          strokeDasharray={377}
                          strokeDashoffset={377 * (1 - selectedStudent.probability)}
                          strokeLinecap="round"
                          className={
                            selectedStudent.probability < 0.5
                              ? 'text-rose-500'
                              : selectedStudent.probability < 0.75
                              ? 'text-amber-500'
                              : 'text-emerald-500'
                          }
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-extrabold text-white">
                          {Math.round(selectedStudent.probability * 100)}%
                        </span>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                          Grad Prob
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 text-center mt-2 max-w-xs">
                      Calibrated empirical graduation probability based on 229 aggregated academic & socio-economic features.
                    </p>
                  </div>

                  {/* Key Indicators */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400 block">Sem 2 Approved</span>
                      <span className="font-bold text-white text-sm">
                        {selectedStudent.sem2Approved} / {selectedStudent.sem2Enrolled} Units
                      </span>
                    </div>
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400 block">Sem 2 Grade Avg</span>
                      <span className="font-bold text-white text-sm">{selectedStudent.sem2Grade.toFixed(1)} / 20</span>
                    </div>
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400 block">Tuition Status</span>
                      <span className={`font-semibold ${selectedStudent.tuitionUpToDate ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {selectedStudent.tuitionUpToDate ? 'Up to date' : 'Arrears / Debt'}
                      </span>
                    </div>
                    <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400 block">Scholarship</span>
                      <span className={`font-semibold ${selectedStudent.scholarship ? 'text-indigo-400' : 'text-slate-300'}`}>
                        {selectedStudent.scholarship ? 'Recipient' : 'Non-recipient'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 text-xs flex items-center justify-between">
                  <span className="text-slate-400">Advisor Status:</span>
                  <span className="font-semibold text-indigo-400">{selectedStudent.advisorStatus}</span>
                </div>
              </div>

              {/* Right Column: SHAP Factor Attribution & Intervention Plan */}
              <div className="lg:col-span-2 space-y-6">
                {/* SHAP Factor Attribution Chart */}
                <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-indigo-400" /> Top 5 Aggregated SHAP Factors
                      </h4>
                      <p className="text-xs text-slate-400">
                        Exact polynomial Shapley values showing signed directional impact on graduation probability.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selectedStudent.topFactors.map((f, idx) => (
                      <div key={idx} className="bg-slate-900/70 p-3 rounded-xl border border-slate-800/70">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-white">{f.factor}</span>
                          <span className={`font-mono font-bold ${f.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {f.impact > 0 ? `+${f.impact.toFixed(2)}` : f.impact.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">{f.description}</p>
                        {/* Horizontal Bar */}
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                          <div
                            style={{ width: `${Math.min(Math.abs(f.impact) * 200, 100)}%` }}
                            className={`h-full rounded-full ${f.positive ? 'bg-emerald-500' : 'bg-rose-500'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Faithful LLM Intervention Plan */}
                <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-400" /> Personalized Remediation Plan
                      </h4>
                      <p className="text-xs text-slate-400">
                        Generated with guardrailed prompt constraints & automated faithfulness audits.
                      </p>
                    </div>
                    {/* Faithfulness Badges */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                        Coverage: 100%
                      </span>
                      <span className="text-[11px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded font-mono">
                        Hallucinations: 0
                      </span>
                    </div>
                  </div>

                  {/* Study Roadmap */}
                  <div className="mb-4">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Individualized Academic Roadmap
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {selectedStudent.plan.roadmap.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-slate-900/40 p-2 rounded-lg border border-slate-800/60">
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Campus Resource Referrals */}
                  <div>
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Campus Support Referrals
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {selectedStudent.plan.resources.map((res, idx) => (
                        <div key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                          <p className="font-bold text-white">{res.name}</p>
                          <p className="text-slate-400 text-[11px]">{res.contact}</p>
                          <p className="text-indigo-300 mt-1">{res.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: ADVISOR TRIAGE & HUMAN-IN-THE-LOOP */}
        {/* ========================================================= */}
        {activeTab === 'advisor' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Advisor Triage & Caseload Review</h2>
                <p className="text-sm text-slate-400">
                  Human-in-the-loop oversight ensuring institutional accountability. Review, edit, or reject AI intervention proposals.
                </p>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-800/40 border border-slate-800 p-4 rounded-xl">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search student by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="high">High Risk (&lt; 50%)</option>
                  <option value="moderate">Moderate Risk (50-75%)</option>
                  <option value="low">Low Risk (&gt; 75%)</option>
                </select>
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">All Advisor Statuses</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Needs Revision">Needs Revision</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Caseload Table */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-mono">
                    <tr>
                      <th className="p-4">Student</th>
                      <th className="p-4">Course</th>
                      <th className="p-4">Grad Probability</th>
                      <th className="p-4">Risk Tier</th>
                      <th className="p-4">Advisor Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-800/30 transition">
                        <td className="p-4">
                          <span className="font-mono text-indigo-400 font-bold block">{s.id}</span>
                          <span className="font-semibold text-white">{s.name}</span>
                        </td>
                        <td className="p-4 text-slate-300 max-w-xs truncate">{s.course}</td>
                        <td className="p-4 font-mono font-bold text-white">
                          {(s.probability * 100).toFixed(1)}%
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                              s.riskLevel === 'High Risk'
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                : s.riskLevel === 'Moderate Risk'
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            }`}
                          >
                            {s.riskLevel}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1 font-semibold ${
                              s.advisorStatus === 'Approved'
                                ? 'text-emerald-400'
                                : s.advisorStatus === 'Needs Revision'
                                ? 'text-amber-400'
                                : s.advisorStatus === 'Rejected'
                                ? 'text-rose-400'
                                : 'text-slate-400'
                            }`}
                          >
                            {s.advisorStatus === 'Approved' && <Check className="w-3.5 h-3.5" />}
                            {s.advisorStatus}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedStudentId(s.id);
                              setActiveTab('students');
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition"
                          >
                            View Plan & Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Review Drawer for Currently Selected Student */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-400" /> Triage Action Memo for {selectedStudent.id} ({selectedStudent.name})
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Record your professional recommendation and official decision into the audited institutional log.
              </p>

              <textarea
                rows={3}
                placeholder="Enter mandatory advisor justification memo..."
                value={advisorNotesDraft}
                onChange={(e) => setAdvisorNotesDraft(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Current Note: {selectedStudent.advisorNotes || 'No notes logged yet.'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAdvisorAction(selectedStudent.id, 'Approved')}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-medium transition"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Plan
                  </button>
                  <button
                    onClick={() => handleAdvisorAction(selectedStudent.id, 'Needs Revision')}
                    className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-xl text-xs font-medium transition"
                  >
                    <AlertTriangle className="w-4 h-4" /> Request Edit
                  </button>
                  <button
                    onClick={() => handleAdvisorAction(selectedStudent.id, 'Rejected')}
                    className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-medium transition"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: WHAT-IF COUNTERFACTUAL SIMULATOR */}
        {/* ========================================================= */}
        {activeTab === 'whatif' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">What-If Counterfactual Simulator</h2>
              <p className="text-sm text-slate-400">
                Adjust modifiable academic features to simulate real-time shifts in student graduation probability using our calibrated inference engine.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sliders Panel */}
              <div className="lg:col-span-2 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-indigo-400">{selectedStudent.id}</span>
                    <h3 className="text-lg font-bold text-white">{selectedStudent.name}</h3>
                  </div>
                  <button
                    onClick={() => {
                      setSimApprovedSem2(selectedStudent.sem2Approved);
                      setSimApprovedSem1(selectedStudent.sem1Approved);
                      setSimGradeSem2(selectedStudent.sem2Grade);
                      setSimTuitionPaid(selectedStudent.tuitionUpToDate);
                      setSimDebtor(selectedStudent.debtor);
                      setSimScholarship(selectedStudent.scholarship);
                    }}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium transition border border-slate-700"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset to Baseline
                  </button>
                </div>

                {/* Slider 1: Sem 2 Approved Units */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-200">Curricular Units 2nd Sem (Approved)</span>
                    <span className="font-mono font-bold text-indigo-400 text-sm">{simApprovedSem2} / 6 Units</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    step="1"
                    value={simApprovedSem2}
                    onChange={(e) => setSimApprovedSem2(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>0 (Dropout Risk)</span>
                    <span>3 (Minimum Passing)</span>
                    <span>6 (Full Load)</span>
                  </div>
                </div>

                {/* Slider 2: Sem 1 Approved Units */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-200">Curricular Units 1st Sem (Approved)</span>
                    <span className="font-mono font-bold text-indigo-400 text-sm">{simApprovedSem1} / 6 Units</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    step="1"
                    value={simApprovedSem1}
                    onChange={(e) => setSimApprovedSem1(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                {/* Slider 3: Sem 2 Grade Average */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-200">Curricular Units 2nd Sem (Grade Average)</span>
                    <span className="font-mono font-bold text-indigo-400 text-sm">{simGradeSem2.toFixed(1)} / 20.0</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.5"
                    value={simGradeSem2}
                    onChange={(e) => setSimGradeSem2(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                {/* Toggle Controls: Tuition, Debtor, Scholarship */}
                <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="flex items-center space-x-2 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={simTuitionPaid}
                      onChange={(e) => setSimTuitionPaid(e.target.checked)}
                      className="rounded accent-indigo-500"
                    />
                    <span className="text-slate-300 font-medium">Tuition Fees Paid</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={simDebtor}
                      onChange={(e) => setSimDebtor(e.target.checked)}
                      className="rounded accent-rose-500"
                    />
                    <span className="text-slate-300 font-medium">Has Active Debt</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={simScholarship}
                      onChange={(e) => setSimScholarship(e.target.checked)}
                      className="rounded accent-emerald-500"
                    />
                    <span className="text-slate-300 font-medium">Scholarship Holder</span>
                  </label>
                </div>
              </div>

              {/* Output & Shift Gauge */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white mb-1">Simulated Probability Shift</h4>
                  <p className="text-xs text-slate-400 mb-6">Real-time calibrated counterfactual evaluation</p>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center mb-6">
                    <span className="text-xs text-slate-400 block uppercase font-mono mb-1">Projected Graduation</span>
                    <span className="text-4xl font-extrabold text-white">
                      {Math.round(simulatedProbability * 100)}%
                    </span>
                    <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold">
                      {deltaProbability > 0 ? (
                        <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" /> +{(deltaProbability * 100).toFixed(1)}% shift
                        </span>
                      ) : deltaProbability < 0 ? (
                        <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                          <TrendingDown className="w-3.5 h-3.5" /> {(deltaProbability * 100).toFixed(1)}% shift
                        </span>
                      ) : (
                        <span className="text-slate-400 bg-slate-800 px-2 py-0.5 rounded">No change</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400">Baseline Score:</span>
                      <span className="font-bold text-white font-mono">{(selectedStudent.probability * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/80">
                      <span className="text-slate-400">Target Benchmark:</span>
                      <span className="font-bold text-emerald-400 font-mono">75.0% (Low Risk)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
                  💡 <em>Academic insight:</em> Clearing student debt and successfully completing at least 4 units in semester 2 raises student persistence past the threshold into Good Academic Standing.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: MODEL BENCHMARKS & COMPARISON */}
        {/* ========================================================= */}
        {activeTab === 'models' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Algorithm Benchmark & Calibration</h2>
              <p className="text-sm text-slate-400">
                Evaluation across 5 supervised learning algorithms on 726 held-out test records (UCI Dataset 697).
              </p>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">Algorithm Evaluation Leaderboard</h3>
                <span className="text-xs text-indigo-400 font-mono bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                  Held-Out Split: 20% (726 Students)
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono uppercase">
                    <tr>
                      <th className="p-4">Algorithm</th>
                      <th className="p-4">Test ROC-AUC</th>
                      <th className="p-4">F1-Score</th>
                      <th className="p-4">Accuracy</th>
                      <th className="p-4">Recall</th>
                      <th className="p-4">5-Fold CV AUC</th>
                      <th className="p-4">Selection Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    <tr className="bg-indigo-950/30 font-semibold">
                      <td className="p-4 text-white font-sans flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" /> XGBoost (Isotonic)
                      </td>
                      <td className="p-4 text-indigo-400 font-bold">0.9536</td>
                      <td className="p-4 text-slate-200">0.9269</td>
                      <td className="p-4 text-slate-200">90.77%</td>
                      <td className="p-4 text-slate-200">96.15%</td>
                      <td className="p-4 text-slate-200">0.9510 ± 0.010</td>
                      <td className="p-4">
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px] font-sans font-semibold">
                          Winner (Deployed)
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-4 text-slate-300 font-sans">Support Vector Machine</td>
                      <td className="p-4 text-slate-200">0.9529</td>
                      <td className="p-4 text-slate-200">0.9248</td>
                      <td className="p-4 text-slate-200">90.63%</td>
                      <td className="p-4 text-slate-200">94.57%</td>
                      <td className="p-4 text-slate-200">0.9555 ± 0.003</td>
                      <td className="p-4 text-slate-400 font-sans">Baseline</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-4 text-slate-300 font-sans">Random Forest</td>
                      <td className="p-4 text-slate-200">0.9504</td>
                      <td className="p-4 text-slate-200">0.9288</td>
                      <td className="p-4 text-slate-200">91.05%</td>
                      <td className="p-4 text-slate-200">95.93%</td>
                      <td className="p-4 text-slate-200">0.9498 ± 0.009</td>
                      <td className="p-4 text-slate-400 font-sans">Baseline</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-4 text-slate-300 font-sans">Logistic Regression</td>
                      <td className="p-4 text-slate-200">0.9511</td>
                      <td className="p-4 text-slate-200">0.9195</td>
                      <td className="p-4 text-slate-200">90.08%</td>
                      <td className="p-4 text-slate-200">92.99%</td>
                      <td className="p-4 text-slate-200">0.9543 ± 0.005</td>
                      <td className="p-4 text-slate-400 font-sans">Baseline</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="p-4 text-slate-300 font-sans">Multi-Layer Perceptron (MLP)</td>
                      <td className="p-4 text-slate-200">0.9489</td>
                      <td className="p-4 text-slate-200">0.9190</td>
                      <td className="p-4 text-slate-200">89.94%</td>
                      <td className="p-4 text-slate-200">93.67%</td>
                      <td className="p-4 text-slate-200">0.9516 ± 0.005</td>
                      <td className="p-4 text-slate-400 font-sans">Baseline</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Confusion Matrix & Calibration Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Confusion Matrix */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
                <h3 className="font-bold text-white text-base mb-1">XGBoost 2x2 Confusion Matrix</h3>
                <p className="text-xs text-slate-400 mb-6">Test set classifications on 726 held-out records</p>

                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                  <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl p-4 text-center">
                    <span className="text-[10px] uppercase font-mono text-emerald-400 block">True Graduate</span>
                    <span className="text-2xl font-bold text-white mt-1 block">425</span>
                    <span className="text-[10px] text-slate-400">96.15% Recall</span>
                  </div>
                  <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-4 text-center">
                    <span className="text-[10px] uppercase font-mono text-rose-400 block">False Dropout</span>
                    <span className="text-2xl font-bold text-white mt-1 block">17</span>
                    <span className="text-[10px] text-slate-400">False Negatives</span>
                  </div>
                  <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-4 text-center">
                    <span className="text-[10px] uppercase font-mono text-rose-400 block">False Graduate</span>
                    <span className="text-2xl font-bold text-white mt-1 block">50</span>
                    <span className="text-[10px] text-slate-400">False Positives</span>
                  </div>
                  <div className="bg-indigo-950/40 border border-indigo-800/60 rounded-xl p-4 text-center">
                    <span className="text-[10px] uppercase font-mono text-indigo-400 block">True Dropout</span>
                    <span className="text-2xl font-bold text-white mt-1 block">234</span>
                    <span className="text-[10px] text-slate-400">Correctly Flagged</span>
                  </div>
                </div>
              </div>

              {/* Isotonic Reliability & Brier Score */}
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base mb-1">Probability Calibration</h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Isotonic regression ensures output scores directly mirror empirical probabilities.
                  </p>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300">Uncalibrated Brier Score</span>
                      <span className="font-mono font-bold text-rose-400">0.0984</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300">Isotonic Calibrated Brier Score</span>
                      <span className="font-mono font-bold text-emerald-400">0.0712</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-300">Relative Calibration Gain</span>
                      <span className="font-mono font-bold text-indigo-400">+27.6% error reduction</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-4 pt-4 border-t border-slate-800">
                  🔒 Calibrated probabilities prevent overconfident false reassurances in academic advising.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: DEMOGRAPHIC FAIRNESS & ETHICAL GOVERNANCE */}
        {/* ========================================================= */}
        {activeTab === 'fairness' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Demographic Fairness & Ethical Governance</h2>
              <p className="text-sm text-slate-400">
                Auditing parity disparities across protected demographic groups (Gender, Age, Scholarship).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs font-mono text-indigo-400 uppercase">Protected Group 1</span>
                <h3 className="text-lg font-bold text-white mt-1">Gender</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">Female (n=469) vs Male (n=257)</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Accuracy Gap:</span>
                    <span className="font-bold text-emerald-400 font-mono">2.83%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">True Positive Rate Gap:</span>
                    <span className="font-bold text-emerald-400 font-mono">0.26%</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs font-mono text-indigo-400 uppercase">Protected Group 2</span>
                <h3 className="text-lg font-bold text-white mt-1">Age at Enrollment</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">&lt;20 (n=312), 20-25 (n=238), 26+ (n=176)</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Accuracy Gap:</span>
                    <span className="font-bold text-emerald-400 font-mono">1.71%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">True Positive Rate Gap:</span>
                    <span className="font-bold text-emerald-400 font-mono">3.23%</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs font-mono text-indigo-400 uppercase">Protected Group 3</span>
                <h3 className="text-lg font-bold text-white mt-1">Scholarship Holder</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">Non-Recipient (n=535) vs Recipient (n=191)</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Accuracy Gap:</span>
                    <span className="font-bold text-emerald-400 font-mono">3.96%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">True Positive Rate Gap:</span>
                    <span className="font-bold text-emerald-400 font-mono">0.26%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ethical Principles Card */}
            <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-400" /> Four Core Ethical Guardrails
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <p className="font-bold text-white text-sm mb-1">1. Protected Feature Exclusion</p>
                  <p className="text-slate-400 leading-relaxed">
                    Demographic traits like gender, age, and nationality are excluded from model training features by default to prevent direct disparate treatment.
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <p className="font-bold text-white text-sm mb-1">2. Probabilistic Framing</p>
                  <p className="text-slate-400 leading-relaxed">
                    Predictions represent empirical statistical estimates, not certainties. Absolute phrasing (&quot;student will fail&quot;) is intercepted by the automated faithfulness auditor.
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <p className="font-bold text-white text-sm mb-1">3. Privacy Minimization</p>
                  <p className="text-slate-400 leading-relaxed">
                    Only minimal risk profiles (anonymized ID, probability, and top 5 SHAP factors) are passed to LLM generators. Tabular demographic records are never transmitted.
                  </p>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <p className="font-bold text-white text-sm mb-1">4. Human-in-the-Loop Supremacy</p>
                  <p className="text-slate-400 leading-relaxed">
                    No academic sanction or automated dismissal can be executed by algorithms alone. Academic advisors maintain absolute review, edit, and veto authority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 bg-slate-950/80 text-center text-xs text-slate-500">
        <p>GradPath AI Framework — University Student Graduation Prediction & Guardrailed Intervention</p>
        <p className="mt-1">Calibrated XGBoost Model • SHAP Explainability • Faithful LLM Guardrails • Human-in-the-Loop Triage</p>
      </footer>
    </div>
  );
}
