// Seleccionar el elemento con el ID 'inputsRegister'
const inputsRegister = document.getElementById('inputsRegister');

// Crear un nuevo elemento div
const div = document.createElement('div');

// Agregar la clase 'formConfig' al div
div.classList.add('formConfig');

// Configurar el contenido HTML del div con el formulario de registro
div.innerHTML = `
  <form class="inputsRegisterForm" id="registrationForm">
    <div class= "blockInput">
      <input type="text" placeholder="Nombre de Usuario" class="Usuario" required>
      <input type="email" placeholder="Email" class="Email" required>
      <input type="date" class="Date" required>
      <input type="password" placeholder="Contraseña" class="Contraseña" required>
      <input type="submit" value="Registrarse" class="Registrado">
    </div>
  </form>
`;

// Agregar el div al elemento con el ID 'inputsRegister'
inputsRegister.appendChild(div);

// Obtener el formulario de registro por su ID
const registrationForm = document.getElementById('registrationForm');

// Obtener el elemento con la clase 'Registrado'
const registradoAlert = document.querySelector('.Registrado');

// Agregar un evento de escucha para el evento de envío del formulario
registrationForm.addEventListener('submit', function(event) {
  // Prevenir el comportamiento predeterminado del envío del formulario
  event.preventDefault();

  // Obtener los valores de los campos del formulario
  const username = document.querySelector('.Usuario').value;
  const email = document.querySelector('.Email').value;
  const date = document.querySelector('.Date').value;
  const password = document.querySelector('.Contraseña').value;

  // Crear un objeto 'userInfo' con la información del usuario
  const userInfo = {
    username: username,
    email: email,
    date: date,
    password: password
  };

  // Convertir el objeto 'userInfo' a formato JSON
  const userInfoJSON = JSON.stringify(userInfo);

  // Almacenar el JSON en el localStorage con la clave 'userInfo'
  localStorage.setItem('userInfo', userInfoJSON);

  // Restablecer el formulario a su estado inicial
  registrationForm.reset();

  // Abrir una nueva ventana en el navegador y redirigir a './tienda.html'
  window.open('./tienda.html', "_self");
});




