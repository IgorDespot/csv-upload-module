To create database

-Type in command prompt:
mongo
>use csvApp;
>db.users.createIndex({username:1},{unique:true});
>var document = { "name" : "Zamudio", "fiware_service" : "waste4think", "fiware_servicepath" : "/deusto/w4t/zamudio/real", "username" : "zamudio",  "password" : "$2a$10$1la3sKIFtz43a93deUjGCu3TOZMUXE0WITxzNOiFYGll99SWuo9N.", };db.users.insert(document);

-dump database:
mongodump --host localhost --port 27017 --out path_where_to_dump --db csvApp

-restore database:
mongorestore --port 27017 path_where_is_dump

-Username: zamudio, password: 123

