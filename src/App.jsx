import { useState, useEffect, useRef } from "react";

// ============================================================
// THEME & DESIGN SYSTEM
// ============================================================
const theme = {
  bg: "#050A14",
  bgCard: "#0A1628",
  bgCardHover: "#0F1E38",
  border: "#1A2E50",
  borderHover: "#2A4E80",
  primary: "#0EA5E9",
  primaryDark: "#0284C7",
  accent: "#10B981",
  accentOrange: "#F59E0B",
  accentRed: "#EF4444",
  accentPurple: "#8B5CF6",
  textPrimary: "#F0F6FF",
  textSecondary: "#94A3B8",
  textMuted: "#4B6080",
};

// ============================================================
// GLOBAL STYLES
// ============================================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: 'Sora', sans-serif;
      background: ${theme.bg};
      color: ${theme.textPrimary};
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${theme.bg}; }
    ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 3px; }

    .mono { font-family: 'JetBrains Mono', monospace; }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 8px rgba(14,165,233,0.3); }
      50% { box-shadow: 0 0 20px rgba(14,165,233,0.6); }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes countUp { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes progressBar {
      from { width: 0%; }
      to { width: var(--target-width); }
    }
    @keyframes ripple {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(4); opacity: 0; }
    }

    .fade-in { animation: fadeIn 0.4s ease forwards; }
    .slide-in { animation: slideIn 0.3s ease forwards; }
    .float-anim { animation: float 3s ease-in-out infinite; }

    .card {
      background: ${theme.bgCard};
      border: 1px solid ${theme.border};
      border-radius: 16px;
      transition: all 0.2s ease;
    }
    .card:hover {
      border-color: ${theme.borderHover};
      background: ${theme.bgCardHover};
    }

    .btn-primary {
      background: linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark});
      color: white;
      border: none;
      border-radius: 10px;
      padding: 10px 20px;
      font-family: 'Sora', sans-serif;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 24px rgba(14,165,233,0.35);
    }
    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .btn-ghost {
      background: transparent;
      color: ${theme.textSecondary};
      border: 1px solid ${theme.border};
      border-radius: 10px;
      padding: 10px 20px;
      font-family: 'Sora', sans-serif;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-ghost:hover {
      border-color: ${theme.primary};
      color: ${theme.primary};
      background: rgba(14,165,233,0.05);
    }

    .input-field {
      background: rgba(10,22,40,0.8);
      border: 1px solid ${theme.border};
      border-radius: 10px;
      color: ${theme.textPrimary};
      padding: 12px 16px;
      font-family: 'Sora', sans-serif;
      font-size: 14px;
      width: 100%;
      transition: all 0.2s;
      outline: none;
    }
    .input-field:focus {
      border-color: ${theme.primary};
      box-shadow: 0 0 0 3px rgba(14,165,233,0.15);
    }
    .input-field::placeholder { color: ${theme.textMuted}; }

    select.input-field option { background: #0A1628; }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .badge-green { background: rgba(16,185,129,0.15); color: #10B981; border: 1px solid rgba(16,185,129,0.3); }
    .badge-red { background: rgba(239,68,68,0.15); color: #EF4444; border: 1px solid rgba(239,68,68,0.3); }
    .badge-yellow { background: rgba(245,158,11,0.15); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3); }
    .badge-blue { background: rgba(14,165,233,0.15); color: #0EA5E9; border: 1px solid rgba(14,165,233,0.3); }
    .badge-purple { background: rgba(139,92,246,0.15); color: #8B5CF6; border: 1px solid rgba(139,92,246,0.3); }

    .loader {
      width: 20px; height: 20px;
      border: 2px solid rgba(14,165,233,0.3);
      border-top-color: ${theme.primary};
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      display: inline-block;
    }

    .grid-bg {
      background-image: 
        linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    .glow-text {
      text-shadow: 0 0 20px rgba(14,165,233,0.5);
    }

    .score-ring {
      transform: rotate(-90deg);
      transform-origin: center;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s;
      color: ${theme.textSecondary};
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
    }
    .nav-item:hover {
      background: rgba(14,165,233,0.08);
      color: ${theme.primary};
    }
    .nav-item.active {
      background: rgba(14,165,233,0.12);
      color: ${theme.primary};
      border: 1px solid rgba(14,165,233,0.2);
    }

    .section-header {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: ${theme.textMuted};
      padding: 12px 14px 6px;
    }

    .progress-bar-bg {
      height: 6px;
      background: rgba(255,255,255,0.08);
      border-radius: 3px;
      overflow: hidden;
    }
    .progress-bar-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 1s ease;
    }

    .typing-cursor::after {
      content: '|';
      animation: blink 1s step-end infinite;
      color: ${theme.primary};
    }

    .table-row {
      display: grid;
      padding: 12px 16px;
      border-bottom: 1px solid ${theme.border};
      transition: background 0.15s;
      align-items: center;
    }
    .table-row:hover { background: rgba(255,255,255,0.02); }
    .table-row:last-child { border-bottom: none; }

    .ai-stream {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      line-height: 1.7;
      color: ${theme.textSecondary};
      white-space: pre-wrap;
    }

    textarea.input-field {
      resize: vertical;
      min-height: 100px;
      line-height: 1.6;
    }

    .tooltip {
      position: relative;
    }
    .tooltip:hover::after {
      content: attr(data-tip);
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      background: #1A2E50;
      color: ${theme.textPrimary};
      font-size: 12px;
      padding: 6px 10px;
      border-radius: 6px;
      white-space: nowrap;
      pointer-events: none;
      z-index: 999;
    }

    .risk-meter { position: relative; }

    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      padding: 14px 20px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: fadeIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
      max-width: 350px;
      backdrop-filter: blur(10px);
    }
    @keyframes fadeOut { to { opacity: 0; transform: translateX(20px); } }
    .notification-success { background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); color: #10B981; }
    .notification-error { background: rgba(239,68,68,0.2); border: 1px solid rgba(239,68,68,0.4); color: #EF4444; }
    .notification-info { background: rgba(14,165,233,0.2); border: 1px solid rgba(14,165,233,0.4); color: #0EA5E9; }

    .stat-card {
      padding: 20px;
      border-radius: 16px;
      background: ${theme.bgCard};
      border: 1px solid ${theme.border};
      position: relative;
      overflow: hidden;
    }
    .stat-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
    }

    .tab {
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      color: ${theme.textSecondary};
      border: 1px solid transparent;
    }
    .tab:hover { color: ${theme.textPrimary}; background: rgba(255,255,255,0.05); }
    .tab.active { background: rgba(14,165,233,0.12); color: ${theme.primary}; border-color: rgba(14,165,233,0.25); }

    .fraud-alert {
      background: rgba(239,68,68,0.08);
      border: 1px solid rgba(239,68,68,0.25);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
      animation: fadeIn 0.3s ease;
    }
    .fraud-clear {
      background: rgba(16,185,129,0.08);
      border: 1px solid rgba(16,185,129,0.25);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 12px;
    }
  `}</style>
);

// ============================================================
// ICONS
// ============================================================
const Icons = {
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  Applications: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  DataIngestion: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  Fraud: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  AIAgent: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      <path d="M3.05 11H5m14 0h1.95M12 3.05V5M12 19v1.95"/>
    </svg>
  ),
  Scoring: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Notes: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  XAI: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  CAM: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Upload: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Bell: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  TrendUp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  TrendDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
      <polyline points="17 18 23 18 23 12"/>
    </svg>
  ),
  Shield: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Refresh: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
};

// ============================================================
// MOCK DATABASE
// ============================================================
const mockDB = {
  applications: [
    {
      id: "APP-2024-001",
      businessName: "Sunrise Textiles Pvt Ltd",
      gstin: "29AABCT1234F1Z5",
      industry: "Manufacturing",
      loanAmount: 2500000,
      status: "Under Review",
      creditScore: 724,
      riskLevel: "Medium",
      submittedDate: "2024-01-15",
      contactPerson: "Rajesh Kumar",
      annualTurnover: 12500000,
      yearsInBusiness: 8,
      employees: 45,
      fraudFlag: false,
    },
    {
      id: "APP-2024-002",
      businessName: "TechSpark Solutions",
      gstin: "27AACTS5678G2Z6",
      industry: "Technology",
      loanAmount: 1800000,
      status: "Approved",
      creditScore: 812,
      riskLevel: "Low",
      submittedDate: "2024-01-12",
      contactPerson: "Priya Sharma",
      annualTurnover: 8200000,
      yearsInBusiness: 5,
      employees: 28,
      fraudFlag: false,
    },
    {
      id: "APP-2024-003",
      businessName: "Metro Food Processors",
      gstin: "07AABCM9012H3Z7",
      industry: "Food & Beverage",
      loanAmount: 3200000,
      status: "Flagged",
      creditScore: 521,
      riskLevel: "High",
      submittedDate: "2024-01-10",
      contactPerson: "Amit Patel",
      annualTurnover: 5600000,
      yearsInBusiness: 3,
      employees: 62,
      fraudFlag: true,
    },
    {
      id: "APP-2024-004",
      businessName: "GreenLeaf Agro",
      gstin: "33AABCG3456I4Z8",
      industry: "Agriculture",
      loanAmount: 900000,
      status: "Approved",
      creditScore: 768,
      riskLevel: "Low",
      submittedDate: "2024-01-08",
      contactPerson: "Kavitha Nair",
      annualTurnover: 3800000,
      yearsInBusiness: 12,
      employees: 15,
      fraudFlag: false,
    },
    {
      id: "APP-2024-005",
      businessName: "Coastal Shipping Co",
      gstin: "32AABCC7890J5Z9",
      industry: "Logistics",
      loanAmount: 4500000,
      status: "Under Review",
      creditScore: 643,
      riskLevel: "Medium",
      submittedDate: "2024-01-05",
      contactPerson: "Mohammed Ali",
      annualTurnover: 18000000,
      yearsInBusiness: 7,
      employees: 120,
      fraudFlag: false,
    },
  ],
  fraudAlerts: [
    { id: "FA-001", appId: "APP-2024-003", type: "GST Mismatch", severity: "High", description: "Reported GST turnover ₹56L vs bank transactions ₹22L — 60% discrepancy", detected: "2024-01-11" },
    { id: "FA-002", appId: "APP-2024-003", type: "Circular Trading", severity: "High", description: "Identified circular vendor transactions among 3 related entities", detected: "2024-01-11" },
    { id: "FA-003", appId: "APP-2024-001", type: "Irregular Filing", severity: "Medium", description: "Delayed GST filings for Q2 and Q3 of FY2023", detected: "2024-01-16" },
  ],
  metrics: {
    totalApplications: 128,
    approvedThisMonth: 34,
    pendingReview: 18,
    fraudDetected: 7,
    avgProcessingTime: "2.4 days",
    totalLoanValue: 45200000,
  },
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function formatCurrency(val) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  return `₹${val.toLocaleString()}`;
}

function getRiskColor(risk) {
  if (risk === "Low") return theme.accent;
  if (risk === "Medium") return theme.accentOrange;
  return theme.accentRed;
}

function getScoreColor(score) {
  if (score >= 750) return theme.accent;
  if (score >= 650) return theme.accentOrange;
  return theme.accentRed;
}

function getStatusBadge(status) {
  const map = {
    "Approved": "badge-green",
    "Under Review": "badge-yellow",
    "Flagged": "badge-red",
    "Rejected": "badge-red",
    "Pending": "badge-blue",
  };
  return map[status] || "badge-blue";
}

// ============================================================
// ANTHROPIC API CALL
// ============================================================
async function callClaude(prompt, systemPrompt = "", onStream = null) {
  const messages = [{ role: "user", content: prompt }];
  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: systemPrompt || "You are CreditLens AI, an expert financial analyst specializing in MSME credit assessment. Be concise, professional, and data-driven.",
    messages,
  };

  if (onStream) {
    body.stream = true;
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter(l => l.startsWith("data: "));
      for (const line of lines) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.type === "content_block_delta" && data.delta?.text) {
            fullText += data.delta.text;
            onStream(fullText);
          }
        } catch {}
      }
    }
    return fullText;
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data.content?.[0]?.text || "Unable to generate response.";
}

// ============================================================
// NOTIFICATION COMPONENT
// ============================================================
function Notification({ message, type = "info", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);
  const icon = type === "success" ? "✓" : type === "error" ? "✗" : "ℹ";
  return (
    <div className={`notification notification-${type}`}>
      <span style={{ fontSize: 18, fontWeight: 700 }}>{icon}</span>
      {message}
    </div>
  );
}

// ============================================================
// SCORE RING COMPONENT
// ============================================================
function ScoreRing({ score, size = 120, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 900) * circumference;
  const color = getScoreColor(score);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} className="score-ring" style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color}
          strokeWidth={strokeWidth} strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dasharray 1s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: size / 4.5, fontWeight: 800, color, fontFamily: "'JetBrains Mono', monospace" }}>{score}</div>
        <div style={{ fontSize: 10, color: theme.textMuted, fontWeight: 600, letterSpacing: 1, marginTop: 2 }}>/ 900</div>
      </div>
    </div>
  );
}

// ============================================================
// MINI CHART
// ============================================================
function MiniBarChart({ data, color = theme.primary, height = 48 }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1, height: `${(v / max) * 100}%`,
          background: `linear-gradient(to top, ${color}88, ${color})`,
          borderRadius: "3px 3px 0 0",
          transition: "height 0.5s ease",
          minHeight: 3,
        }} />
      ))}
    </div>
  );
}

// ============================================================
// PROGRESS BAR
// ============================================================
function ProgressBar({ value, max = 100, color = theme.primary, label, showValue = true }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      {label && (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 13, color: theme.textSecondary }}>{label}</span>
          {showValue && <span style={{ fontSize: 13, fontWeight: 600, color, fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>}
        </div>
      )}
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 8px ${color}55`,
        }} />
      </div>
    </div>
  );
}

