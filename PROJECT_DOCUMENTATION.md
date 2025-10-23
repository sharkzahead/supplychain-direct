# Smart Agriculture and Factory Marketplace Platform - Project Documentation

## 1. Project Details

**Project Name:** Smart Agriculture and Factory Marketplace Platform

**Project Type:** IoT-based Web Application

**Technology Stack:**
- **Frontend:** React 18.3, TypeScript, Vite
- **UI Framework:** Tailwind CSS, shadcn/ui components
- **Backend:** Lovable Cloud (Supabase)
- **Database:** PostgreSQL with Row-Level Security
- **Authentication:** Supabase Auth
- **Real-time:** Supabase Realtime
- **IoT Hardware:** ESP32/ESP8266 microcontrollers
- **Sensors:** Soil moisture sensors, DHT temperature/humidity sensors
- **Actuators:** Water pumps with relay modules

**Key Features:**
- Dual-user system (Farmers and Factories)
- Real-time IoT monitoring and control
- Automated irrigation system
- Agricultural marketplace
- Purchase request system
- Data analytics and visualization

---

## 2. Introduction

### Overview
The Smart Agriculture and Factory Marketplace Platform is an innovative solution that bridges the gap between agricultural producers and industrial consumers through technology integration. The platform combines IoT-based precision agriculture with a digital marketplace to create an efficient supply chain ecosystem.

### Background
Modern agriculture faces challenges including:
- Inefficient water usage and irrigation management
- Lack of direct connection between farmers and industrial buyers
- Information asymmetry in agricultural markets
- Manual monitoring leading to crop losses
- Difficulty in matching supply with demand

### Solution Approach
Our platform addresses these challenges through:
1. **IoT Integration:** Real-time soil moisture monitoring and automatic irrigation control
2. **Digital Marketplace:** Direct connection between farmers and factories
3. **Data-Driven Decisions:** Analytics and insights for better farming practices
4. **Automation:** Reducing manual intervention in irrigation and market discovery

### Target Users
- **Farmers:** Small to large-scale agricultural producers seeking better water management and market access
- **Factories:** Food processing units, beverage manufacturers, and other agro-industries requiring consistent raw material supply

---

## 3. Problem Statement & Objectives

### Problem Statement

#### Agricultural Challenges
1. **Water Management:** 
   - 70% of global freshwater is used in agriculture
   - Manual irrigation leads to water wastage and crop stress
   - Lack of real-time soil condition monitoring

2. **Market Access:**
   - Farmers struggle to find buyers for their produce
   - Multiple intermediaries reduce farmer profits
   - Price discovery is inefficient

3. **Industrial Sourcing:**
   - Factories face uncertainty in raw material availability
   - Quality and quantity inconsistencies
   - High procurement costs through middlemen

### Project Objectives

#### Primary Objectives
1. **Develop IoT-Based Irrigation System:**
   - Real-time soil moisture monitoring
   - Automatic water pump control
   - Remote monitoring and manual override capabilities

2. **Create Digital Marketplace:**
   - Enable direct farmer-factory connections
   - Implement crop listing and requirement posting
   - Facilitate purchase requests and negotiations

3. **Ensure Data Security:**
   - Implement robust authentication
   - Apply Row-Level Security for data protection
   - Secure IoT device communication

#### Secondary Objectives
1. Provide data analytics and insights
2. Enable real-time updates across the platform
3. Create user-friendly interfaces for both user types
4. Ensure scalability for multiple devices and users
5. Implement mobile-responsive design

---

## 4. Literature Survey / Related Work

### Existing Solutions Analysis

#### IoT Agriculture Platforms
1. **Commercial Systems:**
   - **Pros:** Professional hardware, established support
   - **Cons:** High cost, proprietary systems, limited customization
   - **Examples:** John Deere Operations Center, Climate FieldView

2. **Open-Source Projects:**
   - **Pros:** Low cost, customizable
   - **Cons:** Require technical expertise, limited support
   - **Examples:** FarmOS, OpenFarm

#### Agricultural Marketplaces
1. **General Platforms:**
   - **Examples:** AgroStar, DeHaat
   - **Limitations:** Focus only on marketplace, no IoT integration

