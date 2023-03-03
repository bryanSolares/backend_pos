FROM postgres:14.6-alpine as backend

ENV POSTGRES_USER={admin}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

COPY init.sql /docker-entrypoint-initdb.d

EXPOSE 5432
