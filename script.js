paper.install(window);

// Layers: Background and Plane
var bgLayer;
var planeLayer;

// Plane variables
var plane;
var body;
var wings;
var leftEngine;
var rightEngine;
var leftHelix;
var verticalLeftHelix;
var horizontalLeftHelix;
var rightHelix;
var verticalRightHelix;
var horizontalRightHelix;
var verticalBackWing;
var backWings;

// Clouds array
var clouds = [];

// Movement variables
var keysPressed = {}; // Object to keep track of keys pressed
var moveAmount = 5; // Move amount in px
    

// Rotation variables
var rotationAmount = 5; // Roteta amount
var rotationAngle = 0;  // Flag rotation angle

// Points 
var points = 0;
var circles = [];
var circlesFlag = false;

// Movement for the clouds
function onFrame(event) {
    onKeyDown();
    onKeyUp();
    for (var i = 0; i < clouds.length; i++) {
        clouds[i].position.x -= 1; // Move the cloud to the left
        if (clouds[i].position.x < -50) {
            clouds[i].position.x = view.size.width + 50; // If the cloud isn't in the canvas it appears again
        }
    }

    // Circle generation every 5 seconds
    if (event.count % 200 === 0 && circlesFlag) {
        generateCircle();
    }

    // Check for Collisions with Circles
    for (var j = 0; j < circles.length; j++) {
        if (plane.intersects(circles[j])) { // Check if the plane intersects with the circle
            circles[j].remove(); // Remove the circle when intersected by the plane
            circles.splice(j, 1); // Remove the circle from the circle array
            points++; // Increase Points
            updatePointsUI(); // Update the UI with the new points
        }
    }

    // Canvas limits
    var canvasWidth = view.size.width;
    var canvasHeight = view.size.height;
    var planeWidth = plane.bounds.width;
    var planeHeight = plane.bounds.height;
    
    // Check Horizontal limits
    if (plane.position.x < planeWidth / 2) {
        plane.position.x = planeWidth / 2;
    }
    if (plane.position.x > canvasWidth - planeWidth / 2) {
        plane.position.x = canvasWidth - planeWidth / 2;
    }
    
    // Check vertical limits
    if (plane.position.y < planeHeight / 2) {
        plane.position.y = planeHeight / 2;
    }
    if (plane.position.y > canvasHeight - planeHeight / 2) {
        plane.position.y = canvasHeight - planeHeight / 2;
    }
}

window.onload = function(){
    // Initialize Paper.js on the canvas element
    paper.setup('myCanvas');

    // Create clouds
    createClouds();

    plane = new Group();


    // Initialize layers
    bgLayer = new Layer();
    planeLayer = new Layer();
    view.onFrame = onFrame;

    // Helix rotation range
    setInterval(rotateHelix, 30);

    // Move of the plane with the keyboard
    document.addEventListener('keydown', function(event) {
        keysPressed[event.key] = true; // Set key as pressed
    });

    document.addEventListener('keyup', function(event) {
        keysPressed[event.key] = false; // Set key as released
    });
}

// Function to create clouds
function createClouds() {
    var cloudPositions = [
        [100, 100], [300, 200], [500, 150], [700, 250], [900, 180], [1100, 600],
        [200, 700], [400, 750], [600, 650], [800, 500], [1000, 450], [1200, 350],
        [1300, 700], [1400, 750], [1600, 650], [1800, 500], [1600, 300], [1400, 200]
    ];

    for (var i = 0; i < cloudPositions.length; i++) {
        var position = cloudPositions[i];
        clouds.push(createCloud(position[0], position[1]));
    }
}

// Function for create a cloud
function createCloud(x, y) {
    var cloud = new Group;
    cloud.addChild(new Path.Circle(new Point(x, y), 30));
    cloud.addChild(new Path.Circle(new Point(x-20, y+8), 30));
    cloud.addChild(new Path.Circle(new Point(x+20, y+8), 30));
    cloud.fillColor = 'white';
    return cloud;
}

function play(){
    points = 0;
    updatePointsUI();
    circlesFlag = true;

    planeLayer.clear();
    plane.removeChildren();
    drawPlane();
    rotateHelix();
}