2. **B2B Platforms:**
   - **Examples:** Agrowave, FarmERP
   - **Limitations:** Enterprise-focused, expensive for small farmers

### Research Findings
- Studies show 30-50% water savings with automated irrigation
- Direct farmer-buyer connections increase farmer income by 15-25%
- Real-time monitoring reduces crop loss by up to 20%
- IoT adoption in agriculture is growing at 20% CAGR

### Gaps in Existing Solutions
1. No integrated platform combining IoT and marketplace
2. High cost of entry for small-scale farmers
3. Complex user interfaces requiring technical knowledge
4. Lack of real-time bidirectional communication
5. Limited customization options

### Our Innovation
- **Integrated Approach:** Combines IoT monitoring with marketplace
- **Cost-Effective:** Uses affordable ESP32/ESP8266 hardware
- **User-Friendly:** Intuitive interfaces for non-technical users
- **Scalable:** Cloud-based architecture supporting growth
- **Open Architecture:** Extensible for additional sensors and features

---

## 5. Software & Hardware Requirements

### Software Requirements

#### Development Tools
- **Code Editor:** VS Code or similar
- **Version Control:** Git
- **Package Manager:** npm
- **Arduino IDE:** For ESP32/ESP8266 programming

#### Frontend Technologies
- React 18.3.1
- TypeScript
- Vite (Build tool)
- Tailwind CSS 3.x
- shadcn/ui component library
- React Router DOM 6.30.1
- TanStack React Query 5.83.0
- Recharts 2.15.4 (Data visualization)
- Lucide React (Icons)

#### Backend & Cloud Services
- Lovable Cloud (Supabase)
- PostgreSQL Database
- Supabase Auth
- Supabase Realtime
- Edge Functions (Serverless)

#### IoT Software
- Arduino Framework
- ESP32/ESP8266 Board Support
- ArduinoJson Library
- WiFi Library
- HTTPClient Library

### Hardware Requirements

#### ESP32/ESP8266 System
**Main Controller:**
- ESP32 DevKit or ESP8266 NodeMCU
- Operating Voltage: 3.3V
- Flash Memory: 4MB minimum
- WiFi: 802.11 b/g/n

**Sensors:**
1. **Soil Moisture Sensor:**
   - Type: Capacitive or Resistive
   - Output: Analog voltage
   - Operating Voltage: 3.3-5V
   
2. **DHT11/DHT22 (Optional):**
   - Temperature range: -40 to 80°C
   - Humidity range: 0-100% RH
   - Digital output

**Actuators:**
1. **Water Pump:**
   - Type: Submersible DC pump
   - Voltage: 12V DC
   - Flow rate: 2-5 L/min
   
2. **Relay Module:**
   - Type: 5V Single Channel
   - Max Load: 10A at 250V AC
   - Trigger: Active LOW

**Power Supply:**
- 5V 2A adapter for ESP32
- 12V 2A adapter for water pump
- Optional: Solar panel with battery backup

**Additional Components:**
- Breadboard or PCB
- Jumper wires
- Enclosure (weatherproof)
- Waterproof connectors

### System Requirements

#### Client Side (User Device)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (minimum 2 Mbps)
- Screen resolution: 320px minimum width (mobile responsive)

#### Server Side
- Hosted on Lovable Cloud infrastructure
- Automatic scaling based on load
- 99.9% uptime SLA

#### IoT Device
- WiFi network (2.4 GHz)
- Stable power supply
- Internet connectivity

---

## 6. System Design

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  │
│  │  Farmer Web    │  │  Factory Web   │  │  ESP32/ESP8266│ │
│  │  Dashboard     │  │  Dashboard     │  │  IoT Devices  │ │
│  └────────────────┘  └────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              React Application (Vite)                   │ │
│  │  - Authentication Context                               │ │
│  │  - Route Management                                     │ │
│  │  - State Management (React Query)                       │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND LAYER (LOVABLE CLOUD)            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Supabase    │  │   Edge       │  │    Realtime      │  │
│  │  Auth        │  │   Functions  │  │    Updates       │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              PostgreSQL Database                        │ │
│  │  - profiles, farmers, factories                         │ │
│  │  - crops, requirements, purchase_requests               │ │
│  │  - iot_devices, moisture_readings, pump_actions         │ │
│  │  Row-Level Security (RLS) Policies                      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema

