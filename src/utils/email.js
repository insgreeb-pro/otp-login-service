const { createTransport } = require("nodemailer")
const { v4 } = require("uuid")

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  ignoreTLS: false,
  secure: false,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
})

const sendMail = (to, message) => {
  const subject = "Kode sekali pakai Anda"
  const text = `
Kami menerima permintaan kode sekali pakai yang akan digunakan dengan akun HEB Anda.

Kode sekali pakai Anda adalah: ${message}

Jika Anda tidak meminta kode ini, Anda dengan aman dapat mengabaikan email ini. Orang lain mungkin telah salah dalam mengetik alamat email.

Terima kasih,
Tim HEB

message-id: ${v4()}
  `
  return transport.sendMail({
    from: process.env.MAILER_EMAIL,
    to,
    text,
    subject,
  })
}

module.exports = sendMail
