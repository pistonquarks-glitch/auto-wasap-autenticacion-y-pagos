// Generador estático del sitio Pistón Auto.
// Uso: node tools/build-site.mjs
// Fuente única de verdad para precios, segmentos y copy de páginas.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WA = '51930640071';
const wa = (m) => `https://wa.me/${WA}?text=${encodeURIComponent(m)}`;
const S = (n) => 'S/ ' + n.toLocaleString('es-PE');

/* ------------------------------------------------------------------ */
/*  PLANES (Sistemas aprobados: Respuestas Automaticas S/299, Infinitas con Cerebro S/750) */
/* ------------------------------------------------------------------ */
const PLANS = [
  {
    id: 'automaticas', tier: 'Sistema 1', name: 'Sistema de Respuestas Automaticas', featured: false,
    sub: 'Respuestas automaticas con tu arbol de decisiones.',
    promise: 'Deja de responder lo mismo cuarenta veces al dia.',
    price: 299, founders: 149,
    features: [
      'Arbol de respuestas en WhatsApp (menus, rutas y derivaciones)',
      "Tus precios, horarios y preguntas frecuentes reales",
      "Derivacion a humano cuando la consulta lo exige",
      "Registro de conversaciones y auditoria en archivo JSONL",
      "1 numero de WhatsApp y 1 operador",
      "Soporte 24-48 h",
    ],
    limits: ['No verifica comprobantes', 'No entrega reportes'],
    forWho: 'Negocios que reciben muchas consultas repetidas y quieren ordenar el chat.'
  },
  {
    id: 'infinitas', tier: 'Sistema 2', name: 'Sistema de Infinitas Respuestas con Cerebro', featured: true,
    sub: 'Respuestas infinitas con un cerebro que piensa, lee contexto y dirige la venta.',
    promise: 'Atiende de forma infinita con criterio: investiga, prueba y cierra con accion.',
    price: 750, founders: 375,
    features: [
      'Todo lo del Sistema de Respuestas Automaticas, con guion de venta entrenado',
      'Cerebro que piensa, lee el contexto antes de responder y secuencia los conceptos',
      'Escala y dirige la conversacion hacia la venta; investiga al cliente cuando no lo tiene claro',
      'Ofrece precios y contratos cuando hay direccion; acompana hasta la recompra/cliente constante'
    ],
    limits: ['No verifica comprobantes por si solo', 'No entrega reportes con graficos'],
    forWho: 'Negocios con volumen continuo que buscan la conversacion llevada a la venta, no solo respuestas.'
  }
];



