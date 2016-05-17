#include <dht.h>

dht DHT;

#define DHT11_PIN 7

void setup(){
  Serial.begin(9600);
}

void loop()
{
  boolean sending = false;  
  char inChar = Serial.read();
  switch (inChar) {
  case 'c':    // connection open
    sending = true;
    break;
  case 'x':    // connection closed
    sending = false;
    break;
  }

  if (sending) {
    int chk = DHT.read11(DHT11_PIN);
    
    String jsonString = "{\"temperature\":\"";
    jsonString += DHT.temperature;
    jsonString +="\",\"humidity\":\"";
    jsonString += DHT.humidity;
    jsonString +="\",\"lightlevel\":\"";
    jsonString += analogRead(0);
    jsonString +="\"}";
  
    Serial.println(jsonString);
  }
}
