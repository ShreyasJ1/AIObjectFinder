status = "";

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
    object = document.getElementById("text_box").value;
    console.log(object);
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;

}

function draw() {
    image(video, 0, 0, 600, 500);
}