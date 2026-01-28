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
            titulo: "Mantenimiento de Racks",
            icono: "fa-server",
            descripcion: "Organización (peinado) de cables y limpieza de sites."
        }
    ],
    contacto: {
        telefono: "+52 55 1234 5678",
        email: "CableadoHappy@outlook.com", 
        direccion: "Estado de México",
    }
};

// 1. Cargar Textos Principales
function cargarInfoEmpresa() {
    const nombre = document.getElementById('company-name');
    const slogan = document.getElementById('company-slogan');
    const desc = document.getElementById('company-desc');
    
    if(nombre) nombre.textContent = db.empresa.nombre;
    if(slogan) slogan.textContent = db.empresa.slogan;
    if(desc) desc.textContent = db.empresa.descripcion;
}

// 2. Cargar Servicios (Usando el diseño CSS elegante)
function cargarServicios() {
    const contenedor = document.getElementById('servicios-container');
    if(!contenedor) return;

    contenedor.innerHTML = '';

    db.servicios.forEach(servicio => {
        const card = document.createElement('div');
        
        // Asignamos la clase del CSS para que se vea bonito y centrado
        card.className = 'servicio-card'; 

        card.innerHTML = `
            <div class="icono">
                <i class="fas ${servicio.icono}"></i>
            </div>
            <h3>${servicio.titulo}</h3>
            <p>${servicio.descripcion}</p>
            <button onclick="solicitarCotizacion('${servicio.titulo}')">
                Cotizar ahora
            </button>
        `;
        contenedor.appendChild(card);
    });
}

// 3. Cargar Datos de Contacto
function cargarContacto() {
    const tel = document.getElementById('contact-tel');
    const email = document.getElementById('contact-email');
    const dir = document.getElementById('contact-dir');
    const btnGeneral = document.getElementById('btn-contacto-general');

    if(tel) tel.textContent = db.contacto.telefono;
    if(email) email.textContent = db.contacto.email;
    if(dir) dir.textContent = db.contacto.direccion;

    // Configurar botón de contacto general
    if(btnGeneral) {
        const asunto = "Consulta General - Cable Happy";
        const cuerpo = "Hola equipo,\n\nQuisiera más información sobre sus servicios.\n\nGracias.";
        btnGeneral.href = `mailto:${db.contacto.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    }
}

// 4. FUNCIÓN CLAVE: Prepara el correo del cliente
function solicitarCotizacion(servicio) {
    const emailDestino = db.contacto.email;
    const asunto = `Solicitud de Cotización: ${servicio}`;
    
    // Este es el texto que le aparecerá al cliente listo para enviar
    const cuerpo = `Hola equipo de Cable Happy,

Estoy interesado en el servicio de: ${servicio}.

Por favor, envíenme una propuesta o contáctenme.

Mis datos son:
- Nombre: (Escriba su nombre aquí)
- Teléfono: (Escriba su teléfono aquí)
- Dirección aproximada: (Opcional)

Quedo a la espera de su respuesta automática con más información.

Saludos.`;

    // Abrir cliente de correo
    window.location.href = `mailto:${emailDestino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    cargarInfoEmpresa();
    cargarServicios();
    cargarContacto();
});