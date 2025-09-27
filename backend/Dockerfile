# Fichier: kairn/backend/Dockerfile (Version Finale)

# --- Étape 1: Le "Builder" ---
FROM python:3.11-slim as builder
RUN pip install poetry==2.2.1
RUN poetry self add poetry-plugin-export
WORKDIR /app
COPY poetry.lock pyproject.toml /app/
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

# --- Étape 2: L'Image Finale ---
FROM python:3.11-slim

# Installe le client postgresql nécessaire pour notre script d'attente
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app

COPY --from=builder /app/requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt
COPY ./app /app/app

# Copie UNIQUEMENT le script de démarrage et le rend exécutable
COPY ./prestart.sh /app/prestart.sh
RUN chmod +x /app/prestart.sh

# La commande par défaut reste uvicorn. C'est docker-compose qui choisira quoi lancer.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]