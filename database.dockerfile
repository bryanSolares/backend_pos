FROM postgres:14.6-alpine

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=POS

COPY init.sql /docker-entrypoint-initdb.d

EXPOSE 5432