/* ------------------------------------------------------------------ */
/*  SEGMENTOS                                                          */
/* ------------------------------------------------------------------ */
const SEGMENTS = [
  {
    slug: 'restaurantes', icon: '🍽️', name: 'Restaurantes y gastronomía', short: 'Parrillas, cavicherías, cafés y franquicias.',
    heroTitle: 'La caja no cierra porque los Yape viven en el chat.',
    lead: 'Tu cajero revisa capturas en plena hora punta, el cierre se arma de memoria y los comprobantes duplicados nadie los ve. Pistón Auto verifica, registra y te manda el cierre por turno.',
    pains: [
      { n: 'Fuga 01', t: '45 minutos por turno revisando capturas', d: 'Tiempo de cajero que se paga y no produce.', cost: '≈ S/ 450/mes' },
      { n: 'Fuga 02', t: 'Comprobantes duplicados o editados', d: 'Nadie compara número de operación ni monto exacto.', cost: '≈ S/ 300/mes' },
      { n: 'Fuga 03', t: 'Cierre sin datos reales', d: 'Se decide con memoria, no con el registro del día.', cost: 'Decisiones a ciegas' }
    ],
    exclusive: [
      { t: 'Cierre de caja por turno', d: 'Reporte a las 12:00, 16:00 y 22:00 al WhatsApp del dueño: total, métodos y sospechosos.' },
      { t: 'Comanda y pago en el mismo hilo', d: 'El cliente pide, paga y recibe confirmación sin cambiar de conversación.' },
      { t: 'Alerta de mesa sin pago', d: 'Consumo registrado sin comprobante asociado: te avisa antes del cierre.' },
      { t: 'Ticket promedio por turno', d: 'Compara Yape, PLIN, transferencia y efectivo con el mismo criterio.' }
    ],
    planExtra: {
      basico: ['Menú, horarios y reservas respondidos solos'],
      pro: ['Verificación de Yape/PLIN en hora punta'],
      enterprise: ['Cierre por turno con gráfico y alertas de mesa']
    },
    report: {
      title: 'Ventas por turno', sub: 'Ejemplo ilustrativo · datos de tu propia operación',
      bars: [ { l: 'Lun', h: 52 }, { l: 'Mar', h: 61 }, { l: 'Mié', h: 48 }, { l: 'Jue', h: 74 }, { l: 'Vie', h: 96, a: 1 }, { l: 'Sáb', h: 100, a: 1 }, { l: 'Dom', h: 88, a: 1 } ],
      legend: ['Yape / PLIN', 'Transferencia']
    },
    proof: { q: 'El cierre del sábado ya no se discute: llega solo al WhatsApp.', who: 'Los Chanques · referencia de trabajo' }
  },
  {
    slug: 'hoteles', icon: '🛎️', name: 'Hoteles boutique y alojamiento', short: 'Hoteles, hostales premium y casas de campo.',
    heroTitle: 'El huésped ya pagó el adelanto… pero nadie lo verificó.',
    lead: 'Recepción busca la captura entre cientos de conversaciones, el check-in se demora y las reservas sin pago confirmado terminan en sobreventa. Pistón Auto liga cada adelanto a su habitación.',
    pains: [
      { n: 'Fuga 01', t: 'Adelantos perdidos entre chats', d: 'La captura existe, pero nadie la encuentra cuando llega el huésped.', cost: 'Reservas en riesgo' },
      { n: 'Fuga 02', t: 'Check-in lento', d: 'Recepción verifica a mano con el cliente esperando en mostrador.', cost: '≈ 15 min por llegada' },
      { n: 'Fuga 03', t: 'No-show y sobreventa', d: 'Se bloquea la habitación sin pago confirmado.', cost: '≈ S/ 180 por noche' }
    ],
    exclusive: [
      { t: 'Adelanto ligado a la habitación', d: 'Cada pago verificado se asocia a reserva, fecha y número de noches.' },
      { t: 'Check-in express', d: 'El bot confirma el pago; recepción solo entrega la llave.' },
      { t: 'Conciliación por noche', d: 'Ocupación pagada versus reservada, con saldo pendiente por huésped.' },
      { t: 'Aviso de reserva sin pago', d: 'Si el adelanto no llega en el plazo, te avisa para liberar la habitación.' }
    ],
    planExtra: {
      basico: ['Tarifas, disponibilidad y check-in respondidos solos'],
      pro: ['Verificación de adelantos de reserva'],
      enterprise: ['Ocupación pagada con gráfico y conciliación por habitación']
    },
    report: {
      title: 'Ocupación pagada', sub: 'Ejemplo ilustrativo · datos de tu propia operación',
      bars: [ { l: 'Sem 1', h: 58 }, { l: 'Sem 2', h: 71 }, { l: 'Sem 3', h: 66 }, { l: 'Sem 4', h: 92, a: 1 } ],
      legend: ['Adelantos verificados', 'Saldo en recepción']
    },
    proof: { q: 'Antes llamábamos al huésped a confirmar. Ahora el bot ya lo hizo.', who: 'Hotelería boutique · Huánuco' }
  },
  {
    slug: 'clinicas', icon: '🩺', name: 'Clínicas, consultorios y estética', short: 'Odontología, estética, dermatología y consultorios.',
    heroTitle: 'El adelanto del tratamiento se pierde entre capturas y el historial.',
    lead: 'El paciente manda su adelanto, recepción no lo ve a tiempo y el saldo queda en el aire. Pistón Auto verifica el pago, calcula el saldo y separa la conversación comercial de los datos sensibles.',
    pains: [
      { n: 'Fuga 01', t: 'Adelantos no vistos a tiempo', d: 'El paciente llega y el pago seguía sin confirmar.', cost: 'Citas perdidas' },
      { n: 'Fuga 02', t: 'Pagos parciales sin saldo claro', d: 'Nadie sabe cuánto falta ni cuándo vence.', cost: '≈ S/ 299 por caso' },
      { n: 'Fuga 03', t: 'Datos clínicos mezclados', d: 'Información sensible en el mismo chat comercial.', cost: 'Riesgo de privacidad' }
    ],
    exclusive: [
      { t: 'Adelanto por tratamiento', d: 'Pago verificado, saldo calculado y recordatorio antes de la cita.' },
      { t: 'Saldo pendiente automático', d: 'El bot informa el saldo exacto sin que recepción lo calcule.' },
      { t: 'Conversación separada por área', d: 'Comercial y clínico en rutas distintas, con permisos por rol.' },
      { t: 'Reporte por especialista', d: 'Ingresos y adelantos por profesional y por sede.' }
    ],
    planExtra: {
      basico: ['Citas, horarios y preparación de consulta'],
      pro: ['Verificación de adelantos y saldos'],
      enterprise: ['Ingresos por especialista con gráfico y auditoría']
    },
    report: {
      title: 'Adelantos y saldos', sub: 'Ejemplo ilustrativo · datos de tu propia operación',
      bars: [ { l: 'Odont.', h: 84, a: 1 }, { l: 'Estét.', h: 67 }, { l: 'Derm.', h: 49 }, { l: 'Nutr.', h: 31 } ],
      legend: ['Adelanto verificado', 'Saldo pendiente']
    },
    proof: { q: 'Recepción dejó de perseguir capturas: el saldo ya está calculado.', who: 'Centro odontológico · Huánuco' }
  },
  {
    slug: 'comercio', icon: '💎', name: 'Comercio, joyerías y galerías', short: 'Retail premium, joyerías, galerías y showrooms.',
    heroTitle: 'Vendes por Instagram y el pago llega… o eso crees.',
    lead: 'Separaciones por Yape que se pierden, despachos sin verificar el abono y varios vendedores usando el mismo número. Pistón Auto verifica antes de despachar y te dice quién vendió qué.',
    pains: [
      { n: 'Fuga 01', t: 'Separaciones que se enfrían', d: 'El cliente dice “ya yapeé” y nadie confirma a tiempo.', cost: 'Ventas perdidas' },
      { n: 'Fuga 02', t: 'Despacho sin abono verificado', d: 'Se entrega con una captura que nunca se contrastó.', cost: 'Pérdida directa' },
      { n: 'Fuga 03', t: 'Varios vendedores, un solo número', d: 'Sin atribución, no hay comisión ni control.', cost: 'Sin trazabilidad' }
    ],
    exclusive: [
      { t: 'Separación con abono verificado', d: 'Abono confirmado, vencimiento automático y liberación del producto.' },
      { t: 'Verificación antes de despacho', d: 'El bot bloquea el despacho si el pago no cuadra.' },
      { t: 'Catálogo con link de pago', d: 'El cliente ve, paga y confirma dentro del mismo chat.' },
      { t: 'Reporte por vendedor y campaña', d: 'Quién vendió, cuánto y por qué método.' }
    ],
    planExtra: {
      basico: ['Catálogo, stock y precios respondidos solos'],
      pro: ['Verificación de abonos y separaciones'],
      enterprise: ['Ventas por vendedor con gráfico y campañas']
    },
    report: {
      title: 'Ventas por vendedor', sub: 'Ejemplo ilustrativo · datos de tu propia operación',
      bars: [ { l: 'Ana', h: 92, a: 1 }, { l: 'Luis', h: 71 }, { l: 'Rosa', h: 55 }, { l: 'Web', h: 38 } ],
      legend: ['Verificado', 'Pendiente de revisión']
    },
    proof: { q: 'Ya no despachamos con una captura: el bot da el visto bueno.', who: 'Galerías Huánuco · referencia de trabajo' }
  },
  {
    slug: 'inmobiliarias', icon: '🏗️', name: 'Inmobiliarias y alquileres', short: 'Proyectos, lotes, alquileres y administración.',
    heroTitle: 'Una separación de S/ 5,000 no se verifica mirando una captura.',
    lead: 'Montos altos, cuotas mensuales y asesores que reportan de memoria. Pistón Auto aplica doble verificación, ordena el cronograma y te muestra el avance real por proyecto.',
    pains: [
      { n: 'Fuga 01', t: 'Montos altos verificados a ojo', d: 'Una captura editada por S/ 5,000 no se detecta mirando.', cost: 'Riesgo alto' },
      { n: 'Fuga 02', t: 'Cronogramas en Excel paralelos', d: 'Cada asesor lleva su propia versión.', cost: 'Sin control' },
      { n: 'Fuga 03', t: 'Cuotas vencidas sin aviso', d: 'Se descubre a fin de mes, cuando ya se perdió.', cost: '≈ S/ 900/mes' }
    ],
    exclusive: [
      { t: 'Separación con doble verificación', d: 'OCR + reglas + IA, con revisión humana obligatoria sobre el umbral que definas.' },
      { t: 'Cronograma de cuotas por cliente', d: 'Estado de cada cuota, vencimiento y saldo consolidado.' },
      { t: 'Reporte por proyecto y asesor', d: 'Recaudación real, separaciones y avance de cada asesor.' },
      { t: 'Alerta de cuota vencida', d: 'Aviso al cliente y al administrador antes del corte.' }
    ],
    planExtra: {
      basico: ['Disponibilidad, requisitos y visitas respondidos solos'],
      pro: ['Verificación de separaciones y cuotas'],
      enterprise: ['Recaudación por proyecto con gráfico y alertas']
    },
    report: {
      title: 'Recaudación por proyecto', sub: 'Ejemplo ilustrativo · datos de tu propia operación',
      bars: [ { l: 'A', h: 78, a: 1 }, { l: 'B', h: 64 }, { l: 'C', h: 41 }, { l: 'D', h: 22 } ],
      legend: ['Cobrado', 'Por vencer']
    },
    proof: { q: 'El asesor ya no reporta de memoria: el reporte llega solo.', who: 'Inmobiliaria · Huánuco' }
  },
  {
    slug: 'vendedores', icon: '📱', name: 'Vendedores y marcas personales', short: 'Alta demanda de DMs, catálogos y venta por redes.',
    heroTitle: 'Tu WhatsApp es tu tienda y no das abasto.',
    lead: 'Decenas de mensajes pidiendo lo mismo, pagos por Yape sin registro y ventas que se enfrían por responder tarde. Pistón Auto atiende con tu voz, cobra y te deja el registro.',
    pains: [
      { n: 'Fuga 01', t: 'Mensajes repetidos todo el día', d: 'Precio, talla, stock, envío: lo mismo cien veces.', cost: '≈ 3 h/día' },
      { n: 'Fuga 02', t: 'Pagos sin registro', d: 'El Yape entró, pero no sabes de qué venta.', cost: '≈ S/ 200/mes' },
      { n: 'Fuga 03', t: 'Ventas que se enfrían', d: 'Responder tres horas después es perder la venta.', cost: 'Conversión baja' }
    ],
    exclusive: [
      { t: 'Catálogo y link de pago en el chat', d: 'El cliente elige, paga y recibe confirmación sin salir de WhatsApp.' },
      { t: 'Respuestas 24/7 con tu voz', d: 'Tu forma de escribir, tus precios y tus reglas, no un texto genérico.' },
      { t: 'Etiquetas de cliente', d: 'Interesado, pagó, recompra: el seguimiento deja de ser memoria.' },
      { t: 'Reporte de ventas por campaña', d: 'Qué publicación trajo ventas y cuánto dejó cada una.' }
    ],
    planExtra: {
      basico: ['Catálogo y preguntas frecuentes automáticas'],
      pro: ['Verificación de pagos y registro de ventas'],
      enterprise: ['Ventas por campaña con gráfico y recompra']
    },
    report: {
      title: 'Ventas por campaña', sub: 'Ejemplo ilustrativo · datos de tu propia operación',
      bars: [ { l: 'IG', h: 88, a: 1 }, { l: 'TikTok', h: 72 }, { l: 'WA', h: 61 }, { l: 'Otros', h: 24 } ],
      legend: ['Pagado', 'En conversación']
    },
    proof: { q: 'Respondo a las once de la noche sin estar despierto.', who: 'Marca personal · Huánuco' }
  },
  {
    slug: 'empresas', icon: '🏢', name: 'Gerencia y administración', short: 'Multi-sede, equipos y cobranza por WhatsApp.',
    heroTitle: 'Nadie sabe cuánto entró realmente por WhatsApp este mes.',
    lead: 'Cobranzas repartidas entre áreas, sin trazabilidad para auditoría y decisiones con datos de memoria. Pistón Auto consolida, audita y te entrega el reporte gerencial en imagen.',
    pains: [
      { n: 'Fuga 01', t: 'Cobranza sin dueño claro', d: 'Ventas, caja y administración creen que otro confirma.', cost: 'Pagos sin conciliar' },
      { n: 'Fuga 02', t: 'Sin trazabilidad', d: 'No hay evidencia ordenada de quién verificó qué.', cost: 'Riesgo de auditoría' },
      { n: 'Fuga 03', t: 'Decisiones a ciegas', d: 'El reporte se arma a mano y llega tarde.', cost: 'Costo de oportunidad' }
    ],
    exclusive: [
      { t: 'Multi-sede y multi-usuario', d: 'Permisos por rol: operador, supervisor, gerencia y auditor.' },
      { t: 'Conciliación y export contable', d: 'Archivo listo para contabilidad, con referencia y estado.' },
      { t: 'Reporte gerencial semanal', d: 'Imagen con gráficos enviada al WhatsApp de gerencia.' },
      { t: 'Auditoría completa', d: 'Cada verificación con usuario, hora, veredicto y motivo.' }
    ],
    planExtra: {
      basico: ['Atención estandarizada por sede'],
      pro: ['Verificación y registro centralizado'],
      enterprise: ['Consolidado multi-sede con auditoría y export']
    },
    report: {
      title: 'Consolidado por sede', sub: 'Ejemplo ilustrativo · datos de tu propia operación',
      bars: [ { l: 'Sede A', h: 94, a: 1 }, { l: 'Sede B', h: 76 }, { l: 'Sede C', h: 58 }, { l: 'Online', h: 44 } ],
      legend: ['Conciliado', 'En revisión']
    },
    proof: { q: 'Gerencia recibe el consolidado sin pedirlo.', who: 'Administración multi-sede' }
  }
];

/* ------------------------------------------------------------------ */
/*  COMPONENTES                                                        */
/* ------------------------------------------------------------------ */
const NAV = [
  ['index.html', 'Inicio'],
  ['segmentos.html', 'Segmentos'],
  ['planes.html', 'Planes'],
  ['niveles.html', 'Sistemas'],
  ['como-entrenamos.html', 'Cómo entrenamos'],
  ['pagos.html', 'Pagos']
];

