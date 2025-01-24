
Docker

#build docker
docker build -t nombre .

#run docker
docker run -p 3000:3000 nombre

Docker Compose

#build docker
docker-compose build
o
docker-compose up --build

#run docker
docker-compose up

#abrir terminal en docker
docker-compose exec -it nextjs-app sh
