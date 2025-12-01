
import React from 'react';
import { NavItemType, User, UserRole, Permission, DashboardConfig, Product, Order, PermissionScope, Supplier, Contract, Page, Shipment, Vehicle, Driver, LogisticsDocument, Quote, InsuranceClaim, CustomsFiling, CommunicationMessage, Client, Commission, Dispute, ContentItem, EscrowAgreement, Notification, Conversation, ChatMessage, RolePermissions, OrderStatus, SystemSettings, SupportTicket, NotificationType, DashboardWidget, QuickAction, ESGCriterion, GreenFinanceOption } from './types.ts';

// --- ICONS ---

export const IconLeaf = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17.5C7.24 17.5 5 15.26 5 12.5C5 9.74 7.24 7.5 10 7.5C12.76 7.5 15 9.74 15 12.5C15 15.26 12.76 17.5 10 17.5ZM16.12 15.12L14 13C14.53 11.23 14.2 9.22 13 7.64C13.82 7.23 14.73 7 15.7 7C18.03 7 19.9 8.87 19.9 11.2C19.9 12.71 19.14 14.03 18 14.88L16.12 15.12Z" fill="currentColor"/>
    </svg>
);


export const IconLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Parallelogram Background */}
        <path d="M20 5H135L115 45H0L20 5Z" fill="#2563eb" />
        
        {/* Accent Dot */}
        <circle cx="132" cy="10" r="5" fill="#60a5fa" />

        {/* Text 'DTFS' */}
        <text x="68" y="33" fontSize="28" fontWeight="800" fontFamily="Inter, sans-serif" fill="white" textAnchor="middle" letterSpacing="1px">DTFS</text>
    </svg>
);

export const IconGoogle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M21.9999 12.2273C21.9999 11.4545 21.9318 10.7273 21.7954 10H12.2272V14.1364H17.7726C17.5454 15.5 16.8181 16.6591 15.6817 17.4318V20.0455H19.2272C20.9772 18.3864 21.9999 15.6591 21.9999 12.2273Z" fill="#4285F4"/>
        <path d="M12.2272 22C15.1363 22 17.5908 21.0455 19.2272 19.5L15.6817 16.8864C14.7272 17.5455 13.5681 17.9545 12.2272 17.9545C9.56809 17.9545 7.3408 16.1591 6.52261 13.7273H2.86353V16.4318C4.5 19.6364 8.04534 22 12.2272 22Z" fill="#34A853"/>
        <path d="M6.52261 13.7273C6.31807 13.0682 6.20443 12.3864 6.20443 11.6818C6.20443 10.9773 6.31807 10.2955 6.52261 9.63636V6.93182H2.86353C2.1817 8.25 1.81807 9.77273 1.81807 11.6818C1.81807 13.5909 2.1817 15.1136 2.86353 16.4318L6.52261 13.7273Z" fill="#FBBC05"/>
        <path d="M12.2272 6.31818C13.6817 6.31818 14.8863 6.81818 15.75 7.63636L19.3181 4.06818C17.5908 2.54545 15.1363 1.36364 12.2272 1.36364C8.04534 1.36364 4.5 4.36364 2.86353 7.56818L6.52261 10.2727C7.3408 7.84091 9.56809 6.31818 12.2272 6.31818Z" fill="#EA4335"/>
    </svg>
);

export const IconApple = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M15.2222 6.77778C15.2222 5.05556 16.6667 4 18.4444 4C20.2222 4 21.3333 5.05556 21.3333 6.44444C21.3333 7.94444 20.3333 8.72222 18.4444 8.72222C16.6667 8.72222 15.4444 7.66667 15.2222 6.77778ZM14.3333 21.4444C15.4444 21.4444 16.2222 20.6667 17.1111 19.6667C18.1111 18.6667 18.6667 17.6667 18.6667 16.1111H15.8889C15.8889 17.2222 15.3333 18.2222 14.3333 18.8889C13.4444 19.5556 12.5556 20 11.6667 20C10.1111 20 9.11111 19.1111 8 18.1111C6.88889 17.1111 5.88889 16.1111 4.88889 16.1111C3.88889 16.1111 3.11111 16.7778 2.22222 17.8889C3.11111 19 4.22222 20.4444 5.66667 20.8889C6.44444 21.1111 7.33333 21.2222 8.11111 21.1111C8.88889 21.1111 9.55556 20.8889 10.3333 20.8889C11.1111 20.8889 11.6667 21.4444 12.7778 21.4444H14.3333Z" fill="currentColor"/>
    </svg>
);

export const IconPhone = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M16.6667 2.66663H7.33333C5.12381 2.66663 3.33333 4.4571 3.33333 6.66663V17.3333C3.33333 19.5428 5.12381 21.3333 7.33333 21.3333H16.6667C18.8762 21.3333 20.6667 19.5428 20.6667 17.3333V6.66663C20.6667 4.4571 18.8762 2.66663 16.6667 2.66663Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18.3333H12.0083" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconDashboard = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path opacity="0.4" d="M11 21H3V11H11V21Z" fill="currentColor"/>
        <path d="M21 13H13V3H21V13Z" fill="currentColor"/>
        <path opacity="0.4" d="M21 21H13V15H21V21Z" fill="currentColor"/>
        <path d="M11 9H3V3H11V9Z" fill="currentColor"/>
    </svg>
);

