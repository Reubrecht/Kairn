# Fichier: kairn/backend/Dockerfile

# --- Étape 1: Le "Builder" ---
# Installe poetry, le plugin, et génère le requirements.txt
FROM python:3.11-slim as builder

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Installe une version stable de Poetry ET le plugin export
RUN pip install poetry==2.2.1
RUN poetry self add poetry-plugin-export

WORKDIR /app
COPY poetry.lock pyproject.toml /app/

# Exporte les dépendances de production
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes


# --- Étape 2: L'Image Finale ---
# Construit l'image de production légère
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Copie le fichier requirements.txt généré à l'étape précédente
COPY --from=builder /app/requirements.txt .

# Installe les dépendances avec pip
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copie le code de notre application
COPY ./app /app/app

# Définit la commande pour lancer le serveur
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]