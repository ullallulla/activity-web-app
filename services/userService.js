import { executeQuery } from "../database/database.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import { validate, required, isEmail, minLength } from "../deps.js";


const validationRules = {
    email: [required, minLength(6), isEmail],
    password: [required, minLength(4)],
    verification: [required, minLength(4)]
};


const getRegistration = async(request) => {

    const data = {
        email: "",
        password: "",
        verification: "",
        errors: null,

    };

    if(request) {
        const body = request.body();
        const params = await body.value;
        data.email = params.get('email');
        data.password = params.get('password');
        data.verification = params.get('verification');
    }


    return data;
}




const getLogin = async(request) => {

    const data = {
        email: "",
        password: "",
        errors: null,

    };

    if(request) {
        const body = request.body();
        const params = await body.value;
        data.email = params.get('email');
        data.password = params.get('password');
    }


    return data;
}

//handles POST request for registration form
const postRegistrationForm = async({request, response, render, session}) => {
    const data = await getRegistration(request);
    const user = await session.get('user')

    const [passes, errors] = await validate(data, validationRules);
    console.log('passes',passes)
    console.log('errors', errors)
    if (data.password !== data.verification){
        errors["password"] = ({isMatch: "passwords need to match"})
        console.log('if lauseen errors', errors)
    }
    console.log('ennen postgres',data)
    const existingUsers = await executeQuery("SELECT * FROM users WHERE email = $1", data.email);
    console.log('postgres jälkeen',data)
    if (existingUsers.rowCount > 0) {
        errors["existingUser"] = ({existingUser: "email is already reserved"})
    }
    console.log('Error postgres jälkeen', errors )


    if (passes) {
        if (errors.hasOwnProperty('password')) {
            data.errors = errors
            render("register.ejs", {data, user});
        }
        else if (errors.hasOwnProperty('existingUser')){
            data.errors = errors
            render("register.ejs", {data, user});
        }
        else {
            
            const hash = await bcrypt.hash(data.password);
            await executeQuery("INSERT INTO users (email, password) VALUES ($1, $2);", data.email, hash);
            response.redirect('/');
        }

        
    } else {
        data.errors = errors
        render("register.ejs", {data, user});
    }

};



const postLoginForm = async({request, response, session, render}) => {
    const data = await getLogin(request);

    const user = await session.get('user')
    const errors = {}


    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');
    let userObj = ""

    const res = await executeQuery("SELECT * FROM users WHERE email = $1;", email);
    if (res.rowCount === 0) {
        errors["invalidLoginInformation"] = {invalidLoginInformation: "Invalid email or password"}}
    
    else {
        console.log('result', res.rows)
        userObj = res.rows[0];

        const hash = userObj.password;

        const passwordCorrect = await bcrypt.compare(password, hash);
        
        if (!passwordCorrect) {
            errors["invalidLoginInformation"] = {invalidLoginInformation: "Invalid email or password"}
            
        }
    
    }
    
    console.log('errors',errors)

    if (errors.hasOwnProperty('invalidLoginInformation')) {
        
        data.errors = errors
        render("login.ejs", {data, user});}

    else {

    await session.set('authenticated', true);
    await session.set('user', {
        id: userObj.id,
        email: userObj.email
    });

    response.redirect('/');}

    
    

}


const postLogoutForm = async({request, response, session}) => {
    await session.set('authenticated', false);
    await session.set('user', null);
    response.redirect('/')
}


export { postRegistrationForm, getRegistration, getLogin, postLoginForm, postLogoutForm }