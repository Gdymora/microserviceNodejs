POST http://localhost:3000/users
HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lIiwiaWF0IjoxNTUxNDc0MDcwfQ.TJF3NcMB7fpucn8rCv3Vvb6Ml8A_qd-xAXbbj3CEC0M
content-type: application/json

{
"username": "Apple",
"email": req.body.email
}

curl --location --request POST 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
"name": "Apple",
"email": "jonDou@mail.com"
}'
