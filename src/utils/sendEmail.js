import nodemailer from 'nodemailer';
// from s11941150@stu.najah.edu to lolosmsmsoso@gmail.com
export async function sendEmail (){
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: 's11941150@stu.najah.edu',
          pass: 'sqev qtbm kxhj tynr',
        },
      });
      
    
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Maddison Foo Koch 👻" <s11941150@stu.najah.edu>', // sender address
            to: "lolosmsmsoso54@gmail.com", // list of receivers
            subject: "Hello samah", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world? iam samahhhh</b>", // html body
          });
}