const head = ({ title, desc, active }) => `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#0B1220">
<link rel="icon" type="image/svg+xml" href="assets/logo.svg">
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="site.css">
</head>
<body>
<header class="nav">
  <div class="container nav-inner">
    <a class="brand" href="index.html" aria-label="Piston Quarks">
      <svg class="brand-logo" width="38" height="38" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect width="48" height="48" rx="12" fill="#F2B632"/>
        <text x="24" y="33" text-anchor="middle" font-family="Georgia, serif" font-size="26" font-weight="800" fill="#0B1220">P</text>
      </svg>
      <span class="brand-text">Piston<b>Quarks</b><em class="brand-tag">Pistón Auto</em></span>
    </a>
    <nav class="nav-links" id="navLinks" aria-label="Navegación principal">
      ${NAV.map(([h, t]) => `<a href="${h}"${h === active ? ' class="active"' : ''}>${t}</a>`).join('\n      ')}
      <a class="btn btn-primary btn-sm" href="${wa('Hola Pistón Quarks, quiero una demo de Pistón Auto.')}">Pedir demo</a>
    </nav>
    <button class="nav-toggle" id="navToggle" aria-label="Abrir menú" aria-controls="navLinks" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<main id="top">`;

const footer = () => `<footer class="footer">
  <div class="container footer-grid">
    <div>
      <b style="color:var(--amber)">Pistón Quarks EIRL</b>
      <p>Ingeniería conversacional y automatización. Lima / Huánuco · Perú. Pistón Auto es nuestro sistema de conversación transaccional por WhatsApp.</p>
    </div>
    <div>
      <h4>Segmentos</h4>
      <ul>
        ${SEGMENTS.slice(0, 5).map(s => `<li><a href="para-${s.slug}.html">${s.name}</a></li>`).join('\n        ')}
        <li><a href="segmentos.html">Ver todos →</a></li>
      </ul>
    </div>
    <div>
      <h4>Producto</h4>
      <ul>
        <li><a href="planes.html">Planes y precios</a></li>
        <li><a href="niveles.html">Los sistemas</a></li>
        <li><a href="como-entrenamos.html">Cómo entrenamos</a></li>
        <li><a href="pagos.html">Cómo comprar</a></li>
      </ul>
    </div>
    <div>
      <h4>Contacto</h4>
      <ul>
        <li><a href="${wa('Hola Pistón Quarks, quiero información de Pistón Auto.')}" rel="noopener">WhatsApp +51 930 640 071</a></li>
        <li><a href="mailto:rony@pistonquarks.store">rony@pistonquarks.store</a></li>
        <li><a href="https://pistonquarks.store" rel="noopener">pistonquarks.store</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-note">© <span id="year"></span> Pistón Quarks EIRL · Pistón Auto. Precios en soles (IGV incluido). Founders válido para los primeros 10 clientes.</div>
</footer>

<a class="wa-float" href="${wa('Hola Pistón Quarks, quiero una demo de Pistón Auto.')}" target="_blank" rel="noopener" aria-label="Abrir WhatsApp">
  <svg width="30" height="30" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.47 1.72 6.41L3.2 28.8l6.6-1.73a12.75 12.75 0 0 0 6.2 1.6h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.41-1.33-6.62-3.75-9.04A12.72 12.72 0 0 0 16.004 3.2zm0 23.36h-.01a10.55 10.55 0 0 1-5.38-1.47l-.39-.23-3.93 1.03 1.05-3.83-.25-.4a10.53 10.53 0 0 1-1.62-5.64c0-5.81 4.73-10.54 10.54-10.54a10.45 10.45 0 0 1 7.45 3.09 10.45 10.45 0 0 1 3.08 7.45c0 5.82-4.73 10.54-10.54 10.54zm5.78-7.9c-.32-.16-1.88-.93-2.17-1.03-.3-.11-.51-.16-.73.16-.21.32-.84 1.03-1.03 1.24-.19.22-.38.24-.7.08a8.5 8.5 0 0 1-4.25-3.72c-.32-.55.32-.51.91-1.72.1-.16.05-.3-.03-.46-.08-.16-.73-1.76-.99-2.4-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.4-.3.33-1.14 1.11-1.14 2.7 0 1.6 1.17 3.14 1.33 3.35.16.22 2.29 3.5 5.57 4.9.78.34 1.39.54 1.86.69.78.25 1.5.21 2.06.13.63-.1 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.3-.22-.62-.37z"/></svg>
</a>

<script src="app.js"></script>
</body>
</html>`;

const crumbs = (items) => `<div class="crumbs">${items.map((it, i) => {
  const h = it[0];
  const t = it[1] || it[0];
  return i === items.length - 1 ? `<span>${t}</span>` : `<a href="${h}">${t}</a><span class="sep">/</span>`;
}).join('')}</div>`;

const pageHero = ({ crumb, title, lead, chips = [], ctas }) => `<section class="page-hero">
  <div class="container">
    ${crumb ? crumbs(crumb) : ''}
    <h1>${title}</h1>
    <p class="lead">${lead}</p>
    ${ctas ? `<div class="hero-ctas">${ctas}</div>` : ''}
    ${chips.length ? `<div class="chips">${chips.map(c => `<span class="chip">${c}</span>`).join('')}</div>` : ''}
  </div>
</section>`;

const band = (title, sub, label, msg) => `<section class="band">
  <div class="container band-inner">
    <div><h2>${title}</h2><p>${sub}</p></div>
    <a class="btn btn-primary btn-lg" href="${wa(msg)}">${label} →</a>
  </div>
</section>`;

const planCard = (p, extra = []) => `<article class="plan ${p.featured ? 'featured' : ''}" id="plan-${p.id}">
  ${p.featured ? '<span class="plan-flag">Recomendado</span>' : ''}
  <span class="tier">${p.tier}</span>
  <h3>${p.name}</h3>
  <p class="sub">${p.sub}</p>
  <div class="price">${S(p.price)}<small> /mes</small></div>
  <div class="founders">Founders (primeros 10): ${S(p.founders)}/mes</div>
  <ul>
    ${p.features.map(f => `<li>${f}</li>`).join('\n    ')}
    ${extra.map(f => `<li><b>En tu rubro:</b> ${f}</li>`).join('\n    ')}
    ${p.limits.map(f => `<li class="no">${f}</li>`).join('\n    ')}
  </ul>
  <a class="btn ${p.featured ? 'btn-primary' : 'btn-ghost'}" href="${wa(`Hola Pistón Quarks, quiero el sistema ${p.name} de Pistón Auto.`)}">Elegir ${p.name}</a>
</article>`;

const chart = (r) => `<div class="chart-card">
  <div class="chart-head"><b>${r.title}</b><span>${r.sub}</span></div>
  <div class="bars-wrap">
    <div class="bars">
      ${r.bars.map(b => `<div class="bar${b.a ? ' amber' : ''}" style="height:${b.h}%"><span>${b.l}</span></div>`).join('')}
    </div>
  </div>
  <div class="legend">
    <span><i style="background:var(--mint)"></i>${r.legend[0]}</span>
    <span><i style="background:var(--amber)"></i>${r.legend[1]}</span>
  </div>
</div>`;

const faq = (items) => `<div class="faq">
  ${items.map(([q, a]) => `<button class="faq-q" aria-expanded="false">${q}<span class="faq-icon">+</span></button>
      <div class="faq-a"><p>${a}</p></div>`).join('\n      ')}
</div>`;

