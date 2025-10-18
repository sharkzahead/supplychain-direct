# IoT Hardware Setup Guide for Farm2Factory

This guide will help you set up the IoT soil moisture monitoring and automatic irrigation system for your farm.

## 🔧 Hardware Components Required

### Essential Components:
1. **Microcontroller**: ESP32 or ESP8266 (recommended) or Arduino with WiFi shield
2. **Soil Moisture Sensor**: Capacitive soil moisture sensor (recommended) or Resistive sensor
3. **Water Pump**: 5V/12V DC water pump (based on your requirements)
4. **Relay Module**: 5V relay module to control the pump
5. **Power Supply**: 
   - 5V power adapter for ESP32/ESP8266
   - 12V adapter if using 12V pump
6. **Optional**: DHT11/DHT22 temperature sensor for temperature readings

### Additional Materials:
- Breadboard or PCB
- Jumper wires
- Water tubing
- Waterproof enclosure (for outdoor installation)

## 📊 Wiring Diagram

### ESP32/ESP8266 Connections:

```
Soil Moisture Sensor:
- VCC → 3.3V
- GND → GND
- AOUT → GPIO34 (ESP32) / A0 (ESP8266)

Relay Module (for Water Pump):
- VCC → 5V
- GND → GND
- IN → GPIO25 (ESP32) / D5 (ESP8266)

Water Pump:
- Connect to relay COM and NO terminals
- Power from external 12V supply
```

## 💻 Arduino/ESP Code

### Step 1: Install Required Libraries
Install these libraries in Arduino IDE:
- ESP32/ESP8266 Board Support
- ArduinoJson
- WiFi (built-in)

### Step 2: Complete ESP32 Code

```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Your Lovable Cloud backend URLs
const char* sensorDataURL = "https://mvtavdpvtbaacjgbxwju.supabase.co/functions/v1/receive-sensor-data";

// Device ID (get this from your Lovable Cloud database after registering device)
String deviceId = "YOUR_DEVICE_ID_HERE";

// Pin definitions
const int moistureSensorPin = 34;  // Analog pin for moisture sensor
const int pumpRelayPin = 25;       // Digital pin for relay

// Sensor calibration values (adjust based on your sensor)
const int airValue = 3000;   // Sensor value in air (dry)
const int waterValue = 1300; // Sensor value in water (wet)

// Timing
unsigned long lastReadingTime = 0;
const unsigned long readingInterval = 60000; // Read every 60 seconds

void setup() {
  Serial.begin(115200);
  
  // Setup pins
  pinMode(pumpRelayPin, OUTPUT);
  digitalWrite(pumpRelayPin, LOW); // Pump OFF initially
  
  // Connect to WiFi
  connectWiFi();
}

void loop() {
  // Check WiFi connection
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }
  
  // Read sensor every interval
  if (millis() - lastReadingTime >= readingInterval) {
    readAndSendSensorData();
    checkPumpActions();
    lastReadingTime = millis();
  }
  
  delay(1000);
}

void connectWiFi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi connected!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nWiFi connection failed!");
  }
}

void readAndSendSensorData() {
  // Read soil moisture
  int moistureRaw = analogRead(moistureSensorPin);
  
  // Convert to percentage (0-100%)
  int moisturePercent = map(moistureRaw, airValue, waterValue, 0, 100);
  moisturePercent = constrain(moisturePercent, 0, 100);
  
  // Optional: Read temperature if you have a sensor
  float temperature = 25.0; // Replace with actual temperature reading
  
  Serial.print("Moisture: ");
  Serial.print(moisturePercent);
  Serial.println("%");
  
  // Send data to backend
  sendDataToBackend(moisturePercent, temperature);
}

void sendDataToBackend(int moisture, float temperature) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    http.begin(sensorDataURL);
    http.addHeader("Content-Type", "application/json");
    
    // Create JSON payload
    StaticJsonDocument<200> doc;
    doc["device_id"] = deviceId;
    doc["moisture_level"] = moisture;
    doc["temperature"] = temperature;
    
    String jsonString;
    serializeJson(doc, jsonString);
    
    Serial.println("Sending data to backend...");
    int httpResponseCode = http.POST(jsonString);
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Response: " + response);
      
      // Check if pump was triggered automatically
      StaticJsonDocument<200> responseDoc;
      deserializeJson(responseDoc, response);
      bool pumpTriggered = responseDoc["pump_triggered"];
      
      if (pumpTriggered) {
        Serial.println("Low moisture! Pump triggered automatically!");
      }
    } else {
      Serial.print("Error sending data: ");
      Serial.println(httpResponseCode);
    }
    
    http.end();
  }
}

void checkPumpActions() {
  // Poll backend for manual pump commands
  // You can implement polling logic here to check for new pump_actions
  // For now, automatic triggering happens on the backend
}

void activatePump(int durationSeconds) {
  Serial.print("Activating pump for ");
  Serial.print(durationSeconds);
  Serial.println(" seconds...");
  
  digitalWrite(pumpRelayPin, HIGH); // Turn pump ON
  delay(durationSeconds * 1000);
  digitalWrite(pumpRelayPin, LOW);  // Turn pump OFF
  
  Serial.println("Pump stopped.");
}
```

