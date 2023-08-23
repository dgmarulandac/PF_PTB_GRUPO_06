const QRCode = require('qrcode');

const generateQRCode = async ({ eventName, date, hour, address }) => {
  const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify({ eventName, date, hour, address }));
  return qrCodeDataURL;
};

module.exports = generateQRCode;
