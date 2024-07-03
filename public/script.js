// Validación formulario Trabaja con Nosotros:
document.getElementById('professorForm').addEventListener('submit', function(event) {
    // Validación del correo electrónico:
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+\.com$/; // Se agrega la validación de .com
    if (!emailPattern.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        event.preventDefault(); // Prevenir el envío del formulario si la validación falla
        return; // Salir de la función
    } 
    // Validación del teléfono:
    const telefono = document.getElementById('telefono').value;
    //const telefonoPattern = /^\d{7,15}$/; // Acepta de 7 a 15 dígitos
    const telefonoPattern = /^(\+\d{1,3})?\d{7,15}$/;
    if (!telefonoPattern.test(telefono)) {
        alert('Por favor, ingrese un número de teléfono válido (solo números, de 7 a 15 dígitos).');
        event.preventDefault(); // Prevenir el envío del formulario si la validación falla
    }
    // Validación del nombre y apellido:
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const nombreApellidoPattern = /^[A-Za-z]+$/; // Solo letras (mayúsculas y minúsculas)
    if (!nombreApellidoPattern.test(nombre) || !nombreApellidoPattern.test(apellido)) {
        alert('Por favor, ingrese un nombre y apellido válidos (solo letras, sin números ni signos).');
        event.preventDefault(); // Prevenir el envío del formulario si la validación falla
        return; // Salir de la función
    }
    // Validación de la fecha:
    const fechaInicio = new Date(document.getElementById('fecha_inicio').value);
    const hoy = new Date();
    if (fechaInicio <= hoy) {
        alert('Por favor, ingrese una fecha valida.');
        event.preventDefault(); // Prevenir el envío del formulario si la validación falla
        return; // Salir de la función
    }    
   // Validación del checkbox de términos y condiciones:
   const terminos = document.getElementById('terminos');
   if (!terminos.checked) {
       alert('Debe aceptar los términos y condiciones para continuar.');
       valid = false;
   }
    });
    // Validación de la materia:
    document.getElementById('materia').addEventListener('change', function() {
    const materiaSelect = document.getElementById('materia');
    if (materiaSelect.value === "") {
        materiaSelect.querySelector('option[value=""]').style.display = 'none';
    }
    });
    // Validación del curriculum y la foto:
    document.getElementById('foto').addEventListener('change', function(event) {
    const preview = document.getElementById('foto-preview');
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
   });

