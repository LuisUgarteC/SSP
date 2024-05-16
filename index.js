// -------------------------------------- Base de datos -----------------------------------
// Aqui va la configuración de firebase
// const firebaseConfig = {
//   apiKey: "XXXXXXX",
//   authDomain: "XXXXXXX",
//   databaseURL: "XXXXXX",
//   projectId: "XXXXX",
//   storageBucket: "XXXXX",
//   messagingSenderId: "XXXXX",
//   appId: "XXXXXX"
// };

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// reference db
var contactFormDB = firebase.database().ref("Form");

document.getElementById("Form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var lastName = getElementVal("lastName");
  var email = getElementVal("email");
  var mobile = getElementVal("mobile");
  var periodo = document.querySelector('input[name="periodo"]:checked').value;
  var clave = getElementVal("clave");
  var nua = getElementVal("nua");
  var rfc = getElementVal("rfc");
  var program = getElementVal("program");
  var program2 = getElementVal("program2");
  var program3 = getElementVal("program3");
  var level = getElementVal("level");
  var level2 = getElementVal("level2");
  var level3 = getElementVal("level3");
  // var estadoCivil = document.getElementById("estado").value;
  var estado = document.getElementById("estado").value;
  var address = getElementVal("address");
  var age = getElementVal("age");
  var blood = getElementVal("blood");
  // var gender = getElementVal("gender");
  var gender = document.getElementById("gender").value;
  var nacionalidad = getElementVal("nacionalidad");
  var born = getElementVal("born");
  var fijo = getElementVal("fijo");
  var division = getElementVal("division");
  var carrera = getElementVal("carrera");
  var semester = getElementVal("semester");
  var occupation = getElementVal("occupation");
  var beneficiario = getElementVal("beneficiario");
  var domben = getElementVal("domben");
  var date = getElementVal("date"); 

  save(name, lastName, email, mobile, periodo, clave, nua, rfc, program, program2, program3, 
    level, level2, level3, estado, address, age, blood, gender, nacionalidad, born, fijo, division, carrera, semester,
    occupation, beneficiario, domben, date);

  document.querySelector(".alert").style.display = "block";

  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  document.getElementById("Form").reset();

  // Cambiar al formulario 1
  document.querySelector('.form.second').style.opacity = '0';
  document.querySelector('.form.second').style.pointerEvents = 'none';
  document.querySelector('.form.first').style.opacity = '1';
  document.querySelector('.form.first').style.pointerEvents = 'auto';

  formContainer.style.height = firstFormHeight + "px";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
}

const save = (name, lastName, email, mobile, periodo, clave, nua, rfc, 
  program, program2, program3, level, level2, level3, estado, address, age, blood, gender,
  nacionalidad, born, fijo, division, carrera, semester, occupation, beneficiario, domben, date) => {
  var newForm = contactFormDB.push();

  newForm.set({
    name: name,
    lastName: lastName,
    email: email,
    mobile: mobile,
    periodo: periodo,
    clave: clave,
    nua: nua,
    rfc : rfc,
    program : program,
    program2 : program2,
    program3 : program3,
    level : level,
    level2 : level2,
    level3 : level3,
    estado : estado,
    address : address,
    age : age,
    blood: blood,
    gender : gender,
    nacionalidad : nacionalidad,
    born : born,
    fijo : fijo,
    division : division,
    carrera : carrera,
    semester : semester,
    occupation : occupation,
    beneficiario : beneficiario,
    domben : domben,
    date : date
  })
}

const getElementVal = (id) => {
  return document.getElementById(id).value;
}

// Como no todos los campos son requeridos, los que si son deben de estar llenados si o si para que avance a la siguiente hoja 

const form = document.querySelector("form"),
  nextBtn = form.querySelector(".nextBtn"),
  backBtn = form.querySelector(".backBtn"),
  requiredInputs = form.querySelectorAll(".first input[required]");

nextBtn.addEventListener("click", () => {
  let allRequiredInputsFilled = true;
  requiredInputs.forEach(input => {
    if (input.value.trim() === "") {
      allRequiredInputsFilled = false;
    }
  });

  if (allRequiredInputsFilled) {
    form.classList.add('secActive');
  }
});

backBtn.addEventListener("click", () => form.classList.remove('secActive'));

//  ------------ Se modifique el tamaño del contenedor al pasar a otro formulario -------------------

const formContainer = document.querySelector(".container form");

const firstFormHeight = document.querySelector(".form.first").offsetHeight;

document.querySelector(".nextBtn").addEventListener("click", () => {
  let allRequiredInputsFilled = true;
  requiredInputs.forEach(input => {
    if (input.value.trim() === "") {
      allRequiredInputsFilled = false;
    }
    document.documentElement.scrollTop = 0;
  });

  const secondFormHeight = document.querySelector(".form.second").offsetHeight;

  if (allRequiredInputsFilled) {
    formContainer.style.height = Math.max(firstFormHeight, secondFormHeight) + "px";
  } 
});

document.querySelector(".backBtn").addEventListener("click", () => {
  formContainer.style.height = firstFormHeight + "px";

  document.documentElement.scrollTop = 0;
});


const telefonoInput = document.getElementById("fijo");

