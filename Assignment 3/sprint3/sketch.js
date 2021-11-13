// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let img;
let poseNet;
let poses = [];

function preload() {
  img = loadImage('img/eye.png');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses))
}

function draw() {
  image(video, 0, 0, width, height);
  strokeWeight(2);

  // For one pose only (use a for loop for multiple poses!)
    if (poses.length > 0) {
    const pose = poses[0].pose;
    console.log(pose);
        
    // Create an owl eye
    fill(255, 215, 0);
    const rightEye = pose.rightEye;
    image(rightEye.x, rightEye.y, img, 20, 20);

    // Create an owl eye
    fill(255, 215, 0);
    const leftEye = pose.leftEye;
    image(leftEye.x, leftEye.y, img, 20, 20);
      
    fill(0,255,0);
    const rightShoulder = pose.rightShoulder;
    ellipse(rightShoulder.x, rightShoulder.y, 20, 20 );  
  }
}