# Quick Implementation Guide - Manual Publication Feature

## ✅ Implementation Checklist

### 1. Database Migration
Run the SQL migration to add the `source` column:

```bash
# Execute in your MySQL client or phpMyAdmin
source backend/migrations/add_source_to_publikasi.sql
```

Or manually run:
```sql
ALTER TABLE `publikasi` 
ADD COLUMN `source` ENUM('scopus', 'rama', 'garuda', 'google_scholar') DEFAULT 'scopus' 
AFTER `id_jurnal`;
```

### 2. Backend Files Modified

✅ **Repository Layer** - [backend/src/repositories/publication.repository.js](../src/repositories/publication.repository.js)
- Added `createManualPublication()` method

✅ **Service Layer** - [backend/src/services/dosen.service.js](../src/services/dosen.service.js)
- Added `createManualPublication()` method with transaction handling

✅ **Controller Layer** - [backend/src/controllers/dosen.controller.js](../src/controllers/dosen.controller.js)
- Added `createManualPublication()` controller

✅ **Routes** - [backend/src/routes/dosen.routes.js](../src/routes/dosen.routes.js)
- Added `POST /:id_dosen/publikasi/manual` route

### 3. Testing

Run the test file after starting your backend server:
```bash
node backend/tests/test-manual-publication.js
```

**Before running tests:**
1. Update `YOUR_TOKEN_HERE` with a valid JWT token
2. Update `ID_DOSEN` with a valid dosen ID
3. Ensure backend server is running

## 📋 API Quick Reference

**Endpoint:** `POST /api/dosen/:id_dosen/publikasi/manual`

**Headers:**
```
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "judul": "Publication Title",
  "source": "scopus|rama|garuda|google_scholar",
  "id_jurnal": 1,
  "doi": "optional",
  "creator": "optional",
  "tahun": 2024,
  "jenis": "optional",
  "link_publikasi": "optional",
  "citation_count": 0
}
```

## 🔍 Source Field Values

| Source | Value | Description |
|--------|-------|-------------|
| Scopus | `scopus` | Publications from Scopus database |
| RAMA | `rama` | Publications from RAMA (Research Management) |
| Garuda | `garuda` | Publications from Garuda (DIKTI portal) |
| Google Scholar | `google_scholar` | Publications from Google Scholar |

## 📝 Example Request

```bash
curl -X POST http://localhost:5000/api/dosen/1/publikasi/manual \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "judul": "Machine Learning in Education",
    "source": "google_scholar",
    "id_jurnal": 1,
    "tahun": 2024,
    "jenis": "Journal Article",
    "citation_count": 5
  }'
```

## ⚠️ Important Notes

1. **Required Fields:**
   - `judul` (title)
   - `source` (one of the enum values)
   - `id_jurnal` (must exist in jurnal table)

2. **Auto-generated Fields:**
   - `eid`: Generated as `manual-{timestamp}-{random}`
   - `status`: Set to 'draft' by default
   - `is_public`: Set to 0 (private) by default
   - `created_at`: Current timestamp

3. **Author Linking:**
   - The dosen who creates the publication is automatically linked as an author
   - Author name defaults to dosen's name if `creator` field is not provided

4. **Validation:**
   - Source field is validated at both controller and repository levels
   - Required fields are checked in the service layer
   - Dosen must exist in the database

## 🚀 Next Steps (Frontend)

To implement the frontend:

1. Create a form component with fields for:
   - Publication title (required)
   - Source dropdown (required)
   - Journal selection (required)
   - DOI (optional)
   - Authors/Creator (optional)
   - Year (optional)
   - Type/Jenis (optional)
   - Link (optional)
   - Citation count (optional)

2. Add API call in `frontend/src/api/dosen.api.js`:
```javascript
export const createManualPublication = async (idDosen, data) => {
  return await axios.post(`/dosen/${idDosen}/publikasi/manual`, data);
};
```

3. Handle form submission with validation
4. Display success/error messages
5. Refresh publication list after successful creation

## 📚 Documentation

- Full documentation: [MANUAL_PUBLICATION_FEATURE.md](./MANUAL_PUBLICATION_FEATURE.md)
- Database migration: [add_source_to_publikasi.sql](../migrations/add_source_to_publikasi.sql)
- Test file: [test-manual-publication.js](../tests/test-manual-publication.js)
