const HID = require('node-hid');
const {
    Gpio
} = require('onoff'); // Library untuk GPIO

// Tabel konversi HID ke karakter
const HID_TO_CHAR = {
    '1e': '1',
    '1f': '2',
    '20': '3',
    '21': '4',
    '22': '5',
    '23': '6',
    '24': '7',
    '25': '8',
    '26': '9',
    '27': '0',
    '28': 'Enter'
};

// Pin untuk alarm dan door switch
const ALARM_PIN = new Gpio(18, 'out'); // Pin GPIO untuk alarm
const DOOR_SWITCH_PIN = new Gpio(17, 'in', 'both'); // Pin GPIO untuk sensor pintu

// Daftar RFID yang valid
const VALID_RFID = ['12345', '67890']; // Ganti dengan daftar RFID sebenarnya

const device = new HID.HID('/dev/hidraw0'); // Pastikan path benar
let inputBuffer = ''; // Buffer untuk menyimpan input

// Fungsi untuk memicu alarm
function triggerAlarm() {
    console.log('Alarm menyala!');
    ALARM_PIN.writeSync(1); // Hidupkan alarm
    setTimeout(() => {
        ALARM_PIN.writeSync(0); // Matikan alarm setelah beberapa detik
        console.log('Alarm mati!');
    }, 5000); // Alarm hidup selama 5 detik
}

// Listener untuk status door switch
DOOR_SWITCH_PIN.watch((err, value) => {
    if (err) {
        console.error('Error membaca status door switch:', err);
        return;
    }

    if (value === 1) {
        console.log('Pintu dibuka paksa!');
        triggerAlarm();
    } else {
        console.log('Pintu ditutup.');
    }
});

// Proses input dari RFID reader
device.on('data', data => {
    const hex = data.toString('hex');
    const keyCode = hex.slice(4, 6); // Ambil kode karakter (byte ke-3)

    if (HID_TO_CHAR[keyCode]) {
        const char = HID_TO_CHAR[keyCode];

        if (char === 'Enter') {
            console.log(`RFID diterima: ${inputBuffer}`);

            if (VALID_RFID.includes(inputBuffer)) {
                console.log('RFID valid, akses diterima.');
            } else {
                console.log('RFID tidak valid, alarm hidup!');
                triggerAlarm();
            }

            inputBuffer = ''; // Reset buffer
        } else {
            inputBuffer += char; // Tambahkan karakter ke buffer
        }
    }
});

device.on('error', err => {
    console.error('Error:', err);
});

// Cleanup GPIO pada proses keluar
process.on('SIGINT', () => {
    ALARM_PIN.unexport();
    DOOR_SWITCH_PIN.unexport();
    console.log('GPIO dibersihkan.');
    process.exit();
});