export const IconChat = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path opacity="0.4" d="M21 15V6C21 4.34315 19.6569 3 18 3H6C4.34315 3 3 4.34315 3 6V15C3 16.6569 4.34315 18 6 18H17L21 21V15Z" fill="currentColor"/>
        <path d="M8 9H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 13H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconDocument = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path opacity="0.4" d="M16 2H8C4.68629 2 2 4.68629 2 8V16C2 19.3137 4.68629 22 8 22H16C19.3137 22 22 19.3137 22 16V8C22 4.68629 19.3137 2 16 2Z" fill="currentColor"/>
        <path d="M16 12.25H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8.25H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 16.25H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconTradeFinance = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"/>
        <path d="M12 5.5V18.5M14.5 9.5C14.5 8.39543 13.6046 7.5 12.5 7.5H11.5C10.3954 7.5 9.5 8.39543 9.5 9.5C9.5 10.6046 10.3954 11.5 11.5 11.5H12.5C13.6046 11.5 14.5 12.3954 14.5 13.5C14.5 14.6046 13.6046 15.5 12.5 15.5H10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconTraining = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5v-10A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconAIAssistant = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 8V12M12 16H12.01M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 3.5C9.5 4 10.5 5 11 3C11.5 1 12.5 1 13 3C13.5 5 14.5 4 15 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconSend = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconX = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconLink = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconSearch = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconPaperclip = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconCheckDone = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 6L4 17L-1 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconMic = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconVideo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <polygon points="23 7 16 12 23 17 23 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconFilePdf = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 18v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const IconFileDescription = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const IconPhoneOff = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M10.68 13.31a16 16 0 0 0 3.41 3.41l3.36-3.36a2 2 0 0 1 2.83 2.83l-3.36 3.36C15.42 21.17 12.87 22 10 22a16.31 16.31 0 0 1-7-1.76l-.27-.15a2 2 0 0 1-1.02-2.13l.81-4.84a2 2 0 0 1 .84-1.28l3.36-3.36a2 2 0 0 1 2.83 2.83L10.68 13.31zM1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconVideoOff = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconMicOff = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconClock = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconTrendingUp = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconFile = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="13 2 13 9 20 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconPrint = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <polyline points="6 9 6 2 18 2 18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="6" y="14" width="12" height="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconShare = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="16 6 12 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconCheckCircle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const IconFactoring = (props: React.SVGProps<SVGSVGElement>) => (<IconDocument {...props} />);
export const IconExportFinance = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/><path d="M2 12H22" stroke="currentColor" strokeWidth="2"/><path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2"/></svg>);
export const IconSupplyChain = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><circle cx="5" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><circle cx="19" cy="5" r="3" stroke="currentColor" strokeWidth="2"/><circle cx="19" cy="19" r="3" stroke="currentColor" strokeWidth="2"/><path d="M7.5 13.5L16.5 17.5" stroke="currentColor" strokeWidth="2"/><path d="M16.5 6.5L7.5 10.5" stroke="currentColor" strokeWidth="2"/></svg>);
export const IconImportFinance = (props: React.SVGProps<SVGSVGElement>) => (<IconExportFinance style={{transform: 'scaleX(-1)'}} {...props} />);
export const IconNonInterestFinance = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/><path d="M15 9H9V15H15V9Z" stroke="currentColor" strokeWidth="2"/><path d="M9 9L15 15" stroke="currentColor" strokeWidth="2"/></svg>);
export const IconStartupFinance = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconCheck = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconTableView = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2"/><line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="2"/></svg>);
export const IconCardView = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/></svg>);
export const IconUpload = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconChevronRight = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconChevronDown = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconShieldCheck = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconAlertTriangle = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconBuildingBank = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 2L2 7v2h20V7L12 2zM3 22h18M5 10v10h2V10H5zm6 0v10h2V10h-2zm6 0v10h2V10h-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconBell = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconUser = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconLogout = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconSystemMaintenance = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 12h-2m-2.5-5.5l1.4-1.4M4 12H2m2.5 5.5l-1.4 1.4M12 4V2m5.5 2.5l1.4-1.4M6.5 6.5l-1.4-1.4M12 20v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconBox = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconDotsVertical = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="5" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="19" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconShipmentManagement = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M17.5 17.5L22 12l-4.5-5.5" stroke="currentColor" strokeWidth="2"/><path d="M6.5 6.5L2 12l4.5 5.5" stroke="currentColor" strokeWidth="2"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/><path d="M12 2L12 22" stroke="currentColor" strokeWidth="2"/></svg>);
export const IconUsers = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconRoutePlanning = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2"/><path d="M5 9c0-1.66 1.34-3 3-3s3 1.34 3 3" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2"/></svg>);
export const IconLogisticsDocumentation = (props: React.SVGProps<SVGSVGElement>) => (<IconDocument {...props} />);
export const IconPricingQuotes = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 9h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconInsuranceManagement = (props: React.SVGProps<SVGSVGElement>) => (<IconShieldCheck {...props} />);
export const IconCustomsClearance = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M2 12h20" stroke="currentColor" strokeWidth="2"/><path d="M12 2a10 10 0 0 0-10 10v0a10 10 0 0 0 10 10v0a10 10 0 0 0 10-10v0A10 10 0 0 0 12 2Z" stroke="currentColor" strokeWidth="2"/><path d="M12 2c-3.13.9-5.5 3.32-6.57 6.36" stroke="currentColor" strokeWidth="2"/><path d="M12 2c3.13.9 5.5 3.32 6.57 6.36" stroke="currentColor" strokeWidth="2"/></svg>);
export const IconCommissionTracking = (props: React.SVGProps<SVGSVGElement>) => (<IconTradeFinance {...props} />);
export const IconUserHeadset = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M17 18a5 5 0 0 0-10 0" stroke="currentColor" strokeWidth="2"/><path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="2"/><path d="M20.9 18.6A9 9 0 0 0 22 12v-2" stroke="currentColor" strokeWidth="2"/><path d="M3.1 18.6A9 9 0 0 1 2 12v-2" stroke="currentColor" strokeWidth="2"/></svg>);
export const IconMarketDevelopment = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 14l5-5 4 4 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconBasicAnalytics = (props: React.SVGProps<SVGSVGElement>) => (<IconMarketDevelopment {...props}/>);
export const IconUserPlus = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="17" y1="11" x2="23" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconUserManagement = (props: React.SVGProps<SVGSVGElement>) => (<IconUsers {...props}/>);
export const IconSystemConfig = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 20v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 12h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconContentModeration = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4.93 4.93l14.14 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconDisputeResolution = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
export const IconFinancialOversight = (props: React.SVGProps<SVGSVGElement>) => (<IconTradeFinance {...props}/>);
export const IconAnalyticsAccess = (props: React.SVGProps<SVGSVGElement>) => (<IconMarketDevelopment {...props}/>);
export const IconSecurityManagement = (props: React.SVGProps<SVGSVGElement>) => (<IconShieldCheck {...props}/>);
export const IconCompliance = (props: React.SVGProps<SVGSVGElement>) => (<IconShieldCheck {...props}/>);
export const IconWallet = (props: React.SVGProps<SVGSVGElement>) => (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M20 12V8H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="2"/><path d="M4 20v-8a2 2 0 0 1 2-2h14v10a2 2 0 0 1-2 2H4z" stroke="currentColor" strokeWidth="2"/><path d="M18 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" stroke="currentColor" strokeWidth="2"/></svg>);


