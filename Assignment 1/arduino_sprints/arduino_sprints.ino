//October 2021- Shaelyn Strong- This code uses three sensors to output data

// Code taken from sensor kit tutorials and week 6 tutorial from Katlin Walsh's class

// Here is the sensor kit tutorial reference: https://sensorkit.arduino.cc/sensorkit/module/getting-started/lesson/00-getting-started

#define button 4

int button_state = 0;
int potentiometer = A0;
int light_sensor = A3;
int sensors[3];

void setup() {
   // start serial port at 9600 bps:
   Serial.begin(9600);
   pinMode(button, INPUT);
   pinMode(potentiometer,INPUT);
   
}
 
void loop() {

    button_state = digitalRead(button);
    sensors[0] = button_state;
    
    int sensor_value = analogRead(potentiometer);
    int value = map(sensor_value, 0, 1023, 0, 100);
    
    sensors[1] = sensor_value;
    
    int raw_light = analogRead(light_sensor);
    int light = map(raw_light, 0, 1023, 0, 100);
    
    sensors[2] = light;
    
    if (button_state == HIGH){
        
      }
    
    for (int thisSensor = 0; thisSensor < 3; thisSensor++) {

        int sensorValue = sensors[thisSensor];
     
      
      Serial.print(sensorValue);
      if (thisSensor == 2) {
         Serial.println();
      } else {
         Serial.print(",");
      }
   }
    delay(100);              
}
