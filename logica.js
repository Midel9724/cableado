/**
 * --- BASE DE DATOS (Simulada) ---
 * Aquí cambias la información de tu negocio.
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
            titulo: "Mantenimiento de Racks",
            icono: "fa-server",
            descripcion: "Organización (peinado) de cables y limpieza de sites."
        }
    ],
    contacto: {
        telefono: "+52 55 1234 5678",
        email: "cablehappy@gmail.com", // Tu correo real
        direccion: "Ciudad de México",
    }
};

/**
 * --- CONTROLADOR (Lógica) ---
 */

// 1. Cargar Textos Principales
function cargarInfoEmpresa() {
    document.getElementById('company-name').textContent = db.empresa.nombre;
    document.getElementById('company-slogan').textContent = db.empresa.slogan;
    document.getElementById('company-desc').textContent = db.empresa.descripcion;
}

// 2. Cargar Servicios con Botón de Correo Configurado
function cargarServicios() {
    const contenedor = document.getElementById('servicios-container');
    contenedor.innerHTML = '';

    db.servicios.forEach(servicio => {
        // Creamos el elemento visual (Tarjeta simple)
        const div = document.createElement('div');
        
        // Un poco de estilo directo desde JS para que se vea ordenado sin CSS externo
        div.style.border = "1px solid #ddd";
        div.style.padding = "15px";
        div.style.width = "250px";
        div.style.textAlign = "center";
        div.style.borderRadius = "8px";

        div.innerHTML = `
            <div style="font-size: 40px; color: #007bff; margin-bottom:10px;">
                <i class="fas ${servicio.icono}"></i>
            </div>
            <h3>${servicio.titulo}</h3>
            <p>${servicio.descripcion}</p>
            <button onclick="solicitarCotizacion('${servicio.titulo}')" style="cursor:pointer; padding:5px 10px;">
                Cotizar este servicio
            </button>
        `;
        contenedor.appendChild(div);
    });
}

// 3. Cargar Datos de Contacto y Botón General
function cargarContacto() {
    document.getElementById('contact-tel').textContent = db.contacto.telefono;
    document.getElementById('contact-email').textContent = db.contacto.email;
    document.getElementById('contact-dir').textContent = db.contacto.direccion;

    // Configurar botón de contacto general
    const btnGeneral = document.getElementById('btn-contacto-general');
    
    const asunto = "Hola Cable Happy, tengo una duda";
    const cuerpo = "Hola equipo de Cable Happy,\n\nVisité su página web y me gustaría saber más información general sobre sus servicios.\n\nQuedo a la espera de su respuesta.\nSaludos.";

    btnGeneral.href = `mailto:${db.contacto.email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}

// 4. FUNCIÓN CLAVE: Generar el correo de cotización
function solicitarCotizacion(servicio) {
    const emailDestino = db.contacto.email;
    
    // Asunto del correo pre-llenado
    const asunto = `Cotización urgente: ${servicio}`;
    
    // Cuerpo del correo (La "bienvenida" o introducción que envía el cliente)
    const cuerpo = `Hola equipo de Cable Happy,

Estoy interesado en contratar el servicio de: ${servicio}.

Por favor, envíenme una cotización o contáctenme para agendar una visita técnica.

Mis datos de contacto son:
- Nombre: 
- Teléfono: 

¡Gracias!`;

    // Abrir la app de correo del usuario
    window.location.href = `mailto:${emailDestino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
    cargarInfoEmpresa();
    cargarServicios();
    cargarContacto();
});