# StudentOverflow

Portal web que permite a los usuarios hacer preguntas académicas para que otros usuarios de la plataforma puedan ayudarlos. Inspirado en StackOverflow pero enfocado en materias estudiantiles.

## Características

- Sistema de preguntas y respuestas
- Autenticación de usuarios
- Calificación de respuestas
- Comentarios en preguntas y respuestas
- Búsqueda de preguntas por materia

## Tecnologías utilizadas

- **Backend**: Python con Flask
- **Base de datos**: SQLite (SQLAlchemy)
- **Frontend**: HTML, CSS, JavaScript
- **Autenticación**: Flask-Login
- **Formularios**: Flask-WTF

## Instalación

### Requisitos previos
- Python 3.8 o superior
- Git

### Pasos para ejecutar el proyecto

1. **Clonar el repositorio**
```bash
git clone https://github.com/Yolotzin89/studentOverflow.git
cd StudentOverflow
```

2. **Crear entorno virtual**
```bash
python -m venv venv
```

3. **Activar entorno virtual**
```bash
# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

4. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

5. **Ejecutar la aplicación**
```bash
python app.py
```

6. **Abrir en navegador**
```
http://localhost:5000
```

## Estructura del proyecto

```
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
```

## Uso

1. **Registrarse**: Crear una cuenta nueva
2. **Iniciar sesión**: Acceder con credenciales
3. **Hacer preguntas**: Crear nuevas preguntas académicas
4. **Responder**: Ayudar a otros usuarios con respuestas
5. **Calificar**: Votar por las mejores respuestas

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature 
3. Commit tus cambios 
4. Push a la rama 
5. Abre un Pull Request

## Autor

Yolotzin J. V. R.

## Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.
