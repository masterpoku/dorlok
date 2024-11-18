const Gpio = require('onoff').Gpio; // Mengimpor pustaka onoff untuk GPIO
const doorSwitchPin = 17; // Pin GPIO yang digunakan

// Mengatur GPIO untuk input
const doorSwitch = new Gpio(doorSwitchPin, 'in', 'both'); // 'both' untuk mendeteksi perubahan level

// Fungsi untuk menangani pintu terbuka
function doorOpened() {
    console.log('Pintu terbuka!');
}

// Fungsi untuk menangani pintu tertutup
function doorClosed() {
    console.log('Pintu tertutup!');
}

// Event listener untuk perubahan status GPIO
doorSwitch.watch((err, value) => {
    if (err) {
        console.error('Terjadi kesalahan pada GPIO:', err);
        return;
    }

    if (value === 0) {
        doorClosed(); // LOW berarti pintu tertutup
    } else {
        doorOpened(); // HIGH berarti pintu terbuka
    }
});

console.log('Monitoring status pintu. Tekan Ctrl+C untuk keluar.');