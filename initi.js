const Gpio = require('onoff').Gpio;

try {
    const doorSwitch = new Gpio(17, 'in', 'both');
    console.log('GPIO berhasil diinisialisasi');
} catch (err) {
    console.error('Error menginisialisasi GPIO:', err);
}