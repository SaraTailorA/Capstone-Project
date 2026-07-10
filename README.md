# SolarCalc - Energía Solar Inteligente

Plataforma web SPA que ayuda a personas y empresas a estimar un sistema de energía solar fotovoltaico para su vivienda, negocio o finca.

## Stack Tecnológico

- **Frontend:** JavaScript Vanilla, Vite, Tailwind CSS
- **Backend:** Node.js, Express (próximo)
- **Base de datos:** PostgreSQL (próximo)
- **Diseño:** Dark theme inspirado en Tesla Energy

## Características

- Cálculo de sistema solar fotovoltaico en 4 pasos
- Dos métodos de cálculo: consumo manual o por electrodomésticos
- Estimación de paneles, inversor, breakers, cableado y protecciones
- Análisis financiero: costo, ahorro mensual, ROI, reducción de CO₂
- Registro e inicio de sesión para guardar cotizaciones
- Dashboard con historial de proyectos
- Generación de cotización descargable en PDF
- Marketplace de productos solares
- Directorio de instaladores certificados
- Diseño 100% responsive y accesible

## Instalación

```bash
# Instalar dependencias
cd client
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Preview
npm run preview
```

## Estructura del Proyecto

```
solarcalc/
├── client/                  # Frontend SPA
│   ├── src/
│   │   ├── core/           # Router, auth, event bus, storage
│   │   ├── domain/         # Entidades y cálculos fotovoltaicos
│   │   ├── components/     # Componentes UI reutilizables
│   │   ├── layouts/        # Layouts (main, auth, dashboard)
│   │   ├── pages/          # Páginas de la aplicación
│   │   └── utils/          # Utilidades y constantes
│   └── public/             # Assets estáticos
├── server/                 # Backend API (próximo)
└── docs/                   # Documentación
```

## Historias de Usuario

- HU-01: Registro de usuario
- HU-02: Inicio de sesión
- HU-03: Cierre de sesión
- HU-04: Editar perfil
- HU-05: Ingreso consumo kWh
- HU-06: Estimación por electrodomésticos
- HU-07: Resultados cálculo solar
- HU-08: Descargar PDF
- HU-09: Guardar proyecto
- HU-10: Dashboard
- HU-11: Detalle de proyecto
- HU-12: Eliminar proyecto
- HU-13: Marketplace productos
- HU-14: Detalle producto
- HU-15: Buscar instaladores
- HU-16: Perfil instalador

## License

MIT
