// File Settings
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Paper.js on the canvas element
    paper.setup('myCanvas');

   // Create a new circle path at x=100, y=100 with a radius of 50
    var circle = new paper.Path.Circle({
        center: paper.view.center,
        radius: 20,
        fillColor: 'white' // Fill color of the circle
    });

    paper.view.draw();
});