telefonoInput.addEventListener("input", () => {
  let telefonoValue = telefonoInput.value.replace(/\D/g, ''); // Eliminar todos los caracteres que no sean dígitos

  if (telefonoValue.length > 10) {
    telefonoValue = telefonoValue.substring(0, 10); // Limitar a 10 dígitos si es más largo
  }

  let formattedTelefono;

  if (telefonoValue.length === 10) {
    // Formatear como "(xxx) xxx-xxxx"
    // formattedTelefono = `(${telefonoValue.substring(0, 3)}) ${telefonoValue.substring(3, 6)}-${telefonoValue.substring(6)}`;
    
    // Formatear como "xxx xxx xxxx"
    formattedTelefono = `${telefonoValue.substring(0, 3)} ${telefonoValue.substring(3, 6)} ${telefonoValue.substring(6)}`;
  } else {
    formattedTelefono = telefonoValue;
  }

  telefonoInput.value = formattedTelefono;

  if (telefonoValue !== "" && !/^\d{10}$/.test(telefonoValue)) {
    telefonoInput.setCustomValidity("Ingresa un número de teléfono válido");
  } else {
    telefonoInput.setCustomValidity("");
  }
});

const celularInput = document.getElementById("mobile");

celularInput.addEventListener("input", () => {
  let celularValue = celularInput.value.replace(/\D/g, ''); // Eliminar todos los caracteres que no sean dígitos

  if (celularValue.length > 10) {
    celularValue = celularValue.substring(0, 10); // Limitar a 10 dígitos si es más largo
  }

  let formattedCelular;

  if (celularValue.length === 10) {
    // Formatear como "xxx xxx xxxx"
    formattedCelular = `${celularValue.substring(0, 3)} ${celularValue.substring(3, 6)} ${celularValue.substring(6)}`;
  } else {
    formattedCelular = celularValue;
  }

  celularInput.value = formattedCelular;

  if (!/^\d{10}$/.test(celularValue)) {
    celularInput.setCustomValidity("Ingresa un número de celular válido");
  } else {
    celularInput.setCustomValidity("");
  }
});

const nuaInput = document.getElementById("nua");

nuaInput.addEventListener("input", () => {
  let nuaValue = nuaInput.value.trim();

  nuaValue = nuaValue.replace(/\D/g, '');

  if (nuaValue.length > 6) {
    nuaValue = nuaValue.substring(0, 6);
  }

  nuaInput.value = nuaValue;

  // Validar si el valor es un número válido y tiene una longitud de 6 caracteres
  if (!/^\d{6}$/.test(nuaValue)) {
    nuaInput.setCustomValidity("El NUA debe contener exactamente 6 números.");
  } else {
    nuaInput.setCustomValidity("");
  }
});

// Si se llena un programa, hacer que el nivel también sea obligatorio y viceversa
document.addEventListener("DOMContentLoaded", function() {
  const levelInputs = document.querySelectorAll('[id^="level"]');
  const programInputs = document.querySelectorAll('[id^="program"]');
  const backBtn = document.querySelector('.backBtn');
  const nextButton = document.querySelector('.nextBtn');

  // Añadir validación a nivel
  levelInputs.forEach((input, index) => {
      input.addEventListener('input', () => {
          let inputValue = input.value.replace(/\D/g, '');
          if (inputValue.length > 3) {
              inputValue = inputValue.substring(0, 3);
          }
          input.value = inputValue;

          if (inputValue && (!/^[1-9]00$/.test(inputValue))) {
              input.setCustomValidity("El nivel debe ser 100, 200, 300, etc.");
              input.reportValidity();
          } else {
              input.setCustomValidity("");
          }

          // Hacer el campo de programa correspondiente requerido si el nivel está lleno
          const relatedProgramInput = document.getElementById(`program${index === 0 ? "" : index + 1}`);
          if (inputValue !== '') {
              relatedProgramInput.required = true;
          } else {
              relatedProgramInput.required = false;
          }
      });
  });

  // Validación de dependencia entre programa y nivel
  programInputs.forEach((programInput, index) => {
      programInput.addEventListener('input', () => {
          const relatedLevelInput = document.getElementById(`level${index === 0 ? "" : index + 1}`);
          if (programInput.value.trim() === '') {
              relatedLevelInput.required = false;
          } else {
              relatedLevelInput.required = true;
          }
      });
  });

  // Verificación al enviar el formulario
  nextButton.addEventListener('click', function(event) {
      let allValid = true;
      programInputs.forEach(input => {
          if (input.required && input.value.trim() === '') {
              input.setCustomValidity("Este campo es obligatorio.");
              input.reportValidity();
              allValid = false;
          } else {
              input.setCustomValidity("");
          }
      });

      levelInputs.forEach(input => {
          if (!input.checkValidity()) {
              input.reportValidity();
              allValid = false;
          }
      });

      if (!allValid) {
        event.preventDefault();
        if (backBtn) {
            backBtn.click();
        }
        const targetElement = document.getElementById('curso');
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'auto'});
        }
    }
    
  });
});

// Coloca todo en mayúscula
const textInputs = document.querySelectorAll('input[type="text"]');

textInputs.forEach(input => {
  input.addEventListener('input', () => {
    input.value = input.value.toUpperCase();
  });
});
