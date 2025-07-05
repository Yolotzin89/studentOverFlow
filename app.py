from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os

# Configuración de la aplicación
app = Flask(__name__)
app.config['SECRET_KEY'] = 'tuclavesecretaaqui'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///studentoverflow.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar extensiones
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Modelos de base de datos
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relaciones
    questions = db.relationship('Question', backref='author', lazy=True)
    answers = db.relationship('Answer', backref='author', lazy=True)

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Relaciones
    answers = db.relationship('Answer', backref='question', lazy=True, cascade='all, delete-orphan')

class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    votes = db.Column(db.Integer, default=0)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Rutas de la aplicación
@app.route('/')
def index():
    """Página principal - muestra preguntas recientes"""
    if current_user.is_authenticated:
        # Usuario logueado ve las preguntas más recientes
        questions = Question.query.order_by(Question.created_at.desc()).limit(10).all()
        return render_template('home.html', questions=questions)
    else:
        # Usuario no logueado ve página de bienvenida
        return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    """Registro de nuevos usuarios"""
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        # Validar que no exista el usuario
        if User.query.filter_by(username=username).first():
            flash('El nombre de usuario ya existe')
            return render_template('register.html')
        
        if User.query.filter_by(email=email).first():
            flash('El email ya está registrado')
            return render_template('register.html')
        
        # Crear nuevo usuario
        user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password)
        )
        
        db.session.add(user)
        db.session.commit()
        
        flash('Registro exitoso! Ahora puedes iniciar sesión')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Inicio de sesión"""
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        user = User.query.filter_by(username=username).first()
        
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect(url_for('index'))
        else:
            flash('Usuario o contraseña incorrectos')
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    """Cerrar sesión"""
    logout_user()
    return redirect(url_for('index'))

@app.route('/ask', methods=['GET', 'POST'])
@login_required
def ask_question():
    """Hacer una nueva pregunta"""
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        subject = request.form['subject']
        
        question = Question(
            title=title,
            content=content,
            subject=subject,
            user_id=current_user.id
        )
        
        db.session.add(question)
        db.session.commit()
        
        flash('Pregunta publicada exitosamente!')
        return redirect(url_for('view_question', id=question.id))
    
    return render_template('ask.html')

@app.route('/question/<int:id>')
def view_question(id):
    """Ver una pregunta específica con sus respuestas"""
    question = Question.query.get_or_404(id)
    answers = Answer.query.filter_by(question_id=id).order_by(Answer.votes.desc()).all()
    return render_template('question.html', question=question, answers=answers)

@app.route('/answer/<int:question_id>', methods=['POST'])
@login_required
def answer_question(question_id):
    """Responder a una pregunta"""
    content = request.form['content']
    
    answer = Answer(
        content=content,
        user_id=current_user.id,
        question_id=question_id
    )
    
    db.session.add(answer)
    db.session.commit()
    
    flash('Respuesta publicada!')
    return redirect(url_for('view_question', id=question_id))

@app.route('/vote/<int:answer_id>/<action>')
@login_required
def vote_answer(answer_id, action):
    """Votar por una respuesta"""
    answer = Answer.query.get_or_404(answer_id)
    
    if action == 'up':
        answer.votes += 1
    elif action == 'down':
        answer.votes -= 1
    
    db.session.commit()
    return jsonify({'votes': answer.votes})

# Crear las tablas de la base de datos
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)