// ============================================================
// STAT CARD
// ============================================================
function StatCard({ label, value, sub, icon, color = theme.primary, trend }) {
  return (
    <div className="stat-card" style={{ animation: "countUp 0.4s ease" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}, ${color}44)`, borderRadius: "16px 16px 0 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, letterSpacing: 0.5, marginBottom: 8, textTransform: "uppercase" }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: theme.textPrimary, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 6 }}>{sub}</div>}
          {trend !== undefined && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, fontSize: 12, color: trend >= 0 ? theme.accent : theme.accentRed, fontWeight: 600 }}>
              {trend >= 0 ? <Icons.TrendUp /> : <Icons.TrendDown />} {Math.abs(trend)}% vs last month
            </div>
          )}
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function Dashboard({ apps, onNavigate }) {
  const monthlyData = [28, 34, 41, 38, 52, 45, 58, 63, 57, 71, 68, 76];
  const riskData = [12, 8, 15, 10, 18, 9, 14, 11];

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Credit Operations Dashboard</h1>
        <p style={{ color: theme.textSecondary, fontSize: 14 }}>Real-time overview of loan applications, risk metrics, and fraud alerts</p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Applications" value="128" sub="FY 2024-25" icon={<Icons.Applications />} color={theme.primary} trend={12} />
        <StatCard label="Approved" value="34" sub="This month" icon={<Icons.Check />} color={theme.accent} trend={8} />
        <StatCard label="Pending Review" value="18" sub="Awaiting action" icon={<Icons.Bell />} color={theme.accentOrange} />
        <StatCard label="Fraud Detected" value="7" sub="Active alerts" icon={<Icons.Fraud />} color={theme.accentRed} trend={-15} />
        <StatCard label="Avg Processing" value="2.4d" sub="Time to decision" icon={<Icons.AIAgent />} color={theme.accentPurple} trend={-22} />
        <StatCard label="Loan Portfolio" value="₹4.52Cr" sub="Total sanctioned" icon={<Icons.Scoring />} color={theme.primary} trend={18} />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 20 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>Application Volume</div>
              <div style={{ color: theme.textMuted, fontSize: 12, marginTop: 3 }}>Monthly applications processed</div>
            </div>
            <span className="badge badge-green"><Icons.TrendUp /> +12%</span>
          </div>
          <MiniBarChart data={monthlyData} color={theme.primary} height={100} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map(m => (
              <div key={m} style={{ fontSize: 9, color: theme.textMuted, flex: 1, textAlign: "center" }}>{m}</div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Risk Distribution</div>
          <div style={{ color: theme.textMuted, fontSize: 12, marginBottom: 20 }}>Current portfolio breakdown</div>
          {[
            { label: "Low Risk", value: 58, color: theme.accent },
            { label: "Medium Risk", value: 28, color: theme.accentOrange },
            { label: "High Risk", value: 14, color: theme.accentRed },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 14 }}>
              <ProgressBar label={item.label} value={item.value} color={item.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Applications */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Recent Applications</div>
          <button className="btn-ghost" style={{ fontSize: 12, padding: "6px 14px" }} onClick={() => onNavigate("applications")}>
            View All <Icons.ChevronRight />
          </button>
        </div>
        <div>
          <div className="table-row" style={{ gridTemplateColumns: "2fr 1.2fr 1fr 1fr 1fr 1fr", background: "rgba(255,255,255,0.02)" }}>
            {["Business", "GSTIN", "Loan Amount", "Credit Score", "Risk", "Status"].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, color: theme.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</div>
            ))}
          </div>
          {apps.slice(0, 5).map(app => (
            <div key={app.id} className="table-row" style={{ gridTemplateColumns: "2fr 1.2fr 1fr 1fr 1fr 1fr" }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{app.businessName}</div>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{app.id} · {app.industry}</div>
              </div>
              <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: theme.textSecondary }}>{app.gstin}</div>
              <div style={{ fontWeight: 600, color: theme.primary }}>{formatCurrency(app.loanAmount)}</div>
              <div>
                <span style={{ fontWeight: 700, color: getScoreColor(app.creditScore), fontFamily: "'JetBrains Mono', monospace" }}>{app.creditScore}</span>
              </div>
              <div>
                <span className={`badge badge-${app.riskLevel === "Low" ? "green" : app.riskLevel === "Medium" ? "yellow" : "red"}`}>{app.riskLevel}</span>
              </div>
              <div>
                <span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fraud Alerts */}
      {mockDB.fraudAlerts.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: theme.accentRed }}><Icons.Fraud /></span> Active Fraud Alerts
          </div>
          {mockDB.fraudAlerts.slice(0, 2).map(alert => (
            <div key={alert.id} className="fraud-alert">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 700, color: theme.accentRed, fontSize: 14, marginBottom: 4 }}>{alert.type}</div>
                  <div style={{ fontSize: 13, color: theme.textSecondary }}>{alert.description}</div>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 16 }}>
                  <span className="badge badge-red">{alert.severity}</span>
                  <span style={{ fontSize: 11, color: theme.textMuted }}>{alert.appId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// APPLICATIONS LIST
// ============================================================
function ApplicationsList({ apps, onSelect, onNew }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = apps.filter(a => {
    const matchSearch = a.businessName.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || a.status === filter || a.riskLevel === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Loan Applications</h1>
          <p style={{ color: theme.textSecondary, fontSize: 14 }}>{apps.length} total applications in system</p>
        </div>
        <button className="btn-primary" onClick={onNew}>
          <Icons.Plus /> New Application
        </button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: theme.textMuted }}>
            <Icons.Search />
          </div>
          <input className="input-field" placeholder="Search by business name or ID..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 40 }} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["All", "Under Review", "Approved", "Flagged", "Low", "High"].map(f => (
            <button key={f} className={`tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
        <div className="table-row" style={{ gridTemplateColumns: "2.5fr 1.5fr 1fr 1fr 1fr 1fr 80px", background: "rgba(255,255,255,0.02)" }}>
          {["Business Name", "GSTIN", "Loan Amount", "Credit Score", "Risk Level", "Status", "Action"].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 700, color: theme.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</div>
          ))}
        </div>
        {filtered.map(app => (
          <div key={app.id} className="table-row" style={{ gridTemplateColumns: "2.5fr 1.5fr 1fr 1fr 1fr 1fr 80px", cursor: "pointer" }}
            onClick={() => onSelect(app)}>
            <div>
              <div style={{ fontWeight: 600 }}>{app.businessName}
                {app.fraudFlag && <span style={{ marginLeft: 8, fontSize: 10, background: "rgba(239,68,68,0.15)", color: theme.accentRed, padding: "2px 6px", borderRadius: 4 }}>⚠ FRAUD ALERT</span>}
              </div>
              <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{app.id} · {app.industry} · {app.contactPerson}</div>
            </div>
            <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: theme.textSecondary }}>{app.gstin}</div>
            <div style={{ fontWeight: 600, color: theme.primary }}>{formatCurrency(app.loanAmount)}</div>
            <div>
              <span style={{ fontWeight: 700, color: getScoreColor(app.creditScore), fontFamily: "'JetBrains Mono', monospace", fontSize: 16 }}>{app.creditScore}</span>
            </div>
            <div><span className={`badge badge-${app.riskLevel === "Low" ? "green" : app.riskLevel === "Medium" ? "yellow" : "red"}`}>{app.riskLevel}</span></div>
            <div><span className={`badge ${getStatusBadge(app.status)}`}>{app.status}</span></div>
            <div><button className="btn-ghost" style={{ fontSize: 11, padding: "6px 12px" }}>Review</button></div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: theme.textMuted }}>No applications found</div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// NEW APPLICATION FORM
