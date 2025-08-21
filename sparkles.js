(function () {
    const canvas = document.getElementById('sparkles');
    const ctx = canvas.getContext('2d');

    if (!canvas || !ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DPR = Math.min(2, window.devicePixelRatio || 1);

    let width = 0;
    let height = 0;
    let anchorX = 0; // canvas-space center of the title
    let anchorY = 0;
    let sparkles = [];

    function resize() {
        width = canvas.width = Math.floor(window.innerWidth * DPR);
        height = canvas.height = Math.floor(window.innerHeight * DPR);
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';

        measureAnchor();

        const count = prefersReduced ? 60 : Math.min(420, Math.floor((window.innerWidth * window.innerHeight) / 9000));
        sparkles = createSparkles(count);
    }

    function measureAnchor() {
        const title = document.querySelector('.title');
        if (title) {
            const rect = title.getBoundingClientRect();
            anchorX = (rect.left + rect.width / 2) * DPR;
            anchorY = (rect.top + rect.height / 2) * DPR;
        } else {
            anchorX = (window.innerWidth / 2) * DPR;
            anchorY = (window.innerHeight / 2) * DPR;
        }
    }

    function gaussianRandom(mean, stdDev) {
        // Box-Muller transform
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        const mag = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        return mean + stdDev * mag;
    }

    function createSparkles(count) {
        const arr = [];
        for (let i = 0; i < count; i++) {
            // Concentrate near the title center, with a wider spread horizontally
            const anchored = Math.random() < 0.75; // 75% near title, 25% general lower half
            let x, y;
            if (anchored) {
                x = gaussianRandom(anchorX, width * 0.25);
                y = gaussianRandom(anchorY + 40 * DPR, 140 * DPR);
            } else {
                x = Math.random() * width;
                y = (0.5 + Math.random() * 0.5) * height; // lower half
            }
            // Keep them out of the upper sky region
            y = Math.max(height * 0.35, Math.min(y, height * 0.98));
            x = Math.max(0, Math.min(x, width));
            // Sizes: many small, some medium, few large
            let size;
            const roll = Math.random();
            if (roll < 0.08) size = 6 + Math.random() * 6;       // large
            else if (roll < 0.35) size = 2 + Math.random() * 3;  // medium
            else size = 0.8 + Math.random() * 1.6;               // small

            // Yellow vs greenish variation
            const hue = Math.random() < 0.55 ? (56 + Math.random() * 8) : (78 + Math.random() * 18);

            // Per-sparkle opacity and intensity
            const baseAlpha = 0.05 + Math.random() * 0.25;   // 0.05–0.30
            const pulse = 0.20 + Math.random() * 0.65;       // 0.20–0.85
            const speed = 0.0008 + Math.random() * 0.003;    // slow to moderate pulses

            // Occasional burst capability
            const burstChance = Math.random() * 0.002;       // rare

            arr.push({ x, y, size, hue, baseAlpha, pulse, speed, offset: Math.random() * 1000, burstChance, burstTimer: 0 });
        }
        return arr;
    }

    function draw(time) {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < sparkles.length; i++) {
            const s = sparkles[i];
            const flicker = (Math.sin((time + s.offset) * s.speed) + 1) * 0.5; // 0..1
            let alpha = s.baseAlpha + s.pulse * flicker;

            // Rare brief burst for extra sparkle
            if (!prefersReduced && Math.random() < s.burstChance) {
                s.burstTimer = 6 + Math.floor(Math.random() * 10);
            }
            if (s.burstTimer > 0) {
                alpha += 0.35;
                s.burstTimer--;
            }

            // soft glow
            ctx.beginPath();
            ctx.fillStyle = `hsla(${s.hue}, 95%, 62%, ${Math.min(1, alpha).toFixed(3)})`;
            ctx.shadowColor = `hsla(${s.hue}, 95%, 62%, ${Math.min(0.75, alpha + 0.25).toFixed(2)})`;
            ctx.shadowBlur = (10 + s.size * 3) * DPR;
            ctx.arc(s.x, s.y, s.size * DPR, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        if (!prefersReduced) requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    if (!prefersReduced) requestAnimationFrame(draw);
})();


