const HID = require('node-hid');

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

const device = new HID.HID('/dev/hidraw0'); // Pastikan path benar

let inputBuffer = ''; // Buffer untuk menyimpan input

device.on('data', data => {
    const hex = data.toString('hex');
    const keyCode = hex.slice(4, 6); // Ambil kode karakter (byte ke-3)

    if (HID_TO_CHAR[keyCode]) {
        const char = HID_TO_CHAR[keyCode];

        if (char === 'Enter') {
            // Jika "Enter", proses input login
            console.log(`Input diterima: ${inputBuffer}`);
            inputBuffer = ''; // Reset buffer
        } else {
            inputBuffer += char; // Tambahkan karakter ke buffer
        }
    }
});

device.on('error', err => {
    console.error('Error:', err);
});