// ============================================================
function NewApplicationForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    businessName: "", gstin: "", industry: "Manufacturing", loanAmount: "",
    contactPerson: "", annualTurnover: "", yearsInBusiness: "", employees: "",
    bankName: "", purpose: "",
  });
  const [step, setStep] = useState(1);

  const handleChange = k => e => setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = () => {
    const newApp = {
      id: `APP-2024-00${Date.now() % 1000}`,
      ...form,
      loanAmount: parseInt(form.loanAmount) || 0,
      annualTurnover: parseInt(form.annualTurnover) || 0,
      yearsInBusiness: parseInt(form.yearsInBusiness) || 0,
      employees: parseInt(form.employees) || 0,
      status: "Under Review",
      creditScore: Math.floor(Math.random() * 200 + 600),
      riskLevel: "Medium",
      submittedDate: new Date().toISOString().split("T")[0],
      fraudFlag: false,
    };
    onSubmit(newApp);
  };

  const industries = ["Manufacturing", "Technology", "Food & Beverage", "Agriculture", "Logistics", "Retail", "Healthcare", "Construction", "Services"];

  return (
    <div style={{ animation: "fadeIn 0.4s ease", maxWidth: 700, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
        <button className="btn-ghost" style={{ padding: "8px 12px" }} onClick={onCancel}>← Back</button>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>New Loan Application</h1>
          <p style={{ color: theme.textSecondary, fontSize: 13, marginTop: 2 }}>MSME Credit Assessment Form</p>
        </div>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
        {[
          { n: 1, label: "Business Info" },
          { n: 2, label: "Financial Data" },
          { n: 3, label: "Documents" },
        ].map(({ n, label }) => (
          <div key={n} style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: step >= n ? theme.primary : "transparent",
                border: `2px solid ${step >= n ? theme.primary : theme.border}`,
                fontWeight: 700, fontSize: 14, color: step >= n ? "#fff" : theme.textMuted,
                transition: "all 0.3s"
              }}>{step > n ? "✓" : n}</div>
              <div style={{ fontSize: 11, color: step >= n ? theme.primary : theme.textMuted, marginTop: 6, fontWeight: 600 }}>{label}</div>
            </div>
            {n < 3 && <div style={{ flex: 1, height: 2, background: step > n ? theme.primary : theme.border, transition: "all 0.3s", marginBottom: 20 }} />}
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 28 }}>
        {step === 1 && (
          <div style={{ display: "grid", gap: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 4, color: theme.primary }}>Business Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>BUSINESS NAME *</label>
                <input className="input-field" placeholder="e.g. Sunrise Textiles Pvt Ltd" value={form.businessName} onChange={handleChange("businessName")} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>GSTIN *</label>
                <input className="input-field" placeholder="e.g. 29AABCT1234F1Z5" value={form.gstin} onChange={handleChange("gstin")} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>INDUSTRY</label>
                <select className="input-field" value={form.industry} onChange={handleChange("industry")}>
                  {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>CONTACT PERSON *</label>
                <input className="input-field" placeholder="Authorized signatory name" value={form.contactPerson} onChange={handleChange("contactPerson")} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>YEARS IN BUSINESS</label>
                <input className="input-field" type="number" placeholder="e.g. 5" value={form.yearsInBusiness} onChange={handleChange("yearsInBusiness")} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>NO. OF EMPLOYEES</label>
                <input className="input-field" type="number" placeholder="e.g. 45" value={form.employees} onChange={handleChange("employees")} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "grid", gap: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 4, color: theme.primary }}>Financial Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>LOAN AMOUNT (₹) *</label>
                <input className="input-field" type="number" placeholder="e.g. 2500000" value={form.loanAmount} onChange={handleChange("loanAmount")} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>ANNUAL TURNOVER (₹)</label>
                <input className="input-field" type="number" placeholder="e.g. 12500000" value={form.annualTurnover} onChange={handleChange("annualTurnover")} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>BANK NAME</label>
                <input className="input-field" placeholder="e.g. HDFC Bank" value={form.bankName} onChange={handleChange("bankName")} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600, display: "block", marginBottom: 6 }}>LOAN PURPOSE</label>
                <textarea className="input-field" placeholder="Describe the purpose of the loan..." value={form.purpose} onChange={handleChange("purpose")} style={{ minHeight: 80 }} />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "grid", gap: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 4, color: theme.primary }}>Document Upload</h3>
            <p style={{ color: theme.textSecondary, fontSize: 13 }}>Upload required financial documents for automated processing</p>
            {[
              { label: "GST Returns (Last 3 Years)", required: true },
              { label: "Bank Statements (12 Months)", required: true },
              { label: "Audited Financial Statements", required: true },
              { label: "ITR — Last 3 Years", required: false },
              { label: "Business Registration Certificate", required: false },
            ].map(doc => (
              <div key={doc.label} style={{
                border: `1px dashed ${theme.border}`, borderRadius: 10, padding: 16,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                cursor: "pointer", transition: "all 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = theme.primary}
                onMouseLeave={e => e.currentTarget.style.borderColor = theme.border}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ color: theme.primary }}><Icons.Upload /></div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{doc.label}</div>
                    <div style={{ fontSize: 11, color: theme.textMuted }}>PDF, Excel — Max 10MB</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {doc.required && <span className="badge badge-red">Required</span>}
                  <span style={{ fontSize: 12, color: theme.textMuted }}>Click to upload</span>
                </div>
              </div>
            ))}
            <div style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 10, padding: 14, fontSize: 13, color: theme.textSecondary }}>
              💡 Documents will be automatically processed using OCR. Our AI extracts key financial metrics for credit assessment.
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button className="btn-ghost" onClick={() => step > 1 ? setStep(s => s - 1) : onCancel()}>
          {step > 1 ? "← Previous" : "Cancel"}
        </button>
        <div style={{ display: "flex", gap: 10 }}>
          {step < 3 ? (
            <button className="btn-primary" onClick={() => setStep(s => s + 1)}>
              Next Step →
            </button>
          ) : (
            <button className="btn-primary" onClick={handleSubmit}>
              <Icons.Check /> Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DATA INGESTION MODULE
// ============================================================
function DataIngestion({ app }) {
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [aiResponse, setAiResponse] = useState("");

  const processDocuments = async () => {
    setProcessing(true);
    setAiResponse("");
    const mockData = {
      gst: { totalTurnover: app?.annualTurnover || 12500000, filingRate: "85%", quarters: ["Q1: ₹28.5L", "Q2: ₹31.2L", "Q3: ₹29.8L", "Q4: ₹35.0L"] },
      bank: { avgMonthlyBalance: 485000, totalCredits: 10800000, totalDebits: 10200000, bounces: 2 },
      financial: { netProfit: 1250000, debtRatio: 0.42, currentRatio: 1.8, interestCoverage: 3.2 },
    };
    setExtractedData(mockData);

    const prompt = `Analyze these extracted financial documents for ${app?.businessName || "a business"}:
GST Annual Turnover: ₹${((app?.annualTurnover || 12500000) / 100000).toFixed(1)}L, Filing Rate: 85%
Bank: Avg Monthly Balance ₹4.85L, Annual Credits ₹108L, 2 cheque bounces
Financials: Net Profit ₹12.5L, Debt Ratio 0.42, Current Ratio 1.8

Provide a concise 3-point document analysis summary for credit assessment.`;

    await callClaude(prompt, "You are a financial document analyst. Be concise and data-driven.", (text) => setAiResponse(text));
    setProcessing(false);
    setProcessed(true);
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: theme.primary }}><Icons.DataIngestion /></span> Alternative Data Ingestion
        </h2>
        <p style={{ color: theme.textSecondary, fontSize: 13 }}>Process and extract financial data from uploaded documents</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {[
          { name: "GST Returns FY24", size: "2.4 MB", status: "Uploaded", color: theme.accent },
          { name: "Bank Statements", size: "5.1 MB", status: "Uploaded", color: theme.accent },
          { name: "Balance Sheet", size: "1.8 MB", status: "Uploaded", color: theme.accent },
          { name: "ITR FY23-24", size: "3.2 MB", status: "Pending", color: theme.accentOrange },
        ].map(doc => (
          <div key={doc.name} className="card" style={{ padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${doc.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: doc.color, fontSize: 18 }}>📄</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{doc.name}</div>
              <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 2 }}>{doc.size}</div>
            </div>
            <span className={`badge ${doc.status === "Uploaded" ? "badge-green" : "badge-yellow"}`}>{doc.status}</span>
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={processDocuments} disabled={processing} style={{ marginBottom: 20 }}>
        {processing ? <><span className="loader" style={{ width: 16, height: 16 }} /> Processing…</> : <><Icons.Refresh /> Process with AI OCR</>}
      </button>

      {extractedData && (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>GST Data</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: theme.primary, marginBottom: 8 }}>{formatCurrency(extractedData.gst.totalTurnover)}</div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>Filing Rate: {extractedData.gst.filingRate}</div>
              {extractedData.gst.quarters.map(q => <div key={q} style={{ fontSize: 11, color: theme.textSecondary, marginTop: 4 }}>• {q}</div>)}
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Bank Data</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: theme.accent, marginBottom: 8 }}>{formatCurrency(extractedData.bank.avgMonthlyBalance)}</div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>Avg Monthly Balance</div>
              <div style={{ fontSize: 11, color: theme.textSecondary, marginTop: 4 }}>Credits: {formatCurrency(extractedData.bank.totalCredits)}</div>
              <div style={{ fontSize: 11, color: theme.textSecondary, marginTop: 2 }}>Bounces: {extractedData.bank.bounces}</div>
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 11, color: theme.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>Financial Ratios</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: theme.accentPurple, marginBottom: 8 }}>{extractedData.financial.currentRatio}</div>
              <div style={{ fontSize: 12, color: theme.textMuted }}>Current Ratio</div>
              <div style={{ fontSize: 11, color: theme.textSecondary, marginTop: 4 }}>Debt Ratio: {extractedData.financial.debtRatio}</div>
              <div style={{ fontSize: 11, color: theme.textSecondary, marginTop: 2 }}>Interest Coverage: {extractedData.financial.interestCoverage}x</div>
            </div>
          </div>
          {aiResponse && (
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 12, color: theme.primary, fontWeight: 700, marginBottom: 12 }}>🤖 AI Document Analysis</div>
              <div className="ai-stream">{aiResponse}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// FRAUD DETECTION ENGINE