// --- MOCK DATA ---

export const USERS: Record<string, Omit<User, 'permissions'>> = {
    'U00': { id: 'U00', name: 'Guest User', email: 'guest@dtfs.com', avatar: 'https://i.pravatar.cc/150?u=U00', role: 'Guest', kycCompleted: true },
    'U00-EXP': { id: 'U00-EXP', name: 'Guest Exporter', email: 'guest-exporter@dtfs.com', avatar: 'https://i.pravatar.cc/150?u=U00-EXP', role: 'GuestExporter', kycCompleted: true, esgMetrics: { score: 75, metrics: { environmental: 70, social: 80, governance: 75 } } },
    'U00-BUY': { id: 'U00-BUY', name: 'Guest Buyer', email: 'guest-buyer@dtfs.com', avatar: 'https://i.pravatar.cc/150?u=U00-BUY', role: 'GuestBuyer', kycCompleted: true },
    'U01': { id: 'U01', name: 'Kwame Exports', email: 'kwame@export.com', avatar: 'https://i.pravatar.cc/150?u=U01', role: 'Exporter', kycCompleted: true, esgMetrics: { score: 85, metrics: { environmental: 90, social: 80, governance: 85 } } },
    'U02': { id: 'U02', name: 'Amina Imports', email: 'amina@import.co', avatar: 'https://i.pravatar.cc/150?u=U02', role: 'Buyer', kycCompleted: true },
    'U03': { id: 'U03', name: 'Global Movers', email: 'contact@globalmovers.log', avatar: 'https://i.pravatar.cc/150?u=U03', role: 'Logistics', kycCompleted: true },
    'U04': { id: 'U04', name: 'Fatima Agent', email: 'fatima@agent.net', avatar: 'https://i.pravatar.cc/150?u=U04', role: 'Agent', kycCompleted: true },
    'U05': { id: 'U05', name: 'Jane Doe', email: 'jane.doe@dtfs.com', avatar: 'https://i.pravatar.cc/150?u=U05', role: 'Admin', kycCompleted: true },
};

export const ESG_CRITERIA: ESGCriterion[] = [
    { id: 'env1', nameKey: 'esg.criteria.env1.name', descriptionKey: 'esg.criteria.env1.desc', status: 'Certified', category: 'environmental' },
    { id: 'env2', nameKey: 'esg.criteria.env2.name', descriptionKey: 'esg.criteria.env2.desc', status: 'In Progress', category: 'environmental' },
    { id: 'env3', nameKey: 'esg.criteria.env3.name', descriptionKey: 'esg.criteria.env3.desc', status: 'Certified', category: 'environmental' },
    { id: 'soc1', nameKey: 'esg.criteria.soc1.name', descriptionKey: 'esg.criteria.soc1.desc', status: 'Certified', category: 'social' },
    { id: 'soc2', nameKey: 'esg.criteria.soc2.name', descriptionKey: 'esg.criteria.soc2.desc', status: 'Certified', category: 'social' },
    { id: 'soc3', nameKey: 'esg.criteria.soc3.name', descriptionKey: 'esg.criteria.soc3.desc', status: 'Not Started', category: 'social' },
    { id: 'gov1', nameKey: 'esg.criteria.gov1.name', descriptionKey: 'esg.criteria.gov1.desc', status: 'Certified', category: 'governance' },
    { id: 'gov2', nameKey: 'esg.criteria.gov2.name', descriptionKey: 'esg.criteria.gov2.desc', status: 'In Progress', category: 'governance' },
];

export const GREEN_FINANCE_OPTIONS: GreenFinanceOption[] = [
    {
        id: 'agriLoan',
        titleKey: 'esg.greenFinance.options.agriLoan.title',
        descriptionKey: 'esg.greenFinance.options.agriLoan.desc',
        icon: IconTradeFinance
    },
    {
        id: 'renewableEnergy',
        titleKey: 'esg.greenFinance.options.renewableEnergy.title',
        descriptionKey: 'esg.greenFinance.options.renewableEnergy.desc',
        icon: IconTradeFinance
    },
    {
        id: 'ecoPackaging',
        titleKey: 'esg.greenFinance.options.ecoPackaging.title',
        descriptionKey: 'esg.greenFinance.options.ecoPackaging.desc',
        icon: IconTradeFinance
    }
];

