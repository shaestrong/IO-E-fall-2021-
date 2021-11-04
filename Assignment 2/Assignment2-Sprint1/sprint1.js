// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

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

    // Create a aqua ellipse for the nose
    fill(72, 192, 229);
    const nose = pose.nose;
    ellipse(nose.x, nose.y, 20, 20);

    // Create a pink ellipse for the right eye
    fill(229, 72, 151);
    const rightEye = pose.rightEye;
    ellipse(rightEye.x, rightEye.y, 20, 20);

    // Create a pink ellipse for the right eye
    fill(229, 72, 151);
    const leftEye = pose.leftEye;
    ellipse(leftEye.x, leftEye.y, 20, 20);
      
    fill(229, 143, 72);
    const rightShoulder = pose.rightShoulder;
    ellipse(rightShoulder.x, rightShoulder.y, 20, 20 );  
      
    fill(229, 143, 72);
    const leftShoulder = pose.leftShoulder;
    ellipse(leftShoulder.x, leftShoulder.y, 20, 20 );  
      
    fill(77, 196, 145);
    const leftWrist = pose.leftWrist;
    ellipse(leftWrist.x, leftWrist.y, 20, 20 );  
      
    fill(77, 196, 145);
    const rightWrist = pose.rightWrist;
    ellipse(rightWrist.x, rightWrist.y, 20, 20 );  
      
      
      
     
  }
    
}