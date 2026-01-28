/**
 * BASE DE DATOS
 */
const db = {
    empresa: {
        nombre: "Cable Happy",
        slogan: "Conectividad feliz y sin enredos",
        descripcion: "Especialistas en cableado estructurado, fibra óptica y soluciones de red para hogares y empresas."
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
            descripcion: "Empalmes por fusión y tendido de fibra para alta velocidad."
        },
        {
            titulo: "Cámaras CCTV",
            icono: "fa-video",
            descripcion: "Instalación y configuración de sistemas de videovigilancia."
        },
        {
            titulo: "Mantenimiento de Sites",
            icono: "fa-server",
            descripcion: "Organización (peinado) de cables y limpieza de Racks."
        }
    ],
    contacto: {
<<<<<<< HEAD
        telefono: "+52 55 8240 3218",
        whatsapp: "5582403218", // Solo números para el link
        email: "CableadoHappy@outlook.com",
        direccion: "Av. Tecnológica 123, Ciudad de México",
        horario: "Lunes a Viernes: 9:00 AM - 6:00 PM"
=======
        telefono: "+52 55 1234 5678",
        email: "CableadoHappy@outlook.com", 
        direccion: "Ciudad de México y Área Metropolitana",
>>>>>>> 88c36c4d359d547aa8cea9814084cf4c55d1a4d7
    }
};

/**
 * LÓGICA DE LA PÁGINA
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
        card.className = 'servicio-card'; // Usa el diseño CSS

        card.innerHTML = `
            <div class="icono">
                <i class="fas ${servicio.icono}"></i>
            </div>
            <h3>${servicio.titulo}</h3>
            <p>${servicio.descripcion}</p>
            <button onclick="pedirDatosYCotizar('${servicio.titulo}')">
                Cotizar ahora
            </button>
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
        // En el botón general también pediremos datos antes
        btnGeneral.onclick = function(e) {
            e.preventDefault(); // Evita el link normal
            pedirDatosYCotizar("Consulta General");
        };
    }
}

// --- NUEVA LÓGICA: PEDIR DATOS AL USUARIO ---

function pedirDatosYCotizar(servicio) {
    // 1. Pedimos el nombre
    let nombreUsuario = prompt("Por favor, escribe tu NOMBRE completo:");
    if (!nombreUsuario) return; // Si cancela, no hacemos nada

    // 2. Pedimos el correo (Obligatorio)
    let correoUsuario = prompt("Escribe tu CORREO ELECTRÓNICO para responderte:");
    if (!correoUsuario) {
        alert("El correo es necesario para poder enviarte la cotización.");
        return;
    }

    // 3. Pedimos teléfono (Opcional)
    let telefonoUsuario = prompt("Escribe tu TELÉFONO (Opcional):");
    if (!telefonoUsuario) telefonoUsuario = "No especificado";

    // 4. Armamos el correo con los datos capturados
    enviarCorreo(servicio, nombreUsuario, correoUsuario, telefonoUsuario);
}

function enviarCorreo(servicio, nombre, correoCliente, telefono) {
    const emailDestino = db.contacto.email;
    
    // Asunto: Incluye el nombre del cliente para identificarlo rápido
    const asunto = `Cotización para ${nombre} - Servicio: ${servicio}`;
    
    // Cuerpo del mensaje: Pone los datos que el usuario escribió
    const cuerpo = `Hola equipo de Cable Happy,

Solicito información sobre el servicio de: ${servicio}.

MIS DATOS DE CONTACTO:
---------------------------------------------
Nombre: ${nombre}
Correo para respuesta: ${correoCliente}
Teléfono: ${telefono}
---------------------------------------------

Quedo a la espera de su respuesta automática o de un asesor.

Gracias.`;

    // Abrimos el cliente de correo
    window.location.href = `mailto:${emailDestino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    cargarInfoEmpresa();
    cargarServicios();
    cargarContacto();
});