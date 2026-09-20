# Day 2: File Upload Service 📁

## 🎯 Main Goal

Ek backend banana hai jisme user file upload, retrieve aur delete kar sake.

### APIs
Method	Endpoint	Purpose
- POST	/files/upload	File upload
- GET	/files/:filename	File retrieve/download
- DELETE	/files/:filename	File delete

# Requirements

## 1. Upload

- POST /files/upload

Request:

```
multipart/form-data
file: <actual file>
```

Implement:

Single file upload
uploads/ directory mein save karo
Agar uploads/ exist nahi karti, create karo
Successful upload par appropriate response return karo

Example response:

```
{
  "message": "File uploaded successfully",
  "filename": "example.pdf"
}
```
## 2. File Validation

At least:

 - File size limit
- Allowed file types


  * Images: jpg, jpeg, png
  * Documents: pdf

Invalid file par proper 4xx response.

## 3. Retrieve
- GET /files/example.pdf

Server ko file return karni hai.

File exist nahi karti: 404

## 4. Delete
- DELETE /files/example.pdf

File delete karo.

File nahi mili: 404

Success: 200