const inputsRegister = document.getElementById('inputsRegister');
const div = document.createElement('div');
div.classList.add('formConfig');
div.innerHTML = `
  <form id="registrationForm">
    <input type="text" placeholder="Nombre de Usuario" class="Usuario" required>
    <input type="email" placeholder="Email" class="Email" required>
    <input type="date" class="Date" required>
    <input type="password" placeholder="Contraseña" class="Contraseña" required>
    <input type="submit" value="Registrarse" class="Registrado">
  </form>
  <div id="message"></div>
`;

inputsRegister.appendChild(div);

const registrationForm = document.getElementById('registrationForm');
const messageDiv = document.getElementById('message');
const registradoAlert = document.querySelector('.Registrado');

registrationForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.querySelector('.Usuario').value;
  const email = document.querySelector('.Email').value;
  const date = document.querySelector('.Date').value;
  const password = document.querySelector('.Contraseña').value;

  const userInfo = {
    username: username,
    email: email,
    date: date,
    password: password
  };

  const userInfoJSON = JSON.stringify(userInfo);

  localStorage.setItem('userInfo', userInfoJSON);

  registrationForm.reset();

  window.open('./tienda.html', "_self")
 
  
});



