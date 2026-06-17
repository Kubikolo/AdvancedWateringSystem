#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <time.h>

const char* ssid = "JZ NETWORK";
const char* password = "qqqqqqqq";

const char* mqtt_broker = "url";
const int mqtt_port = 8883;
const char* mqtt_username = "username";
const char* mqtt_password = "password";
const char* client_id = "ESP32_Plant_System";

const char* topic_trigger = "garden/plant1/pump/trigger";
const char* topic_settings = "garden/plant1/settings";

const int PUMP_PIN = 4;

unsigned long watering_period_s = 3 * 24 * 3600;
unsigned long watering_duration_s = 3;
unsigned long trigger_duration_s = 5;

unsigned long active_duration_s = 0;
time_t last_watering_epoch = 0;
bool is_watering = false;
unsigned long pump_start_ms = 0;

WiFiClientSecure espClient;
PubSubClient client(espClient);

void startWatering(unsigned long duration_s) {
  if (!is_watering) {
    Serial.print("Action: Watering the plant now for ");
    Serial.print(duration_s);
    Serial.println(" seconds.");
    
    active_duration_s = duration_s;
    digitalWrite(PUMP_PIN, HIGH);
    is_watering = true;
    pump_start_ms = millis();
  }
}

void setupWiFi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  espClient.setInsecure(); 

  configTime(0, 0, "pool.ntp.org", "time.nist.gov");
  Serial.println("NTP Time Sync Initialized...");
}

void mqttCallback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.println(topic);
  
  if (String(topic) == topic_trigger) {
    String message = "";
    for (int i = 0; i < length; i++) { message += (char)payload[i]; }
    
    int dynamic_duration = message.toInt();
    
    if (dynamic_duration > 0) {
      startWatering(dynamic_duration);
    } 
  }
  
  else if (String(topic) == topic_settings) {
    JsonDocument doc;
    DeserializationError error = deserializeJson(doc, payload, length);

    if (error) {
      Serial.print("JSON Parsing failed: ");
      Serial.println(error.c_str());
      return;
    }

    if (doc.containsKey("period_seconds")) {
      watering_period_s = doc["period_seconds"];
      Serial.print("New Interval Configured: Every ");
      Serial.print(watering_period_s);
      Serial.println(" seconds.");
    }
    if (doc.containsKey("duration_seconds")) {
      watering_duration_s = doc["duration_seconds"];
      Serial.print("New Duration Configured: Run for ");
      Serial.print(watering_duration_s);
      Serial.println(" seconds.");
    }
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");

    if (client.connect(client_id, mqtt_username, mqtt_password)) {
      Serial.println("connected!");

      client.subscribe(topic_trigger);
      client.subscribe(topic_settings); 
      Serial.println("Subscribed to command and settings topics.");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" trying again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);

  pinMode(PUMP_PIN, OUTPUT);
  digitalWrite(PUMP_PIN, LOW);

  setupWiFi();
  
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(mqttCallback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  if (is_watering) {
    if (millis() - pump_start_ms >= (active_duration_s * 1000)) {
      digitalWrite(PUMP_PIN, LOW);
      is_watering = false;
      Serial.println("Action: Done watering.");
    }
  }

  time_t now;
  time(&now);

  if (now > 100000) {
    if (last_watering_epoch == 0) {
      last_watering_epoch = now;
    }

    if ((unsigned long)(now - last_watering_epoch) >= watering_period_s) {
      Serial.print("NTP Notice: Interval reached! ");
      startWatering(watering_duration_s);
      last_watering_epoch = now;
    }
  }
}