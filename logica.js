/**
 * --- BASE DE DATOS ---
 */
const db = {
    empresa: {
        nombre: "Cable Happy",
        slogan: "Conectividad feliz y sin enredos",
        descripcion: "Especialistas en cableado estructurado, fibra óptica y soluciones de red."
    },
    servicios: [
        {
            titulo: "Cableado Estructurado",
            icono: "fa-network-wired",
            descripcion: "Instalación de nodos de red Cat 5e, 6 y 6A certificados."
        },
        {
            titulo: "Fibra Óptica",
            icono: "fa-project-diagram",
            descripcion: "Empalmes por fusión y tendido de fibra."
        },
        {
            titulo: "Cámaras CCTV",
            icono: "fa-video",
            descripcion: "Instalación y configuración de videovigilancia."
        },
        {
            titulo: "Mantenimiento",
            icono: "fa-server",
            descripcion: "Organización de cables y limpieza de Racks."
        }
    ],
    contacto: {
        telefono: "+52 55 8240 3218",
        whatsapp: "5582403218", // Solo números para el link
        email: "CableadoHappy@outlook.com",
        direccion: "Av. Tecnológica 123, Estado de México",
        horario: "Lunes a Viernes: 9:00 AM - 6:00 PM",
        telefono: "+52 55 1234 5678",
        email: "CableadoHappy@outlook.com", 

    }
};

/**
 * --- CARGA DE DATOS EN PANTALLA ---
 */
function cargarInfoEmpresa() {
    const nombre = document.getElementById('company-name');
    const slogan = document.getElementById('company-slogan');
    const desc = document.getElementById('company-desc');
    if(nombre) nombre.textContent = db.empresa.nombre;
    if(slogan) slogan.textContent = db.empresa.slogan;
    if(desc) desc.textContent = db.empresa.descripcion;
}

function cargarServicios() {
    const contenedor = document.getElementById('servicios-container');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    db.servicios.forEach(servicio => {
        const card = document.createElement('div');
        card.className = 'servicio-card';
        card.innerHTML = `
            <div class="icono"><i class="fas ${servicio.icono}"></i></div>
            <h3>${servicio.titulo}</h3>
            <p>${servicio.descripcion}</p>
            <button onclick="irAFormulario('${servicio.titulo}')">Cotizar ahora</button>
        `;
        contenedor.appendChild(card);
    });
}

function cargarContacto() {
    const tel = document.getElementById('contact-tel');
    const email = document.getElementById('contact-email');
    const dir = document.getElementById('contact-dir');

    if(tel) tel.textContent = db.contacto.telefono;
    if(email) email.textContent = db.contacto.email;
    if(dir) dir.textContent = db.contacto.direccion;
}

/**
 * --- LÓGICA DE INTERACCIÓN Y FORMULARIO ---
 */

// 1. Desplazamiento suave y pre-llenado del formulario
function irAFormulario(servicio) {
    const seccionContacto = document.getElementById('contactarnos');
    const inputMensaje = document.getElementById('input-mensaje');
    const inputServicio = document.getElementById('input-servicio');

    // Pre-llenamos el mensaje para ayudar al usuario
    if(inputMensaje) {
        inputMensaje.value = `Hola Cable Happy,\nMe interesa una cotización para el servicio: ${servicio}.\n\nMis dudas son:`;
    }
    if(inputServicio) {
        inputServicio.value = servicio;
    }

    // Scroll hacia el formulario
    if(seccionContacto) {
        seccionContacto.scrollIntoView({ behavior: 'smooth' });
        // Ponemos el foco en el nombre para empezar a escribir
        setTimeout(() => {
            const campoNombre = document.getElementById('input-nombre');
            if(campoNombre) campoNombre.focus();
        }, 800);
    }
}

// 2. Manejo del envío del formulario (Preparar Correo)
function activarFormulario() {
    const form = document.getElementById('form-contacto');
    
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Evitamos recarga de página

            // Capturamos los datos escritos
            const nombre = document.getElementById('input-nombre').value;
            const correo = document.getElementById('input-email').value;
            const tel = document.getElementById('input-tel').value;
            const mensajeUsuario = document.getElementById('input-mensaje').value;
            const servicio = document.getElementById('input-servicio').value;

            // Llamamos a la función que abre el gestor de correo
            abrirWebmail(servicio, nombre, correo, tel, mensajeUsuario);
        });
    }
}

// 3. Apertura inteligente de Gmail/Outlook/Yahoo
function abrirWebmail(servicio, nombre, correoCliente, telefono, mensajeUsuario) {
    const emailDestino = db.contacto.email;
    const asunto = `Cotización: ${servicio} - Cliente: ${nombre}`;
    
    // Construimos el cuerpo del correo
    const cuerpoFinal = `DATOS DEL CLIENTE:
Nombre: ${nombre}
Correo: ${correoCliente}
Teléfono: ${telefono}

MENSAJE:
${mensajeUsuario}`;

    let urlFinal = "";

    // Lógica para detectar el dominio del usuario
    if (correoCliente.includes("@gmail.com")) {
        // Gmail Web
        urlFinal = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailDestino}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpoFinal)}`;
    } 
    else if (correoCliente.includes("@outlook") || correoCliente.includes("@hotmail") || correoCliente.includes("@live")) {
        // Outlook Web
        urlFinal = `https://outlook.live.com/mail/0/deeplink/compose?to=${emailDestino}&subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpoFinal)}`;
    } 
    else if (correoCliente.includes("@yahoo")) {
        // Yahoo Mail
        urlFinal = `https://compose.mail.yahoo.com/?to=${emailDestino}&subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpoFinal)}`;
    }
    else {
        // Default (App de correo de la PC/Celular)
        urlFinal = `mailto:${emailDestino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpoFinal)}`;
    }

    // Abrimos en nueva pestaña
    window.open(urlFinal, '_blank');
}

/**
 * --- MENÚ SUPERIOR ---
 */
function activarMenuContacto() {
    const btnMenu = document.getElementById('menu-contactarnos');
    if (btnMenu) {
        btnMenu.addEventListener('click', function(e) {
            e.preventDefault();
            irAFormulario("Consulta General");
        });
    }
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    cargarInfoEmpresa();
    cargarServicios();
    cargarContacto();
    activarMenuContacto();
    activarFormulario();
});