export const PRODUCTS: Product[] = [
    { id: 1, name: 'Premium Cashew Nuts', description: 'High-quality, crunchy cashew nuts sourced directly from local farms. Perfect for snacking or as an ingredient.', exporterId: 'U01', price: 1500, stock: 500, status: 'Active', image: 'https://images.unsplash.com/photo-1608935934185-359199d24892?q=80&w=800&auto=format&fit=crop' },
    { id: 2, name: 'Organic Cocoa Beans', description: 'Rich, aromatic cocoa beans, organically grown and ethically sourced. Ideal for chocolate making.', exporterId: 'U01', price: 2200, stock: 300, status: 'Active', image: 'https://images.unsplash.com/photo-1578926375355-a63383a74338?q=80&w=800&auto=format&fit=crop' },
    { id: 3, name: 'Dried Hibiscus Flowers', description: 'Vibrant, flavorful hibiscus flowers, sun-dried to preserve their natural taste and color. Great for teas and drinks.', exporterId: 'U01', price: 800, stock: 1000, status: 'Draft', image: 'https://images.unsplash.com/photo-1627838536103-ce20b41a5423?q=80&w=800&auto=format&fit=crop' },
    { id: 4, name: 'Artisanal Shea Butter', description: 'Pure, unrefined shea butter, handcrafted by local communities. Excellent for skin and hair care.', exporterId: 'U01', price: 1800, stock: 250, status: 'Active', image: 'https://images.unsplash.com/photo-1556950961-8c0929a8252e?q=80&w=800&auto=format&fit=crop' },
];

export const ORDERS: Order[] = [
    { id: 'TRD-2024-001', productName: 'Premium Cashew Nuts', customer: 'Amina Imports', buyerId: 'U02', exporterId: 'U01', status: 'Shipped', amount: 15000, date: '2024-06-10', qualityStatus: 'Passed' },
    { id: 'TRD-2024-002', productName: 'Organic Cocoa Beans', customer: 'Amina Imports', buyerId: 'U02', exporterId: 'U01', status: 'Processing', amount: 44000, date: '2024-06-15', qualityStatus: 'Pending' },
    { id: 'TRD-2024-003', productName: 'Artisanal Shea Butter', customer: 'Amina Imports', buyerId: 'U02', exporterId: 'U01', status: 'Pending', amount: 9000, date: '2024-06-20', qualityStatus: 'Not Inspected' },
];

export const SUPPLIERS: Supplier[] = [
    { id: 'SUP01', name: 'Ghana Fresh Farms', location: 'Accra, Ghana', avatar: 'GF', productsCount: 12, rating: 4.8, status: 'Preferred', exporterId: 'U01' },
    { id: 'SUP02', name: 'Ivory Coast Nuts Co.', location: 'Abidjan, Ivory Coast', avatar: 'IC', productsCount: 5, rating: 4.5, status: 'Active', exporterId: 'U01' },
    { id: 'SUP03', name: 'Mali Shea Cooperative', location: 'Bamako, Mali', avatar: 'MS', productsCount: 8, rating: 4.9, status: 'Active', exporterId: 'U01' },
    { id: 'SUP04', name: 'Nigeria Agro Exports', location: 'Lagos, Nigeria', avatar: 'NA', productsCount: 25, rating: 4.2, status: 'Blocked', exporterId: 'U01' },
];

export const CONTRACTS: Contract[] = [
    { id: 'CTR-001', supplierName: 'Ghana Fresh Farms', buyerId: 'U02', exporterId: 'U01', status: 'Active', date: '2024-01-15', documentUrl: '#' },
    { id: 'CTR-002', supplierName: 'Ivory Coast Nuts Co.', buyerId: 'U02', exporterId: 'U01', status: 'Completed', date: '2023-11-20', documentUrl: '#' },
];

export const SHIPMENTS: Shipment[] = [
    { id: 'SHP-001', orderId: 'TRD-2024-001', status: 'In Transit', origin: 'Accra, Ghana', destination: 'Lagos, Nigeria', carrier: 'Maersk', estimatedDelivery: '2024-06-25', trackingNumber: 'TRK123456789' },
    { id: 'SHP-002', orderId: 'TRD-2024-002', status: 'Pending Pickup', origin: 'Kumasi, Ghana', destination: 'Dakar, Senegal', carrier: 'DHL', estimatedDelivery: '2024-07-05', trackingNumber: 'TRK987654321' },
];

export const VEHICLES: Vehicle[] = [
    { id: 'VHC-01', name: 'Freight Truck 1', type: 'Truck', status: 'Available', currentLocation: 'Accra Hub' },
    { id: 'VHC-02', name: 'Freight Truck 2', type: 'Truck', status: 'On Route', driverId: 'DRV-01', currentLocation: 'On route to Lagos' },
];

export const DRIVERS: Driver[] = [
    { id: 'DRV-01', name: 'Musa Traore', licenseNumber: 'GH-12345', status: 'On Duty' },
    { id: 'DRV-02', name: 'Femi Adebayo', licenseNumber: 'NG-54321', status: 'Available' },
];

export const LOGISTICS_DOCUMENTS: LogisticsDocument[] = [
    { id: 'DOC-001', type: 'Bill of Lading', shipmentId: 'SHP-001', status: 'Approved', url: '#' },
];

export const QUOTES: Quote[] = [
    { id: 'QT-001', customerName: 'Amina Imports', origin: 'Accra', destination: 'Lagos', freightCost: 1200, insuranceCost: 150, totalCost: 1350, status: 'Sent', date: '2024-06-08' },
];

