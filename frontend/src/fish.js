import Matter from "matter-js";

export default function makeFish(type, length, height, x, y) {
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

    // BODIES 

    var mouth = Bodies.rectangle(x - (3 * length / 8), y + height / 4, height / 2, height / 5, { 
        collisionFilter: collisionGroup,
        restitution: restitution,
        friction: friction,
        render: {
            sprite:  {
                texture: './fish/' + type + '/mouth.png',
                xScale: 0.5,
                yScale: 0.5
            }
    }});

    var head = Bodies.rectangle(x - length / 4, y, length / 3, height * 0.6, { 
        collisionFilter: collisionGroup,
        chamfer: rounded,
        restitution: restitution,
        friction: friction,
        render: {
            sprite:  {
                texture: './fish/' + type + '/head.png',
                xScale: 0.5,
                yScale: 0.5
            }
    }});

    var body = Bodies.rectangle(x, y, length / 2, height * 0.6, { 
        collisionFilter: collisionGroup,
        chamfer: rounded,
        restitution: restitution,
        friction: friction,
        density: 0.0002,
        render: {
            sprite:  {
                texture: './fish/' + type + '/body.png',
                xScale: 0.5,
                yScale: 0.5,
                yOffset: 0.1
            }
    }});

    var tail = Bodies.rectangle(x + length / 4, y - 5, length / 3, height * 0.6, { 
        collisionFilter: collisionGroup,
        chamfer: rounded,
        restitution: restitution,
        friction: friction,
        render: {
            sprite:  {
                texture: './fish/' + type + '/tail.png',
                xScale: 0.5,
                yScale: 0.5
            }
    }});

    var eye = Bodies.circle(x, y, height / 4, { 
        collisionFilter: collisionGroup,
        restitution: restitution,
        friction: friction,
        render: {
            sprite:  {
                texture: './fish/' + type + '/eye.png',
                xScale: 0.5,
                yScale: 0.5
            }
    }});

    var pectoral = Bodies.rectangle(x - (length / 10), y + (height / 24), length / 12, height / 4, { 
        collisionFilter: collisionGroup,
        restitution: restitution,
        friction: friction,
        render: {
            sprite:  {
                texture: './fish/' + type + '/pectoral.png',
                xScale: 0.5,
                yScale: 0.5
            }
    }});

    var pelvic = Bodies.rectangle(x - (length / 10), y + (height / 24), length / 12, height / 4, { 
        collisionFilter: collisionGroup,
        restitution: restitution,
        friction: friction,
        render: {
            sprite:  {
                texture: './fish/' + type + '/pelvic.png',
                xScale: 0.5,
                yScale: 0.5
            }
    }});


    // JOINTS
                
    var headBody = Constraint.create({
        bodyA: head,
        bodyB: body,
        pointA: { x: length / 16, y: 0 },
        pointB: { x: -length / 12, y: 0 },
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
        pointB: { x: -length / 12, y: 4 },
        stiffness: 0.8,
        damping: 0.1,
        length: 0
    });

    var bodyPectoralA = Constraint.create({
        bodyA: body,
        bodyB: pectoral,
        pointA: { x: -length / 16, y: 5 },
        pointB: { x: -length / 60, y: 0 },
        stiffness: 0.1,
        damping: 0.1,
        length: 0
    });

    var bodyPectoralB = Constraint.create({
        bodyA: body,
        bodyB: pectoral,
        pointA: { x: -length / 12, y: 5 },
        pointB: { x: -length / 30, y: 0 },
        stiffness: 0.01,
        damping: 0.1,
        length: 0
    });

    var bodyPelvicA = Constraint.create({
        bodyA: body,
        bodyB: pelvic,
        pointA: { x: -length / 10, y: height / 6 },
        pointB: { x: -length / 50, y: -10 },
        stiffness: 0.8,
        damping: 0.1,
        length: 0
    });

    var bodyPelvicB = Constraint.create({
        bodyA: body,
        bodyB: pelvic,
        pointA: { x: -length / 8, y: height / 5 },
        pointB: { x: -length / 30, y: 0 },
        stiffness: 0.01,
        damping: 0.1,
        length: 0
    });


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