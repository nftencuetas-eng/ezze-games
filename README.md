# 🎮 ezze.games - Plataforma Web de Videojuegos

Plataforma de juegos web moderna, rápida y adaptable inspirada en los portales más reconocidos (Poki, CrazyGames). Incluye catálogo con categorías, buscador en vivo, reproductor con modo teatro y pantalla completa, y juegos jugables listos para la web.

## 🚀 Despliegue en Railway

Este proyecto está 100% optimizado para desplegarse en **Railway** con cero configuración:

1. Conecta este repositorio en [Railway.app](https://railway.app).
2. Railway detectará automáticamente el archivo `railway.json` / `Dockerfile` y compilará la aplicación.
3. Añade tu dominio personalizado `ezze.games` en la sección **Settings > Networking > Custom Domain**.

## 🛠️ Ejecución Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🗄️ Base de Datos

El backend detecta automáticamente la variable `DATABASE_URL` (PostgreSQL / MySQL) para persistir las partidas jugadas, los votos (likes/dislikes) y las reseñas de los jugadores. Si no se define ninguna base de datos externa, utilizará el almacén ultrarrápido integrado en memoria.