export const INSURANCE_CLAIMS: InsuranceClaim[] = [];

export const CUSTOMS_FILINGS: CustomsFiling[] = [];

export const COMMUNICATIONS: CommunicationMessage[] = [
    { id: 'COM-001', shipmentId: 'SHP-001', sender: 'Logistics', content: 'Shipment has left the port of Accra.', timestamp: '10:30 AM' },
];

export const CLIENTS: Client[] = [
    { id: 'CLT-01', name: 'Nairobi Fresh Exports', type: 'Exporter', status: 'Active', location: 'Nairobi, Kenya', joinDate: '2023-05-10', agentId: 'U04' },
    { id: 'CLT-02', name: 'Addis Ababa Grains', type: 'Farmer', status: 'Pending Verification', location: 'Addis Ababa, Ethiopia', joinDate: '2024-06-01', agentId: 'U04' },
];

export const COMMISSIONS: Commission[] = [
    { id: 'COM-TRD-001', orderId: 'TRD-2024-001', clientId: 'CLT-01', clientName: 'Nairobi Fresh Exports', amount: 750, status: 'Paid', date: '2024-06-15', agentId: 'U04' },
    { id: 'COM-TRD-002', orderId: 'TRD-2024-002', clientId: 'CLT-01', clientName: 'Nairobi Fresh Exports', amount: 2200, status: 'Unpaid', date: '2024-06-20', agentId: 'U04' },
];

export const DISPUTES: Dispute[] = [
    { id: 'DIS-001', orderId: 'TRD-2024-001', parties: ['Kwame Exports', 'Amina Imports'], reason: 'Quality issue with 10% of the cashew nuts.', status: 'Open', dateFiled: '2024-06-20' },
];

export const CONTENT_QUEUE: ContentItem[] = [
    { id: 'CQ-01', type: 'Product Listing', submittedBy: 'New Farmer Co-op', contentSummary: 'Listing for "Organic Ginger" - needs review.', dateSubmitted: '2024-06-21' },
];

export const ESCROW_AGREEMENTS: EscrowAgreement[] = [
    { id: 'ESC-001', orderId: 'TRD-2024-003', buyerId: 'U02', exporterId: 'U01', amount: 9000, status: 'Funded', dateCreated: '2024-06-21' },
];


// --- CHAT DATA ---

export const CONVERSATIONS: Conversation[] = [
    { id: '1', name: 'Amina Imports', role: 'Buyer', tradeId: 'TRD-2024-002', lastMessage: "Great, I will review the documents and confirm.", timestamp: "10:45 AM", avatar: "AI", online: true },
    { id: '2', name: 'Global Movers', role: 'Logistics', tradeId: 'TRD-2024-001', lastMessage: "The shipment is scheduled to arrive on Tuesday.", timestamp: "9:30 AM", avatar: "GM", online: false },
    { id: '3', name: 'Fatima Agent', role: 'Agent', tradeId: '', lastMessage: "Can you onboard a new farmer group for me?", timestamp: "Yesterday", avatar: "FA", online: true },
];

export const CHAT_MESSAGES: { [key: string]: ChatMessage[] } = {
    '1': [
        { id: '1a', sender: 'contact', content: "Hello, I've received the draft contract for order TRD-2024-002. It looks good.", timestamp: "10:40 AM", avatar: 'AI'},
        { id: '1b', sender: 'user', content: "Perfect, let me know if any changes are needed. I'm preparing the goods for quality inspection.", timestamp: "10:42 AM", isRead: true},
        { id: '1c', sender: 'contact', content: "Great, I will review the documents and confirm.", timestamp: "10:45 AM", avatar: 'AI'},
    ],
    '2': [
        { id: '2a', sender: 'user', content: "Hi, any update on the ETA for shipment SHP-001?", timestamp: "9:25 AM", isRead: true},
        { id: '2b', sender: 'contact', content: "The shipment is scheduled to arrive on Tuesday.", timestamp: "9:30 AM", avatar: 'GM'},
    ],
    '3': [],
};


// --- PERMISSIONS ---

export const PERMISSION_MATRIX: RolePermissions = {
    Exporter: ['dashboard:view', 'chat:read', 'chat:write', 'document:view', 'document:generate', 'finance:view', 'finance:apply', 'marketplace:view', 'product:manage', 'order:read', 'order:manage', 'wallet:view', 'training:view', 'esg:view'],
    Buyer: ['dashboard:view', 'chat:read', 'chat:write', 'document:view', 'finance:view', 'marketplace:view', 'product:read', 'product:discover', 'supplier:manage', 'order:place', 'quality:control', 'inspection:request', 'contract:manage', 'wallet:view', 'training:view'],
    Logistics: ['dashboard:view', 'chat:read', 'chat:write', 'shipment:manage', 'route:plan', 'fleet:manage', 'logistics:document', 'communication:manage', 'pricing:quote', 'insurance:manage', 'customs:clearance'],
    Agent: ['dashboard:view', 'chat:read', 'chat:write', 'client:manage', 'commission:view', 'support:provide', 'market:develop', 'analytics:view', 'user:onboard', 'training:view'],
    Admin: ['dashboard:view', 'chat:read', 'admin:user:manage', 'admin:role:manage', 'admin:system:config', 'admin:content:moderate', 'admin:dispute:resolve', 'admin:financial:oversee', 'admin:analytics:access', 'admin:security:manage', 'admin:compliance:monitor', 'admin:system:maintenance'],
    Guest: ['dashboard:view', 'marketplace:view', 'training:view'],
    GuestExporter: ['dashboard:view', 'marketplace:view', 'product:read', 'order:read', 'esg:view', 'training:view'],
    GuestBuyer: ['dashboard:view', 'marketplace:view', 'product:read', 'product:discover', 'contract:manage', 'training:view'],
};


