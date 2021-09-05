import fetch from '../../SpringBootAdapter'

const Register = (userDetails) => {
    console.log("fetch");
    fetch(`/account/create?username=${userDetails.username}&password=${userDetails.password}&name=${userDetails.name}&dateOfBirth=${userDetails.dob}`);
}
const CheckForUsername = (userDetails) => {
    console.log("checking username");
    fetch(`/account/searchByUsername=${userDetails.username}`).then(response => console.log(response));
}
const CheckForPassword = (userDetails) => {
    if (userDetails.password != undefined && userDetails.password.length > 4) {
        return true;
    }
    return false;
}
export default Register;

export { CheckForUsername, CheckForPassword};