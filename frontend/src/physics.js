import Matter from "matter-js";

function makeFish(type, length, height, x, y) {
    var Body = Matter.Body,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Constraint = Matter.Constraint;

    var group = Body.nextGroup(true);

    var fish = Composite.create({ label: type });

    var mouth = Bodies.rectangle(x - (3 * length / 8), y + height / 4, height / 2, height / 5, { 
        collisionFilter: {
            group: group
        },
        chamfer: {
            radius: height * 0.5
        },
        restitution: 0.4,
        friction: 0.8,
        render: {
            sprite:  {
                texture: './fish/' + type + '/mouth.png',
                xScale: 0.5,
                yScale: 0.5
            }
    }});

    var head = Bodies.rectangle(x - length / 4, y, length / 3, height, { 
        collisionFilter: {
            group: group
        },
        chamfer: {
            radius: height * 0.5
        },
        restitution: 0.4,
        friction: 0.8,
        render: {
            sprite:  {
                texture: './fish/' + type + '/head.png',
                xScale: 0.5,
                yScale: 0.5
            }
    }});

    var body = Bodies.rectangle(x, y, length / 2, height, { 
        collisionFilter: {
            group: group
        },
        chamfer: {
            radius: height * 0.5
        },
        restitution: 0.4,
        density: 0.0002,
        render: {
            sprite:  {
                texture: './fish/' + type + '/body.png',
                xScale: 0.5,
                yScale: 0.5
            }
    }});

    var tail = Bodies.rectangle(x + length / 4, y - 5, length / 3, height, { 
        collisionFilter: {
            group: group
        },
        chamfer: {
            radius: height * 0.5
        },
        restitution: 0.4,
        density: 0.0002,
        render: {
            sprite:  {
                texture: './fish/' + type + '/tail.png',
                xScale: 0.5,
                yScale: 0.5
            }
    }});

    var eye = Bodies.circle(x, y, height / 4, { 
        collisionFilter: {
            group: group
        },
        restitution: 0.4,
        friction: 0.8,
        density: 0.0002,
        render: {
            sprite:  {
                texture: './fish/' + type + '/eye.png',
                xScale: 0.5,
                yScale: 0.5
            }
    }});

    console.log(head);

                
    var headBody = Constraint.create({
        bodyA: head,
        bodyB: body,
        pointA: { x: length / 16, y: 0 },
        pointB: { x: -length / 16, y: 0 },
        stiffness: 0.8,
        damping: 0.1,
        length: 0
    });
                    
    var headEye = Constraint.create({
        bodyA: head,
        bodyB: eye,
        pointA: { x: -30, y: -5 },
        stiffness: 1,
        length: 0
    });

    var headMouthA = Constraint.create({
        bodyA: head,
        bodyB: mouth,
        pointA: { x: -30, y: 8 },
        pointB: { x: 10, y: 0 },
        stiffness: 1,
        length: 0
    });

    var headMouthB = Constraint.create({
        bodyA: head,
        bodyB: mouth,
        pointA: { x: -25, y: 13 },
        pointB: { x: 15, y: 5 },
        stiffness: 0.2,
        length: 3
    });

    var bodyTail = Constraint.create({
        bodyA: body,
        bodyB: tail,
        pointA: { x: length / 16, y: 0 },
        pointB: { x: -length / 16, y: 2 },
        stiffness: 0.8,
        damping: 0.1,
        length: 0
    });
    
    Composite.addBody(fish, head);
    Composite.addBody(fish, body);
    Composite.addBody(fish, tail);
    Composite.addBody(fish, mouth);
    Composite.addBody(fish, eye);
    // Composite.addBody(fish, pectoral);
    // Composite.addBody(fish, pelvicA);
    // Composite.addBody(fish, pelvicB);
    // Composite.addBody(fish, anal);
    // Composite.addBody(fish, tailA);
    // Composite.addBody(fish, tailB);
    // Composite.addBody(fish, dorsalA);
    // Composite.addBody(fish, dorsalB);
    Composite.addConstraint(fish, headBody);
    Composite.addConstraint(fish, headEye);
    Composite.addConstraint(fish, headMouthA);
    Composite.addConstraint(fish, headMouthB);
    Composite.addConstraint(fish, bodyTail);

    return fish;
};

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
            showDebug: true,
            showPositions: true
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

    // see car function defined later in this file
    Composite.add(world, makeFish("test", 600, 120, width / 2, height / 2));
    
    
    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: true
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