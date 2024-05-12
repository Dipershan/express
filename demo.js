const events =  require("events");
const { sendMail } = require("./utils/mailer");

const eventEmitter = new events.EventEmitter();


eventEmitter.addListener("signup" , (email)=>
    sendMail({
        email
    })
)

eventEmitter.emit("signUp ,  email")