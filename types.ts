
import React from "react";

export type Page = 
  | 'Dashboard' 
  | 'Chat' 
  | 'Document Wizard' 
  | 'Request Finance' 
  | 'Marketplace' 
  | 'Training' 
  | 'Wallet' 
  | 'Profile'
  | 'Product Management'
  | 'Order Management'
  | 'AI Product Recommendation'
  | 'Supplier Management'
  | 'Order Placement'
  | 'Quality Control'
  | 'Request Inspection'
  | 'Contract Management'
  | 'Shipment Management'
  | 'Route Planning'
  | 'Fleet Management'
  | 'Logistics Documentation'
  | 'Communication'
  | 'Pricing & Quotes'
  | 'Insurance Management'
  | 'Customs Clearance'
  | 'Client Management'
  | 'Commission Tracking'
  | 'Training Access'
  | 'Local Support'
  | 'Market Development'
  | 'Basic Analytics'
  | 'User Onboarding'
  | 'User Management'
  | 'Role Management'
  | 'System Configuration'
  | 'Content Moderation'
  | 'Dispute Resolution'
  | 'Financial Oversight'
  | 'Analytics Access'
  | 'Security Management'
  | 'Compliance Monitoring'
  | 'System Maintenance'
  | 'ESG';

export type UserRole = 'Exporter' | 'Buyer' | 'Logistics' | 'Agent' | 'Admin' | 'Guest' | 'GuestExporter' | 'GuestBuyer';

export type PermissionScope = 'own' | 'all' | 'assigned' | 'none';

export type Permission = `${string}:${string}`; // e.g., 'product:create'

export interface ESGMetrics {
  score: number;
  metrics: {
    environmental: number;
    social: number;
    governance: number;
  };
}

export interface ESGCriterion {
    id: string;
    nameKey: string;
    descriptionKey: string;
    status: 'Certified' | 'In Progress' | 'Not Started';
    category: 'environmental' | 'social' | 'governance';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  permissions: Set<Permission>;
  kycCompleted?: boolean;
  esgMetrics?: ESGMetrics;
}

export interface DashboardWidget {
  title: string; // This will be a translation key
  icon: React.ElementType;
  description: string; // This will be a translation key
  values?: Record<string, string | number>; // For interpolation
}

export interface QuickAction {
  title: string; // This will be a translation key
  icon: React.ElementType;
  page: Page;
}

export interface DashboardConfig {
  widgets: DashboardWidget[];
  quickActions: QuickAction[];
}

export interface NavItemType {
  name: Page;
  icon: React.ElementType;
  count?: number;
  isNew?: boolean;
  requiredPermission?: Permission;
  mobile?: boolean;
}

export interface FormField {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'date' | 'number';
    required: boolean;
    placeholder?: string;
    options?: string[];
    gridCols?: number;
    section: 'company' | 'invoiceInfo' | 'billTo' | 'shipTo' | 'details' | 'summary' | 'footer' |
             'shipperExporter' | 'consignee' | 'shippingInfo' | 'productDetails' | 'declaration' |
             'applicant' | 'beneficiary' | 'issuingBank' | 'advisingBank' | 'creditDetails' | 'documentRequirements' |
             'shipper' | 'shipmentDetails' | 'packageSummary' |
             'applicantInfo' | 'productInfo' | 'destinationInfo' | 'endUserInfo' |
             'parties' | 'goods' | 'payment' | 'delivery' | 'clauses';
}


export interface FileAttachment {
  name: string;
  size: string;
  type: 'pdf' | 'docx' | 'png' | 'zip' | 'generic';
}

export interface VoiceNote {
  duration: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'contact';
  content?: string;
  timestamp: string;
  avatar?: string;
  file?: FileAttachment;
  voiceNote?: VoiceNote;
  isRead?: boolean;
}

export interface Conversation {
  id:string;
  name: string;
  role: UserRole;
  tradeId: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  online: boolean;
}

