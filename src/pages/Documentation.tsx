import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Printer, Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Documentation() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation - Hidden when printing */}
      <nav className="print:hidden sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Button onClick={handlePrint} size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print / Save as PDF
          </Button>
        </div>
      </nav>

      {/* Documentation Content */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Title Page */}
        <div className="text-center mb-16 print:mb-8">
          <h1 className="text-5xl font-bold mb-4">
            Smart Agriculture and Factory Marketplace Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            IoT-Based Direct Trading Platform
          </p>
          <p className="text-sm text-muted-foreground">
            Project Documentation & System Architecture
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="mb-12 print:break-inside-avoid">
          <CardHeader>
            <CardTitle>Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 list-decimal list-inside">
              <li className="font-medium">Project Overview</li>
              <li className="font-medium">Technology Stack</li>
              <li className="font-medium text-primary">Complete System Summary Diagram</li>
              <li className="font-medium">System Architecture</li>
              <li className="font-medium">Use Case Diagram</li>
              <li className="font-medium">Sequence Diagram</li>
              <li className="font-medium">Dataflow Diagram</li>
              <li className="font-medium">ER (Entity Relationship) Diagram</li>
              <li className="font-medium">Authentication Flow Diagram</li>
              <li className="font-medium">Component Architecture Diagram</li>
              <li className="font-medium">Database Schema</li>
              <li className="font-medium">Key Features</li>
              <li className="font-medium">User Flows</li>
              <li className="font-medium">Security & RLS Policies</li>
              <li className="font-medium">IoT Integration (Planned)</li>
            </ol>
          </CardContent>
        </Card>

        {/* 1. Project Overview */}
        <section className="mb-12 print:break-inside-avoid">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">1. Project Overview</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Problem Statement</h3>
              <p className="text-muted-foreground">
                Traditional agricultural supply chains involve multiple middlemen, resulting in lower profits for farmers 
                and higher costs for factories. There's a lack of direct market access and transparent pricing mechanisms.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Solution</h3>
              <p className="text-muted-foreground">
                A digital marketplace platform that connects farmers directly with industrial consumers (factories), 
                eliminating intermediaries and enabling fair pricing for both parties.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Objectives</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Create a direct trading platform between farmers and factories</li>
                <li>Provide transparent pricing and real-time marketplace</li>
                <li>Enable requirement posting and purchase request management</li>
                <li>Support IoT-based smart farming (future enhancement)</li>
                <li>Ensure secure data handling with Row-Level Security</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Technology Stack */}
        <section className="mb-12 print:break-inside-avoid">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">2. Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>Framework:</strong> React 18 with TypeScript</li>
                  <li><strong>Build Tool:</strong> Vite</li>
                  <li><strong>Styling:</strong> Tailwind CSS</li>
                  <li><strong>UI Components:</strong> shadcn/ui</li>
                  <li><strong>Routing:</strong> React Router v6</li>
                  <li><strong>State Management:</strong> React Context API</li>
                  <li><strong>Data Fetching:</strong> TanStack Query</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Backend & Database</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>Platform:</strong> Lovable Cloud (Supabase)</li>
                  <li><strong>Database:</strong> PostgreSQL</li>
                  <li><strong>Authentication:</strong> Supabase Auth</li>
                  <li><strong>Real-time:</strong> Supabase Realtime</li>
                  <li><strong>Serverless Functions:</strong> Edge Functions (Deno)</li>
                  <li><strong>Security:</strong> Row-Level Security (RLS)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 3. Complete System Summary Diagram */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">3. Complete System Summary Diagram</h2>
          <p className="text-muted-foreground mb-6">
            This comprehensive diagram combines the System Overview, Feature Summary, and Data Flow into one unified visual representation of the entire Farm2Factory platform.
          </p>
          <div className="bg-muted/30 p-6 rounded-lg mb-6">
            <pre className="text-xs overflow-x-auto whitespace-pre">
{`╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                    FARM2FACTORY - COMPLETE SYSTEM SUMMARY                                         ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                                                    ║
║   ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐    ║
║   │                                         USERS / ACTORS                                                   │    ║
║   │                                                                                                          │    ║
║   │      👨‍🌾 FARMER                                                           🏭 FACTORY                       │    ║
║   │   ┌─────────────────┐                                                 ┌─────────────────┐               │    ║
║   │   │  • List Crops   │                                                 │ • Post Needs    │               │    ║
║   │   │  • View Requests│                                                 │ • Browse Crops  │               │    ║
║   │   │  • Accept/Reject│                                                 │ • Send Requests │               │    ║
║   │   │  • IoT Monitor  │                                                 │ • Track Orders  │               │    ║
║   │   └────────┬────────┘                                                 └────────┬────────┘               │    ║
║   └────────────┼────────────────────────────────────────────────────────────────────┼────────────────────────┘    ║
║                │                                                                    │                             ║
║                └──────────────────────────┬─────────────────────────────────────────┘                             ║
║                                           ▼                                                                       ║
║   ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐    ║
║   │                                      FRONTEND (React + TypeScript)                                       │    ║
║   │  ┌───────────┐  ┌───────────────┐  ┌────────────────┐  ┌─────────────┐  ┌──────────────┐               │    ║
║   │  │  Landing  │  │   Auth Page   │  │  Marketplace   │  │   Farmer    │  │   Factory    │               │    ║
║   │  │   Page    │  │ Login/Signup  │  │   (Browse)     │  │  Dashboard  │  │  Dashboard   │               │    ║
║   │  └─────┬─────┘  └───────┬───────┘  └───────┬────────┘  └──────┬──────┘  └──────┬───────┘               │    ║
║   │        │                │                  │                  │                 │                       │    ║
║   │        └────────────────┴──────────────────┴──────────────────┴─────────────────┘                       │    ║
║   │                                            │                                                             │    ║
║   │                              ┌─────────────┴─────────────┐                                               │    ║
║   │                              │     AuthContext           │                                               │    ║
║   │                              │  (Session Management)     │                                               │    ║
║   │                              └─────────────┬─────────────┘                                               │    ║
║   │                                            │                                                             │    ║
║   │                              ┌─────────────┴─────────────┐                                               │    ║
║   │                              │   Supabase Client         │                                               │    ║
║   │                              │  + TanStack React Query   │                                               │    ║
║   │                              └─────────────┬─────────────┘                                               │    ║
║   └────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┘    ║
║                                                │                                                                  ║
║                          ┌─────────────────────┼─────────────────────┐                                           ║
║                          │ HTTPS/WSS          │                      │                                           ║
║                          ▼                    ▼                      ▼                                           ║
║   ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐    ║
║   │                                    LOVABLE CLOUD (Backend)                                               │    ║
║   │                                                                                                          │    ║
║   │   ┌───────────────┐    ┌─────────────────────┐    ┌──────────────────┐    ┌──────────────────────┐     │    ║
║   │   │  Auth Service │    │  Realtime Service   │    │  Edge Functions  │    │   Storage Service    │     │    ║
║   │   │               │    │                     │    │                  │    │                      │     │    ║
║   │   │ • JWT Tokens  │    │ • Live Updates      │    │ • receive-sensor │    │ • Crop Images        │     │    ║
║   │   │ • Session Mgmt│    │ • Subscriptions     │    │ • control-pump   │    │ • Profile Avatars    │     │    ║
║   │   │ • RLS Enforce │    │ • Broadcast         │    │ • Custom Logic   │    │ • Documents          │     │    ║
║   │   └───────┬───────┘    └──────────┬──────────┘    └────────┬─────────┘    └──────────┬───────────┘     │    ║
║   │           │                       │                        │                         │                  │    ║
║   │           └───────────────────────┴────────────────────────┴─────────────────────────┘                  │    ║
║   │                                                │                                                         │    ║
║   └────────────────────────────────────────────────┼─────────────────────────────────────────────────────────┘    ║
║                                                    ▼                                                              ║
║   ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐    ║
║   │                                   PostgreSQL DATABASE                                                    │    ║
║   │                                                                                                          │    ║
║   │   ┌─────────────────────────────────────┐    ┌─────────────────────────────────────┐                    │    ║
║   │   │         USER MANAGEMENT             │    │           MARKETPLACE               │                    │    ║
║   │   │  ┌──────────┐  ┌──────────────┐    │    │  ┌──────────┐  ┌──────────────┐    │                    │    ║
║   │   │  │ profiles │──│   farmers    │    │    │  │  crops   │  │ requirements │    │                    │    ║
║   │   │  │          │──│   factories  │    │    │  │          │  │              │    │                    │    ║
║   │   │  └──────────┘  └──────────────┘    │    │  └────┬─────┘  └──────┬───────┘    │                    │    ║
║   │   └─────────────────────────────────────┘    │       │              │            │                    │    ║
║   │                                              │       └──────┬───────┘            │                    │    ║
║   │   ┌─────────────────────────────────────┐   │              ▼                     │                    │    ║
║   │   │           IoT DATA                  │   │    ┌──────────────────┐            │                    │    ║
║   │   │  ┌─────────────┐ ┌───────────────┐  │   │    │purchase_requests │            │                    │    ║
║   │   │  │ iot_devices │ │moisture_readings│ │   │    └──────────────────┘            │                    │    ║
║   │   │  │             │ │               │  │   └─────────────────────────────────────┘                    │    ║
║   │   │  └──────┬──────┘ └───────────────┘  │                                                              │    ║
║   │   │         │        ┌───────────────┐  │                                                              │    ║
║   │   │         └────────│  pump_actions │  │                                                              │    ║
║   │   │                  └───────────────┘  │                                                              │    ║
║   │   └─────────────────────────────────────┘                                                              │    ║
║   │                                                                                                         │    ║
║   │   ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐  │    ║
║   │   │                              ROW LEVEL SECURITY (RLS)                                            │  │    ║
║   │   │  • Farmers: CRUD own crops, view received requests, manage IoT devices                          │  │    ║
║   │   │  • Factories: CRUD own requirements, view sent requests, browse marketplace                     │  │    ║
║   │   │  • Public: View available crops & active requirements                                            │  │    ║
║   │   └─────────────────────────────────────────────────────────────────────────────────────────────────┘  │    ║
║   └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘    ║
║                                                    ▲                                                              ║
║                                                    │                                                              ║
║   ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐    ║
║   │                                      IoT DEVICES (Future)                                                │    ║
║   │                                                                                                          │    ║
║   │      ┌─────────────┐         ┌─────────────┐         ┌─────────────┐         ┌─────────────┐            │    ║
║   │      │   ESP32 /   │         │    Soil     │  Data   │  Temperature│         │   Water     │            │    ║
║   │      │   ESP8266   │◄────────│  Moisture   │◄────────│   Sensor    │         │    Pump     │            │    ║
║   │      │Microcontroller│        │   Sensor    │         │             │         │  (12V DC)   │            │    ║
║   │      └──────┬──────┘         └─────────────┘         └─────────────┘         └──────┬──────┘            │    ║
║   │             │                                                                        │                   │    ║
║   │             │  HTTP POST to Edge Function                    Control Signal          │                   │    ║
║   │             │  (moisture < 30% → auto-trigger)  ─────────────────────────────────────┘                   │    ║
║   │             │                                                                                            │    ║
║   └─────────────┼────────────────────────────────────────────────────────────────────────────────────────────┘    ║
║                 │                                                                                                 ║
╠═════════════════╧═════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                              DATA FLOW SUMMARY                                                    ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                                                   ║
║   [FARMER]                                    [FACTORY]                           [IoT DEVICES]                  ║
║      │                                            │                                     │                        ║
║      │ 1. Register/Login                          │ 1. Register/Login                   │                        ║
║      ▼                                            ▼                                     │                        ║
║   [AuthContext] ──────────────────────────► [AuthContext]                               │                        ║
║      │                                            │                                     │                        ║
║      │ 2. Add Crops                               │ 2. Post Requirements                │ Sensor Data            ║
║      ▼                                            ▼                                     ▼                        ║
║   [crops table] ◄─────── View ─────────────► [requirements] ◄──────────── [receive-sensor-data]                 ║
║      │                                            │                                     │                        ║
║      │ 3. Factory sends request                   │                                     │                        ║
║      ▼                                            │                                     │                        ║
║   [purchase_requests] ◄───────────────────────────┘                                     │                        ║
║      │                                                                                  │                        ║
║      │ 4. Real-time notification                                                        │                        ║
║      ▼                                                                                  │                        ║
║   [Farmer Dashboard] ◄──── Realtime Subscribe ───────────────────────────────────────────                        ║
║      │                                                                                  │                        ║
║      │ 5. Accept/Reject                                                                 │                        ║
║      ▼                                                                                  │                        ║
║   [Status Update] ────► Real-time to Factory ────► [Factory Dashboard]                  │                        ║
║                                                                                         │                        ║
║   [IoT Monitor] ◄───── moisture_readings ◄──────────────────────────────────────────────┘                        ║
║      │                                                                                                           ║
║      │ Auto/Manual Pump Control                                                                                  ║
║      ▼                                                                                                           ║
║   [control-pump] ────► [pump_actions] ────► [Physical Pump]                                                      ║
║                                                                                                                   ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝`}
            </pre>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">System Overview</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-xs">
                Shows all major components: Users, Frontend pages, Backend services, Database tables, and IoT devices in a layered architecture.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Feature Summary</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-xs">
                Displays all features per user type - Farmers can list crops, manage IoT, handle requests. Factories can post needs and browse marketplace.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Data Flow</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-xs">
                Illustrates complete data journey from user actions through frontend, backend services, database tables, and IoT device communication.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 4. System Architecture */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">4. System Architecture</h2>
          <div className="bg-muted/30 p-6 rounded-lg mb-6">
            <pre className="text-xs overflow-x-auto whitespace-pre">
{`┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                                   │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────┐  ┌──────────────┐  │
│  │ Landing  │  │    Farmer    │  │    Factory    │  │     Auth     │  │
│  │   Page   │  │   Dashboard  │  │   Dashboard   │  │   & Profile  │  │
│  └──────────┘  └──────────────┘  └───────────────┘  └──────────────┘  │
│                          ↓ React Router ↓                               │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                       APPLICATION LAYER                                 │
│  ┌──────────────┐  ┌─────────────────┐  ┌────────────────────────┐    │
│  │ Auth Context │→ │ Supabase Client │→ │  Real-time Listeners   │    │
│  └──────────────┘  └─────────────────┘  └────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                     LOVABLE CLOUD / BACKEND                             │
│  ┌──────────────┐  ┌─────────────────┐  ┌────────────────────────┐    │
│  │ Auth Service │  │   PostgreSQL    │  │   Edge Functions       │    │
│  │  (RLS + JWT) │  │    Database     │  │  (Serverless Logic)    │    │
│  └──────────────┘  └─────────────────┘  └────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATABASE TABLES                                 │
│  ┌──────────┐ ┌─────────┐ ┌──────────┐ ┌─────────────────────────┐    │
│  │ profiles │ │ farmers │ │factories │ │  crops & requirements   │    │
│  └──────────┘ └─────────┘ └──────────┘ └─────────────────────────┘    │
│  ┌──────────────────┐ ┌─────────────┐ ┌──────────────────────────┐    │
│  │ purchase_requests│ │ iot_devices │ │ moisture_readings (IoT)  │    │
│  └──────────────────┘ └─────────────┘ └──────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘`}
            </pre>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Layer Descriptions:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li><strong>Client Layer:</strong> React-based UI components for different user roles</li>
                <li><strong>Application Layer:</strong> Context providers, routing, and API communication</li>
                <li><strong>Backend Layer:</strong> Lovable Cloud services for auth, database, and serverless functions</li>
                <li><strong>Database Layer:</strong> PostgreSQL tables with RLS policies for data security</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Use Case Diagram */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">5. Use Case Diagram</h2>
          <div className="bg-muted/30 p-6 rounded-lg mb-4">
            <div className="mermaid-container">
              <pre className="text-xs overflow-x-auto whitespace-pre">
{`@startuml
left to right direction
skinparam actorStyle awesome

actor Farmer
actor Factory
actor System

rectangle "Farm2Factory Platform" {
  usecase "Sign Up / Login" as UC1
  usecase "Create Profile" as UC2
  usecase "List Crops for Sale" as UC3
  usecase "View Marketplace" as UC4
  usecase "Post Requirements" as UC5
  usecase "Send Purchase Request" as UC6
  usecase "View Purchase Requests" as UC7
  usecase "Accept/Reject Request" as UC8
  usecase "Manage IoT Devices" as UC9
  usecase "Monitor Sensors" as UC10
  usecase "Control Irrigation" as UC11
}

' Farmer Use Cases
Farmer --> UC1
Farmer --> UC2
Farmer --> UC3
Farmer --> UC4
Farmer --> UC7
Farmer --> UC8
Farmer --> UC9
Farmer --> UC10
Farmer --> UC11

' Factory Use Cases
Factory --> UC1
Factory --> UC2
Factory --> UC4
Factory --> UC5
Factory --> UC6

' System Relationships
UC1 ..> UC2 : <<include>>
UC3 ..> UC4 : <<extend>>
UC5 ..> UC4 : <<extend>>
UC6 ..> UC7 : triggers
UC9 ..> UC10 : enables
UC10 ..> UC11 : triggers

System --> UC10 : "Automated Alerts"
System --> UC11 : "Automatic Irrigation"

note right of UC9
  IoT Feature (Planned)
  - Soil Moisture Sensors
  - Temperature Monitoring
  - Pump Control
end note

@enduml`}
              </pre>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold mb-2">Actor Descriptions:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li><strong>Farmer:</strong> Agricultural producer who lists crops and manages IoT devices</li>
              <li><strong>Factory:</strong> Industrial buyer who posts requirements and sends purchase requests</li>
              <li><strong>System:</strong> Automated platform features (alerts, irrigation control)</li>
            </ul>
          </div>
        </section>

        {/* 6. Sequence Diagram */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">6. Sequence Diagram - Purchase Request Flow</h2>
          <div className="bg-muted/30 p-6 rounded-lg mb-4">
            <div className="mermaid-container">
              <pre className="text-xs overflow-x-auto whitespace-pre">
{`sequenceDiagram
    participant F as Factory User
    participant UI as React Frontend
    participant Auth as Auth Context
    participant DB as Database
    participant RT as Realtime Service
    participant FR as Farmer User

    Note over F,FR: Purchase Request Workflow

    F->>UI: Browse Marketplace
    UI->>DB: Query available crops
    DB-->>UI: Return crops list
    UI-->>F: Display crops

    F->>UI: Select crop & send request
    UI->>Auth: Verify factory auth
    Auth-->>UI: Token valid
    
    UI->>DB: INSERT purchase_request
    Note over DB: RLS Policy Check:<br/>Factory owns request
    DB-->>UI: Request created
    
    DB->>RT: Notify new request
    RT->>FR: Push notification
    
    UI-->>F: Show success message
    
    Note over FR: Farmer receives notification
    FR->>UI: View requests
    UI->>DB: Query farmer's requests
    DB-->>UI: Return requests
    UI-->>FR: Display requests

    FR->>UI: Accept/Reject request
    UI->>Auth: Verify farmer auth
    Auth-->>UI: Token valid
    
    UI->>DB: UPDATE purchase_request status
    Note over DB: RLS Policy Check:<br/>Farmer owns crop
    DB-->>UI: Status updated
    
    alt Request Accepted
        DB->>DB: UPDATE crop.available = false
        DB->>RT: Notify status change
        RT->>F: Push notification (Accepted)
        UI-->>FR: Show success
    else Request Rejected
        DB->>RT: Notify status change
        RT->>F: Push notification (Rejected)
        UI-->>FR: Show confirmation
    end`}
              </pre>
            </div>
          </div>
        </section>

        {/* 7. Dataflow Diagram */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">7. Dataflow Diagram</h2>
          <div className="bg-muted/30 p-6 rounded-lg mb-4">
            <div className="mermaid-container">
              <pre className="text-xs overflow-x-auto whitespace-pre">
{`flowchart TB
    subgraph External["External Entities"]
        A1[Farmer User]
        A2[Factory User]
        A3[IoT Devices ESP32/ESP8266]
    end

    subgraph Frontend["Frontend Layer - React App"]
        B1[Authentication]
        B2[Farmer Dashboard]
        B3[Factory Dashboard]
        B4[Marketplace]
    end

    subgraph Backend["Backend Layer - Lovable Cloud"]
        C1[Auth Service]
        C2[Database PostgreSQL]
        C3[Edge Functions]
        C4[Realtime Service]
    end

    subgraph Data["Data Stores"]
        D1[(profiles)]
        D2[(crops)]
        D3[(requirements)]
        D4[(purchase_requests)]
        D5[(iot_devices)]
        D6[(moisture_readings)]
    end

    %% Authentication Flow
    A1 & A2 -->|Login/Signup| B1
    B1 -->|Auth Request| C1
    C1 -->|JWT Token| B1
    C1 <-->|User Data| D1

    %% Farmer Operations
    A1 -->|List Crops| B2
    B2 -->|Create/Update| C2
    C2 -->|Store| D2
    B2 -->|View Requests| C2
    C2 -->|Fetch| D4
    
    %% Factory Operations
    A2 -->|Post Requirements| B3
    B3 -->|Create| C2
    C2 -->|Store| D3
    A2 -->|Send Purchase Request| B3
    B3 -->|Create Request| C2
    C2 -->|Store| D4

    %% Marketplace
    A1 & A2 -->|Browse| B4
    B4 -->|Query| C2
    C2 -->|Fetch| D2 & D3
    C2 -->|Results| B4

    %% Real-time Updates
    C2 -->|Change Notifications| C4
    C4 -->|Push Updates| B2 & B3 & B4

    %% IoT Data Flow
    A3 -->|Sensor Data HTTP POST| C3
    C3 -->|Store Readings| C2
    C2 -->|Insert| D6
    C2 -->|Link to| D5
    B2 -->|View Sensor Data| C2
    C2 -->|Fetch| D6
    B2 -->|Control Pump| C3
    C3 -->|Pump Command HTTP| A3

    %% Styling
    classDef external fill:#e1f5ff,stroke:#333,stroke-width:2px
    classDef frontend fill:#fff4e6,stroke:#333,stroke-width:2px
    classDef backend fill:#e8f5e9,stroke:#333,stroke-width:2px
    classDef datastore fill:#f3e5f5,stroke:#333,stroke-width:2px
    
    class A1,A2,A3 external
    class B1,B2,B3,B4 frontend
    class C1,C2,C3,C4 backend
    class D1,D2,D3,D4,D5,D6 datastore`}
              </pre>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold mb-2">Data Flow Descriptions:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Authentication Flow:</strong> Users authenticate through Auth Service, receive JWT tokens for secure API access</li>
              <li><strong>Marketplace Flow:</strong> Both user types can browse marketplace; data fetched from crops and requirements tables</li>
              <li><strong>Transaction Flow:</strong> Factory sends purchase request → stored in database → farmer notified → farmer responds → crop availability updated</li>
              <li><strong>Real-time Flow:</strong> Database changes trigger Realtime Service → pushes updates to connected clients</li>
              <li><strong>IoT Flow:</strong> ESP32 sensors POST data to Edge Functions → stored in database → displayed on farmer dashboard → farmer can send pump control commands back to devices</li>
            </ul>
          </div>
        </section>

        {/* 8. ER (Entity Relationship) Diagram */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">8. ER (Entity Relationship) Diagram</h2>
          <div className="bg-muted/30 p-6 rounded-lg mb-4">
            <div className="mermaid-container">
              <pre className="text-xs overflow-x-auto whitespace-pre">
{`erDiagram
    PROFILES ||--o{ FARMERS : "extends"
    PROFILES ||--o{ FACTORIES : "extends"
    FARMERS ||--o{ CROPS : "lists"
    FACTORIES ||--o{ REQUIREMENTS : "posts"
    FARMERS ||--o{ IOT_DEVICES : "owns"
    IOT_DEVICES ||--o{ MOISTURE_READINGS : "generates"
    IOT_DEVICES ||--o{ PUMP_ACTIONS : "logs"
    CROPS ||--o{ PURCHASE_REQUESTS : "receives"
    FACTORIES ||--o{ PURCHASE_REQUESTS : "sends"
    FARMERS ||--o{ PURCHASE_REQUESTS : "responds_to"

    PROFILES {
        uuid id PK
        text user_type "farmer or factory"
        text full_name
        text location
        text phone
        timestamp created_at
        timestamp updated_at
    }

    FARMERS {
        uuid id PK "FK to profiles.id"
        text farm_size
        text[] primary_crops
        timestamp created_at
    }

    FACTORIES {
        uuid id PK "FK to profiles.id"
        text company_name
        text[] materials_needed
        timestamp created_at
    }

    CROPS {
        uuid id PK
        uuid farmer_id FK
        text crop_name
        enum category
        numeric quantity
        text unit
        numeric price_per_unit
        date harvest_date
        text description
        text image_url
        boolean available
        timestamp created_at
        timestamp updated_at
    }

    REQUIREMENTS {
        uuid id PK
        uuid factory_id FK
        text material_name
        enum category
        numeric quantity_needed
        text unit
        numeric price_willing
        text description
        boolean urgent
        boolean active
        timestamp created_at
        timestamp updated_at
    }

    PURCHASE_REQUESTS {
        uuid id PK
        uuid crop_id FK
        uuid factory_id FK
        uuid farmer_id FK
        numeric quantity
        numeric offered_price
        text message
        enum status "pending, accepted, rejected, completed"
        timestamp created_at
        timestamp updated_at
    }

    IOT_DEVICES {
        uuid id PK
        uuid farmer_id FK
        text device_name
        text device_type
        text location
        boolean active
        timestamp created_at
        timestamp updated_at
    }

    MOISTURE_READINGS {
        uuid id PK
        uuid device_id FK
        numeric moisture_level
        numeric temperature
        timestamp recorded_at
    }

    PUMP_ACTIONS {
        uuid id PK
        uuid device_id FK
        text action "start or stop"
        text triggered_by "auto or manual"
        integer duration_seconds
        timestamp created_at
    }`}
              </pre>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold mb-2">Key Relationships:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Profile Extension:</strong> Both farmers and factories extend the base profiles table with their specific attributes</li>
              <li><strong>Marketplace Flow:</strong> Farmers list crops, factories post requirements, and purchase_requests bridge the two</li>
              <li><strong>Many-to-One:</strong> Multiple crops belong to one farmer; multiple requirements belong to one factory</li>
              <li><strong>Transaction Triangle:</strong> Purchase requests link crop, factory, and farmer for complete transaction tracking</li>
              <li><strong>IoT Hierarchy:</strong> Farmers own devices → devices generate readings → devices log pump actions</li>
            </ul>
          </div>
        </section>

        {/* 9. Authentication Flow Diagram */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">9. Authentication Flow Diagram</h2>
          <div className="bg-muted/30 p-6 rounded-lg mb-4">
            <div className="mermaid-container">
              <pre className="text-xs overflow-x-auto whitespace-pre">
{`flowchart TD
    Start([User Visits Platform]) --> Landing[Landing Page]
    Landing --> Choice{Existing User?}
    
    Choice -->|No| Signup[Sign Up Form]
    Choice -->|Yes| Login[Login Form]
    
    Signup --> InputSignup[Enter Email & Password]
    InputSignup --> SubmitSignup[Submit Registration]
    SubmitSignup --> AuthService1[Supabase Auth Service]
    AuthService1 --> CreateUser[Create User in auth.users]
    CreateUser --> AutoConfirm{Auto-confirm enabled?}
    AutoConfirm -->|Yes| Confirmed[User Confirmed]
    AutoConfirm -->|No| EmailVerif[Email Verification Required]
    EmailVerif --> Confirmed
    
    Login --> InputLogin[Enter Email & Password]
    InputLogin --> SubmitLogin[Submit Credentials]
    SubmitLogin --> AuthService2[Supabase Auth Service]
    AuthService2 --> ValidateCreds{Valid Credentials?}
    ValidateCreds -->|No| LoginError[Show Error Message]
    LoginError --> Login
    ValidateCreds -->|Yes| Confirmed
    
    Confirmed --> GenerateJWT[Generate JWT Token]
    GenerateJWT --> StoreSession[Store Session in Browser]
    StoreSession --> CheckProfile{Profile Exists?}
    
    CheckProfile -->|No| ProfileForm[Show Profile Creation Form]
    ProfileForm --> SelectUserType[Select: Farmer or Factory]
    SelectUserType --> EnterDetails[Enter Full Name, Location, etc.]
    EnterDetails --> CreateProfile[Create Profile Record]
    CreateProfile --> CreateExtended{User Type?}
    CreateExtended -->|Farmer| CreateFarmer[Create Farmers Record]
    CreateExtended -->|Factory| CreateFactory[Create Factories Record]
    
    CheckProfile -->|Yes| LoadProfile[Load Profile Data]
    CreateFarmer --> LoadProfile
    CreateFactory --> LoadProfile
    
    LoadProfile --> SetContext[Update Auth Context]
    SetContext --> Route{User Type?}
    Route -->|Farmer| FarmerDash[Redirect to Farmer Dashboard]
    Route -->|Factory| FactoryDash[Redirect to Factory Dashboard]
    
    FarmerDash --> Authenticated[Authenticated Session]
    FactoryDash --> Authenticated
    
    Authenticated --> Protected[Access Protected Routes]
    Protected --> APICall[API Calls Include JWT]
    APICall --> RLSCheck[Database RLS Policy Check]
    RLSCheck --> AuthorizedData[Return Authorized Data Only]
    
    Authenticated --> Logout{User Logs Out?}
    Logout -->|Yes| ClearSession[Clear Session & Token]
    ClearSession --> Landing
    Logout -->|No| Protected
    
    style Start fill:#e1f5ff
    style Authenticated fill:#c8e6c9
    style LoginError fill:#ffcdd2
    style AuthorizedData fill:#fff9c4`}
              </pre>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold mb-2">Authentication Flow Steps:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>Registration:</strong> New users sign up → Supabase creates auth.users record → JWT token generated</li>
              <li><strong>Profile Creation:</strong> After first login, users create profile with user type (farmer/factory) → extended record created</li>
              <li><strong>Login:</strong> Existing users authenticate → session stored in browser → redirected based on user type</li>
              <li><strong>Session Management:</strong> JWT token included in all API requests → RLS policies verify user identity</li>
              <li><strong>Authorization:</strong> Database RLS policies ensure users only access their own data or public data</li>
            </ul>
          </div>
        </section>

        {/* 10. Component Architecture Diagram */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">10. Component Architecture Diagram</h2>
          <div className="bg-muted/30 p-6 rounded-lg mb-4">
            <div className="mermaid-container">
              <pre className="text-xs overflow-x-auto whitespace-pre">
{`graph TB
    subgraph App["App.tsx - Root Component"]
        Router[React Router]
    end

    subgraph Context["Context Providers"]
        AuthCtx[AuthContext<br/>- user<br/>- userType<br/>- profile]
    end

    subgraph Pages["Page Components"]
        Landing[Landing.tsx<br/>Hero, Features, CTA]
        Auth[Auth.tsx<br/>Login/Signup Forms]
        FarmerDash[FarmerDashboard.tsx<br/>Crops, Requests, Stats]
        FactoryDash[FactoryDashboard.tsx<br/>Browse, Requirements]
        Market[Marketplace.tsx<br/>Browse All Crops]
        Docs[Documentation.tsx<br/>System Docs]
        NotFound[NotFound.tsx<br/>404 Page]
    end

    subgraph FarmerComponents["Farmer Components"]
        CropsList[My Crops List<br/>Display Crops Table]
        AddCrop[AddCropDialog<br/>Form to Add Crop]
        Requests[Purchase Requests<br/>Accept/Reject UI]
        IoTMonitor[IoTMonitor<br/>Sensor Dashboard]
    end

    subgraph FactoryComponents["Factory Components"]
        BrowseCrops[Browse Crops<br/>Search & Filter]
        ReqList[Requirements List<br/>My Requirements]
        AddReq[AddRequirementDialog<br/>Post New Requirement]
        PurchaseReq[PurchaseRequestDialog<br/>Send Request Form]
    end

    subgraph UIComponents["UI Components (shadcn)"]
        Button[Button]
        Card[Card]
        Dialog[Dialog]
        Input[Input]
        Select[Select]
        Table[Table]
        Toast[Toast]
    end

    subgraph Hooks["Custom Hooks"]
        UseMobile[useMobile]
        UseToast[useToast]
    end

    subgraph Services["Services & APIs"]
        Supabase[Supabase Client<br/>Database Queries]
        TanStack[TanStack Query<br/>Data Fetching & Cache]
    end

    App --> Router
    Router --> Context
    Context --> AuthCtx
    
    Router --> Pages
    Pages --> Landing
    Pages --> Auth
    Pages --> FarmerDash
    Pages --> FactoryDash
    Pages --> Market
    Pages --> Docs
    Pages --> NotFound

    FarmerDash --> FarmerComponents
    FarmerComponents --> CropsList
    FarmerComponents --> AddCrop
    FarmerComponents --> Requests
    FarmerComponents --> IoTMonitor

    FactoryDash --> FactoryComponents
    FactoryComponents --> BrowseCrops
    FactoryComponents --> ReqList
    FactoryComponents --> AddReq
    FactoryComponents --> PurchaseReq

    FarmerComponents --> UIComponents
    FactoryComponents --> UIComponents
    Pages --> UIComponents
    
    UIComponents --> Button
    UIComponents --> Card
    UIComponents --> Dialog
    UIComponents --> Input
    UIComponents --> Select
    UIComponents --> Table
    UIComponents --> Toast

    Pages --> Hooks
    FarmerComponents --> Hooks
    FactoryComponents --> Hooks

    Pages --> Services
    FarmerComponents --> Services
    FactoryComponents --> Services
    Services --> Supabase
    Services --> TanStack

    AuthCtx -.->|provides user state| Pages
    AuthCtx -.->|provides user state| FarmerComponents
    AuthCtx -.->|provides user state| FactoryComponents

    style App fill:#e3f2fd
    style Context fill:#f3e5f5
    style Pages fill:#fff9c4
    style FarmerComponents fill:#c8e6c9
    style FactoryComponents fill:#ffecb3
    style UIComponents fill:#e1f5fe
    style Services fill:#fce4ec`}
              </pre>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold mb-2">Component Hierarchy:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>App Root:</strong> Main router and context providers wrap the entire application</li>
              <li><strong>Page Level:</strong> Route-based page components for different user journeys</li>
              <li><strong>Feature Components:</strong> Role-specific components for farmers (crop management) and factories (purchasing)</li>
              <li><strong>Shared UI:</strong> Reusable shadcn/ui components used across all features</li>
              <li><strong>State Management:</strong> AuthContext provides user state globally; TanStack Query manages server state</li>
              <li><strong>Data Layer:</strong> Supabase client handles all backend communication with RLS security</li>
            </ul>
          </div>
        </section>

        {/* 11. Database Schema */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">11. Database Schema</h2>
          
          <div className="space-y-6">
            {/* Core Tables */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Core Tables</h3>
              <div className="grid gap-4">
                <Card className="print:break-inside-avoid">
                  <CardHeader>
                    <CardTitle className="text-base">profiles</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2 text-muted-foreground">Stores basic user information for all authenticated users.</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>id (uuid, PK, references auth.users)</li>
                      <li>user_type (enum: farmer | factory)</li>
                      <li>full_name (text)</li>
                      <li>location (text)</li>
                      <li>phone (text, optional)</li>
                      <li>created_at, updated_at (timestamps)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="print:break-inside-avoid">
                  <CardHeader>
                    <CardTitle className="text-base">farmers</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2 text-muted-foreground">Extended profile for farmer users.</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>id (uuid, PK, FK → profiles.id)</li>
                      <li>farm_size (text, optional)</li>
                      <li>primary_crops (text[], optional)</li>
                      <li>created_at (timestamp)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="print:break-inside-avoid">
                  <CardHeader>
                    <CardTitle className="text-base">factories</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2 text-muted-foreground">Extended profile for factory users.</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>id (uuid, PK, FK → profiles.id)</li>
                      <li>company_name (text)</li>
                      <li>materials_needed (text[], optional)</li>
                      <li>created_at (timestamp)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Marketplace Tables */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Marketplace Tables</h3>
              <div className="grid gap-4">
                <Card className="print:break-inside-avoid">
                  <CardHeader>
                    <CardTitle className="text-base">crops</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2 text-muted-foreground">Crops listed by farmers for sale.</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>id (uuid, PK)</li>
                      <li>farmer_id (uuid, FK → farmers.id)</li>
                      <li>crop_name (text)</li>
                      <li>category (enum: grains | vegetables | fruits | spices | pulses | oilseeds | other)</li>
                      <li>quantity, unit, price_per_unit (numeric & text)</li>
                      <li>harvest_date (date)</li>
                      <li>description, image_url (text, optional)</li>
                      <li>available (boolean)</li>
                      <li>created_at, updated_at (timestamps)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="print:break-inside-avoid">
                  <CardHeader>
                    <CardTitle className="text-base">requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2 text-muted-foreground">Material requirements posted by factories.</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>id (uuid, PK)</li>
                      <li>factory_id (uuid, FK → factories.id)</li>
                      <li>material_name (text)</li>
                      <li>category (enum, same as crops)</li>
                      <li>quantity_needed, unit, price_willing (numeric & text)</li>
                      <li>description (text, optional)</li>
                      <li>urgent, active (boolean)</li>
                      <li>created_at, updated_at (timestamps)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="print:break-inside-avoid">
                  <CardHeader>
                    <CardTitle className="text-base">purchase_requests</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2 text-muted-foreground">Purchase requests sent from factories to farmers.</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>id (uuid, PK)</li>
                      <li>crop_id (uuid, FK → crops.id)</li>
                      <li>factory_id (uuid, FK → factories.id)</li>
                      <li>farmer_id (uuid, FK → farmers.id)</li>
                      <li>quantity, offered_price (numeric)</li>
                      <li>message (text, optional)</li>
                      <li>status (enum: pending | accepted | rejected | completed)</li>
                      <li>created_at, updated_at (timestamps)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* IoT Tables (Planned) */}
            <div>
              <h3 className="text-xl font-semibold mb-3">IoT Tables (Planned Feature)</h3>
              <div className="grid gap-4">
                <Card className="print:break-inside-avoid">
                  <CardHeader>
                    <CardTitle className="text-base">iot_devices</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2 text-muted-foreground">IoT devices registered by farmers.</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>id (uuid, PK)</li>
                      <li>farmer_id (uuid, FK → farmers.id)</li>
                      <li>device_name, device_type, location (text)</li>
                      <li>active (boolean)</li>
                      <li>created_at, updated_at (timestamps)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="print:break-inside-avoid">
                  <CardHeader>
                    <CardTitle className="text-base">moisture_readings</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2 text-muted-foreground">Sensor data from IoT devices.</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>id (uuid, PK)</li>
                      <li>device_id (uuid, FK → iot_devices.id)</li>
                      <li>moisture_level, temperature (numeric)</li>
                      <li>recorded_at (timestamp)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="print:break-inside-avoid">
                  <CardHeader>
                    <CardTitle className="text-base">pump_actions</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2 text-muted-foreground">Water pump control logs.</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>id (uuid, PK)</li>
                      <li>device_id (uuid, FK → iot_devices.id)</li>
                      <li>action (text: start | stop)</li>
                      <li>triggered_by (text: auto | manual)</li>
                      <li>duration_seconds (integer, optional)</li>
                      <li>created_at (timestamp)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Key Features */}
        <section className="mb-12 print:break-inside-avoid">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">12. Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">For Farmers</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm list-disc list-inside">
                  <li>Create and manage crop listings</li>
                  <li>Upload crop images and details</li>
                  <li>Set pricing and availability</li>
                  <li>View and respond to purchase requests</li>
                  <li>Accept/reject/complete requests</li>
                  <li>Browse factory requirements</li>
                  <li>Track sales and requests</li>
                  <li>IoT monitoring (planned)</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">For Factories</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm list-disc list-inside">
                  <li>Browse available crops in marketplace</li>
                  <li>Search and filter by category</li>
                  <li>Post material requirements</li>
                  <li>Send purchase requests to farmers</li>
                  <li>Specify quantity and offered price</li>
                  <li>Track sent requests and status</li>
                  <li>Manage active requirements</li>
                  <li>Direct communication with farmers</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 13. User Flows */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">13. User Flows</h2>
          
          <div className="space-y-6">
            <Card className="print:break-inside-avoid">
              <CardHeader>
                <CardTitle className="text-lg">Farmer Journey</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ol className="space-y-2 list-decimal list-inside ml-4">
                  <li>Sign up / Login with email and password</li>
                  <li>Complete profile with farm details</li>
                  <li>Navigate to Farmer Dashboard</li>
                  <li>Add new crop listing with details, images, pricing</li>
                  <li>View purchase requests from factories</li>
                  <li>Accept/reject requests or negotiate</li>
                  <li>Mark transactions as completed</li>
                  <li>Browse factory requirements for proactive offers</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="print:break-inside-avoid">
              <CardHeader>
                <CardTitle className="text-lg">Factory Journey</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ol className="space-y-2 list-decimal list-inside ml-4">
                  <li>Sign up / Login with email and password</li>
                  <li>Complete profile with company details</li>
                  <li>Navigate to Factory Dashboard</li>
                  <li>Browse available crops in marketplace</li>
                  <li>Filter by category, search by name</li>
                  <li>Send purchase request to selected farmer</li>
                  <li>Specify quantity, price, and message</li>
                  <li>Track request status (pending/accepted/rejected)</li>
                  <li>Post requirements for materials needed</li>
                </ol>
              </CardContent>
            </Card>

            <Card className="print:break-inside-avoid">
              <CardHeader>
                <CardTitle className="text-lg">Purchase Request Flow</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ol className="space-y-2 list-decimal list-inside ml-4">
                  <li>Factory browses crops and selects desired item</li>
                  <li>Factory sends purchase request with quantity and price</li>
                  <li>Request appears in farmer's dashboard (real-time)</li>
                  <li>Farmer reviews request details</li>
                  <li>Farmer accepts, rejects, or negotiates</li>
                  <li>Status updates appear for both parties</li>
                  <li>If accepted, both parties proceed with transaction</li>
                  <li>Farmer marks as completed upon fulfillment</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 14. Security & RLS */}
        <section className="mb-12 print:break-inside-avoid">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">14. Security & RLS Policies</h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Row-Level Security (RLS) policies ensure that users can only access data they're authorized to view or modify.
            </p>
            <div className="space-y-3">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-sm mb-1">Profiles</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Users can view all profiles (SELECT: true)</li>
                  <li>Users can insert their own profile (INSERT: auth.uid() = id)</li>
                  <li>Users can update their own profile (UPDATE: auth.uid() = id)</li>
                </ul>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-sm mb-1">Crops</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Anyone can view available crops (SELECT: true)</li>
                  <li>Farmers can insert their own crops (INSERT: farmer_id = auth.uid())</li>
                  <li>Farmers can update their own crops (UPDATE: farmer_id = auth.uid())</li>
                  <li>Farmers can delete their own crops (DELETE: farmer_id = auth.uid())</li>
                </ul>
              </div>
              <div className="border-l-4 border-secondary pl-4">
                <h3 className="font-semibold text-sm mb-1">Requirements</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Anyone can view active requirements (SELECT: true)</li>
                  <li>Factories can insert their own requirements (INSERT: factory_id = auth.uid())</li>
                  <li>Factories can update their own requirements (UPDATE: factory_id = auth.uid())</li>
                  <li>Factories can delete their own requirements (DELETE: factory_id = auth.uid())</li>
                </ul>
              </div>
              <div className="border-l-4 border-accent pl-4">
                <h3 className="font-semibold text-sm mb-1">Purchase Requests</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Factories can view their sent requests (SELECT: factory_id = auth.uid())</li>
                  <li>Farmers can view their received requests (SELECT: farmer_id = auth.uid())</li>
                  <li>Factories can insert purchase requests (INSERT: factory_id = auth.uid())</li>
                  <li>Farmers can update request status (UPDATE: farmer_id = auth.uid())</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 15. IoT Integration */}
        <section className="mb-12 print:break-inside-avoid">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">15. IoT Integration (Planned Feature)</h2>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The IoT module will enable smart farming capabilities using ESP32/ESP8266 microcontrollers with sensors and actuators.
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-sm mb-2">Hardware Components</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-4">
                  <li>ESP32/ESP8266 microcontroller</li>
                  <li>Soil moisture sensor (Capacitive or Resistive)</li>
                  <li>DHT11/DHT22 temperature & humidity sensor</li>
                  <li>Water pump with relay module</li>
                  <li>Power supply and connectivity</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">IoT Features</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-4">
                  <li>Real-time soil moisture monitoring</li>
                  <li>Temperature tracking</li>
                  <li>Automated irrigation based on thresholds</li>
                  <li>Manual pump control from dashboard</li>
                  <li>Historical data visualization</li>
                  <li>Alert notifications for low moisture</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">Edge Functions</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground ml-4">
                  <li><code>receive-sensor-data</code>: Accepts sensor readings from devices</li>
                  <li><code>control-pump</code>: Handles manual pump control commands</li>
                  <li>Auto-trigger pump when moisture drops below 30%</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground print:mt-8">
          <p>Smart Agriculture and Factory Marketplace Platform</p>
          <p className="mt-2">© 2025 - All Rights Reserved</p>
        </footer>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            margin: 2cm;
            size: A4;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
          h2 {
            page-break-after: avoid;
          }
          pre {
            font-size: 8px;
          }
        }
      `}</style>
    </div>
  );
}