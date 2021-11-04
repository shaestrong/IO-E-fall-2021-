// this is a very simple sketch that demonstrates how to place a video cam image into a canvas 

let video;
let pose;
//let img1;
let skeleton;

function setup(){
createCanvas(640, 480);
noStroke();    
video = createCapture(VIDEO);
video.size(width,height);    

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses) 
//img1 = loadImage('images/hand.svg'); 
video.hide();    
    
}

function modelLoaded(){
    console.log("modelLoaded function has been called so this work!!!!");
};



function gotPoses(poses){
    //console.log(poses);
    if( poses.length > 0 ){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton; 
    } 
    
} 



/*translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(70, 70, 70);
  pop();*/



function draw(){
image(video, 0, 0,width,height);
//TRESHOLD 0 is white - 1 is black
filter(THRESHOLD,1);    
//filter(GRAY);
//filter(OPAQUE);
//filter(INVERT);
//filter(POSTERIZE,2,2,2);
//filter(BLUR,10);
//filter(ERODE);
//filter(DILATE);
//filter(OPAQUE);

    

    
    if(pose){
    //fill(255,0,0);
    //ellipse(pose.nose.x, pose.nose.y, 10);
    //image(img1, pose.leftWrist.x,pose.leftWrist.y , 150, 150);
    
    for(let i=0; i < pose.keypoints.length; i++){
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    
    
    //console.log("keypoints");
        
    fill(0,255,0);    
    ellipse(x,y,120,120);
      //box(x,y,50);  
        
    for(let i = 0; i < skeleton.length; i++){
        let a = skeleton[i][0];
        let b = skeleton[i][1];
        strokeWeight(2);
        stroke(255);
        line(a.position.x, a.position.y,b.position.x, b.position.y );
        }    
    }
}  
    
    
}