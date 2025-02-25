$(document).ready(function () {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: null, y: null };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Создание частиц
    class Particle {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.ix = x;
            this.iy = y;
            this.size = size;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
        }

        // returnPosition(){
        //     if(this.x != this.ix || this.y != this.iy){
        //         let dx = this.x - this.ix;
        //         let dy = this.y - this.iy;

        //         let angle = Math.atan2(dy,dx);
        //         this.x -= Math.cos(angle) * 2;
        //         this.y -= Math.sin(angle) * 2;

        //     }
        // }

        update() {
            // Отражение от краёв
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Влияние курсора
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            let idx = this.x - this.ix;
            let idy = this.y - this.iy;
            let idistance = Math.sqrt(idx * idx + idy * idy);
            if (distance < 50 && idistance < 50) {
                let angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * 2;
                this.y -= Math.sin(angle) * 2;
            }
            else  if( Math.abs(this.x - this.ix) > 1 || Math.abs(this.y - this.iy) > 1){
                let angle = Math.atan2(idy,idx);
                this.x -= Math.cos(angle) * 2;
                this.y -= Math.sin(angle) * 2;
            }
        }
    }

    function init() {
        particles = [];
        for (let i = 10; i < canvas.width; i += 20) {
            for (let j = 10; j < canvas.height; j += 20) {
                let size = 3;
                let x = i;
                let y = j;
                particles.push(new Particle(x, y, size));
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    // Обновление размеров при изменении экрана
    $(window).resize(function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    // Отслеживание движения мыши
    $(document).mousemove(function (event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    init();
    animate();
});