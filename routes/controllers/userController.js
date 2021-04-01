import * as userService from "../../services/userService.js";



const showRegistrationForm = async({render, session}) => {
    const user = await session.get('user')
    console.log(await userService.getRegistration())
    render('register.ejs', {data: await userService.getRegistration(), user});
}


const showLoginForm = async({render, session}) => {
    const user = await session.get('user')
    render('login.ejs', {data: await userService.getLogin(), user});
}




export {showRegistrationForm, showLoginForm}