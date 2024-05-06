document.addEventListener("DOMContentLoaded", function () {
    const formulario = new Formulario();
    const registrarBtn = document.getElementById('registrarBtn');
    registrarBtn.addEventListener('click', function (event) {
        event.preventDefault();
        formulario.registrarUsuario();
    });
    leerDatos();
});

function leerDatos () {
    const listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || []; 
    const tablaUsuarios = new TablaUsuarios(listaUsuarios);
    tablaUsuarios.render();
};

// formulario
class Formulario {
    constructor() {
        // Campos del formulario
        this.nombreInput = document.getElementById('nombre');
        this.correoInput = document.getElementById('correo');
        this.contraseñaInput = document.getElementById('contraseña');
        this.nombreError = document.getElementById('nombreError');
        this.correoError = document.getElementById('correoError');
        this.contraseñaError = document.getElementById('contraseñaError');
    }

    // Métodos para validar los campos del formulario
    validarNombre() {
        const nombre = this.nombreInput.value.trim();
        return nombre.length >= 3;
    }

    validarCorreo() {
        const correo = this.correoInput.value.trim();
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(correo);
    }

    validarContraseña() {
        const contraseña = this.contraseñaInput.value.trim();
        const regexContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return regexContraseña.test(contraseña);
    }

    // Método para registrar un nuevo usuario
    registrarUsuario() {
        const nombre = this.nombreInput.value.trim();
        const correo = this.correoInput.value.trim();
        const contraseña = this.contraseñaInput.value.trim();

        // if (!this.validarNombre() || !this.validarCorreo() || !this.validarContraseña()) {
        //     alert('Por favor, completa correctamente todos los campos.');
        //     return;
        // }
        if (!this.validarNombre(nombre)) {
            alert("El nombre debe tener al menos 3 caracteres.")
           // this.mostrarError(this.nombreError, 'El nombre debe tener al menos 3 caracteres.');
            return;
        } else {
            this.ocultarError(this.nombreError);
        }

        if (!this.validarCorreo(correo)) {
            alert('El correo electrónico no es válido.')
           // this.mostrarError(this.correoError, 'El correo electrónico no es válido.');
            return;
        } else {
            this.ocultarError(this.correoError);
        }

        if (!this.validarContraseña(contraseña)) {
            alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.')
           // this.mostrarError(this.contraseñaError, 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.');
            return;
        } else {
            this.ocultarError(this.contraseñaError);
        }

        // Generar un ID único para el usuario
        const id = '_' + Math.random().toString(36).substr(2, 9);

        // Crear una nueva instancia de Usuario
        const nuevoUsuario = new Usuario(id, nombre, correo, contraseña);

        // Obtener la lista de usuarios del localStorage (si existe)
        let listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Agregar el nuevo usuario a la lista
        listaUsuarios.push(nuevoUsuario);

        // Guardar la lista actualizada en el localStorage
        localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));

        
        
        alert('Usuario registrado con éxito.');
        this.limpiarFormulario();
        location.reload();
        
    }
    mostrarError(elemento, mensaje) {
        elemento.textContent = mensaje;
    }

    ocultarError(elemento) {
        elemento.textContent = '';
    }

    // Método para limpiar el formulario después de registrar un usuario
    limpiarFormulario() {
        this.nombreInput.value = '';
        this.correoInput.value = '';
        this.contraseñaInput.value = '';
    }
}

// Usuarios
class Usuario {
    constructor(id, nombre, correo, contraseña) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
    }
}

//tabla usuarios
class TablaUsuarios {
    constructor(listaUsuarios) {
        this.listaUsuarios = listaUsuarios;
    }

    // Método para renderizar la tabla de usuarios en el DOM
    render() {
        const tabla = document.createElement('table');
        tabla.innerHTML = `
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Contraseña</th>
                </tr>
                </thead>
                <tbody>
                ${this.listaUsuarios.map(usuario => `
                <tr>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.contraseña}</td>
                </tr>
                `).join('')}
                </tbody>`;
                tabla.className='d-table'
        document.body.appendChild(tabla);
    }
}