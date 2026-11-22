# Pistón Auto — sitio web (13 páginas)

Sitio estático de **Pistón Auto**, el sistema de conversación transaccional por WhatsApp de Piston Quarks EIRL.
Sin dependencias, sin build de framework: HTML + CSS + JS, listo para subir a cualquier hosting.

## Mapa de páginas

| Archivo | Qué resuelve |
|---|---|
| `index.html` | Portada: los dos sistemas, el flujo de decisión y acceso a segmentos. |
| `segmentos.html` | Árbol de segmentos + cuestionario de 3 preguntas que recomienda sistema. |
| `planes.html` | Precios (Sistema de Respuestas Automaticas S/299, Sistema de Infinitas con Cerebro S/750, cerebro S/1699, voz S/2499), matriz de capacidades y alcance por segmento. |
| `niveles.html` | Detalle de cada sistema y “qué analiza el bot antes de responder”. |
| `como-entrenamos.html` | Metodología (núcleo blando, “¿y qué?”, cero invención) y comparación honesta. |
| `pagos.html` | Proceso de compra, monto exacto, captura, clave de activación, garantía. |
| `para-restaurantes.html` | Gastronomía: cierre de caja por turno. |
| `para-hoteles.html` | Alojamiento: adelanto ligado a habitación y check-in express. |
| `para-clinicas.html` | Salud y estética: adelanto por tratamiento y saldo. |
| `para-comercio.html` | Retail, joyerías y galerías: separación y despacho verificado. |
| `para-inmobiliarias.html` | Inmobiliarias: doble verificación y cronograma de cuotas. |
| `para-vendedores.html` | Marcas personales: catálogo, pago en chat y reporte por campaña. |
| `para-empresas.html` | Gerencia: multi-sede, auditoría y export contable. |

## Reglas del producto que el sitio respeta

- **Precios fijos por sistema**, iguales en todos los rubros: Sistema de Respuestas Automaticas S/ 299, Sistema de Infinitas con Cerebro S/ 750 (cerebro S/ 1699, voz clonada S/ 2499).
- **Founders** (primeros 10): 50% durante 6 meses (149 / 375 según sistema).
- **Instalación** S/ 349 en el Sistema de Respuestas Automaticas; en el Sistema de Infinitas con Cerebro se incluye el módulo de respuestas infinitas.
- Lo que cambia por segmento es el **alcance incluido** (módulo exclusivo), no la tarifa.
- Nada de testimonios inventados: las referencias están marcadas como “referencia de trabajo”.
- Los gráficos de reporte están rotulados como **ejemplo ilustrativo**.

## Editar y reconstruir

Todo el copy y los precios viven en `tools/build-site.mjs` (fuente única). **No edites los HTML generados**: se sobrescriben.

```bash
node tools/build-site.mjs
```

Para agregar un segmento: añade un objeto al array `SEGMENTS` (slug, icon, name, short, heroTitle, lead, pains, exclusive, planExtra, report, proof) y vuelve a ejecutar el script. Genera `para-<slug>.html`, lo enlaza en el árbol, en la portada, en el footer y en la tabla de `planes.html`.

## Archivos

```
index.html … para-empresas.html   ← generados
styles.css                        ← base original (tokens, hero, cards, FAQ)
site.css                          ← capa nueva (árbol, planes, matriz, quiz, pagos)
app.js                            ← nav, FAQ, formulario, quiz, copiar datos
assets/logo.svg
tools/build-site.mjs              ← generador
_backup/                          ← versión original de index/styles/app
```

## Publicar

Es estático: se puede subir tal cual a Cloudflare Pages, Netlify, Vercel o cualquier hosting con HTTPS.

- Cloudflare Pages: `wrangler pages deploy . --project-name piston-auto`
- Netlify: arrastrar la carpeta al panel, o `netlify deploy --prod --dir .`
- Verificar después: abrir `index.html`, probar el menú móvil, el quiz de `segmentos.html` y los enlaces de WhatsApp.

## Datos de contacto usados

- WhatsApp: **+51 930 640 071** (`wa.me/51930640071`)
- Correo: `rony@pistonquarks.store`
- Web: `https://pistonquarks.store`

> Las cuentas bancarias no se publican en el sitio: las confirma el asesor por el canal oficial para evitar suplantaciones.
