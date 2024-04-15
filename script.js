paper.install(window);

/*// Create a new circle path at x=100, y=100 with a radius of 50
var circle = new paper.Path.Circle({
    center: paper.view.center,
    radius: 20,
    fillColor: 'white' // Fill color of the circle
});*/

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

window.onload = function(){
    // Initialize Paper.js on the canvas element
    paper.setup('myCanvas');

    // Initialize layers
    bgLayer = new Layer();
    planeLayer = new Layer();


    // Clean plane layer and create new plane
    planeLayer.clear();
    plane = new Group();


    // Body
    body = new Path.Circle(new Point(700, 300), 20);
    body.fillColor = 'White';
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
    wings.strokeColor = 'White';
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
    
    // Back wings 
    backWings = new Path.Line(new Point(675, 250), new Point(725, 250));
    backWings.strokeColor = 'White';
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
paper.view.draw();