### Step 3: ESP8266 Code Differences
If using ESP8266, replace:
```cpp
#include <WiFi.h>  →  #include <ESP8266WiFi.h>
#include <HTTPClient.h>  →  #include <ESP8266HTTPClient.h>

const int moistureSensorPin = 34;  →  const int moistureSensorPin = A0;
const int pumpRelayPin = 25;  →  const int pumpRelayPin = D5;
```

## 🚀 Setup Steps

### 1. Register Your Device in Lovable Cloud

First, you need to add your IoT device to the database. You can do this through your farmer dashboard:

1. Log in to your farmer account
2. Go to the IoT Monitoring tab
3. Use the backend interface to manually insert a device record:
   - Open Backend (click the button in chat if provided)
   - Navigate to `iot_devices` table
   - Insert a new row:
     ```
     farmer_id: [your user ID]
     device_name: "My Farm Sensor"
     device_type: "moisture_sensor"
     location: "Field A - North Section"
     active: true
     ```
   - Copy the generated `id` - this is your `deviceId` for the Arduino code

4. Add a pump device:
   - Insert another row:
     ```
     farmer_id: [your user ID]
     device_name: "Water Pump"
     device_type: "water_pump"
     location: "Field A - North Section"
     active: true
     ```

### 2. Configure Arduino Code

1. Open the Arduino code above
2. Replace:
   - `YOUR_WIFI_SSID` with your WiFi network name
   - `YOUR_WIFI_PASSWORD` with your WiFi password
   - `YOUR_DEVICE_ID_HERE` with the sensor device ID from step 1
3. Adjust calibration values:
   - Insert sensor in dry soil, note the value → `airValue`
   - Insert sensor in wet soil/water, note the value → `waterValue`

### 3. Upload and Test

1. Connect your ESP32/ESP8266 to your computer
2. Upload the code using Arduino IDE
3. Open Serial Monitor (115200 baud)
4. Check for successful WiFi connection
5. Verify data is being sent every 60 seconds
6. Check your dashboard for real-time moisture readings!

## 📱 Features

### Automatic Irrigation
- When soil moisture drops below 30%, the system automatically:
  1. Logs the low moisture level
  2. Triggers the water pump for 60 seconds
  3. Records the pump action in the database
  4. Shows an alert on your dashboard

### Manual Control
- Use the dashboard to:
  - Start/stop the pump manually
  - View real-time moisture and temperature
  - See 24-hour historical charts
  - Monitor all pump activities

### Real-time Updates
- Dashboard updates automatically when new readings arrive
- No need to refresh the page
- Instant alerts for low moisture conditions

## 🔧 Troubleshooting

### WiFi Connection Issues
- Check SSID and password
- Ensure 2.4GHz WiFi (ESP doesn't support 5GHz)
- Move device closer to router

### Sensor Reading Issues
- Verify wiring connections
- Re-calibrate sensor values
- Check if sensor is inserted in soil properly
- Capacitive sensors are more reliable than resistive

### Pump Not Activating
- Check relay wiring
- Verify pump power supply
- Test relay independently
- Check pump_actions table for logs

### Data Not Appearing in Dashboard
- Verify device_id matches database
- Check Serial Monitor for error messages
- Ensure backend URL is correct
- Check internet connectivity

## 🌟 Next Steps

1. Add multiple sensors for different fields
2. Install waterproof enclosures for outdoor use
3. Add solar panels for off-grid operation
4. Integrate additional sensors (pH, NPK, light)
5. Set up SMS/email alerts for critical conditions

## 📞 Support

If you need help setting up your IoT system, please check:
- Serial Monitor output for debugging
- Backend logs in Lovable Cloud
- Dashboard IoT Monitoring tab for device status

Happy farming! 🌱💧
