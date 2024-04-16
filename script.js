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

    // Límites del lienzo
    var canvasWidth = view.size.width;
    var canvasHeight = view.size.height;
    var planeWidth = plane.bounds.width;
    var planeHeight = plane.bounds.height;
    
    // Verificar límites horizontales
    if (plane.position.x < planeWidth / 2) {
        plane.position.x = planeWidth / 2;
    }
    if (plane.position.x > canvasWidth - planeWidth / 2) {
        plane.position.x = canvasWidth - planeWidth / 2;
    }
    
    // Verificar límites verticales
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
    clouds.push(createCloud(100, 100));
    clouds.push(createCloud(300, 200));
    clouds.push(createCloud(500, 150));
    clouds.push(createCloud(700, 250));
    clouds.push(createCloud(900, 180));
    clouds.push(createCloud(1100, 120));
    clouds.push(createCloud(200, 300));
    clouds.push(createCloud(400, 100));
    clouds.push(createCloud(600, 250));
    clouds.push(createCloud(800, 200));
    clouds.push(createCloud(1000, 150));
    clouds.push(createCloud(1200, 300));

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
        if (rotationAngle > -45) { // Limitar rotación hacia la izquierda a -45 grados
            rotationAngle -= rotationAmount;
            plane.rotate(-rotationAmount, plane.position); // Rotar en torno al centro del avión
            console.log(rotationAngle);
        }
    } 
    if (keysPressed['d'] || keysPressed['D'] || keysPressed['right']) {
        moveX += moveAmount; // Right move
        if (rotationAngle < 45) { // Limitar rotación hacia la derecha a 45 grados
            rotationAngle += rotationAmount;
            plane.rotate(rotationAmount, plane.position); // Rotar en torno al centro del avión
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
        rotationAngle = Math.min(rotationAngle + rotationAmount, 0); // Incrementar el ángulo de rotación en sentido antihorario
        plane.rotate(rotationAmount, plane.position); // Rotar en sentido antihorario
    } 
    if (!(keysPressed['d'] || keysPressed['D'] || keysPressed['right']) && rotationAngle > 0) {
        rotationAngle = Math.max(rotationAngle - rotationAmount, 0); // Decrementar el ángulo de rotación en sentido horario
        plane.rotate(-rotationAmount, plane.position); // Rotar en sentido horario
    } 
}

//see popUp
function popUp() {
    alert("El avión se mueve con WASD, mero bobo que no sabe ni como mover un avión, definitivamente no le sabes");
}

