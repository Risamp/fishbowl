import Matter from "matter-js";
import makeFish from "./fish";

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies,
    Events = Matter.Events;

var canvas = document.querySelector('#matter-canvas');
const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

export default class FishSim {

    constructor(onBowlEnter) {
        this.engine = Engine.create();
        this.world = this.engine.world;
        this.render = Render.create({
            engine: this.engine,
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

        this.run(onBowlEnter);
    }
    
    run(bowlCallback) {
        Events.on(this.engine, 'collisionStart', function(event) {
            var pairs = event.pairs;

            // change object colours to show those starting a collision
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];
                if (pair.bodyA.label === "panel") {
                    bowlCallback(pair.bodyB.label);
                }
                
                if (pair.bodyB.label === "panel") {
                    bowlCallback(pair.bodyA.label);
                }
            }
        });

        Render.run(this.render);

        // create runner
        var runner = Runner.create();
        Runner.run(runner, this.engine);

        var wallPadding = 35;

        // add bodies
        Composite.add(this.world, [
            // walls
            Bodies.rectangle(width / 2, -height - wallPadding, width, 50, { isStatic: true }), // double height ceiling
            Bodies.rectangle(width / 2, height + wallPadding, width, 50, { isStatic: true }),
            Bodies.rectangle(width + wallPadding, 0, 50, height * 2, { isStatic: true }),
            Bodies.rectangle(-wallPadding, 0, 50, height * 2, { isStatic: true }),

            // center panel
            Bodies.rectangle(width / 2, height / 2, 480, 280, { 
                isStatic: true, 
                label: "panel",
                render: { 
                    visible: false 
                } 
            })
        ]);

        // add fish
        Composite.add(this.world, makeFish("test", 580, 228, (width / 2) + 100, -height / 2, 0.5));
        // Composite.add(this.world, makeFish("test", 580, 228, (width / 2) - 100, -height / 2, 0.7));
        // Composite.add(this.world, makeFish("test", 580, 228, (width / 2) + 200, -height / 2, 0.7));
        // Composite.add(this.world, makeFish("test", 580, 228, (width / 2) - 200, -height / 2, 0.6));
        // Composite.add(this.world, makeFish("test", 580, 228, (width / 2) + 300, -height / 2, 0.5, true));
        // // some little buggers
        // Composite.add(this.world, makeFish("test", 580, 228, (width / 2) + 100, -height / 4, 0.25));
        // Composite.add(this.world, makeFish("test", 580, 228, (width / 2) - 100, -height / 4, 0.4));
        // Composite.add(this.world, makeFish("test", 580, 228, (width / 2) + 200, -height / 4, 0.4));
        // Composite.add(this.world, makeFish("test", 580, 228, (width / 2) - 200, -height / 4, 0.3));
        // Composite.add(this.world, makeFish("test", 580, 228, (width / 2) + 100, -height / 3, 0.25));
        // Composite.add(this.world, makeFish("test", 580, 228, (width / 2) - 100, -height / 3, 0.25, true));
        // Composite.add(this.world, makeFish("test", 580, 228, (width / 2) + 200, -height / 3, 0.2));
        // Composite.add(this.world, makeFish("test", 580, 228, (width / 2) - 200, -height / 3, 0.3));
        
        
        // add mouse control
        var mouse = Mouse.create(this.render.canvas),
            mouseConstraint = MouseConstraint.create(this.engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        Composite.add(this.world, mouseConstraint);

        // keep the mouse in sync with rendering
        this.render.mouse = mouse;

        // fit the render viewport to the scene
        Render.lookAt(this.render, {
            min: { x: 0, y: 0 },
            max: { x: width, y: height }
        });
    }

    addFish(type) {
        Composite.add(this.world, makeFish(type, 580, 228, (width / 2) + 100, -height / 2, 0.5));
    }
}



