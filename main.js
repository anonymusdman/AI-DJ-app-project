leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
leftwristscore = 0;
rightwristscore = 0;
a_variable = "";
Gas2 = "";
Running1 = "";
Gas2s = "";
Running1s = "";
function preload(){
Gas2 = loadSound('Gas_Gas_Gas.mp3');
Running1 = loadSound('Running_in_the_90s.mp3');
}
function setup(){
canvas = createCanvas(800, 600);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 800, 600);
    fill(255, 0, 0);
    stroke(255, 0, 0);
    Running1s = Running1.isPlaying();
    Gas2s = Gas2.isPlaying();
    if(leftwristscore > 0.2){
        circle(leftwristx, leftwristy, 20);
        Gas2.stop();
        if(Running1s == false){
            Running1.play();
            document.getElementById("song").innerHTML = "Song playing: Running in the 90's";
        }
    }
    if(rightwristscore > 0.2){
    circle(rightwristx, rightwristy, 20);
    Running1.stop();
    if(Gas2s == false){
        Gas2.play();
        document.getElementById("song").innerHTML = "Song playing: Gas gas gas";
    }
 }
}

function modelLoaded(){
    console.log("PoseNet initialized!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        leftwristscore = results[0].pose.keypoints[9].score;
        rightwristscore = results[0].pose.keypoints[10].score;
    }
}