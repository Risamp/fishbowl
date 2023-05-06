import Matter from "matter-js";

export default function makeFish(type, length, height, x, y, scale = 1, hasNose = false) {
    console.log("Making fish: " + type);

    var Body = Matter.Body,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Constraint = Matter.Constraint;

    var group = Body.nextGroup(true);
    var fish = Composite.create({ label: type });

    if (scale > 2) scale = 2;

    var restitution = 0.8;
    var friction = 0.7;
    var rounded = { radius: (height * 0.6) * 0.5 * scale * 0.9 }; // match chamfer to half of body part height, then scale slightly down again to not over-round (which flips the mesh inside out)
    var collisionGroup = { group: group };
    var spriteScale = 0.5 * scale;
    var length = scale * length;
    var height = scale * height;
    var constraintsRender = { visible: false };

    // BODIES 

    var mouth = Bodies.rectangle(x - (0.35 * length), y + (0.1 * height), length * 0.1, height * 0.2, { 
        collisionFilter: collisionGroup,
        restitution: restitution,
        friction: friction,
        label: type,
        render: {
            sprite:  {
                texture: './fish/' + type + '/mouth.png',
                xScale: spriteScale,
                yScale: spriteScale
            }
    }});

    var head = Bodies.rectangle(x - (0.25 * length), y, 0.35 * length, height * 0.55, { 
        collisionFilter: collisionGroup,
        chamfer: rounded,
        restitution: restitution,
        friction: friction,
        label: type,
        render: {
            sprite:  {
                texture: './fish/' + type + '/head.png',
                xScale: spriteScale,
                yScale: spriteScale
            }
    }});

    var body = Bodies.rectangle(x, y, length * 0.4, height * 0.55, { 
        collisionFilter: collisionGroup,
        chamfer: rounded,
        restitution: restitution,
        friction: friction,
        density: 0.0002,
        label: "$" + type,
        render: {
            sprite:  {
                texture: './fish/' + type + '/body.png',
                xScale: spriteScale,
                yScale: spriteScale,
                yOffset: 0.1
            }
    }});

    var tail = Bodies.rectangle(x + (length * 0.35), y - 5, length * 0.5, height * 0.55, { 
        collisionFilter: collisionGroup,
        chamfer: rounded,
        restitution: restitution,
        friction: friction,
        label: type,
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
        label: type,
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
        label: type,
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
        label: type,
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
        length: 0,
        render: constraintsRender
    });
                    
    var headEye = Constraint.create({
        bodyA: head,
        bodyB: eye,
        pointA: { x: -length * 0.1, y: -height * 0.1 },
        stiffness: 1,
        length: 0,
        render: constraintsRender
    });

    var headMouthA = Constraint.create({
        bodyA: head,
        bodyB: mouth,
        pointA: { x: -length * 0.09, y: height * 0.11 },
        pointB: { x: length * 0.04, y: height * 0.08 },
        stiffness: 1,
        length: 0,
        render: constraintsRender
    });

    var headMouthB = Constraint.create({
        bodyA: head,
        bodyB: mouth,
        pointA: { x: -length * 0.16, y: -height * 0.04 },
        pointB: { x: -length * 0.04, y: -height * 0.08 },
        stiffness: 0.002,
        damping: 0.3,
        length: 0,
        render: constraintsRender
    });

    var bodyTail = Constraint.create({
        bodyA: body,
        bodyB: tail,
        pointA: { x: length * 0.1, y: 0 },
        pointB: { x: -length * 0.2, y: height * 0.02 },
        stiffness: 0.8,
        damping: 0.1,
        length: 0,
        render: constraintsRender
    });

    var bodyPectoralA = Constraint.create({
        bodyA: head,
        bodyB: pectoral,
        pointA: { x: length * 0.06, y: height * 0.1 },
        pointB: { x: -length * 0.06, y: height * 0.05 },
        stiffness: 1,
        length: 0,
        render: constraintsRender
    });

    var bodyPectoralB = Constraint.create({
        bodyA: body,
        bodyB: pectoral,
        pointA: { x: -length * 0.12, y: height * 0.1 },
        pointB: { x: length * 0.05, y: height * 0.05 },
        stiffness: 0.01,
        damping: 0.1,
        length: 0,
        render: constraintsRender
    });

    var bodyPelvicA = Constraint.create({
        bodyA: body,
        bodyB: pelvic,
        pointA: { x: -length * 0.2, y: height * 0.22},
        pointB: { x: -length * 0.05, y: -height * 0.15 },
        stiffness: 0.9,
        damping: 0.1,
        length: 0,
        render: constraintsRender
    });

    var bodyPelvicB = Constraint.create({
        bodyA: body,
        bodyB: pelvic,
        pointA: { x: -length * 0.13, y: height * 0.3 },
        pointB: { x: length * 0.07, y: height * 0.1},
        stiffness: 0.01,
        damping: 0.1,
        length: 0,
        render: constraintsRender
    });

    var tailStretch = Constraint.create({ // push fish back out into straight position to prevent folding
        bodyA: body,
        bodyB: tail,
        pointA: { x: 0, y: 0 },
        pointB: { x: 0, y: 0 },
        stiffness: 0.04,
        damping: 0.1,
        length: length * 0.32,
        render: constraintsRender
    });

    var headStretch = Constraint.create({ // push fish back out into straight position to prevent folding
        bodyA: head,
        bodyB: body,
        pointA: { x: 0, y: 0 },
        pointB: { x: 0, y: 0 },
        stiffness: 0.025,
        damping: 0.1,
        length: length * 0.28,
        render: constraintsRender
    });


    if (hasNose) {
        var nose = Bodies.rectangle(x - (0.5 * length), y, 0.4 * length, height * 0.3, { 
            collisionFilter: collisionGroup,
            restitution: restitution,
            label: type,
            render: {
                sprite:  {
                    texture: './fish/' + type + '/nose.png',
                    xScale: spriteScale,
                    yScale: spriteScale
                }
        }});

        var headNoseA = Constraint.create({
            bodyA: head,
            bodyB: nose,
            pointA: { x: -length * 0.05, y: -height * 0.15 },
            pointB: { x: length * 0.16, y: -height * 0.03 },
            stiffness: 0.9,
            length: 0,
            render: constraintsRender
        });

        var headNoseB = Constraint.create({
            bodyA: head,
            bodyB: nose,
            pointA: { x: -length * 0.09, y: -height * 0.09 },
            pointB: { x: length * 0.12, y: height * 0.03 },
            stiffness: 0.9,
            length: 0,
            render: constraintsRender
        });

        Composite.addBody(fish, nose);
        Composite.addConstraint(fish, headNoseA);
        Composite.addConstraint(fish, headNoseB);
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
        bodyPelvicB,
        headStretch,
        tailStretch
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




export const fishTypes = [
    {
        label: "bahaba",
        length: 653,
        height: 213,
        scientificName: "Bahaba taipingensis",
        nose: false
    },
    {
        label: "bluefin",
        length: 731,
        height: 324,
        scientificName: "Thunnus maccoyii",
        nose: false
    },
    {
        label: "bigeye",
        length: 731,
        height: 324,
        scientificName: "Thunnus obesus",
        nose: false
    },
    {
        label: "marlin",
        length: 828,
        height: 352,
        scientificName: "Makaira nigricans",
        nose: true
    },
    {
        label: "meagre",
        length: 580,
        height: 228,
        scientificName: "Argyrosomus japonicus",
        nose: false
    },
]