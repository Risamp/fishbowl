import Matter from "matter-js";
import makeFish from "./fish";

var canvas = document.querySelector('#matter-canvas');
const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        engine: engine,
        canvas: canvas,
        options: {
            width: width,
            height: height,
            showAngleIndicator: false,
            wireframes: false,
            showDebug: false,
            showPositions: false,
            showBounds: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    var wallPadding = 50;

    // add bodies
    Composite.add(world, [
        // walls
        Bodies.rectangle(width / 2, -wallPadding, width, 50, { isStatic: true }),
        Bodies.rectangle(width / 2, height + wallPadding, width, 50, { isStatic: true }),
        Bodies.rectangle(width + wallPadding, height / 2, 50, height, { isStatic: true }),
        Bodies.rectangle(-wallPadding, height / 2, 50, height, { isStatic: true })
    ]);

    // add fish
    Composite.add(world, makeFish("test", 580, 228, width / 2, height / 2));
    Composite.add(world, makeFish("test", 580, 228, (width / 2) + 400, height / 2), true);
    Composite.add(world, makeFish("test", 580, 228, (width / 2) - 400, height / 2));
    Composite.add(world, makeFish("test", 580, 228, (width / 2) + 800, height / 2));
    Composite.add(world, makeFish("test", 580, 228, (width / 2) - 800, height / 2));
    
    
    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height }
    });