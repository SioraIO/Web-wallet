<template>
    <canvas
            id="stars"
            width="300"
            height="300"
    ></canvas>
</template>

<script>
    import Delaunay from "@/utils/Delaunay";

    export default {
        mounted() {

            // Settings
            let particleCount = 60,
                motion = 0.05,
                tilt = 0.05,
                color = "#FFEED4",
                particleSizeBase = 0.5,
                particleSizeMultiplier = 0.3,
                lineWidth = 1,
                linkChance = 75, // chance per frame of link, higher = smaller chance
                linkLengthMin = 5, // min linked vertices
                linkLengthMax = 7, // max linked vertices
                linkOpacity = 0.25, // number between 0 & 1
                linkFade = 90, // link fade-out frames
                linkSpeed = 1, // distance a link travels in 1 frame
                glareAngle = -60,
                glareOpacityMultiplier = 0.05,
                renderParticles = true,
                renderLinks = true,
                flicker = true,
                flickerSmoothing = 15, // higher = smoother flicker
                blurSize = 0,
                orbitTilt = true,
                randomMotion = true,
                noiseLength = 1000,
                noiseStrength = 1;

            let canvas = document.getElementById("stars"),
                context = canvas.getContext("2d"),
                mouse = {x: 0, y: 0},
                m = {},
                r = 0,
                c = 1000, // multiplier for delaunay points, since floats too small can mess up the algorithm
                n = 0,
                nAngle = (Math.PI * 2) / noiseLength,
                nRad = 100,
                nScale = 0.5,
                nPos = {x: 0, y: 0},
                points = [],
                vertices = [],
                triangles = [],
                links = [],
                particles = [];

            function init() {
                let i, j, k;

                // requestAnimFrame polyfill
                window.requestAnimFrame = (function () {
                    return (
                        window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        function (callback) {
                            window.setTimeout(callback, 1000 / 60);
                        }
                    );
                })();

                // Size canvas
                resize();

                mouse.x = canvas.clientWidth / 2;
                mouse.y = canvas.clientHeight / 2;

                // Create particle positions
                for (i = 0; i < particleCount; i++) {
                    let p = new Particle();
                    particles.push(p);
                    points.push([p.x * c, p.y * c]);
                }

                vertices = Delaunay.triangulate(points);
                // Create an array of "triangles" (groups of 3 indices)
                let tri = [];
                for (i = 0; i < vertices.length; i++) {
                    if (tri.length == 3) {
                        triangles.push(tri);
                        tri = [];
                    }
                    tri.push(vertices[i]);
                }

                // Tell all the particles who their neighbors are
                for (i = 0; i < particles.length; i++) {
                    // Loop through all tirangles
                    for (j = 0; j < triangles.length; j++) {
                        // Check if this particle's index is in this triangle
                        k = triangles[j].indexOf(i);
                        // If it is, add its neighbors to the particles contacts list
                        if (k !== -1) {
                            triangles[j].forEach(function (value, index, array) {
                                if (value !== i && particles[i].neighbors.indexOf(value) == -1) {
                                    particles[i].neighbors.push(value);
                                }
                            });
                        }
                    }
                }

                // Motion mode
                if (
                    "ontouchstart" in document.documentElement &&
                    window.DeviceOrientationEvent
                ) {
                    console.log("Using device orientation");
                    window.addEventListener(
                        "deviceorientation",
                        function (e) {
                            mouse.x =
                                canvas.clientWidth / 2 -
                                (e.gamma / 90) * (canvas.clientWidth / 2) * 2;
                            mouse.y =
                                canvas.clientHeight / 2 -
                                (e.beta / 90) * (canvas.clientHeight / 2) * 2;
                        },
                        true
                    );
                } else {
                    // Mouse move listener
                    console.log("Using mouse movement");
                    document.body.addEventListener("mousemove", function (e) {
                        //console.log('moved');
                        mouse.x = e.clientX;
                        mouse.y = e.clientY;
                    });
                }
                (function animloop() {
                    requestAnimFrame(animloop);
                    resize();
                    render();
                })();
            }

            function render() {
                if (randomMotion) {
                    n++;
                    if (n >= noiseLength) {
                        n = 0;
                    }
                    nPos = noisePoint(n);
                }

                context.clearRect(0, 0, canvas.width, canvas.height);

                if (blurSize > 0) {
                    context.shadowBlur = blurSize;
                    context.shadowColor = color;
                }

                if (renderParticles) {
                    for (let i = 0; i < particleCount; i++) {
                        particles[i].render();
                    }
                }

                if (renderLinks) {
                    if (random(0, linkChance) == linkChance) {
                        let length = random(linkLengthMin, linkLengthMax);
                        let start = random(0, particles.length - 1);
                        startLink(start, length);
                    }

                    for (let l = links.length - 1; l >= 0; l--) {
                        if (links[l] && !links[l].finished) {
                            links[l].render();
                        } else {
                            delete links[l];
                        }
                    }
                }
            }

            function resize() {
                canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
                canvas.height = canvas.width * (canvas.clientHeight / canvas.clientWidth);
            }

            function startLink(vertex, length) {
                //console.log('LINK from '+vertex+' (length '+length+')');
                links.push(new Link(vertex, length));
            }

            // Particle class
            let Particle = function () {
                this.x = random(-0.1, 1.1, true);
                this.y = random(-0.1, 1.1, true);
                this.z = random(0, 4);
                this.color = color;
                this.opacity = random(0.1, 1, true);
                this.flicker = 0;
                this.neighbors = []; // placeholder for neighbors
            };
            Particle.prototype.render = function () {
                let pos = position(this.x, this.y, this.z),
                    r =
                        (this.z * particleSizeMultiplier + particleSizeBase) *
                        (sizeRatio() / 1000),
                    o = this.opacity;

                if (flicker) {
                    let newVal = random(-0.5, 0.5, true);
                    this.flicker += (newVal - this.flicker) / flickerSmoothing;
                    if (this.flicker > 0.5) this.flicker = 0.5;
                    if (this.flicker < -0.5) this.flicker = -0.5;
                    o += this.flicker;
                    if (o > 1) o = 1;
                    if (o < 0) o = 0;
                }

                context.fillStyle = this.color;
                context.globalAlpha = o;
                context.beginPath();
                context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
                context.fill();
                context.closePath();

                context.globalAlpha = 1;
            };

            let Link = function (startVertex, numPoints) {
                this.length = numPoints;
                this.verts = [startVertex];
                this.stage = 0;
                this.linked = [startVertex];
                this.distances = [];
                this.traveled = 0;
                this.fade = 0;
                this.finished = false;
            };
            Link.prototype.render = function () {
                // Stages:
                // 0. Vertex collection
                // 1. Render line reaching from vertex to vertex
                // 2. Fade out
                // 3. Finished (delete me)

                let i, p, pos, points;

                switch (this.stage) {
                    // VERTEX COLLECTION STAGE
                    case 0:
                        let last = particles[this.verts[this.verts.length - 1]];
                        if (last && last.neighbors && last.neighbors.length > 0) {
                            let neighbor = last.neighbors[random(0, last.neighbors.length - 1)];
                            if (this.verts.indexOf(neighbor) == -1) {
                                this.verts.push(neighbor);
                            }
                        } else {
                            this.stage = 3;
                            this.finished = true;
                        }

                        if (this.verts.length >= this.length) {
                            for (i = 0; i < this.verts.length - 1; i++) {
                                let p1 = particles[this.verts[i]],
                                    p2 = particles[this.verts[i + 1]],
                                    dx = p1.x - p2.x,
                                    dy = p1.y - p2.y,
                                    dist = Math.sqrt(dx * dx + dy * dy);

                                this.distances.push(dist);
                            }
                            this.stage = 1;
                        }
                        break;

                    // RENDER LINE ANIMATION STAGE
                    case 1:
                        if (this.distances.length > 0) {
                            points = [];
                            for (i = 0; i < this.linked.length; i++) {
                                p = particles[this.linked[i]];
                                pos = position(p.x, p.y, p.z);
                                points.push([pos.x, pos.y]);
                            }

                            let linkSpeedRel = linkSpeed * 0.00001 * canvas.width;
                            this.traveled += linkSpeedRel;
                            let d = this.distances[this.linked.length - 1];
                            if (this.traveled >= d) {
                                this.traveled = 0;
                                this.linked.push(this.verts[this.linked.length]);
                                p = particles[this.linked[this.linked.length - 1]];
                                pos = position(p.x, p.y, p.z);
                                points.push([pos.x, pos.y]);

                                if (this.linked.length >= this.verts.length) {
                                    this.stage = 2;
                                }
                            } else {
                                let a = particles[this.linked[this.linked.length - 1]],
                                    b = particles[this.verts[this.linked.length]],
                                    t = d - this.traveled,
                                    x = (this.traveled * b.x + t * a.x) / d,
                                    y = (this.traveled * b.y + t * a.y) / d,
                                    z = (this.traveled * b.z + t * a.z) / d;

                                pos = position(x, y, z);
                                points.push([pos.x, pos.y]);
                            }

                            this.drawLine(points);
                        } else {
                            this.stage = 3;
                            this.finished = true;
                        }
                        break;

                    // FADE OUT STAGE
                    case 2:
                        if (this.verts.length > 1) {
                            if (this.fade < linkFade) {
                                this.fade++;
                                // Render full link between all vertices and fade over time
                                points = [];
                                let alpha = (1 - this.fade / linkFade) * linkOpacity;
                                for (i = 0; i < this.verts.length; i++) {
                                    p = particles[this.verts[i]];
                                    pos = position(p.x, p.y, p.z);
                                    points.push([pos.x, pos.y]);
                                }
                                this.drawLine(points, alpha);
                            } else {
                                this.stage = 3;
                                this.finished = true;
                            }
                        } else {
                            this.stage = 3;
                            this.finished = true;
                        }
                        break;

                    // FINISHED STAGE
                    case 3:
                    default:
                        this.finished = true;
                        break;
                }
            };
            Link.prototype.drawLine = function (points, alpha) {
                if (typeof alpha !== "number") alpha = linkOpacity;

                if (points.length > 1 && alpha > 0) {
                    context.globalAlpha = alpha;
                    context.beginPath();
                    for (let i = 0; i < points.length - 1; i++) {
                        context.moveTo(points[i][0], points[i][1]);
                        context.lineTo(points[i + 1][0], points[i + 1][1]);
                    }
                    context.strokeStyle = color;
                    context.lineWidth = lineWidth;
                    context.stroke();
                    context.closePath();
                    context.globalAlpha = 1;
                }
            };

            // Utils
            function noisePoint(i) {
                let a = nAngle * i,
                    cosA = Math.cos(a),
                    sinA = Math.sin(a),
                    rad = nRad;
                return {
                    x: rad * cosA,
                    y: rad * sinA
                };
            }

            function position(x, y, z) {
                return {
                    x:
                        x * canvas.width +
                        (canvas.width / 2 - mouse.x + (nPos.x - 0.5) * noiseStrength) *
                        z *
                        motion,
                    y:
                        y * canvas.height +
                        (canvas.height / 2 - mouse.y + (nPos.y - 0.5) * noiseStrength) *
                        z *
                        motion
                };
            }

            function sizeRatio() {
                return canvas.width >= canvas.height ? canvas.width : canvas.height;
            }

            function random(min, max, float) {
                return float
                    ? Math.random() * (max - min) + min
                    : Math.floor(Math.random() * (max - min + 1)) + min;
            }

            if (canvas) init();
        }
    };
</script>
<style lang="scss" scoped>
    #stars {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 660px;
        z-index: 1;
    }
</style>