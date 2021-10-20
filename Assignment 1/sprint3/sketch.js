/* October 2021- Shaelyn Strong

Uses the threesoundthreecircles template code provided but is modified using some example code provided to follow mouse, this was changed to work with the potentiometer.

The Arduino file that's running is "arduino_sprints"

I used this code for my visual: https://openprocessing.org/sketch/869918
*/

let mySound;
let spark;
let osc;
let playing = false;
let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let splitter;
let diameter0 = 0, diameter1 = 0, diameter2 = 0;

let osc1, osc2, osc3, fft;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = createAudio('assets/drum.mp3');
}


function setup() {

spark = new Particle(random(width), random(height));
background('black');   
  
createCanvas(windowWidth, windowHeight);

///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
///////////////////////////////////////////////////////////////////    
    

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();
  console.log("serial.list()   ", serial.list());

  //////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/tty.usbmodem14401");
 /////////////////////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////
  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);

 
}
////////////////////////////////////////////////////////////////////////////
// End serialport callbacks
///////////////////////////////////////////////////////////////////////////


osc1 = new p5.TriOsc(); // set frequency and type
osc1.amp(.5);
osc2 = new p5.TriOsc(); // set frequency and type
osc2.amp(.5);  
osc3 = new p5.TriOsc(); // set frequency and type
osc3.amp(.5);    

fft = new p5.FFT();
osc1.start();
osc2.start(); 
osc3.start();

// We are connected and ready to go
function serverConnected() {
  console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  console.log("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  console.log("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  console.log(theerror);
}



// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log("currentString  ", currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
  //console.log("splitter[0]" + splitter[0]); 
  diameter0 = splitter[0];                 //put the first sensor's data into a variable
  diameter1 = splitter[1];
  diameter2 = splitter[2]; 



}

// We got raw data from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device


function draw() {
    
spark.update();
spark.show();
    
let dx = diameter1 - spark.x;
	let dy = diameter1 - spark.y;
	let k = 100; // spring constant
	spark.applyForce(dx / k, dy / k);
    
    
} 

function Particle(x, y) {
	// The particle position has two components
  this.x = x;
  this.y = y;
	// The particle velocity (position change or "delta")
	this.dx = 0;
	this.dy = 0;
	// Acceleration is the change in velocity
	this.ax = 0;
	this.ay = 0;

	// Accelerate the particle by incrementing its acceleration
  this.applyForce = function(fx, fy){
		this.ax += fx;
		this.ay += fy;
  }

	// Update the particle position and accelearation
  this.update = function(){
		let b = 0.99; // viscosity
		this.x += this.dx;
		this.y += this.dy;
		this.dx += this.ax;
		this.dy += this.ay;
		
		this.dx *= b;
		this.dy *= b;
		this.ax = 0;
		this.ay = 0;
	}

  this.show = function(){
		fill('red');
		noStroke();
    circle(this.x, this.y, 5);
  }
}



  


  

 