function drawPlane(){
    // Body
    body = new Path.Circle(new Point(700, 300), 20);
    body.fillColor = '#E8E8E8';
    plane.addChild(body);
    
    // Left helix
    leftHelix = new Group();
    // Vertical Helix    
    verticalLeftHelix = new Path.Line(new Point(630, 265), new Point(630, 325));
    verticalLeftHelix.strokeColor = 'Black';
    verticalLeftHelix.strokeWidth = 2;
    leftHelix.addChild(verticalLeftHelix);
    // Horizontal Helix
    horizontalLeftHelix = new Path.Line(new Point(600,295), new Point(660,295))
    horizontalLeftHelix.strokeColor = 'Black';
    horizontalLeftHelix.strokeWidth = 2;
    leftHelix.addChild(horizontalLeftHelix);
    plane.addChild(leftHelix);
    
    // Right helix
    rightHelix = new Group();
    // Vertical helix
    verticalRightHelix = new Path.Line(new Point(770, 265), new Point(770, 325));
    verticalRightHelix.strokeColor = 'Black';
    verticalRightHelix.strokeWidth = 2;
    rightHelix.addChild(verticalRightHelix);
    // Horizontal helix
    horizontalRightHelix = new Path.Line(new Point(740, 295), new Point(800, 295));
    horizontalRightHelix.strokeColor = 'Black';
    horizontalRightHelix.strokeWidth = 2;
    rightHelix.addChild(horizontalRightHelix);
    plane.addChild(rightHelix);
    
    // Wings
    wings = new Path.Line(new Point(600, 285), new Point(800, 285));
    wings.strokeColor = '#E8E8E8';
    wings.strokeWidth = 4;
    plane.addChild(wings);
    
    // Left engine
    leftEngine = new Path.RoundRectangle({
        point: new Point(620, 285),
        size: new Size(20, 20),
        radius: 8,
        fillColor: 'Red'
    });
    plane.addChild(leftEngine);

    // Right engine
    rightEngine = new Path.RoundRectangle({
        point: new Point(760, 285),
        size: new Size(20, 20),
        radius: 8,
        fillColor: 'Red'
    });
    plane.addChild(rightEngine);
    
    // Back wings 
    backWings = new Path.Line(new Point(675, 250), new Point(725, 250));
    backWings.strokeColor = '#E8E8E8';
    backWings.strokeWidth = 3;
    plane.addChild(backWings);

    // Vertical back wing 
    verticalBackWing = new Path();
    verticalBackWing.add(new Point(700,240));
    verticalBackWing.add(new Point(695,290));
    verticalBackWing.add(new Point(705,290));
    verticalBackWing.closed = true;
    verticalBackWing.fillColor = 'Red';
    plane.addChild(verticalBackWing);
}

function rotateHelix() {
    leftHelix.rotate(4); // Rotate the left helix clockwise
    rightHelix.rotate(-4); // Rotate the right helix counterclockwise
}

// WASD controls 
function onKeyDown(event) {
    var moveX = 0;
    var moveY = 0;

    if (keysPressed['a'] || keysPressed['A'] || keysPressed['left']) {
        moveX -= moveAmount; // Left move
        if (rotationAngle > -45) { // Limit left rotation to -45 degrees
            rotationAngle -= rotationAmount;
            plane.rotate(-rotationAmount, plane.position); // Rotate around the center of the plane
            console.log(rotationAngle);
        }
    } 
    if (keysPressed['d'] || keysPressed['D'] || keysPressed['right']) {
        moveX += moveAmount; // Right move
        if (rotationAngle < 45) { // Limit left rotation to 45 degrees
            rotationAngle += rotationAmount;
            plane.rotate(rotationAmount, plane.position); // Rotate around the center of the plane
        }
    } 
    if (keysPressed['w'] || keysPressed['W'] || keysPressed['up']) {
        moveY -= moveAmount; // Up move
    } 
    if (keysPressed['s'] || keysPressed['S'] || keysPressed['down']) {
        moveY += moveAmount; // Down move
    }

    // Move the plane
    plane.position.x += moveX;
    plane.position.y += moveY;
}

function onKeyUp(event){
    if (!(keysPressed['a'] || keysPressed['A'] || keysPressed['left']) && rotationAngle < 0) {
        rotationAngle = Math.min(rotationAngle + rotationAmount, 0); // Increase the angle of rotation counterclockwise
        plane.rotate(rotationAmount, plane.position); // Rotate counterclockwise
    } 
    if (!(keysPressed['d'] || keysPressed['D'] || keysPressed['right']) && rotationAngle > 0) {
        rotationAngle = Math.max(rotationAngle - rotationAmount, 0); // Decrease the clockwise rotation angle
        plane.rotate(-rotationAmount, plane.position); // Rotate clockwise
    } 
}

//see popUp
function popUp() {
    alert("El juego consiste en tocar con el avión los puntos amarillos que van apareciendo y desaparenciendo en pantalla. Para mover el avión usa WASD. La dificulta es para niño de menos de 3 años, no tienes como perder");
}

// Function to update points UI
function updatePointsUI() {
    var pointsDisplay = document.getElementById('points-display');
    if (pointsDisplay) {
        pointsDisplay.textContent = "Puntos: " + points;
    }
}

// Circle generation function
function generateCircle() {
    // Generate a random number between 1 and 3 to determine the number of circles to generate
    var circleCount = Math.floor(Math.random() * 3) + 1;

    var circlesToRemove = []; // Array to store the circles to be deleted

    for (var i = 0; i < circleCount; i++) {
        // Generate random coordinates within canvas measurements
        var x = Math.random() * (view.size.width - 40) + 20; // Subtract 40 to prevent circles from being partially generated outside the canvas
        var y = Math.random() * (view.size.height - 40) + 20; 
        
        var circle = new Path.Circle(new Point(x, y), 20);
        circle.fillColor = 'yellow'; 
        circles.push(circle); // Adding the Circle to the Circle Array
        circlesToRemove.push(circle); // Add the circle to the array of circles to be deleted
    }

    // Schedule all circles to be deleted after 5 seconds
    setTimeout(function() {
        for (var j = 0; j < circlesToRemove.length; j++) {
            circlesToRemove[j].remove(); // Delete the circle
            var index = circles.indexOf(circlesToRemove[j]);
            if (index !== -1) {
                circles.splice(index, 1); // Remove the circle from the circle array
            }
        }
    }, 2000);
}