#### User Management Tables

**profiles**
- id (uuid, PK, references auth.users)
- full_name (text)
- location (text)
- phone (text)
- user_type (enum: 'farmer' | 'factory')
- created_at, updated_at (timestamps)

**farmers**
- id (uuid, PK, references profiles)
- farm_size (text)
- primary_crops (text[])
- created_at (timestamp)

**factories**
- id (uuid, PK, references profiles)
- company_name (text)
- materials_needed (text[])
- created_at (timestamp)

#### Marketplace Tables

**crops**
- id (uuid, PK)
- farmer_id (uuid, FK)
- crop_name (text)
- category (enum)
- quantity (numeric)
- unit (text)
- price_per_unit (numeric)
- harvest_date (date)
- available (boolean)
- image_url (text)
- description (text)
- created_at, updated_at (timestamps)

**requirements**
- id (uuid, PK)
- factory_id (uuid, FK)
- material_name (text)
- category (enum)
- quantity_needed (numeric)
- unit (text)
- price_willing (numeric)
- urgent (boolean)
- active (boolean)
- description (text)
- created_at, updated_at (timestamps)

**purchase_requests**
- id (uuid, PK)
- factory_id (uuid, FK)
- farmer_id (uuid, FK)
- crop_id (uuid, FK)
- quantity (numeric)
- offered_price (numeric)
- message (text)
- status (enum: 'pending' | 'accepted' | 'rejected')
- created_at, updated_at (timestamps)

#### IoT Tables

**iot_devices**
- id (uuid, PK)
- farmer_id (uuid, FK)
- device_name (text)
- device_type (text: 'soil_sensor' | 'water_pump')
- location (text)
- active (boolean)
- created_at, updated_at (timestamps)

**moisture_readings**
- id (uuid, PK)
- device_id (uuid, FK)
- moisture_level (numeric)
- temperature (numeric, nullable)
- recorded_at (timestamp)

**pump_actions**
- id (uuid, PK)
- device_id (uuid, FK)
- action (text: 'on' | 'off')
- duration_seconds (integer, nullable)
- triggered_by (text: 'manual' | 'automatic' | 'iot')
- created_at (timestamp)

### Component Architecture

#### Core Components Structure
```
src/
├── components/
│   ├── AddCropDialog.tsx          # Farmer crop listing
│   ├── AddRequirementDialog.tsx   # Factory requirement posting
│   ├── IoTMonitor.tsx             # Real-time IoT monitoring
│   ├── PurchaseRequestDialog.tsx  # Factory purchase requests
│   └── ui/                        # Reusable UI components
├── pages/
│   ├── Landing.tsx                # Homepage
│   ├── Auth.tsx                   # Login/Signup
│   ├── FarmerDashboard.tsx        # Farmer interface
│   ├── FactoryDashboard.tsx       # Factory interface
│   └── Marketplace.tsx            # Crop listings
├── contexts/
│   └── AuthContext.tsx            # Authentication state
└── integrations/
    └── supabase/                  # Backend integration
```

### Security Design

#### Row-Level Security Policies

1. **User Data Protection:**
   - Users can only read/write their own profiles
   - Farmers can only manage their own crops and devices
   - Factories can only manage their own requirements

2. **Marketplace Visibility:**
   - All authenticated users can view available crops
   - All authenticated users can view active requirements
   - Only authorized parties can create purchase requests

3. **IoT Security:**
   - Farmers can only access their own device data
   - Public API endpoints for device data submission
   - Authenticated endpoints for device control

### IoT Communication Flow

```
ESP32/ESP8266 Device
    │
    ├─► Read Soil Moisture Sensor (every 30 seconds)
    │
    ├─► POST to /receive-sensor-data Edge Function
    │   └─► Store in moisture_readings table
    │       └─► If moisture < 30%: Create pump_action
    │
    ├─► GET from /control-pump Edge Function (every 10 seconds)
    │   └─► Check for new pump_actions
    │       └─► Execute pump control (ON/OFF)
    │
    └─► Update device status
```

