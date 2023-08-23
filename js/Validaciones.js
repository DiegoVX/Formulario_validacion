export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validaciones[tipoDeInput]){
        validaciones[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = 
            mostrarMnesajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {
    
    nombre: {
        valueMissing: "El nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El correo no puede estar vacio  ",
        typeMismatch: "El correo no es valido"
    },  
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch:"Solo se permiten numeros en este campo"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch:"La direccion debe tener al menos 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch:"La ciudad debe tener al menos 10 a 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch:"El estado debe tener al menos 10 a 40 caracteres"
    }
};

const validaciones = {
    nacimiento: input => validarNacimiento(input), 
};

function mostrarMnesajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if(input.validity[error]) {
            console.log(tipoDeInput);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje; 
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}
