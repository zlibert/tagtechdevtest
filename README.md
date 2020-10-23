Simple express test to asses backend skills.
The goal is to download characters of Game of Thrones API, then store them into the DB, list and detail them


To run a local mongo database with docker:

```
docker pull mongo
mkdir -p mongodata
docker run -it -v mongodata:/data/db -p 27017:27017 --name mongodb -d mongo
docker exec -it mongodb bash
mongo
```

Then

- create DB
# create User


TODO:
- Set connection variables to DB in app.js to environment variables

