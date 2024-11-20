const Gpio = require('onoff').Gpio;

try {
    const led = new Gpio(17, 'out'); // Pastikan pin benar
    led.writeSync(1); // Nyalakan LED
    console.log('LED menyala');
} catch (error) {
    console.error('Error:', error.message);
}