export interface Product {
  id: number | string;
  name: string;
  description: string;
  exporterId: string;
  price: number;
  stock: number;
  status: 'Active' | 'Draft';
  image: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
export interface Order {
  id: string;
  productName: string;
  customer: string;
  buyerId: string;
  exporterId: string;
  status: OrderStatus;
  amount: number;
  date: string;
  qualityStatus?: 'Not Inspected' | 'Pending' | 'Passed' | 'Failed';
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  avatar: string;
  productsCount: number;
  rating: number; // out of 5
  status: 'Preferred' | 'Active' | 'Blocked';
  exporterId: string; // link to user
}

export interface Contract {
  id: string;
  supplierName: string;
  buyerId: string;
  exporterId: string; // link to user
  status: 'Draft' | 'Active' | 'Completed' | 'Terminated';
  date: string;
  documentUrl: string;
}

// --- LOGISTICS TYPES ---

export type ShipmentStatus = 'Pending Pickup' | 'In Transit' | 'Delayed' | 'At Customs' | 'Delivered';
export interface Shipment {
  id: string;
  orderId: string;
  status: ShipmentStatus;
  origin: string;
  destination: string;
  carrier: string;
  estimatedDelivery: string;
  trackingNumber: string;
  driverId?: string;
  vehicleId?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'Truck' | 'Van' | 'Ship' | 'Plane';
  status: 'Available' | 'On Route' | 'Maintenance' | 'Inactive';
  driverId?: string;
  currentLocation: string;
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  status: 'Available' | 'On Duty' | 'Off Duty';
}

export interface LogisticsDocument {
    id: string;
    type: 'Bill of Lading' | 'Commercial Invoice' | 'Packing List' | 'Certificate of Origin';
    shipmentId: string;
    status: 'Pending' | 'Submitted' | 'Approved' | 'Rejected';
    url: string;
}

export interface Quote {
    id: string;
    customerName: string;
    origin: string;
    destination: string;
    freightCost: number;
    insuranceCost: number;
    totalCost: number;
    status: 'Draft' | 'Sent' | 'Accepted' | 'Declined';
    date: string;
}

export interface InsuranceClaim {
    id: string;
    shipmentId: string;
    claimAmount: number;
    reason: string;
    status: 'Filed' | 'In Review' | 'Approved' | 'Denied';
    dateFiled: string;
}

export interface CustomsFiling {
    id: string;
    shipmentId: string;
    declarationNumber: string;
    status: 'Pending' | 'Filed' | 'Cleared' | 'Rejected';
    dutyAmount: number;
    dateFiled: string;
}

export interface CommunicationMessage {
    id: string;
    shipmentId: string;
    sender: 'Logistics' | 'Buyer' | 'Exporter';
    content: string;
    timestamp: string;
}

// --- AGENT TYPES ---
export interface Client {
    id: string;
    name: string;
    type: 'Farmer' | 'Exporter' | 'Buyer';
    status: 'Active' | 'Pending Verification' | 'Inactive';
    location: string;
    joinDate: string;
    agentId: string;
}

export interface Commission {
    id:string;
    orderId: string;
    clientId: string;
    clientName: string;
    amount: number;
    status: 'Paid' | 'Unpaid';
    date: string;
    agentId: string;
}

export interface SupportTicket {
    id: string;
    clientId: string;
    clientName: string;
    agentId: string;
    issue: string;
    status: 'Open' | 'In Progress' | 'Resolved';
    dateCreated: string;
    conversation: { sender: 'Agent' | 'Client'; message: string; timestamp: string }[];
}

export interface MarketOpportunity {
    id: string;
    title: string;
    description: string;
}

// --- ADMIN TYPES ---
export interface Dispute {
    id: string;
    orderId: string;
    parties: string[];
    reason: string;
    status: 'Open' | 'In Review' | 'Resolved';
    dateFiled: string;
}

export interface ContentItem {
    id: string;
    type: 'Product Listing' | 'User Profile';
    submittedBy: string;
    contentSummary: string;
    dateSubmitted: string;
}

export interface SystemSettings {
    registrationsEnabled: boolean;
    emailVerificationRequired: boolean;
    strongPasswordsEnforced: boolean;
    papssEnabled: boolean;
    maintenanceMode: boolean;
    maintenanceMessage: string;
}

export type RolePermissions = Record<UserRole, Permission[]>;

// --- NOTIFICATIONS ---
export type NotificationType = 'order' | 'chat' | 'payment' | 'document' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string; // e.g., "5m ago", "2h ago"
  isRead: boolean;
  linkTo?: Page; // Optional page to navigate to
}


// --- WALLET / ESCROW ---
export type WalletTab = 'Overview' | 'Transactions' | 'Exchange' | 'Wallets' | 'PAPSS' | 'Escrow' | 'Trade Passport' | 'Settings';

export type EscrowStatus = 'Awaiting Funds' | 'Funded' | 'Released' | 'Disputed' | 'Cancelled';

export interface EscrowAgreement {
  id: string;
  orderId: string;
  buyerId: string;
  exporterId: string;
  amount: number;
  status: EscrowStatus;
  dateCreated: string;
}

// --- ESG ---
export interface GreenFinanceOption {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ElementType;
}