### User Flows

#### Farmer Journey
1. Sign up → Create profile → Select "Farmer"
2. Register IoT devices (optional)
3. Monitor soil conditions in real-time
4. Control irrigation manually or automatically
5. List crops in marketplace
6. Receive and respond to purchase requests

#### Factory Journey
1. Sign up → Create profile → Select "Factory"
2. Browse available crops
3. Post material requirements
4. Send purchase requests to farmers
5. Negotiate quantities and prices
6. Track request status

---

## 7. Implementation

### Phase 1: Foundation (Completed)
- Project setup with Vite and React
- Tailwind CSS and shadcn/ui integration
- Supabase initialization
- Database schema design and migration
- RLS policies implementation

### Phase 2: Authentication (Completed)
- User registration and login
- Profile creation with user type selection
- Protected routes based on user type
- Session management
- Authentication context

### Phase 3: Farmer Dashboard (Completed)
- Crop management (CRUD operations)
- IoT device registration
- Real-time moisture monitoring
- Pump control interface
- Data visualization with charts
- Purchase request handling

### Phase 4: Factory Dashboard (Completed)
- Requirement posting
- Crop browsing and filtering
- Purchase request creation
- Request tracking
- Supplier discovery

### Phase 5: Marketplace (Completed)
- Crop listing with images
- Category-based filtering
- Search functionality
- Detailed crop information
- Direct contact options

### Phase 6: IoT Integration (Completed)
- Edge functions for sensor data
- Edge functions for pump control
- Real-time data updates
- Automatic irrigation triggers
- Manual override capabilities
- Device status monitoring

### Phase 7: Hardware Setup (Documented)
- ESP32/ESP8266 wiring diagrams
- Arduino code for sensors
- WiFi configuration
- API integration code
- Testing procedures
- Troubleshooting guide

### Key Implementation Details

#### Authentication Flow
```typescript
// AuthContext.tsx
- useAuth hook for global auth state
- Sign up with email/password
- Profile creation with user_type
- Role-based routing
- Persistent sessions
```

#### Real-time Updates
```typescript
// IoTMonitor.tsx
- Supabase realtime subscription
- Live moisture level updates
- Automatic chart refresh
- Connection status indicator
```

#### Data Fetching Strategy
```typescript
// Using TanStack React Query
- Automatic caching
- Background refetching
- Optimistic updates
- Error handling
- Loading states
```

#### Form Handling
```typescript
// Using react-hook-form + zod
- Type-safe form validation
- Real-time error feedback
- Async validation support
- Integration with UI components
```

### Code Quality Practices
- TypeScript for type safety
- Component composition
- Custom hooks for reusability
- Consistent naming conventions
- Modular file structure
- Error boundaries
- Loading states
- Toast notifications

---

## 8. Project Demo (Live/Recorded)

### Demo Scenarios

#### Scenario 1: Farmer Registration and IoT Setup
1. **User Registration:**
   - Navigate to authentication page
   - Sign up with email and password
   - Complete profile with name, location, phone
   - Select "Farmer" as user type
   - Enter farm size and primary crops

2. **IoT Device Registration:**
   - Navigate to Farmer Dashboard
   - Click "Add Device" in IoT Monitor section
   - Enter device details (name, type, location)
   - Note the generated device ID
   - Configure ESP32 with device ID

3. **Live Monitoring:**
   - Observe real-time moisture readings
   - View data visualization in charts
   - Check device connection status
   - Monitor temperature (if available)

#### Scenario 2: Automatic Irrigation
1. **Setup:**
   - Device sending moisture readings every 30 seconds
   - Current moisture level: 45%

2. **Trigger Condition:**
   - Moisture drops below 30%
   - System automatically creates pump action
   - ESP32 receives pump ON command
   - Water pump activates

3. **Observation:**
   - Pump status changes to "ON" in dashboard
   - Moisture level starts increasing
   - Once adequate level reached, manual stop or timeout

