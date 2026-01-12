# Manual Publication Input Feature

## Overview
This feature allows dosen (lecturers) to manually input publications from various sources including Scopus, RAMA, Garuda, and Google Scholar.

## Database Changes

### New Column: `source`
- **Table**: `publikasi`
- **Type**: ENUM('scopus', 'rama', 'garuda', 'google_scholar')
- **Default**: 'scopus'
- **Location**: After `id_jurnal` column

### Migration
Run the migration file: `backend/migrations/add_source_to_publikasi.sql`

```sql
ALTER TABLE `publikasi` 
ADD COLUMN `source` ENUM('scopus', 'rama', 'garuda', 'google_scholar') DEFAULT 'scopus' 
AFTER `id_jurnal`;
```

## API Endpoint

### Create Manual Publication

**Endpoint**: `POST /api/dosen/:id_dosen/publikasi/manual`

**Authentication**: Required (Bearer Token)

**Authorization**: Dosen role only

**Request Parameters**:
- `id_dosen` (path parameter): ID of the lecturer

**Request Body**:
```json
{
  "judul": "Title of the publication",
  "source": "scopus",
  "id_jurnal": 1,
  "doi": "10.1234/example",
  "creator": "Author Name",
  "tahun": 2024,
  "jenis": "Journal",
  "link_publikasi": "https://example.com/publication",
  "citation_count": 0
}
```

**Required Fields**:
- `judul` (string): Title of the publication
- `source` (enum): Must be one of: 'scopus', 'rama', 'garuda', 'google_scholar'
- `id_jurnal` (integer): ID of the journal

**Optional Fields**:
- `doi` (string): Digital Object Identifier
- `creator` (string): Author names (defaults to dosen name)
- `tahun` (integer): Publication year
- `jenis` (string): Type of publication (default: 'Other')
- `link_publikasi` (string): URL to the publication
- `citation_count` (integer): Number of citations (default: 0)

**Success Response** (201):
```json
{
  "success": true,
  "data": {
    "id_publikasi": 123,
    "message": "Manual publication created successfully"
  }
}
```

**Error Responses**:

400 Bad Request - Invalid source:
```json
{
  "success": false,
  "message": "Invalid source. Must be one of: scopus, rama, garuda, google_scholar"
}
```

500 Internal Server Error:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Implementation Details

### Repository Layer
**File**: `backend/src/repositories/publication.repository.js`

- **Method**: `createManualPublication(data, id_dosen, connection)`
- Validates source enum
- Generates unique EID for manual entries (format: `manual-{timestamp}-{random}`)
- Creates publication with 'draft' status
- Returns inserted publication ID

### Service Layer
**File**: `backend/src/services/dosen.service.js`

- **Method**: `createManualPublication(id_dosen, publicationData)`
- Uses database transaction for data integrity
- Validates required fields
- Retrieves dosen information
- Creates publication and links author
- Handles rollback on error

### Controller Layer
**File**: `backend/src/controllers/dosen.controller.js`

- **Method**: `createManualPublication(req, res)`
- Validates source enum before processing
- Returns appropriate HTTP status codes
- Handles errors and sends proper responses

### Routes
**File**: `backend/src/routes/dosen.routes.js`

- **Route**: `POST /:id_dosen/publikasi/manual`
- Protected by authentication and authorization middleware
- Requires dosen role

## Usage Example

### Using cURL
```bash
curl -X POST http://localhost:5000/api/dosen/1/publikasi/manual \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "judul": "Artificial Intelligence in Education",
    "source": "google_scholar",
    "id_jurnal": 1,
    "doi": "10.1234/ai-edu-2024",
    "creator": "John Doe, Jane Smith",
    "tahun": 2024,
    "jenis": "Journal Article",
    "link_publikasi": "https://scholar.google.com/article/123",
    "citation_count": 5
  }'
```

### Using JavaScript/Axios
```javascript
import axios from 'axios';

const createManualPublication = async (idDosen, publicationData) => {
  try {
    const response = await axios.post(
      `/api/dosen/${idDosen}/publikasi/manual`,
      publicationData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating publication:', error.response.data);
    throw error;
  }
};

// Usage
const data = {
  judul: "Machine Learning Applications",
  source: "rama",
  id_jurnal: 2,
  tahun: 2024,
  jenis: "Conference Paper",
  citation_count: 3
};

createManualPublication(1, data)
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));
```

## Notes

1. **EID Generation**: Manual publications get a unique EID with format `manual-{timestamp}-{random}` to distinguish them from Scopus-synchronized publications.

2. **Default Status**: Manual publications are created with 'draft' status and need admin verification before being published.

3. **Author Linking**: The dosen who creates the publication is automatically linked as an author.

4. **Transaction Safety**: All operations are wrapped in a database transaction to ensure data consistency.

5. **Source Validation**: The source field is validated at both the controller and repository levels to ensure data integrity.

## Future Enhancements

- Add bulk upload functionality for multiple publications
- Support for multiple authors with proper ordering
- File upload for supporting documents
- Integration with external APIs for auto-filling publication data
- Duplicate detection based on DOI or title
