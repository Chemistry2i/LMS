# 🔌 COMPLETE API REFERENCE - 32 ENDPOINTS

## Quick Reference

| Module | Public | Protected | Admin | Total |
|--------|--------|-----------|-------|-------|
| **Auth** | 2 | 1 | - | 3 |
| **Books** | 3 | 3 | - | 6 |
| **Borrowing** | 0 | 4 | - | 4 |
| **Users** | 0 | 2 | 2 | 4 |
| **Categories** | 2 | 2 | 1 | 5 |
| **Reservations** | 0 | 4 | 3 | 7 |
| **Dashboard** | 0 | 0 | 8 | 8 |
| **Total** | **7** | **16** | **14** | **32** |

---

## 📚 AUTHENTICATION (3 Endpoints)

### Register
```
POST /api/auth/register
Status: PUBLIC
Body: {
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe"
}
Response: 201 { userId, username, email }
```

### Login
```
POST /api/auth/login
Status: PUBLIC
Body: {
  "email": "john@example.com",
  "password": "password123"
}
Response: 200 { token, userId }
```

### Get Current Profile
```
GET /api/auth/me
Status: PROTECTED
Headers: Authorization: Bearer TOKEN
Response: 200 { userId, username, email, role }
```

---

## 📖 BOOKS (6 Endpoints)

### Get All Books
```
GET /api/books?page=1&limit=10
Status: PUBLIC
Response: 200 PAGINATED [books...]
```

### Search Books
```
GET /api/books/search?q=javascript
Status: PUBLIC
Response: 200 { books: [...] }
```

### Get Book by ID
```
GET /api/books/:id
Status: PUBLIC
Response: 200 { book }
```

### Create Book
```
POST /api/books
Status: PROTECTED (Librarian+)
Body: {
  "title": "Clean Code",
  "author": "Robert Martin",
  "category_id": 1,
  "total_copies": 5
}
Response: 201 { bookId }
```

### Update Book
```
PUT /api/books/:id
Status: PROTECTED (Librarian+)
Body: { title, author, category_id, ... }
Response: 200 { success }
```

### Delete Book
```
DELETE /api/books/:id
Status: PROTECTED (Admin)
Response: 200 { success }
```

---

## 📤 BORROWING (4 Endpoints)

### Checkout Book
```
POST /api/borrowing/checkout
Status: PROTECTED
Body: { "bookId": 1 }
Response: 201 { borrowingId, checkoutDate, dueDate }
```

### Return Book
```
POST /api/borrowing/return
Status: PROTECTED
Body: { "borrowingId": 1 }
Response: 200 { returnDate, fineAmount, status }
```

### Get My Active Books
```
GET /api/borrowing/my-books
Status: PROTECTED
Response: 200 PAGINATED [books...]
```

### Get Borrowing History
```
GET /api/borrowing/history?page=1&limit=10
Status: PROTECTED
Response: 200 PAGINATED [history...]
```

---

## 👤 USERS (4 Endpoints)

### Get My Profile
```
GET /api/users/profile
Status: PROTECTED
Response: 200 { user profile }
```

### Update My Profile
```
PUT /api/users/profile
Status: PROTECTED
Body: { firstName, lastName, phone, address }
Response: 200 { success }
```

### Get All Users
```
GET /api/users
Status: PROTECTED (Admin)
Response: 200 PAGINATED [users...]
```

### Get User by ID
```
GET /api/users/:id
Status: PROTECTED
Response: 200 { user }
```

---

## 🗂️ CATEGORIES (5 Endpoints) - NEW!

### Get All Categories
```
GET /api/categories?page=1&limit=10
Status: PUBLIC
Response: 200 PAGINATED [categories with book_count...]
```

### Get Popular Categories
```
GET /api/categories/popular?limit=5
Status: PUBLIC
Response: 200 { categories: [sorted by times_borrowed] }
```

### Get Category by ID
```
GET /api/categories/:id
Status: PUBLIC
Response: 200 { category with stats }
```

### Create Category
```
POST /api/categories
Status: PROTECTED (Librarian+)
Body: {
  "category_name": "Science Fiction",
  "description": "Science fiction and fantasy novels"
}
Response: 201 { categoryId }
```

### Update Category
```
PUT /api/categories/:id
Status: PROTECTED (Librarian+)
Body: { category_name, description }
Response: 200 { success }
```

### Delete Category
```
DELETE /api/categories/:id
Status: PROTECTED (Admin)
Response: 200 { success }
```

---

## 📌 RESERVATIONS (7 Endpoints) - NEW!

### Create Reservation
```
POST /api/reservations
Status: PROTECTED (All users)
Body: { "bookId": 5 }
Response: 201 { reservationId }
Requirement: Book must be OUT OF STOCK
```

### Get My Reservations
```
GET /api/reservations/my?page=1&limit=10
Status: PROTECTED
Response: 200 PAGINATED [my reservations...]
```

### Get All Reservations
```
GET /api/reservations?page=1&limit=10
Status: PROTECTED (Librarian+)
Response: 200 PAGINATED [all reservations...]
```

### Cancel My Reservation
```
DELETE /api/reservations/:id
Status: PROTECTED
Response: 200 { success }
```

### Get Queue Position
```
GET /api/reservations/:id/queue-position
Status: PROTECTED
Response: 200 { position: 3 }
```

### Get Pending Queue for Book
```
POST /api/reservations/queue/:bookId
Status: PROTECTED (Librarian+)
Response: 200 { queue: [users waiting...] }
```

