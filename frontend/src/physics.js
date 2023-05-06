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

    var wallPadding = 35;

    // add bodies
    Composite.add(world, [
        // walls
        Bodies.rectangle(width / 2, -height - wallPadding, width, 50, { isStatic: true }), // double height ceiling
        Bodies.rectangle(width / 2, height + wallPadding, width, 50, { isStatic: true }),
        Bodies.rectangle(width + wallPadding, 0, 50, height * 2, { isStatic: true }),
        Bodies.rectangle(-wallPadding, 0, 50, height * 2, { isStatic: true }),

        // center panel
        Bodies.rectangle(width / 2, height / 2, 480, 280, { 
            isStatic: true, 
            render: { 
                visible: false 
            } 
        })
    ]);

    // add fish
    Composite.add(world, makeFish("test", 580, 228, width / 2, height / 4, 0.7));
    Composite.add(world, makeFish("test", 580, 228, (width / 2) + 400, height / 4, 0.4, true));
    Composite.add(world, makeFish("test", 580, 228, (width / 2) - 400, height / 4, 0.6));
    Composite.add(world, makeFish("test", 580, 228, (width / 2) + 800, height / 4, 0.6));
    Composite.add(world, makeFish("test", 580, 228, (width / 2) - 800, height / 4, 0.5));
    // some little buggers
    Composite.add(world, makeFish("test", 580, 228, (width / 2) + 800, height / 4, 0.25));
    Composite.add(world, makeFish("test", 580, 228, (width / 2) - 800, height / 4, 0.25));
    Composite.add(world, makeFish("test", 580, 228, (width / 2) + 800, height / 4, 0.25));
    Composite.add(world, makeFish("test", 580, 228, (width / 2) - 800, height / 4, 0.3));
    
    
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