// --- NAVIGATION ---
const ALL_NAV_ITEMS: NavItemType[] = [
    // Common
    { name: 'Dashboard', icon: IconDashboard, requiredPermission: 'dashboard:view' },
    { name: 'Chat', icon: IconChat, count: 2, mobile: true },
    { name: 'Document Wizard', icon: IconDocument, mobile: true },
    { name: 'Marketplace', icon: IconBox, mobile: true, requiredPermission: 'marketplace:view' },
    { name: 'Training', icon: IconTraining, requiredPermission: 'training:view', mobile: true },
    { name: 'Wallet', icon: IconWallet, mobile: true },
    { name: 'Profile', icon: IconUser },
    // Exporter
    { name: 'Product Management', icon: IconBox, requiredPermission: 'product:manage'},
    { name: 'Order Management', icon: IconDocument, requiredPermission: 'order:manage'},
    { name: 'Request Finance', icon: IconTradeFinance, requiredPermission: 'finance:apply'},
    { name: 'ESG', icon: IconLeaf, requiredPermission: 'esg:view' },
    // Buyer
    { name: 'AI Product Recommendation', icon: IconAIAssistant, requiredPermission: 'product:discover'},
    { name: 'Supplier Management', icon: IconUsers, requiredPermission: 'supplier:manage'},
    { name: 'Order Placement', icon: IconSend, requiredPermission: 'order:place'},
    { name: 'Quality Control', icon: IconCheckCircle, requiredPermission: 'quality:control'},
    { name: 'Request Inspection', icon: IconUserHeadset, requiredPermission: 'inspection:request'},
    { name: 'Contract Management', icon: IconFileDescription, requiredPermission: 'contract:manage'},
    // Logistics
    { name: 'Shipment Management', icon: IconShipmentManagement, requiredPermission: 'shipment:manage' },
    { name: 'Route Planning', icon: IconRoutePlanning, requiredPermission: 'route:plan' },
    { name: 'Fleet Management', icon: IconUsers, requiredPermission: 'fleet:manage' },
    { name: 'Logistics Documentation', icon: IconDocument, requiredPermission: 'logistics:document' },
    { name: 'Communication', icon: IconChat, requiredPermission: 'communication:manage' },
    { name: 'Pricing & Quotes', icon: IconPricingQuotes, requiredPermission: 'pricing:quote' },
    { name: 'Insurance Management', icon: IconInsuranceManagement, requiredPermission: 'insurance:manage' },
    { name: 'Customs Clearance', icon: IconCustomsClearance, requiredPermission: 'customs:clearance' },
    // Agent
    { name: 'Client Management', icon: IconUsers, requiredPermission: 'client:manage' },
    { name: 'Commission Tracking', icon: IconCommissionTracking, requiredPermission: 'commission:view' },
    { name: 'User Onboarding', icon: IconUserPlus, requiredPermission: 'user:onboard' },
    { name: 'Local Support', icon: IconUserHeadset, requiredPermission: 'support:provide' },
    { name: 'Market Development', icon: IconMarketDevelopment, requiredPermission: 'market:develop' },
    { name: 'Basic Analytics', icon: IconBasicAnalytics, requiredPermission: 'analytics:view' },
    // Admin
    { name: 'User Management', icon: IconUserManagement, requiredPermission: 'admin:user:manage' },
    { name: 'Role Management', icon: IconUsers, requiredPermission: 'admin:role:manage' },
    { name: 'System Configuration', icon: IconSystemConfig, requiredPermission: 'admin:system:config' },
    { name: 'Content Moderation', icon: IconContentModeration, requiredPermission: 'admin:content:moderate' },
    { name: 'Dispute Resolution', icon: IconDisputeResolution, requiredPermission: 'admin:dispute:resolve' },
    { name: 'Financial Oversight', icon: IconFinancialOversight, requiredPermission: 'admin:financial:oversee' },
    { name: 'Analytics Access', icon: IconAnalyticsAccess, requiredPermission: 'admin:analytics:access' },
    { name: 'Security Management', icon: IconSecurityManagement, requiredPermission: 'admin:security:manage' },
    { name: 'Compliance Monitoring', icon: IconCompliance, requiredPermission: 'admin:compliance:monitor' },
    { name: 'System Maintenance', icon: IconSystemMaintenance, requiredPermission: 'admin:system:maintenance' },
];

export const getNavItemsForRole = (permissions: Set<Permission>): NavItemType[] => {
    return ALL_NAV_ITEMS.filter(item => {
        if (!item.requiredPermission) return true;
        return permissions.has(item.requiredPermission);
    });
};

export const PAGE_PERMISSIONS: Partial<Record<Page, Permission>> = ALL_NAV_ITEMS.reduce((acc, item) => {
    if (item.requiredPermission) {
        acc[item.name] = item.requiredPermission;
    }
    return acc;
}, {} as Partial<Record<Page, Permission>>);


// --- DASHBOARDS ---

