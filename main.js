img ="";
status = "";
object = [];
function preload(){
    img = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting Objects";
}
function modelLoaded(){
    console.log("modelLoaded");
    status = true;
}
function gotResult(error,results){
    if (error){
    console.log(error);
    }
    console.log(results);
    object = results;
}
function draw(){
    image(video,0,0,400,400);
if (object == Person){
    r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);
        for(i = 0;i <object.length;i++){
            document.getElementById("number_of_objects").innerHTML="Baby Has been Found!";
            fill(r,g,b);
            percent = floor(object[i].confidence*100);
            text(object[i].label+""+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
        if(object != Person){
            r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);
        for(i = 0;i <object.length;i++){
            document.getElementById("number_of_objects").innerHTML="Baby Not Found!";
            fill(r,g,b);
            percent = floor(object[i].confidence*100);
            text(object[i].label+""+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            sound = loadSound("alarm_sound.mp3");
            sound.play();
        }
}
}
}
