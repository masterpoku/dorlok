const HID = require('node-hid');

// List all connected HID devices
const devices = HID.devices();
console.log('Connected HID devices:', devices);

// Find your device by vendorId and productId
const deviceInfo = devices.find(d => d.vendorId === 65535 && d.productId === 53);

if (!deviceInfo) {
    console.error('Device not found!');
    process.exit(1);
}

// Open the device
const device = new HID.HID(deviceInfo.path);

// Handle incoming data
device.on('data', data => {
    console.log('Data received:', data.toString('hex'));
});

// Handle errors
device.on('error', err => {
    console.error('Error:', err);
});