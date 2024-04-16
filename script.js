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

// Movement for the clouds
function onFrame(event) {
    for (var i = 0; i < clouds.length; i++) {
        clouds[i].position.x -= 1; // Move the cloud to the left
        if (clouds[i].position.x < -50) {
            clouds[i].position.x = view.size.width + 50; // If the cloud isn't in the canvas it appears again
        }
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
    document.addEventListener('keydown', onKeyDown);
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
    // Clean plane layer and create new plane
    planeLayer.clear();


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
    var moveAmount = 10; // Move amount in px
    var moveX = 0;
    var moveY = 0;

    if (event.key === 'a' || event.key === 'A' || event.key === 'left') {
        moveX -= moveAmount; // Left move
    } else if (event.key === 'd' || event.key === 'D' || event.key === 'right') {
        moveX += moveAmount; // Right move
    } else if (event.key === 'w' || event.key === 'W' || event.key === 'up') {
        moveY -= moveAmount; // Up move
    } else if (event.key === 's' || event.key === 'S' || event.key === 'down') {
        moveY += moveAmount; // Down move
    }

    // Move the plane
    plane.position.x += moveX;
    plane.position.y += moveY;
}