export const DASHBOARD_CONFIGS: Record<UserRole, DashboardConfig> = {
  Exporter: {
    widgets: [
        { title: 'dashboard.exporter.widgets.activeListings.title', icon: IconBox, description: 'dashboard.exporter.widgets.activeListings.description', values: {count: 3} },
        { title: 'dashboard.exporter.widgets.pendingOrders.title', icon: IconDocument, description: 'dashboard.exporter.widgets.pendingOrders.description', values: {count: 2} },
        { title: 'dashboard.exporter.widgets.monthlyRevenue.title', icon: IconTradeFinance, description: 'dashboard.exporter.widgets.monthlyRevenue.description', values: {amount: '$59,000'} },
        { title: 'dashboard.exporter.widgets.esgStatus.title', icon: IconLeaf, description: 'dashboard.exporter.widgets.esgStatus.description', values: { score: 0 } },
    ],
    quickActions: [
        { title: 'dashboard.exporter.quickActions.addProduct', icon: IconBox, page: 'Product Management' },
        { title: 'dashboard.exporter.quickActions.viewOrders', icon: IconDocument, page: 'Order Management' },
        { title: 'dashboard.exporter.quickActions.requestFinance', icon: IconTradeFinance, page: 'Request Finance' },
        { title: 'dashboard.exporter.quickActions.createDocument', icon: IconFileDescription, page: 'Document Wizard' },
        { title: 'dashboard.exporter.quickActions.checkWallet', icon: IconWallet, page: 'Wallet' },
        { title: 'dashboard.exporter.quickActions.marketInsights', icon: IconMarketDevelopment, page: 'Market Development' },
        { title: 'dashboard.exporter.quickActions.training', icon: IconTraining, page: 'Training' },
        { title: 'dashboard.exporter.quickActions.openChat', icon: IconChat, page: 'Chat' },
    ],
  },
  Buyer: {
    widgets: [
        { title: 'dashboard.buyer.widgets.activeOrders.title', icon: IconDocument, description: 'dashboard.buyer.widgets.activeOrders.description', values: {count: 3} },
        { title: 'dashboard.buyer.widgets.pendingInspections.title', icon: IconCheckCircle, description: 'dashboard.buyer.widgets.pendingInspections.description', values: {count: 1} },
        { title: 'dashboard.buyer.widgets.trustedSuppliers.title', icon: IconUsers, description: 'dashboard.buyer.widgets.trustedSuppliers.description', values: {count: 2} },
        { title: 'dashboard.buyer.widgets.inEscrow.title', icon: IconWallet, description: 'dashboard.buyer.widgets.inEscrow.description', values: {amount: '$9,000'} },
    ],
    quickActions: [
        { title: 'dashboard.buyer.quickActions.discoverProducts', icon: IconAIAssistant, page: 'AI Product Recommendation' },
        { title: 'dashboard.buyer.quickActions.placeOrder', icon: IconSend, page: 'Order Placement' },
        { title: 'dashboard.buyer.quickActions.manageSuppliers', icon: IconUsers, page: 'Supplier Management' },
        { title: 'dashboard.buyer.quickActions.viewContracts', icon: IconFileDescription, page: 'Contract Management' },
        { title: 'dashboard.buyer.quickActions.requestInspection', icon: IconUserHeadset, page: 'Request Inspection' },
        { title: 'dashboard.buyer.quickActions.openChat', icon: IconChat, page: 'Chat' },
    ],
  },
  Logistics: {
     widgets: [
        { title: 'dashboard.logistics.widgets.inTransit.title', icon: IconShipmentManagement, description: 'dashboard.logistics.widgets.inTransit.description', values: {count: 1} },
        { title: 'dashboard.logistics.widgets.pendingPickup.title', icon: IconBox, description: 'dashboard.logistics.widgets.pendingPickup.description', values: {count: 1} },
        { title: 'dashboard.logistics.widgets.availableVehicles.title', icon: IconUsers, description: 'dashboard.logistics.widgets.availableVehicles.description', values: {count: 1} },
        { title: 'dashboard.logistics.widgets.documentation.title', icon: IconDocument, description: 'dashboard.logistics.widgets.documentation.description', values: {count: 3} },
    ],
    quickActions: [
        { title: 'dashboard.logistics.quickActions.manageShipments', icon: IconShipmentManagement, page: 'Shipment Management' },
        { title: 'dashboard.logistics.quickActions.planRoute', icon: IconRoutePlanning, page: 'Route Planning' },
        { title: 'dashboard.logistics.quickActions.fleet', icon: IconUsers, page: 'Fleet Management' },
        { title: 'dashboard.logistics.quickActions.quotes', icon: IconPricingQuotes, page: 'Pricing & Quotes' },
        { title: 'dashboard.logistics.quickActions.customs', icon: IconCustomsClearance, page: 'Customs Clearance' },
        { title: 'dashboard.logistics.quickActions.chat', icon: IconChat, page: 'Communication' },
    ],
  },
  Agent: {
     widgets: [
        { title: 'dashboard.agent.widgets.activeClients.title', icon: IconUsers, description: 'dashboard.agent.widgets.activeClients.description', values: {count: 2} },
        { title: 'dashboard.agent.widgets.pendingCommissions.title', icon: IconCommissionTracking, description: 'dashboard.agent.widgets.pendingCommissions.description', values: {amount: '$2,200'} },
        { title: 'dashboard.agent.widgets.openTickets.title', icon: IconUserHeadset, description: 'dashboard.agent.widgets.openTickets.description', values: {count: 0} },
        { title: 'dashboard.agent.widgets.newLeads.title', icon: IconMarketDevelopment, description: 'dashboard.agent.widgets.newLeads.description', values: {count: 5} },
    ],
    quickActions: [
        { title: 'dashboard.agent.quickActions.onboardClient', icon: IconUserPlus, page: 'User Onboarding' },
        { title: 'dashboard.agent.quickActions.manageClients', icon: IconUsers, page: 'Client Management' },
        { title: 'dashboard.agent.quickActions.trackCommissions', icon: IconCommissionTracking, page: 'Commission Tracking' },
        { title: 'dashboard.agent.quickActions.provideSupport', icon: IconUserHeadset, page: 'Local Support' },
        { title: 'dashboard.agent.quickActions.findOpportunities', icon: IconMarketDevelopment, page: 'Market Development' },
        { title: 'dashboard.agent.quickActions.viewAnalytics', icon: IconBasicAnalytics, page: 'Basic Analytics' },
    ],
  },
  Admin: {
    widgets: [
        { title: 'dashboard.admin.widgets.totalUsers.title', icon: IconUsers, description: 'dashboard.admin.widgets.totalUsers.description', values: {count: 5} },
        { title: 'dashboard.admin.widgets.openDisputes.title', icon: IconDisputeResolution, description: 'dashboard.admin.widgets.openDisputes.description', values: {count: 1} },
        { title: 'dashboard.admin.widgets.pendingContent.title', icon: IconContentModeration, description: 'dashboard.admin.widgets.pendingContent.description', values: {count: 1} },
        { title: 'dashboard.admin.widgets.systemStatus.title', icon: IconSystemConfig, description: 'dashboard.admin.widgets.systemStatus.description' },
    ],
    quickActions: [
        { title: 'dashboard.admin.quickActions.manageUsers', icon: IconUserManagement, page: 'User Management' },
        { title: 'dashboard.admin.quickActions.manageRoles', icon: IconUsers, page: 'Role Management' },
        { title: 'dashboard.admin.quickActions.resolveDisputes', icon: IconDisputeResolution, page: 'Dispute Resolution' },
        { title: 'dashboard.admin.quickActions.systemConfig', icon: IconSystemConfig, page: 'System Configuration' },
        { title: 'dashboard.admin.quickActions.security', icon: IconSecurityManagement, page: 'Security Management' },
        { title: 'dashboard.admin.quickActions.maintenance', icon: IconSystemMaintenance, page: 'System Maintenance' },
    ],
  },
  Guest: {
    widgets: [
        { title: 'dashboard.guest.widgets.welcome.title', icon: IconLogo, description: 'dashboard.guest.widgets.welcome.description' },
        { title: 'dashboard.guest.widgets.explore.title', icon: IconBox, description: 'dashboard.guest.widgets.explore.description' },
    ],
    quickActions: [
        { title: 'dashboard.guest.quickActions.browseMarketplace', icon: IconBox, page: 'Marketplace' },
        { title: 'dashboard.guest.quickActions.viewTraining', icon: IconTraining, page: 'Training' },
    ],
  },
  GuestExporter: {
    widgets: [
        { title: 'dashboard.exporter.widgets.activeListings.title', icon: IconBox, description: 'dashboard.exporter.widgets.activeListings.description', values: {count: 3} },
        { title: 'dashboard.exporter.widgets.pendingOrders.title', icon: IconDocument, description: 'dashboard.exporter.widgets.pendingOrders.description', values: {count: 2} },
        { title: 'dashboard.exporter.widgets.monthlyRevenue.title', icon: IconTradeFinance, description: 'dashboard.exporter.widgets.monthlyRevenue.description', values: {amount: '$59,000'} },
        { title: 'dashboard.exporter.widgets.esgStatus.title', icon: IconLeaf, description: 'dashboard.exporter.widgets.esgStatus.description', values: { score: 75 } },
    ],
    quickActions: [
        { title: 'dashboard.exporter.quickActions.marketInsights', icon: IconMarketDevelopment, page: 'Market Development' },
        { title: 'dashboard.exporter.quickActions.training', icon: IconTraining, page: 'Training' },
        { title: 'dashboard.exporter.quickActions.checkWallet', icon: IconWallet, page: 'Wallet' },
    ],
  },
  GuestBuyer: {
    widgets: [
        { title: 'dashboard.buyer.widgets.activeOrders.title', icon: IconDocument, description: 'dashboard.buyer.widgets.activeOrders.description', values: {count: 0} },
        { title: 'dashboard.buyer.widgets.pendingInspections.title', icon: IconCheckCircle, description: 'dashboard.buyer.widgets.pendingInspections.description', values: {count: 0} },
        { title: 'dashboard.buyer.widgets.trustedSuppliers.title', icon: IconUsers, description: 'dashboard.buyer.widgets.trustedSuppliers.description', values: {count: 0} },
        { title: 'dashboard.buyer.widgets.inEscrow.title', icon: IconWallet, description: 'dashboard.buyer.widgets.inEscrow.description', values: {amount: '$0'} },
    ],
    quickActions: [
        { title: 'dashboard.buyer.quickActions.discoverProducts', icon: IconAIAssistant, page: 'AI Product Recommendation' },
        { title: 'dashboard.buyer.quickActions.viewContracts', icon: IconFileDescription, page: 'Contract Management' },
    ],
  },
};


// --- NOTIFICATIONS ---
export const NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'order', title: 'New Order Received', description: 'Order TRD-2024-003 for Artisanal Shea Butter.', timestamp: '1h ago', isRead: false, linkTo: 'Order Management' },
  { id: '2', type: 'chat', title: 'New Message from Amina', description: 'Great, I will review the documents...', timestamp: '2h ago', isRead: false, linkTo: 'Chat' },
  { id: '3', type: 'payment', title: 'Payment Received', description: '$15,000 received for order TRD-2024-001.', timestamp: '1d ago', isRead: true, linkTo: 'Wallet' },
];

export const DYNAMIC_NOTIFICATIONS: Omit<Notification, 'id' | 'timestamp' | 'isRead'>[] = [
    { type: 'document', title: 'notification.doc.title', description: 'notification.doc.desc', linkTo: 'Document Wizard' },
    { type: 'system', title: 'notification.system.title', description: 'notification.system.desc', linkTo: 'Profile' },
    { type: 'payment', title: 'notification.payment.title', description: 'notification.payment.desc', linkTo: 'Wallet' },
];
