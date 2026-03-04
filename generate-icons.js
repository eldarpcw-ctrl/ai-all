/**
 * generate-icons.js
 * Run with: node generate-icons.js
 * Requires: npm install canvas
 *
 * Generates all PWA icon sizes from scratch using node-canvas.
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const OUT_DIR = path.join(__dirname, 'icons');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function drawIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    const cx = size / 2, cy = size / 2, r = size / 2;

    // Background
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    bg.addColorStop(0, '#0c1228');
    bg.addColorStop(1, '#050810');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    // Hexagon
    const hr = size * 0.38;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + hr * Math.cos(angle);
        const y = cy + hr * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    const hexGrad = ctx.createLinearGradient(cx - hr, cy - hr, cx + hr, cy + hr);
    hexGrad.addColorStop(0, '#6c63ff');
    hexGrad.addColorStop(1, '#22d3ee');
    ctx.strokeStyle = hexGrad;
    ctx.lineWidth = size * 0.04;
    ctx.stroke();

    // Inner brain glow circle
    const glowR = size * 0.22;
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
    glow.addColorStop(0, 'rgba(108,99,255,0.5)');
    glow.addColorStop(1, 'rgba(34,211,238,0.0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
    ctx.fill();

    // Brain emoji text
    const emojiSize = Math.floor(size * 0.35);
    ctx.font = `${emojiSize}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🧠', cx, cy - size * 0.04);

    // "AI" text at bottom
    const fontSize = Math.max(Math.floor(size * 0.14), 8);
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    const textGrad = ctx.createLinearGradient(cx - 40, 0, cx + 40, 0);
    textGrad.addColorStop(0, '#a78bfa');
    textGrad.addColorStop(1, '#22d3ee');
    ctx.fillStyle = textGrad;
    ctx.fillText('AI ALL', cx, size - size * 0.1);

    return canvas.toBuffer('image/png');
}

SIZES.forEach(size => {
    const buffer = drawIcon(size);
    const outPath = path.join(OUT_DIR, `icon-${size}.png`);
    fs.writeFileSync(outPath, buffer);
    console.log(`✅ Created icon-${size}.png`);
});

console.log('\n🎉 All icons generated in ./icons/ folder!');
