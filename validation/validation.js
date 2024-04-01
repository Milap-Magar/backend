function validate(values){

    let error = [];
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
    const pswd_pattern = /^(?=*\d)(?=.*[a-z])(?=.*[A_Z])[a-zA-Z0-9]{8,}$/ ;
    
    if(values.email == ""){
        error.email = "Email must not be empty";
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email didn't matched";
    }else{
        error.email = "";
    }

    if(values.password == ""){
        error.password = "Password must not be empty";
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Password didn't matched";
    }else{
        error.password = "";
    }

}