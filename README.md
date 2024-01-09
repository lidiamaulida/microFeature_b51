# How to Use Pemilu Backend with Postman

## How To Use Authorization

1. Open Postman.
2. Click on the 'Authorization' tab.
3. Choose 'Bearer Token' on the left.
4. Insert the Token on the right.

## A. User
1. Register User
- **Url**: http://localhost:1000/api/v1/auth/register
- **Method:** POST
- **JSON Body Example:**
  ```json
  {
    "fullname": "Aurora",
    "address": "Surabaya",
    "gender": "Female",
    "username": "roralia",
    "password": "root"
  }
  ```

2. Login 
- **Url**: http://localhost:1000/api/v1/auth/login
- **Method:** POST
- **JSON Body Example:**
  ```json
  {
    "username": "roralia",
    "password": "root"
  }
  ```
Note: you will received token which is used to authorization

## B. Article 
1. Getting All Articles (No Authorization)
- **Url**: http://localhost:1000/api/v1/articles
- **Method:** GET
2. Getting a blog (no authorization)
- **Url**: http://localhost:1000/api/v1/article/{article-id}
- **Method:** GET
3. Create a article (required authorizaton)
- **Url**: http://localhost:1000/api/v1/article/add
- **Method:** POST
- **Form-data Body Example:**
  ```
  title       = Paslon ** melakukan kampanye ke desa-desa di jakarta
  author      = Aurora
  description = Kampanye di lakukan pada hari sabtu sampai minggu
  date        = 2023-01-29
  image       = paslon.png
  ```
4. Update an Article (Authorization Required)
- **Url**: http://localhost:1000/api/v1/article/{article-id}
- **Method:** PATCH
- **Form-data Body Example:**
  ```
  title       = Paslon ** melakukan kampanye ke desa-desa di jakarta
  author      = Aurora
  description = Kampanye di lakukan pada hari sabtu sampai minggu
  date        = 2023-01-29
  image       = paslon.png
  ```
5. Delete an Article (Authorization Required)
- **Url**: http://localhost:1000/api/v1/article/{article-id}
- **Method:** DELETE

## C. Voter
1. Getting All Votes (Authorization Required)
- **Url**: http://localhost:1000/api/v1/voters
- **Method:** GET
2. Voting (Authorization Required)
- **Url**: http://localhost:1000/api/v1/voter
- **Method:** POST
- **JSON Body Example:**
  ```
  {
    "noPaslon": 2
  }
  ```
## D. Paslon
1. Getting All Paslons (No Authorization)
- **Url**: http://localhost:1000/api/v1/paslons
- **Method:** GET
2. Getting a Specific Paslon (No Authorization)
- **Url**: http://localhost:1000/api/v1/paslon/{paslon-id}
- **Method:** GET
3. Create a Paslon (Authorization Required)
- **Url**: http://localhost:1000/api/v1/paslon
- **Method:** POST
- **Form-data Body Example:**
  ```
  name             = Loki
  no               = 2
  visionAndMission = Meningkatkan Kesejahteraan
  image            = mcu.png
  ```
4. Update a Paslon (Authorization Required)
- **Url**: http://localhost:1000/api/v1/paslon/{paslon-id}
- **Method:** PATCH
- **Form-data Body Example:**
  ```
  name             = Loki
  no               = 2
  visionAndMission = Meningkatkan Kesejahteraan
  image            = mcu.png
  ```
5. Delete a Paslon (Authorization Required)
- **Url**: http://localhost:1000/api/v1/paslon/{paslon-id}
- **Method:** DELETE

## E. Partai
1. Getting All Partais (No Authorization)
- **Url**: http://localhost:1000/api/v1/partai
- **Method:** GET
2. Getting a Specific Partai (No Authorization)
- **Url**: http://localhost:1000/api/v1/partai/{partai-id}
- **Method:** GET
3. Create a Partai (Authorization Required)
- **Url**: http://localhost:1000/api/v1/partai
- **Method:** POST
- **Form-data Body Example:**
  ```
  name             = Partai Black Swan
  chairman         = Jerico
  visionAndMission = Mengwmbangkan ekonomi 
  address          = Jakarta
  image            = blk.jpg
  paslonId         = 2 (paslonId)
  ```
4. Update a Partai (Authorization Required)
- **Url**: http://localhost:1000/api/v1/partai/{partai-id}
- **Method:** PATCH
- **Form-data Body Example:**
  ```
  name             = Partai Black Swan
  chairman         = Jerico
  visionAndMission = Mengwmbangkan ekonomi 
  address          = Jakarta
  image            = blk.jpg
  paslonId         = 2 (paslonId)
  ```
5. Delete a Partai (Authorization Required)
- **Url**: http://localhost:1000/api/v1/partai/{partai-id}
- **Method:** DELETE
