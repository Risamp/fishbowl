import Matter from "matter-js";

export default function makeFish(type, length, height, x, y, nose = false) {
    var Body = Matter.Body,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Constraint = Matter.Constraint;

    var group = Body.nextGroup(true);

    var fish = Composite.create({ label: type });

    var restitution = 0.8;
    var friction = 0.5;
    var rounded = { radius: (height * 0.6) * 0.5 };
    var collisionGroup = { group: group };
    var spriteScale = 0.5;

    // BODIES 

    var mouth = Bodies.rectangle(x - (0.35 * length), y + (0.1 * height), length * 0.1, height * 0.2, { 
        collisionFilter: collisionGroup,
        restitution: restitution,
        friction: friction,
        render: {
            sprite:  {
                texture: './fish/' + type + '/mouth.png',
                xScale: spriteScale,
                yScale: spriteScale
            }
    }});

    var head = Bodies.rectangle(x - (0.25 * length), y, 0.35 * length, height * 0.6, { 
        collisionFilter: collisionGroup,
        chamfer: rounded,
        restitution: restitution,
        friction: friction,
        render: {
            sprite:  {
                texture: './fish/' + type + '/head.png',
                xScale: spriteScale,
                yScale: spriteScale
            }
    }});

    var body = Bodies.rectangle(x, y, length * 0.4, height * 0.6, { 
        collisionFilter: collisionGroup,
        chamfer: rounded,
        restitution: restitution,
        friction: friction,
        density: 0.0002,
        render: {
            sprite:  {
                texture: './fish/' + type + '/body.png',
                xScale: spriteScale,
                yScale: spriteScale,
                yOffset: 0.1
            }
    }});

    var tail = Bodies.rectangle(x + (length * 0.35), y - 5, length * 0.5, height * 0.6, { 
        collisionFilter: collisionGroup,
        chamfer: rounded,
        restitution: restitution,
        friction: friction,
        render: {
            sprite:  {
                texture: './fish/' + type + '/tail.png',
                xScale: spriteScale,
                yScale: spriteScale
            }
    }});

    var eye = Bodies.circle(x + (0.33 * length), y + (height * 0.1), height * 0.09, { 
        collisionFilter: collisionGroup,
        restitution: restitution,
        friction: friction,
        render: {
            sprite:  {
                texture: './fish/' + type + '/eye.png',
                xScale: spriteScale,
                yScale: spriteScale
            }
    }});

    var pectoral = Bodies.rectangle(x - (length * 0.1), y + (height * 0.1), length * 0.2, height * 0.2, { 
        collisionFilter: collisionGroup,
        restitution: restitution,
        friction: friction,
        render: {
            sprite:  {
                texture: './fish/' + type + '/pectoral.png',
                xScale: spriteScale,
                yScale: spriteScale
            }
    }});

    var pelvic = Bodies.rectangle(x - (length * 0.1), y + (height * 0.35), length * 0.12, height * 0.3, { 
        collisionFilter: collisionGroup,
        restitution: restitution,
        friction: friction,
        render: {
            sprite:  {
                texture: './fish/' + type + '/pelvic.png',
                xScale: spriteScale,
                yScale: spriteScale
            }
    }});


    // JOINTS
                
    var headBody = Constraint.create({
        bodyA: head,
        bodyB: body,
        pointA: { x: length * 0.1, y: 0 },
        pointB: { x: -length * 0.15, y: 0 },
        stiffness: 0.8,
        damping: 0.1,
        length: 0
    });
                    
    var headEye = Constraint.create({
        bodyA: head,
        bodyB: eye,
        pointA: { x: -length * 0.1, y: -height * 0.1 },
        stiffness: 1,
        length: 0
    });

    var headMouthA = Constraint.create({
        bodyA: head,
        bodyB: mouth,
        pointA: { x: -length * 0.09, y: height * 0.11 },
        pointB: { x: length * 0.04, y: height * 0.08 },
        stiffness: 1,
        length: 0
    });

    var headMouthB = Constraint.create({
        bodyA: head,
        bodyB: mouth,
        pointA: { x: -length * 0.16, y: -height * 0.04 },
        pointB: { x: -length * 0.04, y: -height * 0.08 },
        stiffness: 0.001,
        length: 0
    });

    var bodyTail = Constraint.create({
        bodyA: body,
        bodyB: tail,
        pointA: { x: length * 0.1, y: 0 },
        pointB: { x: -length * 0.2, y: height * 0.02 },
        stiffness: 0.8,
        damping: 0.1,
        length: 0
    });

    var bodyPectoralA = Constraint.create({
        bodyA: head,
        bodyB: pectoral,
        pointA: { x: length * 0.06, y: height * 0.1 },
        pointB: { x: -length * 0.06, y: height * 0.05 },
        stiffness: 1,
        length: 0
    });

    var bodyPectoralB = Constraint.create({
        bodyA: body,
        bodyB: pectoral,
        pointA: { x: -length * 0.12, y: height * 0.1 },
        pointB: { x: length * 0.05, y: height * 0.05 },
        stiffness: 0.01,
        damping: 0.1,
        length: 0
    });

    var bodyPelvicA = Constraint.create({
        bodyA: body,
        bodyB: pelvic,
        pointA: { x: -length * 0.2, y: height * 0.22},
        pointB: { x: -length * 0.05, y: -height * 0.15 },
        stiffness: 0.9,
        damping: 0.1,
        length: 0
    });

    var bodyPelvicB = Constraint.create({
        bodyA: body,
        bodyB: pelvic,
        pointA: { x: -length * 0.13, y: height * 0.3 },
        pointB: { x: length * 0.07, y: height * 0.1},
        stiffness: 0.01,
        damping: 0.1,
        length: 0
    });


    if (nose) {
        // add nose
    }


    var bodies = [
        head, 
        body, 
        tail, 
        mouth, 
        eye, 
        pectoral,
        pelvic
    ];

    var constraints = [
        headBody, 
        headEye, 
        headMouthA, 
        headMouthB, 
        bodyTail, 
        bodyPectoralA, 
        bodyPectoralB,
        bodyPelvicA,
        bodyPelvicB
    ];


    // add bodies and constraints to composite

    bodies.forEach((body) => {
        Composite.addBody(fish, body);
    })

    constraints.forEach((constraint) => {
        Composite.addConstraint(fish, constraint);
    })

    return fish;
};