/* ------------------------------------------------------------------ */
/*  PÁGINA: INICIO                                                     */
/* ------------------------------------------------------------------ */
const pageIndex = () => `${head({
  title: 'Pistón Auto — Conversación transaccional por WhatsApp | Piston Quarks',
  desc: 'Dos sistemas: respuestas automáticas y respuestas infinitas con cerebro, con verificación de comprobantes Yape/PLIN con OCR+IA y reportes con gráficos de tus movimientos por WhatsApp.',
  active: 'index.html'
})}
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <span class="badge">★ Pistón Auto · 2 sistemas, un mismo WhatsApp</span>
      <h1>Tu WhatsApp ya vende. Ahora también <span class="accent">verifica, registra y reporta</span>.</h1>
      <p class="lead">Empieza con respuestas automáticas. Sube a un sistema de infinitas respuestas con cerebro que piensa, lee contexto y dirige la venta. Llega a un bot que <b>habla como tú, nunca inventa</b> y te manda los gráficos de todo lo que se movió.</p>
      <div class="hero-ctas">
        <a class="btn btn-primary btn-lg" href="segmentos.html">Elegir mi segmento</a>
        <a class="btn btn-ghost" href="planes.html">Ver planes y precios →</a>
      </div>
      <ul class="hero-points">
        <li>✓ Sistema de Respuestas Automáticas S/ 299 · Sistema de Infinitas con Cerebro S/ 750 al mes</li>
        <li>✓ Founders: 50% menos para los primeros 10 clientes</li>
        <li>✓ OCR local: tus capturas no salen de tu PC</li>
      </ul>
    </div>

    <div class="hero-visual" aria-hidden="true">
      <div class="mock-card mock-chat">
        <div class="mock-head"><span class="dot red"></span><span class="dot amber"></span><span class="dot green"></span><span class="mock-title">WhatsApp · tu negocio</span></div>
        <div class="mock-body">
          <div class="bubble bubble-in">📲 <b>Comprobante</b><br>Yape · Pago exitoso<br>Monto: <b>S/ 299.00</b><br>Operación: 987654321</div>
          <div class="bubble bubble-out">🧾 Verificado.<br>Método: <b>YAPE</b> · Monto: <b>S/ 299.00</b><br>Registrado en tu hoja ✅<br>IA: VÁLIDO — coincide con el sistema.</div>
        </div>
      </div>
      <div class="mock-card mock-sheet">
        <div class="mock-head"><span class="dot green"></span><span class="mock-title">Reporte del día</span></div>
        <table class="mini-table">
          <thead><tr><th>Hora</th><th>Método</th><th>Monto</th><th>Estado</th></tr></thead>
          <tbody>
            <tr><td>09:14</td><td>YAPE</td><td>S/ 299.00</td><td class="ok">✓ Verificado</td></tr>
            <tr><td>11:02</td><td>PLIN</td><td>S/ 750.00</td><td class="ok">✓ Verificado</td></tr>
            <tr><td>16:40</td><td>Transf.</td><td>S/ 299.00</td><td class="warn">✎ Revisión</td></tr>
          </tbody>
        </table>
      </div>
      <div class="mock-spark" id="spark">✓</div>
    </div>
  </div>
</section>

<div class="container stats" role="list" aria-label="Indicadores">
  <div class="stat" role="listitem"><b>&lt; 2 s</b><span>verificación típica de un comprobante</span></div>
  <div class="stat" role="listitem"><b>2 sistemas</b><span>empiezas donde estás, subes cuando lo necesitas</span></div>
  <div class="stat" role="listitem"><b>0 invención</b><span>si no lo sabe, avisa antes de responder</span></div>
  <div class="stat" role="listitem"><b>100%</b><span>OCR local — tus datos no salen de tu PC</span></div>
</div>

<section class="section">
  <div class="container">
    <h2 class="section-title">Los dos sistemas, en una frase cada uno</h2>
    <div class="plan-grid">
      ${PLANS.map(p => planCard(p)).join('\n      ')}
    </div>
    <p class="price-note">Instalación S/ 349 en el Sistema de Respuestas Automáticas · el Sistema de Infinitas con Cerebro incluye el módulo de respuestas infinitas · precios en soles, IGV incluido.</p>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <h2 class="section-title">Antes de responder, el bot piensa esto</h2>
    <p style="text-align:center;color:var(--muted);max-width:60ch;margin:-1rem auto 2rem">No es un contestador: es un guion con criterio. Estas cinco compuertas se ejecutan en cada mensaje.</p>
    <div class="flow">
      <div class="flow-step"><div class="num">1</div><div><h3>¿Quién escribe?</h3><p>Cliente previo, prospecto nuevo u operador autorizado. Cambia el tono, el sistema de detalle y los permisos.</p></div></div>
      <div class="flow-step"><div class="num">2</div><div><h3>¿Qué está pidiendo?</h3><p>Clasifica la intención: precio, soporte, pago, reclamo o conversación. Sin adivinar.</p></div></div>
      <div class="flow-step"><div class="num">3</div><div><h3>¿Tengo el dato?</h3><p>Busca en tus carpetas y en tu entrenamiento. Si no está, no improvisa: lo dice.</p></div></div>
      <div class="flow-step"><div class="num">4</div><div><h3>Si es pago, ¿cuadra?</h3><p>OCR lee la captura, las reglas comparan monto, destinatario y fecha, y la IA emite VÁLIDO o SOSPECHOSO.</p></div></div>
      <div class="flow-step"><div class="num">5</div><div><h3>¿Es riesgo o duda?</h3><p>Avisa, escala a humano y espera instrucción. Nunca cierra una venta con información inventada.</p></div></div>
    </div>
    <p style="text-align:center;margin-top:1.6rem"><a class="btn btn-ghost" href="niveles.html">Ver qué cambia en cada sistema →</a></p>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">¿A qué te dedicas? Hay una página para tu caso</h2>
    <div class="seg-grid">
      ${SEGMENTS.map(s => `<a class="seg-card" href="para-${s.slug}.html">
        <span class="ico">${s.icon}</span>
        <h3>${s.name}</h3>
        <p>${s.short}</p>
        <span class="go">Ver plan para mi rubro →</span>
      </a>`).join('\n      ')}
    </div>
    <p style="text-align:center;margin-top:1.8rem"><a class="btn btn-ghost" href="segmentos.html">Ver el árbol completo de segmentos →</a></p>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <div class="two-col" style="align-items:center">
      <div>
        <h2 style="font-size:clamp(1.4rem,2.6vw,2rem);margin-bottom:.8rem">No es solo precio por segmento.<br><span class="accent">Es alcance distinto.</span></h2>
        <p style="color:#C9D2E4;margin-bottom:1rem">Los dos sistemas cobran lo mismo para cualquier rubro; lo que cambia por segmento es el alcance que se incluye: respuestas automáticas, infinitas respuestas con cerebro, verificación, reportes y módulos exclusivos.</p>
        <ul class="checklist">
          <li><b>Mismo precio, más alcance:</b> el valor no se cobra dos veces por el mismo módulo.</li>
          <li><b>El cerebro no es “más caro”:</b> es el único que piensa, lee contexto y dirige la venta.</li>
          <li><b>Sin sorpresas:</b> lo que no está en tu sistema se dice antes de firmar.</li>
        </ul>
      </div>
      <div class="callout ok">
        <b>Regla de honestidad comercial</b>
        <p style="margin-top:.5rem">Si tu operación necesita un módulo que no existe todavía, se cotiza aparte y se escribe en la propuesta. No se promete “todo incluido” para cerrar la venta.</p>
        <p style="margin-top:.8rem"><a href="como-entrenamos.html" style="color:var(--amber)">Cómo entrenamos los bots →</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container faq-wrap">
    <h2 class="section-title">Preguntas frecuentes</h2>
    ${faq([
      ['¿Necesito cambiar de número de WhatsApp?', 'No. Pistón Auto se conecta al número que ya usas. En la instalación se vincula una vez y queda operando sobre esa misma línea.'],
      ['¿Mis capturas salen de mi computadora?', 'No. El OCR corre local con Tesseract. Solo el texto extraído se usa para la verificación; la imagen se elimina al terminar.'],
      ['¿Qué pasa si el comprobante es dudoso?', 'Se marca SOSPECHOSO, se registra con el motivo y se avisa a un humano autorizado. Nunca se aprueba solo un pago que no cuadra.'],
      ['¿Puedo empezar con el Sistema de Respuestas Automáticas y subir después?', 'Sí. El sistema de respuestas automáticas es la misma base: se amplía al Sistema de Infinitas Respuestas con Cerebro sin reinstalar, y al módulo de voz/clonación o cerebro cuando quieras.'],
      ['¿Cuánto demora la instalación?', 'Entre 1 y 2 horas según el rubro. Incluye conexión de WhatsApp, OCR, hoja de cálculo y una prueba con un comprobante real.']
    ])}
  </div>
</section>

${band('Empieza con una captura real, no con una promesa', 'Demo de 30 minutos: verificamos un comprobante tuyo, en vivo, y ves la fila aparecer en tu hoja.', 'Solicitar demo', 'Hola Pistón Quarks, quiero una demo de Pistón Auto con un comprobante real.')}
</main>
${footer()}`;

/* ------------------------------------------------------------------ */
/*  PÁGINA: SEGMENTOS                                                  */
/* ------------------------------------------------------------------ */
const pageSegmentos = () => `${head({
  title: 'Árbol de segmentos — ¿qué Pistón Auto te corresponde? | Piston Quarks',
  desc: 'Árbol de decisión por tipo de negocio: gastronomía, hoteles, clínicas, comercio, inmobiliarias, vendedores y gerencia. Cada rama tiene su propia página y su plan recomendado.',
  active: 'segmentos.html'
})}
${pageHero({
  crumb: [['index.html', 'Inicio'], ['Segmentos']],
  title: 'Un árbol, no un catálogo: encuentra tu rama.',
  lead: 'El mismo motor, entrenado distinto para cada rubro. Elige tu rama y verás el módulo exclusivo que no recibe ningún otro segmento.',
  chips: ['<b>7</b> segmentos', 'Mismo precio, distinto alcance', 'Empieza en Respuestas Automaticas y sube']
})}

<section class="section">
  <div class="container">
    <h2 class="section-title">Árbol de segmentos</h2>
    <div class="tree">
      <div class="tree-root">
        <div class="tree-node"><span class="ico">⚙️</span><span><b>Pistón Auto</b><small>¿Cómo vendes y cómo cobras?</small></span></div>
      </div>

      <div class="tree-label">Rama A · Tienes un local o un proyecto físico</div>
      <div class="tree-branch">
        <div class="tree-grid">
          ${SEGMENTS.slice(0, 5).map(s => `<a class="tree-node" href="para-${s.slug}.html"><span class="ico">${s.icon}</span><span><b>${s.name}</b><small>${s.short}</small></span></a>`).join('\n          ')}
        </div>
      </div>

      <div class="tree-label">Rama B · Vendes por redes, sin local</div>
      <div class="tree-branch">
        <a class="tree-node" href="para-vendedores.html"><span class="ico">📱</span><span><b>Vendedores y marcas personales</b><small>Alta demanda de DMs, catálogo y pago en el chat.</small></span></a>
      </div>

      <div class="tree-label">Rama C · Administras varias sedes o un equipo</div>
      <div class="tree-branch">
        <a class="tree-node" href="para-empresas.html"><span class="ico">🏢</span><span><b>Gerencia y administración</b><small>Consolidado, auditoría y permisos por rol.</small></span></a>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <h2 class="section-title">O respóndeme tres preguntas</h2>
    <div class="quiz" id="quiz">
      <div class="progress">Pregunta 1 de 3</div>

      <div class="q active">
        <p>1. ¿Dónde ocurre tu venta?</p>
        <div class="opts">
          <button class="opt" data-k="b">En un local, mostrador o consultorio</button>
          <button class="opt" data-k="p">Por redes sociales y WhatsApp, sin local</button>
          <button class="opt" data-k="e">En varias sedes o con un equipo de ventas</button>
        </div>
      </div>

      <div class="q">
        <p>2. ¿Qué te duele más hoy?</p>
        <div class="opts">
          <button class="opt" data-k="b">Responder lo mismo todo el día</button>
          <button class="opt" data-k="p">Verificar pagos y comprobantes a ojo</button>
          <button class="opt" data-k="e">Saber qué pasó realmente con el dinero</button>
        </div>
      </div>

      <div class="q">
        <p>3. ¿Cuántos comprobantes recibes al mes?</p>
        <div class="opts">
          <button class="opt" data-k="b">Menos de 30 o ninguno todavía</button>
          <button class="opt" data-k="p">Entre 31 y 300</button>
          <button class="opt" data-k="e">Más de 300 o no llevo la cuenta</button>
        </div>
      </div>

      <div class="result"></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">Las siete ramas, de un vistazo</h2>
    <div class="seg-grid">
      ${SEGMENTS.map(s => `<a class="seg-card" href="para-${s.slug}.html">
        <span class="ico">${s.icon}</span>
        <h3>${s.name}</h3>
        <p>${s.short}</p>
        <span class="go">${s.exclusive[0].t} →</span>
      </a>`).join('\n      ')}
    </div>
    <div class="callout warn" style="margin-top:1.8rem">
      <b>Si tu rubro no aparece:</b> no lo forzamos dentro de otra rama. Se evalúa con una demo y, si el módulo no existe, se cotiza aparte antes de firmar.
    </div>
  </div>
</section>

${band('No sabes en qué rama estás', 'Escríbenos con tu rubro y tu volumen de mensajes. Te decimos el sistema y el módulo exacto, sin compromiso.', 'Preguntar por WhatsApp', 'Hola Pistón Quarks, no sé qué plan de Pistón Auto me corresponde. Mi rubro es: ')}
</main>
${footer()}`;

