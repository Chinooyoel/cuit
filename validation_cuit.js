const generate_cuit_main = (username, type, gender, num) => {

    const num_mask = addMaskNumber( gender, num, type )

    const number_mask_array = [...num_mask];

    const cuit = generate_cuit(type, number_mask_array, gender);

    return cuit

}

const validate_cuit = cuit => {

    //parse to string
    cuit = cuit.toString()

    const cuit_without_digit = cuit.slice(0, -1)
    const number_mask_array = [...cuit_without_digit];
    const cuit_validate = generate_cuit('none', number_mask_array, 'none')

    if(Number(cuit_validate) === Number(cuit)) 
        return true;

    return false;
}


const addMaskNumber = ( gender, num, type ) => {
    //validar que el cuit sea un string
    if( type === 'society' || gender === 'society') {
        num = '30' + num
    }else if( gender === 'female' ){
        num = '27' + num
    }else{
        num = '20' + num
    }
   
    return num;
}

const generate_cuit = (type, number_mask_array, gender) => {
    let sum = 0;

    const multiplier_number = [5, 4 ,3, 2, 7, 6, 5, 4, 3, 2];

    for( i = 0; i <= 9; i++){
        sum = sum + (number_mask_array[i] * multiplier_number[i])
    }

    let mod = sum % 11;

    if( mod === 1 ){
        number_mask_array = number_mask_array.slice(2, 10)
        //changed the mask
        if( type === 'society' || gender === 'society'){
            number_mask_array.unshift(3, 3)
        }else{
            number_mask_array.unshift(2, 3)
        }
        return generate_cuit(type, number_mask_array, gender)
    }

    // the digit remains 0
    if( mod === 0 ) mod = 11;
    
    const digit = 11 - mod;

    // transform the array in string
    number_mask_array = number_mask_array.join().replaceAll(',','')

    // add the digit
    const cuit = number_mask_array + digit

    return cuit;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


module.exports = { validate_cuit, generate_cuit_main }







