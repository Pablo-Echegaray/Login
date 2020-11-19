let toggle = document.querySelectorAll(".redirect");
let uno = document.querySelector(".uno");
let dos = document.querySelector(".dos");
let carga = document.querySelector(".tres");
let mensajes = document.querySelector(".cuatro");
let login = document.querySelector(".inicio");
let registro = document.querySelector(".creacion");
let chat = document.querySelector(".chat");
let loader = document.getElementById("loader");

let contador = 0;
let usuarios = {
  pablo: "Vladi123",
  sofia: "Vladi321",
};

toggle[0].addEventListener("click", cambiarForm);
toggle[1].addEventListener("click", cambiarForm);
toggle[2].addEventListener("click", () => {
  mensajes.style.display = "none";
  carga.style.display = "flex";
  setTimeout(() => {
    carga.style.display = "none";
    uno.style.display = "flex";
  }, 2000);
});

function cambiarForm() {
  if (contador === 0) {
    uno.style.display = "none";
    dos.style.display = "flex";
    contador = 1;
  } else {
    uno.style.display = "flex";
    dos.style.display = "none";
    contador = 0;
  }
}

function mostrarAdvertencia(texto, elemento) {
  let modalAdventencia = document.body.childNodes[9];
  modalAdventencia.childNodes[1].childNodes[3].innerText = texto;
  modalAdventencia.style.display = "block";
  modalAdventencia.addEventListener("click", () => {
    modalAdventencia.style.display = "none";
    elemento.focus();
  });
}

function validarUsuarios(nombre, contraseña, a, b) {
  let expReg = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,11})$/;
  let expreg = /^([a-zA-Z]){3,10}$/;
  let valor = false;
  let nom = nombre;
  let pass = contraseña;
  if (nom.trim() === "") {
    let texto = "El nombre no puede estar vacio";
    mostrarAdvertencia(texto, a);
  } else if (!expreg.test(nom)) {
    let texto =
      "El nombre debe tener entre 3 y 10 letras, y debe ser cadena de texto";
    mostrarAdvertencia(texto, a);
  } else if (nom.trim().length < 3) {
    let texto = "Su nombre no puede tener menos de 3 letras";
    mostrarAdvertencia(texto, a);
  } else if (!expReg.test(pass)) {
    let texto =
      "La contraseña debe contener entre 6 y 11 caracteres, y poseer al menos una mayuscula y un numero";
    mostrarAdvertencia(texto, b);
  } else {
    valor = true;
  }
  return valor;
}

function validarSusc(nombre, contraseña) {
  let control = false;
  let userName = Object.keys(usuarios);
  let passWord = usuarios[nombre];
  if (userName.includes(nombre) && passWord === contraseña) {
    control = true;
    let user = chat.childNodes[3].childNodes[1];
    user.style.textTransform = "capitalize";
    user.innerText = `${nombre}`;
    login.reset();
  } else {
    control = false;
  }
  return control;
}

function validarTextarea(valor, textarea) {
  let controlB = false;
  /* let valorB = valor.trim(); */
  /* let expreg = /^([a-zA-Z0-9]){1,100}$/ */
  if (valor === "") {
    let texto = "No puede enviar mensajes vacios";
    mostrarAdvertencia(texto, textarea);
  } /* else if (!expreg.test(valor)) {
    let texto =
      "Solo se permiten caracteres de la A a la Z minuscula y mayuscula, y tambien numeros.";
    mostrarAdvertencia(texto, textarea);
  } */ else {
    controlB = true;
  }
  return controlB;
}

function crearUsuario(usuario, password) {
  usuarios[usuario] = password;
  console.log(usuarios);
  registro.reset();
}

function acceder() {
  uno.style.display = "none";
  dos.style.display = "none";
  carga.style.display = "flex";
  loader.style.animationName = "progreso";
  setTimeout(() => {
    carga.style.display = "none";
    mensajes.style.display = "flex";
  }, 2000);
}

