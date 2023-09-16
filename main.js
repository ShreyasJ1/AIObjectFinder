img = "";
status = "";
objects = [];
video = "";
object_to_search = "";
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

}


function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status - Object Mentioned Not Found";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are " + objects.length;
            fill("black");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_to_search) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "Status - Object Mentioned Found";
                i = 0;
            }
        }
    }
}

function modelLoaded() {
    console.log("CocoSSD is initialized");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;

    }
}


function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
    object_to_search = document.getElementById("text_box").value;
    console.log(object_to_search);
}
