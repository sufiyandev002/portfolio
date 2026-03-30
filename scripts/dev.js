const { networkInterfaces } = require('os');
const { spawn } = require('child_process');

function getLocalIp() {
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return '0.0.0.0';
}

const ip = getLocalIp();
console.log(`\x1b[32m%s\x1b[0m`, `Starting dev server on: http://${ip}:3000`);

const child = spawn('npx', ['next', 'dev', '--hostname', '0.0.0.0'], {
    stdio: 'inherit',
    shell: true
});

child.on('close', (code) => {
    process.exit(code);
});
