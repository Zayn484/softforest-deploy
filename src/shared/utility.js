export const checkValidity = (value,rules) => {
       
    let isValid=true;
    let pass=null;
    if(rules.required){
        isValid=value.trim() !=='' && isValid;
    }
    if(rules.isEmail){
        const pattern= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        isValid = pattern.test( value ) && isValid;
    }
    if(rules.isPassword){
        const pattern=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        isValid = pattern.test( value ) && isValid;
        pass=value;
    }
    if(rules.isConfirmPassword){
        isValid = value===pass && isValid;
    }
    return isValid;
}