function pintarMensajes(msj, elemento) {
  console.log(msj);
  let momentoActual = new Date(),
    hora = momentoActual.getHours(),
    minuto = momentoActual.getMinutes();
  let divChat = mensajes.childNodes[3].childNodes[5];
  let divMsj = document.createElement("div");
  let h4 = document.createElement("h4");
  let p = document.createElement("p");
  let divHoraYBtn = document.createElement("div");
  let span = document.createElement("span");
  let btnEliminar = document.createElement("button");
  divMsj.className = "msj";
  divHoraYBtn.className = "hora-btn";
  btnEliminar.className = "btnEliminar";
  let nombre = chat.childNodes[3].childNodes[1].innerText;
  h4.innerText = `${nombre}: `;
  p.innerText = msj;
  btnEliminar.innerText = "Eliminar";
  span.innerText = `${hora}:${minuto}`;
  divHoraYBtn.appendChild(span);
  divHoraYBtn.appendChild(btnEliminar);
  divMsj.appendChild(h4);
  divMsj.appendChild(p);
  divMsj.appendChild(divHoraYBtn);
  divChat.appendChild(divMsj);
  elemento.focus();
  btnEliminar.addEventListener("click", () => {
    divChat.removeChild(divMsj);
  });
}

login.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let nombre = login.elements.nombre;
  let contraseña = login.elements.contraseña;
  let nom = nombre.value.toLowerCase();
  if (validarUsuarios(nom, contraseña.value, nombre, contraseña)) {
    if (validarSusc(nom, contraseña.value)) {
      acceder();
    } else {
      let texto = "Los datos ingresados son incorrectos, o no estas registrado";
      mostrarAdvertencia(texto, nombre);
    }
  }
});

registro.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let nuevoNombre = registro.elements.tuNombre;
  let nuevaContraseña = registro.elements.password;
  let newName = nuevoNombre.value.toLowerCase();
  if (
    validarUsuarios(
      newName,
      nuevaContraseña.value,
      nuevoNombre,
      nuevaContraseña
    )
  ) {
    crearUsuario(newName, nuevaContraseña.value);
    dos.style.display = "none";
    uno.style.display = "flex";
  } else {
    let texto =
      "La contraseña debe contener entre 6 y 11 caracteres, y poseer al menos una mayuscula y un numero. El nombre de usuario no debe contener espacios";
    mostrarAdvertencia(texto, nuevoNombre);
  }
});

chat.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  if (validarTextarea(chat.elements[0].value, chat.elements[0])) {
    pintarMensajes(chat.elements[0].value.trim(), chat.elements[0]);
    chat.reset();
  }
});

/* function progreso() {
  let medida = 5;
  setInterval(() => {
    medida += 5;
    let anchoL = (loader.style.width = `${medida}%`);
    console.log(anchoL);
    if (anchoL === "100%") {
      clearInterval();
      anchol = 0;
      console.log(anchoL);
    }
  }, 0.1);
} */

/* window.addEventListener("resize", () => {
  let anchoDePantalla = window.innerWidth;
  divMsj = document.querySelector(".msj");
  let anchoDivMsj = divMsj.clientWidth;
  console.log(anchoDivMsj);
  if (anchoDePantalla <= 1160) {
    let width1 = (divMsj.style.maxWidth = anchoDivMsj + "px" - 50 + "px");
    console.log(width1);
  } else {
    divMsj.style.maxWidth = "";
  }
}); */

/* for (let i = 10; i < 101; i++) {
  let anchoL = i;
  let ancho2 = (loader.style.width = anchoL + "%");
  console.log(anchoL);
  console.log(ancho2);
} */

/* function progreso() {
  let medida = 0;
  loader.style.width = `${medida}%`;
  setInterval(() => {
    medida += 5;
    loader.style.width = `${medida}%`;
    if (loader.style.width === "100%") {
      clearInterval();
      console.log(loader.style.width);
      console.log(medida);
    }
  }, 0.1);
  setTimeout(() => {
    loader.style.width = 0;
  }, 1500);
}

console.log(loader.clientWidth); */
