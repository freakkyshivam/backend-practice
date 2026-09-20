# Day 02 - File Upload Service

## 🎯 Goal

Build a backend file upload service.

Main flow:

```text
Upload
  ↓
Validate
  ↓
Save
  ↓
Retrieve
  ↓
Delete
```

## 🧱 Tech Stack

- Node.js
- Express.js
- TypeScript
- Multer
- Node.js File System (`fs`)

PostgreSQL/Drizzle is **not required** for this task.

## 📌 Features

### 1. Upload File

`POST /files`

Use:

```text
multipart/form-data
```

Field name:

```text
file
```

Requirements:
- Accept a file
- Validate file type
- Validate file size
- Generate a unique filename
- Save file to local storage
- Return file information

Example response:

```json
{
  "message": "File uploaded successfully",
  "filename": "a8f92c1d.jpg"
}
```

### 2. File Validation

Allow:

```text
.jpg
.jpeg
.png
.pdf
```

Maximum file size:

```text
2 MB
```

Reject:
- Unsupported extensions
- Files larger than 2 MB

### 3. Unique Filename

Do not directly store the original filename.

Bad:
```text
profile.jpg
```

Better:
```text
a8f92c1d.jpg
```

Generate a unique filename while preserving the original extension.

### 4. Get File

`GET /files/:filename`

Requirements:
- Check whether the file exists
- Return the file if it exists
- Return 404 if it doesn't exist

### 5. Delete File

`DELETE /files/:filename`

Requirements:
- Check if file exists
- Delete the file
- Return success response
- Return 404 if file doesn't exist

## 📁 Storage Structure

```text
uploads/
├── a8f92c1d.jpg
├── 91ac72de.png
└── 72bd91fa.pdf
```

Do not commit uploaded files to Git.

Add:

```text
uploads/
```

to `.gitignore`.

 
## 🧠 Concepts to Learn

Focus only on:
1. `multipart/form-data`
2. Multer
3. File validation
4. Node.js `fs`
5. File paths using `path`
6. HTTP file responses

 
## 🔐 Security Considerations

Understand the basic risks:
- Don't trust the original filename
- Don't allow arbitrary file types
- Limit file size
- Generate unique filenames
- Don't expose sensitive server paths

Advanced security is **not required yet**.

## 🚫 Do NOT Add

- AWS S3
- Cloudinary
- Firebase Storage
- Image compression
- Image resizing
- Virus scanning
- Authentication
- Database metadata
- Presigned URLs
- CDN
- Background processing

## 🎤 Interview Questions

1. What is `multipart/form-data`?
2. Why can't normal JSON upload a file?
3. What is Multer?
4. What is `diskStorage`?
5. Why generate a unique filename?
6. How do you validate file size?
7. How do you validate file type?
8. What is the difference between `fs` and `fs.promises`?
9. Why use `path.join()`?
10. What happens when a file doesn't exist?

 