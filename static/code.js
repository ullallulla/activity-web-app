

const checkUser = async({session}) => {
    const user = (await session.get('user')).email

    const userasd = document.querySelector("#login-email").value;
    document.querySelector("#user-email").innerHTML = user
}