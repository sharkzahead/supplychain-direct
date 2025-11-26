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
              <li className="font-medium">System Architecture</li>
              <li className="font-medium">Use Case Diagram</li>
              <li className="font-medium">Sequence Diagram</li>
              <li className="font-medium">Dataflow Diagram</li>
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

        {/* 3. System Architecture */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">3. System Architecture</h2>
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

        {/* 4. Use Case Diagram */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">4. Use Case Diagram</h2>
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

        {/* 5. Sequence Diagram */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">5. Sequence Diagram - Purchase Request Flow</h2>
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

        {/* 6. Dataflow Diagram */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">6. Dataflow Diagram</h2>
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

        {/* 7. Database Schema */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">7. Database Schema</h2>
          
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

        {/* 8. Key Features */}
        <section className="mb-12 print:break-inside-avoid">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">8. Key Features</h2>
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

        {/* 9. User Flows */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">9. User Flows</h2>
          
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

        {/* 10. Security & RLS */}
        <section className="mb-12 print:break-inside-avoid">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">10. Security & RLS Policies</h2>
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

        {/* 11. IoT Integration */}
        <section className="mb-12 print:break-inside-avoid">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">11. IoT Integration (Planned Feature)</h2>
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