// ============================================================
function FraudDetection({ app }) {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState("");

  const runDetection = async () => {
    setRunning(true);
    setAiAnalysis("");
    await new Promise(r => setTimeout(r, 1500));

    const isFraud = app?.fraudFlag;
    const res = {
      overallRisk: isFraud ? "HIGH" : "LOW",
      checks: [
        { name: "GST vs Bank Turnover Mismatch", passed: !isFraud, severity: "Critical", detail: isFraud ? "GST: ₹56L vs Bank: ₹22L — 60% discrepancy detected" : "GST turnover matches bank credits within 8% variance" },
        { name: "Irregular Tax Filing Pattern", passed: !isFraud, severity: "High", detail: isFraud ? "Missing Q2 & Q3 filings, pattern inconsistent with business size" : "All quarterly filings submitted on time" },
        { name: "Circular Trading Detection", passed: !isFraud, severity: "High", detail: isFraud ? "3 related vendor entities found with circular transactions" : "No circular vendor relationships detected" },
        { name: "Related Party Transactions", passed: true, severity: "Medium", detail: "No undisclosed related party transactions found" },
        { name: "Identity Verification", passed: true, severity: "Critical", detail: "GSTIN and PAN verified with regulatory database" },
        { name: "Blacklist Cross-check", passed: true, severity: "Critical", detail: "Not found in RBI/CIBIL defaulter list" },
      ],
      score: isFraud ? 28 : 91,
    };
    setResults(res);

    const prompt = `Fraud detection results for ${app?.businessName || "business"}:
Overall Risk: ${res.overallRisk}
Fraud Score: ${res.score}/100
Failed checks: ${res.checks.filter(c => !c.passed).map(c => c.name).join(", ") || "None"}

Provide a concise 3-point fraud risk summary and recommended action.`;

    await callClaude(prompt, "You are a financial fraud analyst. Be direct and actionable.", t => setAiAnalysis(t));
    setRunning(false);
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: theme.accentRed }}><Icons.Fraud /></span> Fraud Detection Engine
        </h2>
        <p style={{ color: theme.textSecondary, fontSize: 13 }}>AI-powered anomaly detection across GST, banking, and transaction data</p>
      </div>

      <button className="btn-primary" onClick={runDetection} disabled={running} style={{ marginBottom: 24, background: running ? undefined : "linear-gradient(135deg, #EF4444, #B91C1C)" }}>
        {running ? <><span className="loader" style={{ width: 16, height: 16 }} /> Running Fraud Scan…</> : <><Icons.Shield /> Run Full Fraud Scan</>}
      </button>

      {results && (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
          <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
            <div className="card" style={{ padding: 24, flex: 1, borderColor: results.overallRisk === "HIGH" ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)", background: results.overallRisk === "HIGH" ? "rgba(239,68,68,0.05)" : "rgba(16,185,129,0.05)" }}>
              <div style={{ fontSize: 12, color: theme.textMuted, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Fraud Risk Level</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: results.overallRisk === "HIGH" ? theme.accentRed : theme.accent }}>{results.overallRisk}</div>
            </div>
            <div className="card" style={{ padding: 24, flex: 1 }}>
              <div style={{ fontSize: 12, color: theme.textMuted, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Trust Score</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: getScoreColor(results.score * 9), fontFamily: "'JetBrains Mono', monospace" }}>{results.score}<span style={{ fontSize: 16 }}>/100</span></div>
            </div>
            <div className="card" style={{ padding: 24, flex: 1 }}>
              <div style={{ fontSize: 12, color: theme.textMuted, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Checks Failed</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: theme.accentRed, fontFamily: "'JetBrains Mono', monospace" }}>{results.checks.filter(c => !c.passed).length}<span style={{ fontSize: 16, color: theme.textMuted }}>/{results.checks.length}</span></div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
            {results.checks.map(check => (
              <div key={check.name} className={check.passed ? "fraud-clear" : "fraud-alert"}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: check.passed ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: check.passed ? theme.accent : theme.accentRed, flexShrink: 0 }}>
                    {check.passed ? <Icons.Check /> : <Icons.X />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{check.name}</span>
                      <span className={`badge badge-${check.severity === "Critical" ? "red" : check.severity === "High" ? "yellow" : "blue"}`}>{check.severity}</span>
                    </div>
                    <div style={{ fontSize: 13, color: theme.textSecondary }}>{check.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {aiAnalysis && (
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 12, color: theme.accentRed, fontWeight: 700, marginBottom: 12 }}>🤖 AI Fraud Analysis</div>
              <div className="ai-stream">{aiAnalysis}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// AI RESEARCH AGENT
// ============================================================
function AIResearchAgent({ app }) {
  const [researching, setResearching] = useState(false);
  const [findings, setFindings] = useState("");
  const [query, setQuery] = useState("");
  const [queries, setQueries] = useState([]);

  const defaultQuery = `Research ${app?.businessName || "the business"} (${app?.industry || "Manufacturing"} sector) for:
1. Recent news and regulatory issues
2. Industry risk outlook
3. Litigation or legal alerts
4. Market conditions`;

  const runResearch = async () => {
    const q = query || defaultQuery;
    setResearching(true);
    setFindings("");
    setQueries(prev => [...prev, { q, time: new Date().toLocaleTimeString() }]);

    const prompt = `You are the CreditLens AI Research Agent. Conduct external intelligence gathering for credit assessment:

Business: ${app?.businessName || "MSME Business"}
Industry: ${app?.industry || "Manufacturing"}
GSTIN: ${app?.gstin || "N/A"}
Research Query: ${q}

Provide a structured intelligence report with:
1. Business & Industry Risk Assessment
2. Regulatory & Compliance Status  
3. Market & Competitive Landscape
4. Key Risk Factors
5. Overall Intelligence Score (1-10)

Be concise but comprehensive.`;

    await callClaude(prompt, "You are an expert business intelligence analyst for credit risk.", t => setFindings(t));
    setResearching(false);
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: theme.accentPurple }}><Icons.AIAgent /></span> AI Research Agent
        </h2>
        <p style={{ color: theme.textSecondary, fontSize: 13 }}>Automated external intelligence: news, regulatory alerts, litigation, industry data</p>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 700, display: "block", marginBottom: 8, textTransform: "uppercase" }}>Research Query</label>
        <textarea className="input-field" value={query} onChange={e => setQuery(e.target.value)}
          placeholder={defaultQuery} style={{ minHeight: 100, marginBottom: 12 }} />
        <button className="btn-primary" onClick={runResearch} disabled={researching}
          style={{ background: "linear-gradient(135deg, #8B5CF6, #7C3AED)" }}>
          {researching ? <><span className="loader" style={{ width: 16, height: 16 }} /> Researching…</> : <><Icons.Search /> Run Intelligence Scan</>}
        </button>
      </div>

      {/* Data Sources */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { name: "News Platforms", icon: "📰", status: "Active" },
          { name: "Regulatory DB", icon: "🏛", status: "Active" },
          { name: "Litigation Data", icon: "⚖️", status: "Active" },
          { name: "Industry Reports", icon: "📊", status: "Active" },
        ].map(s => (
          <div key={s.name} className="card" style={{ padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{s.name}</div>
            <span className="badge badge-green" style={{ marginTop: 8 }}>{s.status}</span>
          </div>
        ))}
      </div>

      {findings && (
        <div className="card" style={{ padding: 24, animation: "fadeIn 0.4s ease", borderColor: "rgba(139,92,246,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 18 }}>🤖</span>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.accentPurple }}>Intelligence Report</div>
            <span className="badge badge-purple">AI Generated</span>
          </div>
          <div className="ai-stream">{findings}</div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// ML CREDIT SCORING
// ============================================================
function CreditScoring({ app }) {
  const [scoring, setScoring] = useState(false);
  const [result, setResult] = useState(null);
  const [aiExplanation, setAiExplanation] = useState("");

  const runScoring = async () => {
    setScoring(true);
    setAiExplanation("");
    await new Promise(r => setTimeout(r, 1200));

    const score = app?.creditScore || 724;
    const res = {
      finalScore: score,
      riskClass: score >= 750 ? "A" : score >= 650 ? "B" : score >= 550 ? "C" : "D",
      eligibility: score >= 650 ? "Eligible" : "Conditional",
      maxLoanAmount: Math.floor((app?.annualTurnover || 12500000) * 0.25),
      features: [
        { name: "GST Compliance", weight: 25, score: 82, contribution: "+45pts" },
        { name: "Bank Transaction History", weight: 20, score: 76, contribution: "+38pts" },
        { name: "Debt Service Coverage", weight: 18, score: 68, contribution: "+29pts" },
        { name: "Business Vintage", weight: 15, score: 90, contribution: "+40pts" },
        { name: "Industry Risk", weight: 12, score: 65, contribution: "-15pts" },
        { name: "Fraud Risk Score", weight: 10, score: 88, contribution: "+22pts" },
      ],
    };
    setResult(res);

    const prompt = `ML Credit Score for ${app?.businessName || "business"}: ${score}/900
Risk Class: ${res.riskClass}, Eligibility: ${res.eligibility}
Max Loan: ${formatCurrency(res.maxLoanAmount)}
Top factors: GST Compliance 82%, Bank History 76%, Business Age 90%

Provide a 3-point credit scoring rationale.`;

    await callClaude(prompt, "You are an ML credit scoring expert.", t => setAiExplanation(t));
    setScoring(false);
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: theme.accent }}><Icons.Scoring /></span> ML Credit Scoring Model
        </h2>
        <p style={{ color: theme.textSecondary, fontSize: 13 }}>Machine learning analysis of financial behavior, transactions, and industry risk</p>
      </div>

      <button className="btn-primary" onClick={runScoring} disabled={scoring} style={{ marginBottom: 24, background: "linear-gradient(135deg, #10B981, #059669)" }}>
        {scoring ? <><span className="loader" style={{ width: 16, height: 16 }} /> Computing Score…</> : <><Icons.Scoring /> Run ML Scoring Engine</>}
      </button>

      {result && (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
          <div style={{ display: "flex", gap: 20, marginBottom: 24, alignItems: "center" }}>
            <ScoreRing score={result.finalScore} size={140} />
            <div>
              <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 4 }}>Credit Risk Classification</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: getScoreColor(result.finalScore), lineHeight: 1 }}>Class {result.riskClass}</div>
              <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                <span className={`badge ${result.eligibility === "Eligible" ? "badge-green" : "badge-yellow"}`}>{result.eligibility}</span>
                <span className="badge badge-blue">Max: {formatCurrency(result.maxLoanAmount)}</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 20, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 16 }}>Feature Contributions</div>
            <div style={{ display: "grid", gap: 14 }}>
              {result.features.map(f => (
                <div key={f.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{f.name}</span>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: 12, color: theme.textMuted }}>Weight: {f.weight}%</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: f.contribution.startsWith("+") ? theme.accent : theme.accentRed, fontFamily: "'JetBrains Mono', monospace" }}>{f.contribution}</span>
                    </div>
                  </div>
                  <ProgressBar value={f.score} color={f.score >= 70 ? theme.accent : f.score >= 50 ? theme.accentOrange : theme.accentRed} />
                </div>
              ))}
            </div>
          </div>

          {aiExplanation && (
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 12, color: theme.accent, fontWeight: 700, marginBottom: 12 }}>🤖 ML Model Explanation</div>
              <div className="ai-stream">{aiExplanation}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// QUALITATIVE NOTES
// ============================================================
function QualitativeNotes({ app }) {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([
    { id: 1, officer: "Ravi Menon", date: "2024-01-16", text: "Site visit confirmed operational facility. Machinery modern and well-maintained. Workforce appeared motivated. Client base includes 3 large corporates.", sentiment: "Positive", impact: "+12pts" },
  ]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const addNote = async () => {
    if (!note.trim()) return;
    const newNote = {
      id: notes.length + 1,
      officer: "Current Officer",
      date: new Date().toISOString().split("T")[0],
      text: note,
      sentiment: "Analyzing...",
      impact: "...",
    };
    setNotes(prev => [...prev, newNote]);
    const savedNote = note;
    setNote("");
    setAnalyzing(true);
    setAnalysis("");

    const prompt = `Analyze this credit officer field note for ${app?.businessName || "business"}:
"${savedNote}"

Provide:
1. Sentiment (Positive/Negative/Neutral) and reasoning
2. Score impact estimate (+/- points)
3. Key risk/opportunity flags
4. Recommendation

Be concise.`;

    await callClaude(prompt, "You are a credit assessment specialist analyzing field observations.", t => setAnalysis(t));
    setNotes(prev => prev.map(n => n.id === newNote.id ? { ...n, sentiment: "Analyzed", impact: "+AI" } : n));
    setAnalyzing(false);
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: theme.accentOrange }}><Icons.Notes /></span> Qualitative Notes Analyzer
        </h2>
        <p style={{ color: theme.textSecondary, fontSize: 13 }}>Human-in-the-loop: Add field observations and qualitative assessments</p>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <label style={{ fontSize: 12, color: theme.textMuted, fontWeight: 700, display: "block", marginBottom: 8, textTransform: "uppercase" }}>Add Field Observation</label>
        <textarea className="input-field" value={note} onChange={e => setNote(e.target.value)} style={{ minHeight: 100, marginBottom: 12 }}
          placeholder="e.g. Site visit confirmed active operations. Warehouse with ₹15L inventory. Owner cooperative and transparent. Mentions new government tender worth ₹50L..." />
        <button className="btn-primary" onClick={addNote} disabled={!note.trim() || analyzing}
          style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}>
          {analyzing ? <><span className="loader" style={{ width: 16, height: 16 }} /> Analyzing…</> : <><Icons.Notes /> Add & Analyze Note</>}
        </button>
      </div>

      {notes.map(n => (
        <div key={n.id} className="card" style={{ padding: 20, marginBottom: 12, borderColor: "rgba(245,158,11,0.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(245,158,11,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: theme.accentOrange, fontWeight: 700 }}>
                {n.officer[0]}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{n.officer}</div>
                <div style={{ fontSize: 11, color: theme.textMuted }}>{n.date}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span className={`badge ${n.sentiment === "Positive" ? "badge-green" : n.sentiment === "Negative" ? "badge-red" : "badge-yellow"}`}>{n.sentiment}</span>
              <span className="badge badge-blue">{n.impact}</span>
            </div>
          </div>
          <p style={{ fontSize: 14, color: theme.textSecondary, lineHeight: 1.6 }}>{n.text}</p>
        </div>
      ))}

      {analysis && (
        <div className="card" style={{ padding: 20, borderColor: "rgba(245,158,11,0.3)", animation: "fadeIn 0.4s ease" }}>
          <div style={{ fontSize: 12, color: theme.accentOrange, fontWeight: 700, marginBottom: 12 }}>🤖 AI Note Analysis</div>
          <div className="ai-stream">{analysis}</div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// EXPLAINABLE AI
// ============================================================
function ExplainableAI({ app }) {
  const [generating, setGenerating] = useState(false);
  const [explanation, setExplanation] = useState("");

  const generateExplanation = async () => {
    setGenerating(true);
    setExplanation("");

    const score = app?.creditScore || 724;
    const prompt = `Generate a detailed Explainable AI (XAI) report for credit decision:

Business: ${app?.businessName || "MSME Business"}
Credit Score: ${score}/900
Risk Level: ${app?.riskLevel || "Medium"}
Industry: ${app?.industry || "Manufacturing"}
Loan Amount: ${formatCurrency(app?.loanAmount || 2500000)}
Annual Turnover: ${formatCurrency(app?.annualTurnover || 12500000)}

Provide an XAI report with:
1. TOP POSITIVE FACTORS (what improved the score)
2. TOP NEGATIVE FACTORS (what reduced the score)
3. KEY DECISION DRIVERS (top 3 factors with weights)
4. COUNTERFACTUAL ANALYSIS (what would need to change for approval/rejection)
5. REGULATORY COMPLIANCE NOTE (fairness and bias assessment)
6. FINAL RECOMMENDATION with confidence level

Use clear, plain language suitable for a credit committee.`;

    await callClaude(prompt, "You are an Explainable AI specialist for financial credit decisions. Provide transparent, unbiased explanations.", t => setExplanation(t));
    setGenerating(false);
  };

  const factors = [
    { name: "GST Compliance History", score: 82, positive: true, weight: "High" },
    { name: "Bank Account Stability", score: 76, positive: true, weight: "High" },
    { name: "Business Age", score: 90, positive: true, weight: "Medium" },
    { name: "Debt-to-Equity Ratio", score: 58, positive: false, weight: "Medium" },
    { name: "Industry Cyclicality", score: 45, positive: false, weight: "Low" },
    { name: "Geographic Risk", score: 70, positive: true, weight: "Low" },
  ];

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: theme.accentPurple }}><Icons.XAI /></span> Explainable AI Risk Analysis
        </h2>
        <p style={{ color: theme.textSecondary, fontSize: 13 }}>Transparent factor attribution and decision reasoning for credit outcomes</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {factors.map(f => (
          <div key={f.name} className="card" style={{ padding: 16, borderColor: f.positive ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{f.name}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <span className={`badge badge-${f.weight === "High" ? "red" : f.weight === "Medium" ? "yellow" : "blue"}`}>{f.weight}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: f.positive ? theme.accent : theme.accentRed }}>
                  {f.positive ? "▲" : "▼"} {f.score}
                </span>
              </div>
            </div>
            <ProgressBar value={f.score} color={f.positive ? theme.accent : theme.accentRed} showValue={false} />
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={generateExplanation} disabled={generating}
        style={{ marginBottom: 20, background: "linear-gradient(135deg, #8B5CF6, #7C3AED)" }}>
        {generating ? <><span className="loader" style={{ width: 16, height: 16 }} /> Generating XAI Report…</> : <><Icons.XAI /> Generate Full XAI Report</>}
      </button>

      {explanation && (
        <div className="card" style={{ padding: 24, borderColor: "rgba(139,92,246,0.3)", animation: "fadeIn 0.4s ease" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
            <span style={{ color: theme.accentPurple }}><Icons.XAI /></span>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.accentPurple }}>XAI Decision Report</div>
            <span className="badge badge-purple">LIME + SHAP Analysis</span>
          </div>
          <div className="ai-stream">{explanation}</div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// CAM REPORT GENERATOR
// ============================================================
function CAMReportGenerator({ app }) {
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState("");
  const [generated, setGenerated] = useState(false);

  const generateCAM = async () => {
    setGenerating(true);
    setReport("");

    const prompt = `Generate a professional Credit Appraisal Memorandum (CAM) report:

APPLICANT DETAILS:
- Business: ${app?.businessName || "Sunrise Textiles Pvt Ltd"}
- GSTIN: ${app?.gstin || "29AABCT1234F1Z5"}
- Industry: ${app?.industry || "Manufacturing"}
- Contact: ${app?.contactPerson || "Rajesh Kumar"}
- Years in Business: ${app?.yearsInBusiness || 8}
- Employees: ${app?.employees || 45}

FINANCIAL PROFILE:
- Loan Requested: ${formatCurrency(app?.loanAmount || 2500000)}
- Annual Turnover: ${formatCurrency(app?.annualTurnover || 12500000)}
- Credit Score: ${app?.creditScore || 724}/900
- Risk Classification: ${app?.riskLevel || "Medium"}

ASSESSMENT RESULTS:
- Fraud Detection: ${app?.fraudFlag ? "FLAGGED - Issues detected" : "CLEAR - No anomalies"}
- ML Score: ${app?.creditScore || 724}/900
- Eligibility: ${(app?.creditScore || 724) >= 650 ? "Eligible" : "Conditional"}

Generate a formal CAM report with these sections:
1. EXECUTIVE SUMMARY
2. APPLICANT BACKGROUND
3. FINANCIAL ANALYSIS
4. RISK ASSESSMENT
5. FRAUD DETECTION FINDINGS
6. CREDIT SCORE ANALYSIS
7. LOAN ELIGIBILITY & RECOMMENDATION
8. CONDITIONS & COVENANTS (if approved)
9. COMMITTEE DECISION

Format professionally for a banking/NBFC credit committee.`;

    await callClaude(prompt, "You are a senior credit analyst generating formal banking CAM reports. Use professional banking language and structured format.", t => setReport(t));
    setGenerating(false);
    setGenerated(true);
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: theme.primary }}><Icons.CAM /></span> CAM Report Generator
        </h2>
        <p style={{ color: theme.textSecondary, fontSize: 13 }}>Automated Credit Appraisal Memorandum with full financial analysis and recommendations</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Executive Summary", icon: "📋" },
          { label: "Financial Analysis", icon: "📊" },
          { label: "Risk Assessment", icon: "⚠️" },
          { label: "Recommendation", icon: "✅" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary }}>{s.label}</div>
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={generateCAM} disabled={generating} style={{ marginBottom: 24 }}>
        {generating ? <><span className="loader" style={{ width: 16, height: 16 }} /> Generating CAM Report…</> : <><Icons.CAM /> Generate Full CAM Report</>}
      </button>

      {report && (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Generated CAM Report</div>
            <div style={{ display: "flex", gap: 10 }}>
              <span className="badge badge-green">✓ Generated</span>
              <button className="btn-ghost" style={{ fontSize: 12, padding: "6px 14px" }}
                onClick={() => { const blob = new Blob([report], { type: "text/plain" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `CAM-${app?.id || "report"}.txt`; a.click(); }}>
                <Icons.Download /> Export
              </button>
            </div>
          </div>
          <div className="card" style={{ padding: 28, borderColor: "rgba(14,165,233,0.2)" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.8, color: theme.textSecondary, whiteSpace: "pre-wrap" }}>
              {report}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function CreditLens() {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedApp, setSelectedApp] = useState(null);
  const [applications, setApplications] = useState(mockDB.applications);
  const [showNewApp, setShowNewApp] = useState(false);
  const [activeTab, setActiveTab] = useState("ingestion");
  const [notification, setNotification] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const showNotif = (message, type = "info") => {
    setNotification({ message, type });
  };

  const handleSelectApp = (app) => {
    setSelectedApp(app);
    setActivePage("analysis");
    setActiveTab("ingestion");
  };

  const handleNewApp = (app) => {
    setApplications(prev => [app, ...prev]);
    setShowNewApp(false);
    showNotif(`Application ${app.id} submitted successfully!`, "success");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Icons.Dashboard /> },
    { id: "applications", label: "Applications", icon: <Icons.Applications /> },
  ];

  const analysisModules = [
    { id: "ingestion", label: "Data Ingestion", icon: <Icons.DataIngestion />, color: theme.primary },
    { id: "fraud", label: "Fraud Detection", icon: <Icons.Fraud />, color: theme.accentRed },
    { id: "scoring", label: "Credit Scoring", icon: <Icons.Scoring />, color: theme.accent },
    { id: "research", label: "AI Research", icon: <Icons.AIAgent />, color: theme.accentPurple },
    { id: "notes", label: "Field Notes", icon: <Icons.Notes />, color: theme.accentOrange },
    { id: "xai", label: "Explainable AI", icon: <Icons.XAI />, color: theme.accentPurple },
    { id: "cam", label: "CAM Report", icon: <Icons.CAM />, color: theme.primary },
  ];

  const renderContent = () => {
    if (showNewApp) return <NewApplicationForm onSubmit={handleNewApp} onCancel={() => setShowNewApp(false)} />;
    if (activePage === "dashboard") return <Dashboard apps={applications} onNavigate={setActivePage} />;
    if (activePage === "applications") return <ApplicationsList apps={applications} onSelect={handleSelectApp} onNew={() => setShowNewApp(true)} />;
    if (activePage === "analysis" && selectedApp) {
      const moduleMap = {
        ingestion: <DataIngestion app={selectedApp} />,
        fraud: <FraudDetection app={selectedApp} />,
        scoring: <CreditScoring app={selectedApp} />,
        research: <AIResearchAgent app={selectedApp} />,
        notes: <QualitativeNotes app={selectedApp} />,
        xai: <ExplainableAI app={selectedApp} />,
        cam: <CAMReportGenerator app={selectedApp} />,
      };
      return moduleMap[activeTab] || moduleMap.ingestion;
    }
    return null;
  };

  return (
    <>
      <GlobalStyles />
      {notification && <Notification {...notification} onClose={() => setNotification(null)} />}

      <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
        {/* SIDEBAR */}
        <div style={{
          width: sidebarCollapsed ? 64 : 240,
          background: theme.bgCard,
          borderRight: `1px solid ${theme.border}`,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
          overflow: "hidden",
          flexShrink: 0,
        }}>
          {/* Logo */}
          <div style={{ padding: "20px 16px", borderBottom: `1px solid ${theme.border}`, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, fontSize: 18, fontWeight: 900, color: "white",
              boxShadow: "0 4px 12px rgba(14,165,233,0.35)",
            }}>C</div>
            {!sidebarCollapsed && (
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.5 }}>CreditLens</div>
                <div style={{ fontSize: 10, color: theme.textMuted, fontWeight: 600, letterSpacing: 0.5 }}>AI CREDIT RISK ANALYSIS PLATFORM</div>
              </div>
            )}
          </div>

          {/* Nav */}
          <div style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
            {!sidebarCollapsed && <div className="section-header">Navigation</div>}
            {navItems.map(item => (
              <div key={item.id} className={`nav-item ${activePage === item.id && !showNewApp ? "active" : ""}`}
                onClick={() => { setActivePage(item.id); setShowNewApp(false); }}
                style={{ justifyContent: sidebarCollapsed ? "center" : "flex-start" }}>
                {item.icon}
                {!sidebarCollapsed && item.label}
              </div>
            ))}

            {selectedApp && activePage === "analysis" && (
              <>
                {!sidebarCollapsed && <div className="section-header" style={{ marginTop: 8 }}>Analysis Modules</div>}
                {analysisModules.map(m => (
                  <div key={m.id} className={`nav-item ${activeTab === m.id ? "active" : ""}`}
                    onClick={() => setActiveTab(m.id)}
                    style={{ justifyContent: sidebarCollapsed ? "center" : "flex-start", color: activeTab === m.id ? m.color : undefined }}>
                    <span style={{ color: activeTab === m.id ? m.color : "inherit" }}>{m.icon}</span>
                    {!sidebarCollapsed && m.label}
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Collapse Toggle */}
          <div style={{ padding: "12px 10px", borderTop: `1px solid ${theme.border}` }}>
            <div className="nav-item" onClick={() => setSidebarCollapsed(c => !c)}
              style={{ justifyContent: sidebarCollapsed ? "center" : "flex-start" }}>
              <span style={{ transition: "transform 0.3s", display: "inline-block", transform: sidebarCollapsed ? "rotate(180deg)" : "none" }}>◀</span>
              {!sidebarCollapsed && "Collapse"}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Header */}
          <div style={{
            height: 60, borderBottom: `1px solid ${theme.border}`,
            background: "rgba(10,22,40,0.8)", backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 24px", flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {selectedApp && activePage === "analysis" && (
                <>
                  <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => { setActivePage("applications"); setSelectedApp(null); }}>
                    Applications
                  </button>
                  <span style={{ color: theme.textMuted }}>›</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{selectedApp.businessName}</span>
                  {selectedApp.fraudFlag && <span className="badge badge-red">⚠ Fraud Alert</span>}
                </>
              )}
              {!selectedApp && (
                <span style={{ fontSize: 14, color: theme.textMuted }}>
                  {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </span>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative", cursor: "pointer" }}>
                <Icons.Bell />
                <div style={{ position: "absolute", top: -4, right: -4, width: 8, height: 8, borderRadius: "50%", background: theme.accentRed }} />
              </div>
              <div style={{ width: 1, height: 24, background: theme.border }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #0EA5E9, #0284C7)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>
                  RM
                </div>
                {!sidebarCollapsed && <div style={{ fontSize: 13, fontWeight: 600 }}>Rani Sharma</div>}
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: 28 }} className="grid-bg">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
}
