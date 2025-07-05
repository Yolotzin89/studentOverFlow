studentOverflow
Portal web que permite a los usuarios hacer preguntas académicas para que otros usuarios de la plataforma puedan ayudarlos. Inspirado en StackOverflow pero enfocado en materias estudiantiles.
Características

Sistema de preguntas y respuestas
Autenticación de usuarios
Calificación de respuestas
Comentarios en preguntas y respuestas
Búsqueda de preguntas por materia

Tecnologías utilizadas

Backend: Python con Flask
Base de datos: SQLite (SQLAlchemy)
Frontend: HTML, CSS, JavaScript
Autenticación: Flask-Login
Formularios: Flask-WTF

Instalación
Requisitos previos

Python 3.8 o superior
Git

Pasos para ejecutar el proyecto

Clonar el repositorio

bashgit clone https://github.com/Yolotzin89/studentOverflow.git
cd StudentOverflow

Crear entorno virtual

bashpython -m venv venv

Activar entorno virtual

bash# Windows
venv\Scripts\activate

Instalar dependencias

bashpip install -r requirements.txt

Ejecutar la aplicación

bashpython app.py

Abrir en navegador

http://localhost:5000
Estructura del proyecto
StudentOverflow/
├── app.py                 # Archivo principal de la aplicación
├── requirements.txt       # Dependencias del proyecto
├── README.md             # Este archivo
├── static/               # Archivos estáticos (CSS, JS)
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── templates/            # Plantillas HTML
│   ├── base.html
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── home.html
└── documentation/        # Documentación del proyecto
    └── db/              # Documentación de base de datos
Uso

Registrarse: Crear una cuenta nueva
Iniciar sesión: Acceder con credenciales
Hacer preguntas: Crear nuevas preguntas académicas
Responder: Ayudar a otros usuarios con respuestas
Calificar: Votar por las mejores respuestas

Contribuir

Fork el proyecto
Crea una rama para tu feature (git checkout -b feature/AmazingFeature)
Commit tus cambios (git commit -m 'Add some AmazingFeature')
Push a la rama (git push origin feature/AmazingFeature)
Abre un Pull Request

Autor
Yolotzin J. V. R.
Licencia
Este proyecto está bajo la Licencia MIT - mira el archivo LICENSE para más detalles.