### Mark Reservation Ready
```
PATCH /api/reservations/ready
Status: PROTECTED (Librarian+)
Body: { "reservationId": 1 }
Response: 200 { success }
```

---

## 📊 DASHBOARD (8 Endpoints) - NEW!

### Get Dashboard Overview
```
GET /api/dashboard/overview
Status: PROTECTED (Librarian+)
Response: 200 {
  overview: {
    total_users, total_books, available_books,
    active_borrows, overdue_books, total_fines_collected,
    pending_reservations, total_categories
  }
}
```

### Get Overdue Books
```
GET /api/dashboard/overdue
Status: PROTECTED (Librarian+)
Response: 200 {
  overdueBooks: [{
    borrow_id, username, email, phone,
    title, author, due_date, days_overdue, fine_amount
  }]
}
```

### Get Borrowing Activity
```
GET /api/dashboard/activity?days=30
Status: PROTECTED (Librarian+)
Response: 200 {
  activity: [{
    date, checkouts, unique_users
  }]
}
```

### Get Category Statistics
```
GET /api/dashboard/categories
Status: PROTECTED (Librarian+)
Response: 200 {
  stats: [{
    category_id, category_name, total_books,
    available_books, unavailable_books, times_borrowed
  }]
}
```

### Get Member Statistics
```
GET /api/dashboard/members
Status: PROTECTED (Librarian+)
Response: 200 {
  stats: [{
    user_id, username, email, total_borrows,
    active_borrows, overdue_borrows,
    pending_reservations, outstanding_fines
  }]
}
```

### Get Most Borrowed Books
```
GET /api/dashboard/most-borrowed?limit=10
Status: PROTECTED (Librarian+)
Response: 200 {
  books: [{
    book_id, title, author, category_name,
    times_borrowed, unique_borrowers, available_copies
  }]
}
```

### Get Collection Growth
```
GET /api/dashboard/collection-growth?months=12
Status: PROTECTED (Librarian+)
Response: 200 {
  growth: [{
    month, books_added
  }]
}
```

### Generate Comprehensive Report
```
GET /api/dashboard/report
Status: PROTECTED (Admin)
Response: 200 {
  report: {
    overview,
    overdue, categoryStats, memberStats,
    mostBorrowed, collectionGrowth,
    generatedAt
  }
}
```

---

## 🔐 Access Control Matrix

```
Role: MEMBER
├─ Can register & login
├─ Can browse books & categories
├─ Can checkout/return books
├─ Can create/cancel own reservations
├─ Can view own profile
└─ Cannot: create categories, view dashboard

Role: LIBRARIAN
├─ Can do everything member can
├─ Can create/update categories
├─ Can manage all reservations
├─ Can view all reservations
├─ Can view dashboard & analytics
└─ Cannot: delete categories, generate full report

Role: ADMIN
├─ Can do everything
├─ Can delete categories
├─ Can delete books & users
├─ Can generate comprehensive report
└─ Full system access
```

---

## 📋 Request/Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "timestamp": "2024-03-27T10:30:00Z"
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Data retrieved",
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "itemsPerPage": 10,
    "hasMore": true
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "ErrorType",
  "timestamp": "2024-03-27T10:30:00Z"
}
```

---

## 🔑 Authentication Header

All protected endpoints require:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Token format:
- Issued on login
- Expires in 7 days
- Contains: userId, email, role

---

## 📊 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 201 | Created - Resource created |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - No token/Invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate entry/Invalid state |
| 500 | Server Error |

---

## 🧪 Quick Test Commands

```bash
# Test public endpoints
curl http://localhost:5000/api/books
curl http://localhost:5000/api/categories
curl http://localhost:5000/api/categories/popular

# Test with authentication
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/borrowing/my-books

# Create category (librarian+)
curl -X POST http://localhost:5000/api/categories \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"category_name": "Fiction"}'

# View dashboard (librarian+)
curl http://localhost:5000/api/dashboard/overview \
  -H "Authorization: Bearer TOKEN"

# Get full report (admin only)
curl http://localhost:5000/api/dashboard/report \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 🎯 Common Workflows

### Member Workflow
1. Register → `/api/auth/register`
2. Login → `/api/auth/login`
3. Browse books → `/api/books`
4. Checkout book → `/api/borrowing/checkout`
5. Return book → `/api/borrowing/return`
6. Reserve unavailable → `/api/reservations`
7. Check position → `/api/reservations/:id/queue-position`

### Librarian Workflow
1. Login as librarian
2. Create categories → `/api/categories` (POST)
3. Add books → `/api/books` (POST)
4. View reservations → `/api/reservations`
5. Mark ready → `/api/reservations/ready` (PATCH)
6. View overdue → `/api/dashboard/overdue`
7. Analyze trends → `/api/dashboard/activity`

### Admin Workflow
1. Login as admin
2. All librarian functions
3. Delete categories → `/api/categories/:id` (DELETE)
4. Generate reports → `/api/dashboard/report`
5. View member stats → `/api/dashboard/members`
6. System overview → `/api/dashboard/overview`

---

## ✅ All Endpoints Listed

**Authentication:** 3  
**Books:** 6  
**Borrowing:** 4  
**Users:** 4  
**Categories:** 5 (NEW)  
**Reservations:** 7 (NEW)  
**Dashboard:** 8 (NEW)  

**TOTAL: 32 ENDPOINTS** ✨

---

**Last Updated:** March 2024  
**Version:** 2.0  
**Status:** Production Ready ✅
