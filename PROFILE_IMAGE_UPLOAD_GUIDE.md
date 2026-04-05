# Profile Image Upload Feature - Implementation Guide

## Overview
This feature allows admins and librarians to upload and manage their own profile images in the sidebar. Each user can only upload and see their own profile image, ensuring privacy and personalization.

## Features
✅ **User-Specific Images** - Each admin/librarian has their own profile image  
✅ **Image Validation** - Only JPEG, PNG, GIF, WebP formats allowed (max 5MB)  
✅ **Visual Feedback** - Camera icon shows on hover, loading spinner during upload  
✅ **Secure Upload** - Requires authentication, uses JWT tokens  
✅ **Automatic Storage** - Images stored with unique filenames (`userId-timestamp.ext`)  

---

## Backend Implementation

### 1. Database Changes
**File:** `backend/database/schema_update_profile_images.sql`

Adds `profile_image_url` column to `users` table:
```sql
ALTER TABLE users ADD COLUMN profile_image_url VARCHAR(500) DEFAULT NULL AFTER address;
```

### 2. Model Updates
**File:** `backend/src/models/UserModel.js`

Added method:
```javascript
static async updateProfileImage(userId, imageUrl) {
  // Updates user's profile_image_url and returns updated user
}
```

### 3. Service Layer
**File:** `backend/src/services/UserService.js`

Added method:
```javascript
static async uploadProfileImage(userId, imageUrl) {
  // Validates user exists and updates their profile image
}
```

### 4. Controller
**File:** `backend/src/controllers/UserController.js`

Added endpoint handler:
```javascript
static async uploadProfileImage(req, res, next) {
  // Handles multipart file upload
  // Generates unique filename with user ID and timestamp
  // Updates database with image URL
}
```

### 5. Routes & Multer Configuration
**File:** `backend/src/routes/userRoutes.js`

New route:
```
POST /api/users/profile/image
```

Multer configuration:
- **Destination:** `/uploads/profile-images/`
- **Filename Format:** `{userId}-{timestamp}.{ext}`
- **File Size Limit:** 5MB
- **Allowed Types:** JPEG, PNG, GIF, WebP
- **Authentication:** Required (JWT token)

**Request:**
```http
POST /api/users/profile/image
Authorization: Bearer {JWT_TOKEN}
Content-Type: multipart/form-data

Body:
  profileImage: <binary data>
```

**Response:**
```json
{
  "success": true,
  "message": "Profile image uploaded successfully",
  "data": {
    "user": {
      "user_id": 1,
      "username": "admin",
      "profile_image_url": "/uploads/profile-images/1-1712368800000.jpg"
    },
    "imageUrl": "/uploads/profile-images/1-1712368800000.jpg"
  }
}
```

---

## Frontend Implementation

### 1. Component Updates
**File:** `frontend/src/pages/Sidebar.jsx`

#### New State:
```javascript
const [isUploading, setIsUploading] = useState(false);
const [profileImageUrl, setProfileImageUrl] = useState(user?.profile_image_url);
const fileInputRef = useRef(null);
```

#### New Functions:

**`handleAvatarClick()`**
- Triggered when user clicks avatar
- Opens file selection dialog

**`handleFileChange(event)`**
- Validates file type (must be image)
- Validates file size (max 5MB)
- Sends PUT request to backend
- Updates profile image URL on success

#### UI Enhancements:
- Avatar is now clickable (cursor pointer)
- Hover shows camera icon
- Camera icon displays loading spinner during upload
- Upload hint text: "Click avatar to change"
- Hidden file input with image MIME type filters

### 2. File Input Element
```jsx
<input
  ref={fileInputRef}
  type="file"
  accept="image/jpeg,image/png,image/gif,image/webp"
  onChange={handleFileChange}
  disabled={isUploading}
  className="hidden"
/>
```

---

## API Endpoint Details

### Upload Profile Image

**Endpoint:** `POST /api/users/profile/image`

**Authentication:** Required (JWT Bearer Token)

**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: multipart/form-data
```

**Request Body:**
```
FormData:
  - profileImage: File (JPEG/PNG/GIF/WebP, max 5MB)
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Profile image uploaded successfully",
  "data": {
    "user": {
      "user_id": 1,
      "username": "admin",
      "email": "admin@library.local",
      "profile_image_url": "/uploads/profile-images/1-1712368800000.jpg"
    },
    "imageUrl": "/uploads/profile-images/1-1712368800000.jpg"
  }
}
```

**Error Responses:**

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Authentication required"
}
```

**400 Bad Request (Invalid File):**
```json
{
  "success": false,
  "message": "Only image files are allowed (JPEG, PNG, GIF, WebP)"
}
```

**413 Payload Too Large:**
```json
{
  "success": false,
  "message": "File size must be less than 5MB"
}
```

---

## Security Considerations

✅ **Authentication Required** - Only authenticated users can upload  
✅ **User Isolation** - Each user can only upload their own image (enforced via `req.user.userId`)  
✅ **File Type Validation** - MIME type checking on backend  
✅ **File Size Limits** - 5MB maximum file size  
✅ **Unique Filenames** - Prevents file overwrites (userId + timestamp)  
✅ **Token-Based** - JWT tokens must be included in request  

---

## Usage Flow

1. **User Opens Sidebar**
   - User profile section displays with avatar
   - Avatar shows uploaded image if exists, otherwise shows initials
   - Hover shows camera icon

2. **User Clicks Avatar**
   - File browser dialog opens
   - User can select image from device
   - Only image files accepted

3. **File Validation**
   - Frontend validates: type, size
   - Backend validates: type, size again

4. **Upload Process**
   - Loading spinner appears on camera icon
   - File sent to `/api/users/profile/image`
   - Backend stores file and returns URL

5. **Image Display Update**
   - Success message shown
   - Profile image immediately updates in sidebar
   - New image shows for current session

---

## File Locations

```
backend/
  ├── database/
  │   └── schema_update_profile_images.sql
  ├── src/
  │   ├── models/UserModel.js (updated)
  │   ├── services/UserService.js (updated)
  │   ├── controllers/UserController.js (updated)
  │   └── routes/userRoutes.js (updated)
  └── uploads/
      └── profile-images/  (new directory)

frontend/
  └── src/pages/Sidebar.jsx (updated)
```

---

## Database Setup

Run the migration script to add the profile image column:

```bash
mysql -u {username} -p {database_name} < backend/database/schema_update_profile_images.sql
```

Or execute the SQL directly:

```sql
ALTER TABLE users ADD COLUMN profile_image_url VARCHAR(500) DEFAULT NULL AFTER address;
```

---

## Testing

### Manual Testing

1. **Login as Admin/Librarian**
   - Open sidebar
   - Verify avatar displays

2. **Upload Valid Image**
   - Click avatar
   - Select JPEG/PNG/GIF/WebP image (< 5MB)
   - Verify success message
   - Verify image updates immediately

3. **Upload Invalid File**
   - Click avatar
   - Try non-image file → Error: "Only image files are allowed"
   - Try oversized image → Error: "File size must be less than 5MB"

4. **User Isolation**
   - Login as Admin (uploads image)
   - Logout
   - Login as different Admin → Image should not appear
   - Images are purely per-user

---

## Future Enhancements

- Image cropping/resizing before upload
- Drag-and-drop upload support
- Image preview before upload
- Delete/reset profile image option
- Resync image when switching accounts
