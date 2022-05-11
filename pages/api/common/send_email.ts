import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from 'next'



type Data = {

}


export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  // create reusable transporter object using the default SMTP transport
  const reqSession = await getSession({ req });
  if (reqSession) {
const { recipient, comment } = req.body;
 
  let nodemailer = require('nodemailer')
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER, // generated ethereal user
      pass: process.env.EMAIL_SERVER_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "maginatorcloud@gmail.com", // sender address
    to: recipient, // list of receivers
    subject: "New Comment has been added ✔", // Subject line
    text: "Open SPI to view the new comment.?", // plain text body
    html: `<h1> New comment </h1><hr /><b>${comment}</b><br /> <p> Web master </p>`, // html body
  }, (err, data) => {
      if (err) console.log(err);
      else console.log("Sent!")
  });

      res.send("success")

  console.log("Message sent: %s", info?.messageId, info);
}
 
}