/* ------------------------------------------------------------------ */
/*  PÁGINA: PLANES                                                     */
/* ------------------------------------------------------------------ */
const pagePlanes = () => `${head({
  title: 'Planes y precios — Sistema de Respuestas Automaticas S/299, Sistema de Infinitas con Cerebro S/750 | Pistón Auto',
  desc: 'Planes de Pistón Auto: Sistema de Respuestas Automaticas (respuestas automáticas), Sistema de Infinitas con Cerebro (respuestas infinitas con IA que piensa, lee contexto y dirige la venta), más cerebro S/1699 y voz clonada S/2499. Founders 50% para los primeros 10.',
  active: 'planes.html'
})}
${pageHero({
  crumb: [['index.html', 'Inicio'], ['Planes']],
  title: 'Dos sistemas. Ninguno es “el mismo con otro precio”.',
  lead: 'Cada sistema agrega una capacidad real: responder, investigar y vender, o validar y reportar. El precio es el mismo para todos los rubros; lo que cambia por segmento es el alcance que se incluye.',
  chips: ['Sistema de Respuestas Automaticas <b>S/ 299</b>', 'Sistema de Infinitas con Cerebro <b>S/ 750</b>', 'Cerebro <b>S/ 1699</b>', 'Voz clonada <b>S/ 2499</b>', 'Founders <b>50%</b>'],
  ctas: `<a class="btn btn-primary btn-lg" href="${wa('Hola Pistón Quarks, quiero asesoría para elegir plan de Pistón Auto.')}">Que me asesoren</a>
         <a class="btn btn-ghost" href="niveles.html">Ver el detalle de cada sistema</a>`
})}

<section class="section">
  <div class="container">
    <div class="plan-grid">
      ${PLANS.map(p => planCard(p)).join('\n      ')}
    </div>
    <p class="price-note">Instalación S/ 349 en el Sistema de Respuestas Automaticas · el Sistema de Infinitas con Cerebro incluye el módulo de respuestas infinitas · precios en soles, IGV incluido.</p>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <h2 class="section-title">Comparación honesta, capacidad por capacidad</h2>
    <div class="table-wrap">
      <table class="matrix">
        <thead>
          <tr><th>Capacidad</th><th class="c">Sistema de Respuestas Automáticas</th><th class="c hl">Sistema de Infinitas con Cerebro</th><th class="c">Cerebro / Voz</th></tr>
        </thead>
        <tbody>
          <tr class="group"><td colspan="4">Conversación</td></tr>
          <tr><td>Árbol de respuestas y menús</td><td class="c yes">✓</td><td class="c yes">✓</td><td class="c no">—</td></tr>
          <tr><td>Respuestas infinitas con cerebro (piensa, lee contexto, dirige venta)</td><td class="c no">—</td><td class="c yes">✓</td><td class="c no">—</td></tr>
          <tr><td>Entrenado con tu marca y tu tono</td><td class="c no">—</td><td class="c yes">✓</td><td class="c no">—</td></tr>
          <tr><td>Habla como tú, sin notarse bot</td><td class="c no">—</td><td class="c yes">✓</td><td class="c no">—</td></tr>
          <tr><td>Control por preguntas (núcleo blando)</td><td class="c">Guion fijo</td><td class="c yes">✓</td><td class="c no">—</td></tr>
          <tr class="group"><td colspan="4">Pagos y registro</td></tr>
          <tr><td>OCR de capturas Yape / PLIN / transferencia</td><td class="c no">—</td><td class="c yes">✓</td><td class="c yes">✓</td></tr>
          <tr><td>Verificación IA (VÁLIDO / SOSPECHOSO)</td><td class="c no">—</td><td class="c yes">✓</td><td class="c yes">✓</td></tr>
          <tr><td>Reglas anti-fraude por monto y destinatario</td><td class="c no">—</td><td class="c yes">✓</td><td class="c yes">✓ configurable</td></tr>
          <tr><td>Registro en Excel / Google Sheets</td><td class="c no">—</td><td class="c yes">✓</td><td class="c yes">✓ + export</td></tr>
          <tr><td>Permisos por usuario</td><td class="c">1</td><td class="c">3</td><td class="c yes">Multi-sede</td></tr>
          <tr class="group"><td colspan="4">Inteligencia</td></tr>
          <tr><td>Reporte diario / semanal por WhatsApp</td><td class="c no">—</td><td class="c yes">✓ con gráficos</td><td class="c no">—</td></tr>
          <tr><td>Movimientos transaccionales por método y hora</td><td class="c no">—</td><td class="c no">—</td><td class="c yes">✓</td></tr>
          <tr><td>Protocolo cero invención + escalado</td><td class="c no">—</td><td class="c yes">✓</td><td class="c no">—</td></tr>
          <tr><td>Soporte</td><td class="c">24–48 h</td><td class="c">Mismo día</td><td class="c yes">Prioritario</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">Qué cambia por segmento (sin cambiar el precio)</h2>
    <div class="table-wrap">
      <table class="matrix">
        <thead><tr><th>Segmento</th><th>Módulo exclusivo</th><th>Reporte que recibe</th><th class="c">Sistema sugerido</th></tr></thead>
        <tbody>
          ${SEGMENTS.map(s => `<tr>
            <td><a href="para-${s.slug}.html" style="color:var(--amber);text-decoration:none">${s.icon} ${s.name}</a></td>
            <td>${s.exclusive[0].t}</td>
            <td>${s.report.title}</td>
            <td class="c">${s.slug === 'empresas' || s.slug === 'inmobiliarias' ? 'Sistema de Infinitas con Cerebro' : 'Sistema de Respuestas Automaticas'}</td>
          </tr>`).join('\n          ')}
        </tbody>
      </table>
    </div>
    <p class="price-note">El módulo exclusivo se incluye en el sistema sugerido. En sistemas inferiores se entrega la versión base del módulo, no una promesa.</p>
  </div>
</section>

<section class="section section-alt">
  <div class="container faq-wrap">
    <h2 class="section-title">Dudas de precio, respondidas sin vueltas</h2>
    ${faq([
      ['¿Por qué el precio es igual en todos los rubros?', 'Porque lo que se cobra es la capacidad (responder, investigar y vender; o validar y reportar), no el logo del rubro. El alcance distinto se incluye en el sistema que corresponde, sin recargo escondido.'],
      ['¿El precio founders se mantiene para siempre?', 'No. Founders es 50% durante 6 meses para los primeros 10 clientes. Después pasa al precio de lista y se avisa con 30 días de anticipación.'],
      ['¿Qué pasa si supero los operadores de mi sistema?', 'Se agrega un operador adicional con costo mensual fijo, o se sube de sistema si sale más conveniente. Se cotiza antes, nunca después.'],
      ['¿Hay contrato mínimo?', 'El servicio es mensual. La instalación se paga una vez (o se incluye en el sistema de respuestas infinitas con cerebro). No hay penalidad por salir.'],
      ['¿Puedo probar antes de pagar?', 'Sí: demo de 30 minutos con un comprobante real. La prueba no genera licencia ni cobro.']
    ])}
  </div>
</section>

${band('Elige el sistema donde estás hoy', 'Si no sabes cuál, te hacemos tres preguntas y te decimos el sistema exacto. Sin venderte el más caro.', 'Hablar con un asesor', 'Hola Pistón Quarks, quiero elegir el plan correcto de Pistón Auto.')}
</main>
${footer()}`;

