postgres:
  container_name: postgres
  restart: always
  image: postgres:latest
  volumes:
    - ./database:/var/lib/postgresql
  ports:
    - 5432:5432
