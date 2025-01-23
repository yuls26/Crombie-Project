
Docker

#build docker
docker build -t tengo-suenio .

#run docker
docker run -p 3000:3000 tengo-suenio

Docker Compose

#build docker
docker-compose build
o
docker-compose up --build

#run docker
docker-compose up