/* ------------------------------------------------------------------ */
/*  PÁGINA: NIVELES                                                    */
/* ------------------------------------------------------------------ */
const pageNiveles = () => `${head({
  title: 'Los sistemas de Pistón Auto — respuestas automáticas, infinitas con cerebro, verificación y reportes',
  desc: 'Sistema 1 respuestas automáticas, Sistema 2 respuestas infinitas con cerebro, más verificación de comprobantes con OCR+IA y reportes con gráficos de movimientos transaccionales.',
  active: 'niveles.html'
})}
${pageHero({
  crumb: [['index.html', 'Inicio'], ['Sistemas']],
  title: 'Qué hace el bot, sistema por sistema.',
  lead: 'Del árbol de respuestas al bot que piensa antes de contestar. Aquí está exactamente qué se gana al subir y qué no se promete.',
  chips: ['Sistema 1 · Responde', 'Sistema 2 · Infinitas con Cerebro', 'Verifica y reporta']
})}

<section class="section">
  <div class="container">
    <div class="anchor-nav" style="justify-content:center;margin-bottom:2rem">
      <a href="#plan-automaticas">Sistema 1 · Respuestas Automáticas</a>
      <a href="#plan-infinitas">Sistema 2 · Infinitas con Cerebro</a>
      <a href="#analiza">Qué analiza antes de responder</a>
    </div>

    <article id="plan-automaticas" style="margin-bottom:3rem">
      <span class="tier" style="color:var(--mint);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;font-weight:800">Sistema 1</span>
      <h2 style="font-size:clamp(1.5rem,2.8vw,2.1rem);margin:.4rem 0 .6rem">Sistema de Respuestas Automáticas — el árbol de respuestas</h2>
      <p style="color:#C9D2E4;max-width:70ch">Es el bot que contesta lo que ya sabes responder, pero sin que tengas que escribirlo otra vez. Rutas claras, precios correctos y derivación a humano cuando la conversación lo pide.</p>
      <div class="two-col" style="margin-top:1.4rem">
        <div class="card card-good">
          <h3>Qué incluye</h3>
          <ul>
            <li>Árbol de decisiones con tus rutas reales</li>
            <li>Precios, horarios, ubicación y requisitos</li>
            <li>Derivación a humano por palabra clave</li>
            <li>Registro y auditoría de cada conversación</li>
          </ul>
        </div>
        <div class="card card-bad">
          <h3>Qué no hace (y se dice)</h3>
          <ul>
            <li>No lee comprobantes ni valida pagos</li>
            <li>No genera reportes ni gráficos</li>
            <li>Puede reconocerse como bot</li>
            <li>No improvisa: si la ruta no existe, deriva</li>
          </ul>
        </div>
      </div>
      <p style="margin-top:1.2rem"><b style="color:var(--amber);font-size:1.3rem">S/ 299/mes</b> <span style="color:var(--muted)">· founders S/ 149 · instalación S/ 349</span></p>
      <a class="btn btn-ghost" href="${wa('Hola Pistón Quarks, quiero el sistema de respuestas automaticas de Pistón Auto.')}">Elegir Sistema de Respuestas Automáticas</a>
    </article>

    <article id="plan-infinitas" style="margin-bottom:3rem;border-top:1px solid var(--line);padding-top:2.6rem">
      <span class="tier" style="color:var(--mint);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;font-weight:800">Sistema 2</span>
      <h2 style="font-size:clamp(1.5rem,2.8vw,2.1rem);margin:.4rem 0 .6rem">Sistema de Infinitas Respuestas con Cerebro — el que piensa y dirige la venta</h2>
      <p style="color:#C9D2E4;max-width:70ch">Aquí el bot deja de ser un contestador y se vuelve caja y venta. Un cerebro que piensa, lee el contexto antes de responder y secuencia los conceptos que se mencionan; escala y dirige la conversación hacia la venta, investiga al cliente cuando no lo tiene claro y ofrece precios y contratos cuando hay dirección.</p>
      <div class="two-col" style="margin-top:1.4rem">
        <div class="card card-good">
          <h3>Qué incluye</h3>
          <ul>
            <li>Todo el Sistema de Respuestas Automáticas, con tu marca y tu tono</li>
            <li>Cerebro que piensa, lee contexto antes de responder y secuencia conceptos</li>
            <li>Escala y dirige la conversación hacia la venta; investiga al cliente cuando no lo tiene claro</li>
            <li>Ofrece precios y contratos cuando hay dirección; acompaña hasta la recompra/cliente constante</li>
          </ul>
        </div>
        <div class="card card-bad">
          <h3>Qué no hace (y se dice)</h3>
          <ul>
            <li>No verifica comprobantes por sí solo</li>
            <li>No genera reportes con gráficos gerenciales</li>
            <li>Si el caso no está claro, investiga antes de responder</li>
            <li>No reemplaza la conciliación bancaria oficial</li>
          </ul>
        </div>
      </div>
      <p style="margin-top:1.2rem"><b style="color:var(--amber);font-size:1.3rem">S/ 750/mes</b> <span style="color:var(--muted)">· founders S/ 375 · incluido el módulo de infinitas respuestas</span></p>
      <a class="btn btn-primary" href="${wa('Hola Pistón Quarks, quiero el sistema de infinitas respuestas con cerebro de Pistón Auto.')}">Elegir Sistema de Infinitas con Cerebro</a>
    </article>
  </div>
</section>

<section class="section section-alt" id="analiza">
  <div class="container">
    <h2 class="section-title">Qué piensa y analiza antes de responder</h2>
    <p style="text-align:center;color:var(--muted);max-width:62ch;margin:-1rem auto 2rem">Este es el orden real de decisión. Cambia la profundidad según el sistema, pero nunca el orden.</p>
    <div class="flow">
      <div class="flow-step"><div class="num">1</div><div><h3>Identifica a quién le habla</h3><p>Cliente previo, prospecto, operador autorizado o número desconocido. Define permisos y tono antes de escribir una palabra.</p></div></div>
      <div class="flow-step"><div class="num">2</div><div><h3>Clasifica la intención</h3><p>Precio, soporte, pago, reclamo, saludo o consulta fuera de alcance. Si no encaja, no fuerza una respuesta comercial.</p></div></div>
      <div class="flow-step"><div class="num">3</div><div><h3>Busca el dato en tu material</h3><p>Tus carpetas, tus precios, tus políticas. Si el dato no está, el bot lo declara: “no tengo esa información”.</p></div></div>
      <div class="flow-step"><div class="num">4</div><div><h3>Si hay comprobante, lo audita</h3><p>OCR extrae método, monto, operación y fecha. Las reglas comparan contra lo esperado. La IA emite el veredicto con motivo.</p></div></div>
      <div class="flow-step"><div class="num">5</div><div><h3>Decide si responde, avisa o escala</h3><p>Duda, riesgo o tema sensible: avisa primero y espera instrucción humana. Nunca cierra con información inventada.</p></div></div>
      <div class="flow-step"><div class="num">6</div><div><h3>Registra y reporta</h3><p>Todo queda en auditoría. En el Sistema de Infinitas con Cerebro, además, se convierte en gráfico y llega a tu WhatsApp.</p></div></div>
    </div>
  </div>
</section>

${band('Sube de sistema cuando el negocio lo pida', 'No tienes que empezar en el Sistema de Infinitas con Cerebro. Empieza donde estás y amplía sin reinstalar.', 'Ver planes y precios', 'Hola Pistón Quarks, quiero saber a qué sistema de Pistón Auto puedo pasar.')}
</main>
${footer()}`;