#### Scenario 3: Manual Pump Control
1. **Dashboard Control:**
   - Navigate to IoT Monitor
   - Click "Turn ON Pump" button
   - Specify duration (e.g., 60 seconds)
   - Confirm action

2. **Device Response:**
   - ESP32 polls for actions
   - Receives pump ON command
   - Activates relay and pump
   - Runs for specified duration
   - Automatic shutoff

#### Scenario 4: Crop Listing and Purchase
1. **Farmer Lists Crop:**
   - Click "Add Crop" in dashboard
   - Enter crop details:
     - Name: "Organic Tomatoes"
     - Category: Vegetables
     - Quantity: 500 kg
     - Price: ₹40 per kg
     - Harvest Date: Next week
   - Upload crop image
   - Submit listing

2. **Factory Discovers Crop:**
   - Login as factory user
   - Navigate to Marketplace
   - Filter by category "Vegetables"
   - View tomato listing
   - Check farmer details and location

3. **Purchase Request:**
   - Click "Request Purchase"
   - Enter quantity: 300 kg
   - Offer price: ₹42 per kg
   - Add message: "Need by next Friday"
   - Submit request

4. **Farmer Response:**
   - Farmer receives notification
   - Reviews request in dashboard
   - Checks factory details
   - Accepts request
   - Contact details shared

#### Scenario 5: Factory Requirement Posting
1. **Create Requirement:**
   - Factory user clicks "Add Requirement"
   - Material: "Fresh Wheat"
   - Category: Grains
   - Quantity Needed: 1000 kg
   - Willing to Pay: ₹25 per kg
   - Mark as "Urgent"
   - Submit

2. **Farmer Discovery:**
   - Farmers view requirements in marketplace
   - See urgent wheat requirement
   - Contact factory directly
   - Negotiate terms

### Live Demo Script

**Introduction (2 minutes):**
- Project overview
- Problem statement
- Solution highlights

**Platform Walkthrough (5 minutes):**
- Landing page and navigation
- User authentication
- Dashboard overview (both roles)
- Marketplace interface

**IoT Demonstration (5 minutes):**
- Hardware setup overview
- Live sensor readings
- Automatic irrigation trigger
- Manual pump control
- Data visualization

**Marketplace Demo (5 minutes):**
- Crop listing process
- Requirement posting
- Purchase request flow
- Request acceptance
- Communication features

**Q&A (3 minutes):**
- Answer questions
- Discuss scalability
- Future enhancements

### Demo Best Practices
- Have backup video recording
- Test all features before demo
- Prepare sample data
- Have stable WiFi connection
- Keep hardware visible
- Show both desktop and mobile views
- Demonstrate error handling
- Highlight security features

---

## 9. Testing

### Testing Strategy

#### Unit Testing
**Components to Test:**
- Individual React components
- Utility functions
- Form validation logic
- Data transformation functions

**Tools:**
- Jest (Test runner)
- React Testing Library
- Vitest (Vite-compatible)

#### Integration Testing
**Areas to Test:**
- Authentication flow
- Database operations
- Edge function calls
- Real-time subscriptions
- Form submissions

#### End-to-End Testing
**User Flows:**
- Complete registration process
- Crop listing and purchase
- IoT device management
- Pump control operations

**Tools:**
- Cypress or Playwright
- Browser automation

#### Hardware Testing

**ESP32/ESP8266 Testing:**
1. **WiFi Connectivity:**
   - Connect to network
   - Reconnection after dropout
   - IP address assignment

2. **Sensor Accuracy:**
   - Calibrate moisture sensor
   - Compare readings with manual check
   - Test in dry and wet conditions
   - Temperature sensor validation

3. **Pump Control:**
   - Manual activation test
   - Automatic trigger test
   - Duration accuracy
   - Relay switching reliability

4. **API Communication:**
   - POST sensor data success
   - GET pump actions success
   - Error handling
   - Timeout behavior

### Testing Checklist

#### Security Testing
- [ ] SQL injection prevention
- [ ] XSS attack protection
- [ ] CSRF token validation
- [ ] RLS policy verification
- [ ] Authentication bypass attempts
- [ ] Unauthorized access tests
- [ ] API endpoint security
- [ ] IoT device authentication

