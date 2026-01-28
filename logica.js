/**
 * SIMULACIÓN DE BASE DE DATOS (MOCK DATA)
 * Aquí es donde cambias la información de tu empresa.
 */
const db = {
    empresa: {
        nombre: "ConnectCable Pro",
        slogan: "Soluciones de conectividad y cableado estructurado",
        descripcion: "Somos expertos en infraestructura de redes, ofreciendo instalaciones certificadas de voz, datos y fibra óptica para oficinas y edificios industriales."
    },
    servicios: [
        {
            id: 1,
            titulo: "Cableado Estructurado",
            icono: "fa-network-wired", // Clase de FontAwesome (opcional)
            descripcion: "Instalación y certificación de nodos de red en Categorías 5e, 6 y 6A. Organización de Racks y Gabinetes."
        },
        {
            id: 2,
            titulo: "Fibra Óptica",
            icono: "fa-project-diagram",
            descripcion: "Empalmes por fusión, certificación OTDR y tendido de fibra monomodo y multimodo para enlaces de larga distancia."
        },
        {
            id: 3,
            titulo: "Sistemas de CCTV",
            icono: "fa-video",
            descripcion: "Instalación de cámaras de seguridad IP y análogas, configuración de DVR/NVR y visualización remota."
        },
        {
            id: 4,
            titulo: "Mantenimiento de Redes",
            icono: "fa-tools",
            descripcion: "Diagnóstico de fallas, peinado de cables en sites de comunicaciones y reordenamiento de infraestructura."
        }
    ],
    contacto: {
        telefono: "+52 55 1234 5678",
        whatsapp: "5512345678", // Solo números para el link
        email: "contacto@connectcablepro.com",
        direccion: "Av. Tecnológica 123, Ciudad de México",
        horario: "Lunes a Viernes: 9:00 AM - 6:00 PM"
    }
};

/**
 * LÓGICA DE RENDERIZADO (CONTROLADOR)
 * Estas funciones toman los datos de arriba y los pintan en el HTML.
 */

// 1. Cargar información del encabezado y descripción
function cargarInfoEmpresa() {
    const titulo = document.getElementById('company-name');
    const slogan = document.getElementById('company-slogan');
    const desc = document.getElementById('company-desc');

    if(titulo) titulo.textContent = db.empresa.nombre;
    if(slogan) slogan.textContent = db.empresa.slogan;
    if(desc) desc.textContent = db.empresa.descripcion;
}

// 2. Cargar la lista de servicios dinámicamente
function cargarServicios() {
    const contenedor = document.getElementById('servicios-container');
    
    if (!contenedor) return; // Si no existe el contenedor, no hacemos nada

    contenedor.innerHTML = ''; // Limpiar contenido previo

    db.servicios.forEach(servicio => {
        // Creamos una tarjeta (card) para cada servicio
        const card = document.createElement('div');
        card.className = 'servicio-card';
        
        card.innerHTML = `
            <div class="icono"><i class="fas ${servicio.icono}"></i></div>
            <h3>${servicio.titulo}</h3>
            <p>${servicio.descripcion}</p>
            <button onclick="solicitarCotizacion('${servicio.titulo}')">Cotizar</button>
        `;
        
        contenedor.appendChild(card);
    });
}

// 3. Cargar información de contacto
function cargarContacto() {
    const telElem = document.getElementById('contact-tel');
    const emailElem = document.getElementById('contact-email');
    const dirElem = document.getElementById('contact-dir');
    const btnWsp = document.getElementById('btn-whatsapp');

    // Asignar textos
    if(telElem) telElem.textContent = db.contacto.telefono;
    if(emailElem) emailElem.textContent = db.contacto.email;
    if(dirElem) dirElem.textContent = db.contacto.direccion;

    // Asignar enlace de WhatsApp
    if(btnWsp) {
        btnWsp.href = `https://wa.me/${db.contacto.whatsapp}?text=Hola, me interesa cotizar un servicio de cableado.`;
    }
}

// 4. Función de utilidad para el botón "Cotizar"
function solicitarCotizacion(nombreServicio) {
    alert(`Te redirigiremos a WhatsApp para cotizar: ${nombreServicio}`);
    window.location.href = `https://wa.me/${db.contacto.whatsapp}?text=Hola, me interesa información sobre el servicio de: ${nombreServicio}`;
}

/**
 * INICIALIZACIÓN
 * Ejecutar las funciones cuando el documento HTML esté listo.
 */
document.addEventListener('DOMContentLoaded', () => {
    cargarInfoEmpresa();
    cargarServicios();
    cargarContacto();
});