const Gpio = require('onoff').Gpio;

// Atur GPIO ke mode input
const doorSwitch = new Gpio(17, 'in', 'both'); // Ganti 17 dengan pin GPIO yang digunakan

// Fungsi callback untuk mendeteksi perubahan status
doorSwitch.watch((err, value) => {
    if (err) {
        console.error('Error membaca door switch:', err);
    } else {
        console.log(`Door switch status: ${value ? 'TERBUKA' : 'TERTUTUP'}`);
    }
});

// Tangkap error atau cleanup ketika aplikasi dihentikan
process.on('SIGINT', () => {
    doorSwitch.unexport();
    console.log('GPIO cleanup selesai.');
    process.exit();
});