#### Functionality Testing
- [ ] User registration and login
- [ ] Profile creation/update
- [ ] Crop CRUD operations
- [ ] Requirement CRUD operations
- [ ] Purchase request flow
- [ ] IoT device registration
- [ ] Sensor data recording
- [ ] Pump control
- [ ] Real-time updates
- [ ] Search and filtering
- [ ] Image upload

#### Performance Testing
- [ ] Page load times
- [ ] Database query optimization
- [ ] Real-time update latency
- [ ] Image loading performance
- [ ] Multiple simultaneous users
- [ ] IoT data throughput
- [ ] Edge function response time

#### Compatibility Testing
- [ ] Chrome browser
- [ ] Firefox browser
- [ ] Safari browser
- [ ] Edge browser
- [ ] Mobile responsive design
- [ ] Tablet layouts
- [ ] Different screen sizes

#### Usability Testing
- [ ] Navigation clarity
- [ ] Form usability
- [ ] Error message clarity
- [ ] Loading indicators
- [ ] Success feedback
- [ ] Mobile touch targets
- [ ] Accessibility compliance

### Test Cases

#### Test Case 1: User Registration
- **Input:** Valid email, password, profile details
- **Expected:** Account created, redirected to dashboard
- **Status:** Pass/Fail

#### Test Case 2: Crop Listing
- **Input:** Complete crop details with image
- **Expected:** Crop appears in marketplace
- **Status:** Pass/Fail

#### Test Case 3: Automatic Irrigation
- **Input:** Moisture level drops below 30%
- **Expected:** Pump activates automatically
- **Status:** Pass/Fail

#### Test Case 4: Purchase Request
- **Input:** Factory requests crop purchase
- **Expected:** Farmer receives notification
- **Status:** Pass/Fail

#### Test Case 5: Real-time Update
- **Input:** New sensor reading posted
- **Expected:** Dashboard updates without refresh
- **Status:** Pass/Fail

### Bug Tracking
- Use GitHub Issues or similar
- Priority levels: Critical, High, Medium, Low
- Assign to team members
- Track resolution status

### Test Documentation
- Maintain test plan document
- Record test results
- Document known issues
- Track regression tests
- Update after each sprint

---

## Future Enhancements

### Short-term (3-6 months)
1. **Mobile Application:** Native iOS and Android apps
2. **Weather Integration:** Forecast-based irrigation scheduling
3. **Multi-language Support:** Regional language options
4. **Payment Integration:** In-platform transaction processing
5. **Analytics Dashboard:** Advanced insights and reporting

### Medium-term (6-12 months)
1. **AI Recommendations:** ML-based crop suggestions
2. **Blockchain:** Supply chain transparency
3. **Video Calls:** In-platform communication
4. **Quality Certification:** Digital verification system
5. **Logistics Integration:** Delivery tracking

### Long-term (1-2 years)
1. **Drone Integration:** Aerial monitoring
2. **Marketplace Expansion:** B2C consumer sales
3. **Financial Services:** Crop insurance, loans
4. **Community Features:** Forums, knowledge sharing
5. **International Expansion:** Multi-country support

---

## Conclusion

The Smart Agriculture and Factory Marketplace Platform successfully combines IoT technology with digital marketplace capabilities to address critical challenges in agricultural supply chains. By providing real-time monitoring, automated irrigation, and direct market access, the platform empowers farmers to increase productivity while reducing costs, and enables factories to source quality raw materials efficiently.

The project demonstrates the potential of integrated technology solutions in transforming traditional agriculture into a modern, data-driven industry. With a scalable architecture and user-centric design, the platform is positioned to grow and adapt to evolving agricultural needs.

---

## Contact & Support

**Project Repository:** [GitHub Link]
**Live Demo:** [Lovable App URL]
**Documentation:** [Docs Link]

**Team Contact:**
- Technical Support: [Email]
- Business Inquiries: [Email]
- Hardware Support: [Email]

---

*Document Version: 1.0*
*Last Updated: 2025*
