docker pull mongo
mkdir -p mongodata
docker run -it -v mongodata:/data/db -p 27017:27017 --name mongodb -d mongo
docker exec -it mongodb bash
mongo
# create DB
# create User


TODO:
- print json in response, not just console
- store json with characters