/* ------------------------------------------------------------------ */
/*  PÁGINA: CÓMO ENTRENAMOS                                            */
/* ------------------------------------------------------------------ */
const pageEntrenamos = () => `${head({
  title: 'Cómo entrenamos los bots — núcleo blando, cero invención | Pistón Auto',
  desc: 'Metodología propia: control por preguntas, guiones orquestados, construcción de puentes, prueba del “¿y qué?” y protocolo de cero invención con escalado humano.',
  active: 'como-entrenamos.html'
})}
${pageHero({
  crumb: [['index.html', 'Inicio'], ['Cómo entrenamos']],
  title: 'No entrenamos un contestador. Entrenamos una conversación.',
  lead: 'La diferencia no está en el modelo: está en el guion, en las preguntas y en lo que el bot hace cuando no sabe. Esto es lo que hacemos distinto, con nombre y sin marketing vacío.',
  chips: ['Control por preguntas', 'Guiones orquestados', 'Cero invención', 'Escalado humano']
})}

<section class="section">
  <div class="container">
    <h2 class="section-title">Las cinco fases del núcleo blando</h2>
    <div class="flow">
      <div class="flow-step"><div class="num">1</div><div><h3>Apertura con filtro, nunca “¿en qué te ayudo?”</h3><p>La entidad que pregunta controla la conversación. El bot abre distinguiendo cliente previo de prospecto nuevo, y ajusta el camino desde el primer mensaje.</p></div></div>
      <div class="flow-step"><div class="num">2</div><div><h3>Revelación de la necesidad</h3><p>Preguntas abiertas para que el cliente diga su motivo real: fuga de caja, desorden, miedo a perder ventas. No se le dicta el problema.</p></div></div>
      <div class="flow-step"><div class="num">3</div><div><h3>Construcción de puentes</h3><p>“¿A qué se refiere con…?”, “¿por ejemplo?”, “¿lo que significa que…?”. Evita monólogos y respuestas de una línea que estancan el diálogo.</p></div></div>
      <div class="flow-step"><div class="num">4</div><div><h3>La prueba del “¿y qué?”</h3><p>Cada característica se traduce en consecuencia: el OCR no es “OCR”, es “tu cajero deja de revisar capturas en hora punta”.</p></div></div>
      <div class="flow-step"><div class="num">5</div><div><h3>Cierre con siguiente paso concreto</h3><p>Demo, pago o derivación. Nunca un “quedo atento”. Siempre una acción con hora y responsable.</p></div></div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <h2 class="section-title">Del atributo al beneficio (ejemplos reales)</h2>
    <div class="table-wrap">
      <table class="matrix">
        <thead><tr><th>Lo que es</th><th>Lo que el cliente compra</th></tr></thead>
        <tbody>
          <tr><td>OCR local con Tesseract</td><td>“Tu cajero deja de mirar capturas: el bot lee y confirma en dos segundos.”</td></tr>
          <tr><td>Verificación IA con reglas</td><td>“Un comprobante editado no pasa, y queda el motivo escrito.”</td></tr>
          <tr><td>Registro en Google Sheets</td><td>“El cierre del día ya está armado, sin copiar nada a mano.”</td></tr>
          <tr><td>Entrenamiento con tus carpetas</td><td>“Responde con tus palabras, no con un texto de manual.”</td></tr>
          <tr><td>Reportes con gráficos</td><td>“Sabes qué entró, por qué método y a qué hora, sin pedirlo.”</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">Protocolo de cero invención</h2>
    <div class="two-col">
      <div class="card card-good">
        <h3>Lo que hace</h3>
        <ul>
          <li>Si el dato no está en tu material, lo dice con claridad</li>
          <li>Si detecta que le preguntaron por su lógica, avisa antes de responder</li>
          <li>Si el caso es sensible, espera tu instrucción</li>
          <li>Registra la duda para que tú la resuelvas una vez</li>
        </ul>
      </div>
      <div class="card card-bad">
        <h3>Lo que nunca hace</h3>
        <ul>
          <li>Inventar precios, plazos o disponibilidad</li>
          <li>Confirmar un pago que no cuadra</li>
          <li>Prometer un módulo que no existe</li>
          <li>Improvisar una política de garantía</li>
        </ul>
      </div>
    </div>
    <div class="callout ok" style="margin-top:1.4rem">
      <b>La regla que nos separa:</b> preferimos una respuesta que diga “déjame confirmarlo” antes que una respuesta perfecta que sea mentira.
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <h2 class="section-title">Comparación sin humo</h2>
    <p style="text-align:center;color:var(--muted);max-width:64ch;margin:-1rem auto 1.6rem">Sí, otros entrenan agentes conversacionales. Estos son los referentes reales y qué hacen mejor que nosotros.</p>
    <div class="table-wrap">
      <table class="compare">
        <thead><tr><th>Criterio</th><th>Bots genéricos</th><th>Fin (Intercom) / Sierra / Agentforce</th><th>Pistón Auto</th></tr></thead>
        <tbody>
          <tr><td>Control por preguntas</td><td class="others">Menús rígidos</td><td class="others">Sí, a escala enterprise</td><td class="ours">Sí, con guion por segmento</td></tr>
          <tr><td>Voz y carpetas del negocio</td><td class="others">Plantillas</td><td class="others">Configurable con tu contenido</td><td class="ours">Entrenado con tus documentos y tu forma de escribir</td></tr>
          <tr><td>Cero invención + escalado</td><td class="others">Rara vez</td><td class="others">Sí (Fin y Sierra lo tienen desde 2023–2024)</td><td class="ours">Sí, con aviso previo y espera de instrucción</td></tr>
          <tr><td>Verificación de Yape / PLIN</td><td class="others">No</td><td class="others">No nativo para Perú</td><td class="ours">Sí: OCR local + reglas + IA</td></tr>
          <tr><td>Datos fuera del país</td><td class="others">Variable</td><td class="others">Nube global</td><td class="ours">OCR local; tu captura no sale de tu PC</td></tr>
          <tr><td>Reportes transaccionales por WhatsApp</td><td class="others">No</td><td class="others">Dashboards web</td><td class="ours">Imagen con gráficos al WhatsApp del dueño</td></tr>
          <tr><td>Precio</td><td class="others">Bajo, genérico</td><td class="others">En dólares, enterprise</td><td class="ours">S/ 299–750 al mes, en soles</td></tr>
          <tr><td>Lo que ellos hacen mejor</td><td class="others">—</td><td class="others">Escala global, SLA, integraciones nativas, 45 idiomas</td><td class="ours">Reconocemos el límite: no competimos en escala global</td></tr>
        </tbody>
      </table>
    </div>
    <div class="callout warn" style="margin-top:1.4rem">
      <b>Declaración honesta:</b> Intercom Fin (2023, Fin 2 en 2024), Sierra (2024) y Salesforce Agentforce (2024) ya hacen agentes que no inventan y escalan a humano. Nuestra diferencia no es “nadie lo hace”: es hacerlo <b>local, en español, con Yape/PLIN, entrenado con tu material y a precio de Huánuco</b>.
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">Cómo se entrena cada sistema</h2>
    <div class="plan-grid">
      <article class="plan"><span class="tier">Sistema 1</span><h3>Sistema de Respuestas Automaticas</h3><p class="sub">Árbol de respuestas</p>
        <ul><li>Levantamiento de rutas y preguntas reales</li><li>Redacción de respuestas en tu tono</li><li>Prueba con 20 conversaciones típicas</li><li>Ajuste mensual de rutas</li></ul>
        <a class="btn btn-ghost" href="planes.html#plan-automaticas">Ver sistema</a></article>
      <article class="plan featured"><span class="plan-flag">Recomendado</span><span class="tier">Sistema 2</span><h3>Sistema de Infinitas con Cerebro</h3><p class="sub">Respuestas infinitas + guion de venta</p>
        <ul><li>Todo lo del Sistema 1</li><li>Entrenamiento con tu catálogo y políticas</li><li>Cerebro: piensa, lee contexto, secuencia y dirige la venta</li><li>Prueba con casos y ajuste continuo</li></ul>
        <a class="btn btn-primary" href="planes.html#plan-infinitas">Ver sistema</a></article>
      <article class="plan"><span class="tier">Plus</span><h3>Cerebro y voz clonada</h3><p class="sub">Registro de comprobantes + autoría</p>
        <ul><li>Cerebro (registro comprobantes y autoría ingresos/egresos): S/ 1699</li><li>Voz clonada: S/ 2499</li><li>Integración con el sistema elegido</li></ul>
        <a class="btn btn-ghost" href="planes.html">Ver sistemas</a></article>
    </div>
  </div>
</section>

${band('Pide una demostración del guion, no del chatbot', 'Te mostramos cómo el bot pregunta, puentea y escala. Y cómo dice “no lo sé” cuando corresponde.', 'Ver una demo real', 'Hola Pistón Quarks, quiero ver una demo del entrenamiento de Pistón Auto.')}
</main>
${footer()}`;

