#!/bin/sh

echo "Waiting for PostgreSQL to start..."

# Boucle jusqu'à ce que la base de données accepte les connexions.
# Utilise les variables d'environnement fournies par docker-compose.
while ! PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_SERVER" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "PostgreSQL is up - executing migrations"

# Applique les migrations de la base de données
alembic upgrade head

>&2 echo "Migrations applied - starting server"

# Exécute la commande principale de l'application (passée par docker-compose)
exec "$@"