(function () {
    const canvas = document.getElementById('bg');
    const ctx = canvas.getContext('2d', { alpha: true });

    let width = 0;
    let height = 0;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        // Increase particle density significantly; scale by viewport area
        const density = Math.min(850, Math.floor((width * height) / 5000));
        particles = createParticles(density);
    }

    function createParticles(count) {
        const created = [];
        for (let i = 0; i < count; i++) {
            // Size tiers for more variability with some larger fireflies
            let radius;
            const roll = Math.random();
            if (roll < 0.06) {
                radius = 8 + Math.random() * 8;       // giant
            } else if (roll < 0.20) {
                radius = 3.5 + Math.random() * 4.5;   // big
            } else if (roll < 0.60) {
                radius = 1.6 + Math.random() * 2.2;   // medium
            } else {
                radius = 0.6 + Math.random() * 1.2;   // small
            }

            // Two hue families: yellow (~60) and greenish-yellow (~85)
            const yellowFamily = Math.random() < 0.55;
            const hue = yellowFamily ? (56 + Math.random() * 8) : (78 + Math.random() * 18);

            // Each particle gets unique transparency behavior
            const baseAlpha = 0.25 + Math.random() * 0.45;     // 0.25–0.70
            const flickerAmp = 0.25 + Math.random() * 0.45;    // 0.25–0.70

            created.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: radius,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                hue,
                baseAlpha,
                flickerAmp
            });
        }
        return created;
    }

    function drawBackground() {
        // Sky gradient (deep blue to near black)
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, '#0b1e63');      // deep dusk blue
        grad.addColorStop(0.55, '#08143a');   // darker mid
        grad.addColorStop(1, '#010206');      // near-black ground
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Subtle horizon glow
        const glowY = Math.floor(height * 0.58);
        const glowGrad = ctx.createRadialGradient(width * 0.5, glowY, 10, width * 0.5, glowY, Math.max(width, height) * 0.8);
        glowGrad.addColorStop(0, 'rgba(180, 210, 255, 0.06)');
        glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, width, height);
    }

    function step(timeMs) {
        drawBackground();

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy;
            if (p.x < -10) p.x = width + 10; else if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10; else if (p.y > height + 10) p.y = -10;

            // Firefly flicker with unique base and amplitude per particle
            const flicker = Math.abs(Math.sin((timeMs + i * 77) * 0.002));
            let alpha = p.baseAlpha + p.flickerAmp * flicker;
            if (alpha > 0.98) alpha = 0.98; // cap for subtlety

            ctx.beginPath();
            ctx.fillStyle = `hsla(${p.hue}, 95%, 62%, ${alpha.toFixed(3)})`;
            ctx.shadowColor = 'rgba(190, 255, 120, 0.4)';
            ctx.shadowBlur = 8;
            ctx.arc(p.x, p.y, p.r * (0.8 + 0.4 * flicker), 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        requestAnimationFrame(step);
    }

    // Smooth scroll for WORK button
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (!id || id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    window.addEventListener('resize', resize);
    resize();
    step();
})();

