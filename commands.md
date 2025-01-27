
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


#prisma
- npx prisma migrate dev --name nombre_de_tu_migracion // crear nueva migracion
- npx prisma migrate dev --create-only // crear migracion vacia
- npx prisma migrate deploy // deploy
- npx prisma generate // actualizar la db