FROM postgres:alpine
RUN apk add --update npm

WORKDIR /app
COPY /models/ ./models/
COPY /config/ ./config/
COPY alterbd.js .
COPY package.json .
RUN npm i
RUN npm i -g yarn

#create db
USER postgres
RUN chmod 0700 /var/lib/postgresql/data &&\
    initdb /var/lib/postgresql/data &&\
    echo "host all  all    0.0.0.0/0  md5" >> /var/lib/postgresql/data/pg_hba.conf &&\
    echo "listen_addresses='*'" >> /var/lib/postgresql/data/postgresql.conf &&\
    pg_ctl start &&\
    psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'main'" | grep -q 1 || psql -U postgres -c "CREATE DATABASE dokbetav0" &&\
    psql -c "ALTER USER postgres WITH ENCRYPTED PASSWORD 'Khmlxk12';"

RUN node alterbd.js
EXPOSE 5432

