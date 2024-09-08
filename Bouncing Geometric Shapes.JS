const canvas = document.getElementById('shapesCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        const shapes = [];
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F1C40F'];


        class Shape {
            constructor(x, y, size, type, color) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.type = type;
                this.color = color;
                this.dx = Math.random() * 4 + 1;
                this.dy = Math.random() * 4 + 1;
                this.angle = Math.random() * Math.PI * 2;
            }


            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();


                if (this.type === 'circle') {
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                } else if (this.type === 'square') {
                    ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
                } else if (this.type === 'triangle') {
                    ctx.moveTo(this.x, this.y - this.size);
                    ctx.lineTo(this.x - this.size, this.y + this.size);
                    ctx.lineTo(this.x + this.size, this.y + this.size);
                    ctx.closePath();
                }


                ctx.fill();
            }


            update() {
                if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx *= -1;
                if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy *= -1;


                this.x += this.dx;
                this.y += this.dy;


                if (this.type === 'square' || this.type === 'triangle') {
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    this.angle += 0.05;
                    ctx.rotate(this.angle);
                    ctx.translate(-this.x, -this.y);
                    this.draw();
                    ctx.restore();
                } else {
                    this.draw();
                }
            }
        }


        function createShapes(numShapes) {
            for (let i = 0; i < numShapes; i++) {
                const size = Math.random() * 50 + 20;
                const x = Math.random() * (canvas.width - size * 2) + size;
                const y = Math.random() * (canvas.height - size * 2) + size;
                const type = ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)];
                const color = colors[Math.floor(Math.random() * colors.length)];
                shapes.push(new Shape(x, y, size, type, color));
            }
        }


        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);


            shapes.forEach(shape => {
                shape.update();
            });


            requestAnimationFrame(animate);
        }


        createShapes(15);
        animate();


        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            shapes.length = 0; 
            createShapes(15);
        });