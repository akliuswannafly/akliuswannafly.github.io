
// 碎屑飘扬
// var init = function(e) {
//     var flake = document.createElement("div");
//     document.body.appendChild(flake);
//     flake.classList.add("flake");
//     var x = e.pageX;
//     var y = e.pageY;
//     flake.style.left = x + Math.round(Math.random() * 10) + "px";
//     flake.style.top = y + Math.round(Math.random() * 10) + "px";
//     var direction = Math.round(Math.random());
//
//     var time = setInterval(function() {
//         var dis = Math.round(Math.random() * 10);
//         direction ? (x -= dis) : (x += dis);
//         y -= dis;
//         flake.style.left = x + "px";
//         flake.style.top = y + "px";
//         if (y < y - 50) {
//             clearInterval(time);
//         }
//     }, 50);
// };
//
//
// window.onmousemove = init;

var canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var ctx = canvas.getContext("2d");
var flag = false;
var particles = [];
var color = ["white", "red", "orange", "yellow", "green", "blue", "indigo", "purple"];

animate();

function animate() {
    setInterval(function() {
        render();
        area();
    }, 1000 / 60)
}

canvas.onmousedown = function (event) {
    var e = event || window.event;
    flag = true;
    do_spawn(e, 35 * Math.random() + 35);
};

canvas.onmouseup = function() {
    flag = false;
};

canvas.onmouseout = function() {
    flag = false;
};

canvas.onmousemove = function(event) {
    var e = event || window.event;
    if (flag) {
        do_spawn(e, 9);
    }
};

canvas.ontouchstart = function(e) {
    flag = true;
    do_spawn(e, 35 * Math.random() + 35);
};

canvas.ontouchend = function() {
    flag = false;
};

canvas.ontouchmove = function(e) {
    if (flag) {
        do_spawn(e, 9);
    }
};

function do_spawn(e, n) {
    var x = e.clientX || e.touches[0].pageX;
    var y = e.clientY || e.touches[0].pageY;

    var offset = parseInt(window.getComputedStyle(document.body, null).paddingTop);

    for (var i = 0; i < n; i++) {
        spawn(x, y - offset);
    }
}

function spawn(x, y) {
    var particle = new Particle();
    particle.init(x, y);
    particles.push(particle);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0, len = particles.length; i < len; i++) {
        particles[i].draw();
        particles[i].update();
    }
}

function area() {
    var n = 0;
    for (var i = 0, len = particles.length; i < len; i++) {
        if (particles[i].r > 1) {
            particles[n++] = particles[i];
        }
    }

    while (particles.length > Math.min(700, n)) {
        particles.pop();
    }
}

function Particle() { }

Particle.prototype = {
    init: function (x, y) {
        this.x = x || 0.0;
        this.y = y || 0.0;
        this.r = 10 * Math.random() + 10 || 40;
        this.color = color[~~(Math.random() * 8)];
        this.theta = Math.random() * 2 * Math.PI;
        this.R = Math.random() * 4 + 2;
        this.vx = Math.cos(this.theta) * this.R;
        this.vy = Math.sin(this.theta) * this.R;
    },
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    },
    update: function() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx += Math.cos(this.theta) * .1;
        this.vy += Math.sin(this.theta) * .1;
        this.vx *= .94;
        this.vy *= .94;
        this.r *= .92;
        this.color = color[~~(Math.random() * 8)];
    }
};

var period = document.getElementById("period");
var startTime = new Date().getTime();
var counter = function() {
    var currTime = new Date().getTime();
    period.textContent = ((currTime - startTime)/1000).toFixed(1);
    window.requestAnimationFrame(counter);
};
counter();