/* ------------------------------------------------------------------ */
/*  PÁGINA: PAGOS                                                      */
/* ------------------------------------------------------------------ */
const pagePagos = () => `${head({
  title: 'Cómo comprar Pistón Auto — pago por Yape, PLIN o transferencia',
  desc: 'Proceso de compra: elige plan, paga el monto exacto por Yape/PLIN/transferencia, envía la captura al WhatsApp, el bot la verifica y recibes tu clave de activación.',
  active: 'pagos.html'
})}
${pageHero({
  crumb: [['index.html', 'Inicio'], ['Pagos']],
  title: 'Cómo se compra, paso a paso.',
  lead: 'Sin pasarelas raras ni formularios eternos: pagas por Yape, PLIN o transferencia, mandas la captura al WhatsApp y el mismo sistema que vas a comprar verifica tu pago.',
  chips: ['Monto exacto', 'Captura al WhatsApp', 'Clave de activación', 'Garantía 7 días']
})}

<section class="section">
  <div class="container">
    <h2 class="section-title">El proceso completo</h2>
    <div class="flow">
      <div class="flow-step"><div class="num">1</div><div><h3>Elige tu sistema</h3><p>Sistema de Respuestas Automaticas S/ 299, Sistema de Infinitas con Cerebro S/ 750 o Plus (cerebro S/ 1699 / voz S/ 2499). Si eres de los primeros 10, aplica founders: 149 / 375.</p></div></div>
      <div class="flow-step"><div class="num">2</div><div><h3>Pide el monto exacto</h3><p>El asesor te confirma el total con un código de dos céntimos único (por ejemplo S/ 299.37). Ese código identifica tu pago y evita duplicados.</p></div></div>
      <div class="flow-step"><div class="num">3</div><div><h3>Paga por Yape, PLIN o transferencia</h3><p>Al número de Pistón Quarks que te confirme el asesor. No pagues a un número que aparezca en otro chat: verifica siempre por el canal oficial.</p></div></div>
      <div class="flow-step"><div class="num">4</div><div><h3>Envía la captura al WhatsApp</h3><p>Escribe <code>PAGO + tu plan</code> (ejemplo: <code>PAGO PRO</code>) y adjunta la captura. El bot la lee con OCR y la valida con reglas e IA.</p></div></div>
      <div class="flow-step"><div class="num">5</div><div><h3>Recibe tu clave de activación</h3><p>Si el pago cuadra (monto, destinatario, fecha y score), se emite una clave de un solo uso ligada a tu número. Si algo no cuadra, queda en revisión humana y te avisan.</p></div></div>
      <div class="flow-step"><div class="num">6</div><div><h3>Instala y activa</h3><p>Descargas el instalador, pegas la clave y el sistema queda vinculado a tu equipo. La instalación asistida toma entre 1 y 2 horas.</p></div></div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <h2 class="section-title">Métodos de pago</h2>
    <div class="pay-grid">
      <div class="pay-box">
        <h3>Datos que te confirma el asesor</h3>
        <div class="pay-method"><span class="tag">Yape</span><p>Al número de Pistón Quarks que te indique el asesor en el chat oficial. Titular: Pistón Quarks EIRL.</p></div>
        <div class="pay-method"><span class="tag">PLIN</span><p>Mismo número, mismo titular. Confirma siempre el nombre antes de enviar.</p></div>
        <div class="pay-method"><span class="tag">Transferencia</span><p>Cuenta BCP o Interbank entregada por el asesor al iniciar la compra. No se publican cuentas aquí para evitar suplantaciones.</p></div>
        <div class="copy-line"><span>WhatsApp oficial: +51 930 640 071</span><button data-copy="+51930640071">Copiar</button></div>
        <p style="font-size:.78rem;color:var(--muted);margin-top:.7rem">Nunca compartas tu clave de activación ni el código de dos céntimos con terceros.</p>
      </div>
      <div>
        <div class="callout warn">
          <b>Regla del monto exacto</b>
          <p style="margin-top:.5rem">El pago debe llegar por el monto exacto, incluido el código de céntimos. Si llega redondeado, el sistema lo marca como no concluyente y pasa a revisión humana. No se pierde el dinero: se confirma a mano.</p>
        </div>
        <div class="callout ok" style="margin-top:1rem">
          <b>Qué revisa el sistema antes de darte la clave</b>
          <ul class="checklist" style="margin-top:.6rem">
            <li>Monto exacto esperado</li>
            <li>Destinatario correcto (Pistón Quarks)</li>
            <li>Fecha del día</li>
            <li>Score de consistencia ≥ 90</li>
            <li>Sin duplicado de número de operación</li>
          </ul>
        </div>
        <div class="callout danger" style="margin-top:1rem">
          <b>Si algo no cuadra</b>
          <p style="margin-top:.5rem">La venta queda en “pendiente de revisión humana”. Nunca se activa sola. Te escribe un asesor autorizado y, si corresponde, se devuelve el pago.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">Qué recibes al comprar</h2>
    <div class="grid-cards">
      <article class="mini-feature"><span class="fi">🔑</span><h3>Clave de activación</h3><p>Única, de un solo uso y ligada a tu número de WhatsApp. No se comparte ni se revende.</p></article>
      <article class="mini-feature"><span class="fi">💻</span><h3>Instalador para tu PC</h3><p>Conecta WhatsApp, OCR, hoja de cálculo y panel admin. En el Sistema de Infinitas con Cerebro, instalación incluida en el módulo de respuestas infinitas.</p></article>
      <article class="mini-feature"><span class="fi">📊</span><h3>Hoja de registro</h3><p>Google Sheets o Excel con cada comprobante: fecha, cliente, método, monto, referencia, score y veredicto.</p></article>
      <article class="mini-feature"><span class="fi">🧭</span><h3>Onboarding de 1 hora</h3><p>Configuramos tus rutas, precios y reglas contigo. Sales sabiendo operar el panel y leer los reportes.</p></article>
      <article class="mini-feature"><span class="fi">🛡️</span><h3>Garantía de 7 días</h3><p>Si no verifica correctamente tus comprobantes reales, se devuelve el monto del primer mes.</p></article>
      <article class="mini-feature"><span class="fi">🔄</span><h3>Actualizaciones</h3><p>Mejoras de OCR, reglas y reportes incluidas mientras tu sistema esté activo.</p></article>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container faq-wrap">
    <h2 class="section-title">Preguntas de compra</h2>
    ${faq([
      ['¿Puedo pagar en cuotas?', 'El servicio es mensual. En el Sistema de Infinitas con Cerebro se puede acordar pago trimestral con descuento. La instalación se paga una vez.'],
      ['¿Qué pasa si mi captura es rechazada?', 'No se activa nada automáticamente. Un asesor revisa el caso y te dice exactamente qué faltó: monto, destinatario, fecha o legibilidad.'],
      ['¿La clave sirve en otra computadora?', 'La clave se liga a tu número y a un equipo. Si cambias de PC, se reemite con autorización del administrador de llaves.'],
      ['¿Emiten comprobante de pago?', 'Sí, boleta o factura según tus datos, emitida por Pistón Quarks EIRL.'],
      ['¿Puedo comprar sin hablar con un asesor?', 'Puedes iniciar el pago con el monto publicado, pero el número y el monto exacto se confirman por el canal oficial para evitar suplantaciones.']
    ])}
  </div>
</section>

${band('Paga, manda la captura y recibe tu clave', 'Escríbenos “PAGO PRO” con tu captura. El mismo sistema que vas a comprar es el que la va a verificar.', 'Iniciar compra por WhatsApp', 'Hola Pistón Quarks, quiero comprar Pistón Auto. Plan: PAGO PRO.')}
</main>
${footer()}`;

/* ------------------------------------------------------------------ */
/*  PÁGINA: SEGMENTO                                                   */
/* ------------------------------------------------------------------ */
const pageSegmento = (s) => `${head({
  title: `Pistón Auto para ${s.name} — verificación y reportes por WhatsApp`,
  desc: `${s.heroTitle} ${s.lead}`,
  active: 'segmentos.html'
})}
${pageHero({
  crumb: [['index.html', 'Inicio'], ['segmentos.html', 'Segmentos'], [s.name]],
  title: s.heroTitle,
  lead: s.lead,
  chips: [`<b>${s.icon}</b> ${s.name}`, `Módulo: <b>${s.exclusive[0].t}</b>`, 'Mismo precio: 299 / 750'],
  ctas: `<a class="btn btn-primary btn-lg" href="${wa(`Hola Pistón Quarks, tengo un negocio de ${s.name} y quiero Pistón Auto.`)}">Quiero una demo para mi rubro</a>
         <a class="btn btn-ghost" href="planes.html">Ver planes →</a>`
})}

<section class="section">
  <div class="container">
    <h2 class="section-title">Lo que te está costando hoy</h2>
    <div class="pain-grid">
      ${s.pains.map(p => `<div class="pain"><span class="n">${p.n}</span><h3>${p.t}</h3><p>${p.d}</p><span class="cost">${p.cost}</span></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <h2 class="section-title">Lo que incluye para ${s.name.toLowerCase()}</h2>
    <p style="text-align:center;color:var(--muted);max-width:60ch;margin:-1rem auto 1.8rem">Estos módulos no se entregan en otro rubro. Es la razón por la que tu plan no es “el mismo de todos con otro precio”.</p>
    <ul class="exclusive">
      ${s.exclusive.map(e => `<li><b>${e.t}</b>${e.d}</li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">Tu sistema recomendado</h2>
    <div class="plan-grid">
      ${PLANS.map(p => planCard(p, s.planExtra[p.id] || s.planExtra[p.id === 'automaticas' ? 'basico' : 'pro'] || [])).join('\n      ')}
    </div>
    <p class="price-note">Founders 50% para los primeros 10 clientes · instalación S/ 349 en el Sistema de Respuestas Automaticas, incluida en el módulo de infinitas del Sistema de Infinitas con Cerebro.</p>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <div class="two-col" style="align-items:center">
      <div>
        <h2 style="font-size:clamp(1.4rem,2.6vw,1.9rem);margin-bottom:.7rem">El reporte que recibes en el Sistema de Infinitas con Cerebro</h2>
        <p style="color:#C9D2E4;margin-bottom:1rem">${s.report.title}: ${s.report.legend[0].toLowerCase()} y ${s.report.legend[1].toLowerCase()}, con hora, método y alertas. Llega como imagen al WhatsApp del dueño, sin entrar a ningún panel.</p>
        <ul class="checklist">
          <li>Envío diario o semanal, tú eliges la hora</li>
          <li>Comparación contra el periodo anterior</li>
          <li>Lista de comprobantes sospechosos con motivo</li>
          <li>Export a Excel/Sheets para contabilidad</li>
        </ul>
      </div>
      ${chart(s.report)}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <h2 class="section-title">Cómo se ve en tu operación</h2>
    <div class="steps">
      <div class="step"><div class="step-num">1</div><h3>Tu cliente paga y manda la captura</h3><p>Yape, PLIN o transferencia, al número de siempre. Sin apps nuevas ni pasos extra.</p></div>
      <div class="step-arrow" aria-hidden="true">→</div>
      <div class="step"><div class="step-num">2</div><h3>El bot verifica y registra</h3><p>OCR local, reglas de ${s.name.toLowerCase()} y veredicto IA. La fila cae en tu hoja.</p></div>
      <div class="step-arrow" aria-hidden="true">→</div>
      <div class="step"><div class="step-num">3</div><h3>Tú recibes el reporte</h3><p>${s.report.title} con gráficos, alertas y pendientes de revisión.</p></div>
    </div>
    <div class="callout ok" style="margin-top:2rem">
      <b>Referencia de trabajo:</b> “${s.proof.q}” — ${s.proof.who}. No publicamos testimonios sin permiso ni inventamos casos.
    </div>
  </div>
</section>

${band(`¿Hablamos de tu ${s.name.toLowerCase()}?`, 'Demo de 30 minutos con un comprobante real de tu operación. Si no cuadra, te lo decimos en la cara.', 'Solicitar demo', `Hola Pistón Quarks, tengo un negocio de ${s.name} y quiero una demo de Pistón Auto.`)}
</main>
${footer()}`;

/* ------------------------------------------------------------------ */
/*  BUILD                                                              */
/* ------------------------------------------------------------------ */
const files = {
  'index.html': pageIndex(),
  'segmentos.html': pageSegmentos(),
  'planes.html': pagePlanes(),
  'niveles.html': pageNiveles(),
  'como-entrenamos.html': pageEntrenamos(),
  'pagos.html': pagePagos()
};

for (const s of SEGMENTS) files[`para-${s.slug}.html`] = pageSegmento(s);

for (const [name, html] of Object.entries(files)) {
  writeFileSync(join(OUT, name), html, 'utf8');
  console.log('✓', name, (html.length / 1024).toFixed(1) + ' KB');
}
console.log('\nListo:', Object.keys(files).length, 'páginas generadas en', OUT);
