int x;
const int GatePin = 3;
const int on_time = 500;

void setup()
{
	Serial.begin(115200);
	Serial.setTimeout(1);
	pinMode(GatePin, OUTPUT);
	digitalWrite(GatePin, HIGH);
}

void loop()
{
	while (!Serial.available());
	x = Serial.readString().toInt();
	if (x == 1){
		digitalWrite(GatePin, LOW);
		delay(on_time);
		digitalWrite(GatePin, HIGH);
	}

}
