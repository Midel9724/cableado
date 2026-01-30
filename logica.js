/**
 * BASE DE DATOS
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
 * LÓGICA DE VISUALIZACIÓN
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
            <button onclick="pedirDatosYCotizar('${servicio.titulo}')">Cotizar ahora</button>
        `;
        contenedor.appendChild(card);
    });
}

function cargarContacto() {
    const tel = document.getElementById('contact-tel');
    const email = document.getElementById('contact-email');
    const dir = document.getElementById('contact-dir');
    const btnGeneral = document.getElementById('btn-contacto-general');

    if(tel) tel.textContent = db.contacto.telefono;
    if(email) email.textContent = db.contacto.email;
    if(dir) dir.textContent = db.contacto.direccion;

    if(btnGeneral) {
        btnGeneral.onclick = function(e) {
            e.preventDefault();
            pedirDatosYCotizar("Consulta General");
        };
    }
}

// --- LÓGICA WEBMAIL (ABRIR NAVEGADOR) ---

function pedirDatosYCotizar(servicio) {
    let nombreUsuario = prompt("1. Escribe tu NOMBRE:");
    if (!nombreUsuario) return; 

    // Convertimos a minúsculas para detectar fácil si es gmail o outlook
    let correoUsuario = prompt("2. Escribe tu CORREO (Gmail, Outlook, Hotmail):");
    if (!correoUsuario) return;
    correoUsuario = correoUsuario.toLowerCase().trim();

    let telefonoUsuario = prompt("3. Tu TELÉFONO (Opcional):");
    if (!telefonoUsuario) telefonoUsuario = "No especificado";

    abrirWebmail(servicio, nombreUsuario, correoUsuario, telefonoUsuario);
}

function abrirWebmail(servicio, nombre, correoCliente, telefono) {
    const emailDestino = db.contacto.email;
    const asunto = `Cotización: ${servicio} - Cliente: ${nombre}`;
    
    // Texto del mensaje
    // Usamos encodeURIComponent para que los espacios y saltos de linea funcionen en la URL
    const mensajeBase = `Hola Cable Happy,
Me interesa el servicio: ${servicio}.

MIS DATOS:
Nombre: ${nombre}
Correo: ${correoCliente}
Teléfono: ${telefono}

Espero su respuesta.`;

    let urlFinal = "";

    // DETECCIÓN INTELIGENTE:
    if (correoCliente.includes("@gmail.com")) {
        // Enlace especial para GMAIL WEB
        urlFinal = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailDestino}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensajeBase)}`;
    } 
    else if (correoCliente.includes("@outlook") || correoCliente.includes("@hotmail") || correoCliente.includes("@live")) {
        // Enlace especial para OUTLOOK WEB
        urlFinal = `https://outlook.live.com/mail/0/deeplink/compose?to=${emailDestino}&subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensajeBase)}`;
    } 
    else if (correoCliente.includes("@yahoo")) {
        // Enlace especial para YAHOO WEB
        urlFinal = `https://compose.mail.yahoo.com/?to=${emailDestino}&subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensajeBase)}`;
    }
    else {
        // Si es un correo empresarial o raro, usamos el método clásico
        urlFinal = `mailto:${emailDestino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensajeBase)}`;
    }

    // Abrir en una PESTAÑA NUEVA
    window.open(urlFinal, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    cargarInfoEmpresa();
    cargarServicios();
    cargarContacto();
});