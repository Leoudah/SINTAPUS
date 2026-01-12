/**
 * Test file for Manual Publication API
 * 
 * Instructions:
 * 1. First, run the database migration: backend/migrations/add_source_to_publikasi.sql
 * 2. Make sure your backend server is running
 * 3. Replace YOUR_TOKEN_HERE with a valid authentication token
 * 4. Replace id_dosen and id_jurnal with valid IDs from your database
 * 5. Run this file with: node backend/tests/test-manual-publication.js
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const TOKEN = 'YOUR_TOKEN_HERE'; // Replace with actual token
const ID_DOSEN = 1; // Replace with actual dosen ID

// Test data for different sources
const testPublications = [
    {
        name: "Scopus Publication",
        data: {
            judul: "Advanced Machine Learning Techniques",
            source: "scopus",
            id_jurnal: 1,
            doi: "10.1234/aml-2024",
            creator: "Dr. John Doe, Dr. Jane Smith",
            tahun: 2024,
            jenis: "Journal Article",
            link_publikasi: "https://www.scopus.com/record/display.uri?eid=2-s2.0-123456789",
            citation_count: 15
        }
    },
    {
        name: "RAMA Publication",
        data: {
            judul: "Penelitian Kebijakan Pendidikan di Indonesia",
            source: "rama",
            id_jurnal: 2,
            creator: "Prof. Ahmad Budi",
            tahun: 2023,
            jenis: "Conference Paper",
            citation_count: 8
        }
    },
    {
        name: "Garuda Publication",
        data: {
            judul: "Implementasi Sistem Informasi Akademik",
            source: "garuda",
            id_jurnal: 1,
            doi: "10.5678/garuda-2024",
            creator: "Dr. Siti Aminah",
            tahun: 2024,
            jenis: "Journal Article",
            link_publikasi: "https://garuda.ristekbrin.go.id/documents/detail/123456"
        }
    },
    {
        name: "Google Scholar Publication",
        data: {
            judul: "Data Mining Applications in Healthcare",
            source: "google_scholar",
            id_jurnal: 1,
            creator: "Dr. Michael Chen, Dr. Sarah Lee",
            tahun: 2024,
            jenis: "Journal Article",
            link_publikasi: "https://scholar.google.com/citations?view_op=view_citation&citation_for_view=xxx",
            citation_count: 12
        }
    }
];

// Function to test creating a manual publication
async function testCreatePublication(testCase) {
    try {
        console.log(`\n📝 Testing: ${testCase.name}`);
        console.log('Data:', JSON.stringify(testCase.data, null, 2));

        const response = await axios.post(
            `${BASE_URL}/api/dosen/${ID_DOSEN}/publikasi/manual`,
            testCase.data,
            {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ Success!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.log('❌ Error!');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Error:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.log('Error:', error.message);
        }
        return null;
    }
}

// Function to test invalid source
async function testInvalidSource() {
    try {
        console.log('\n📝 Testing: Invalid Source (should fail)');

        const invalidData = {
            judul: "Test Publication",
            source: "invalid_source", // Invalid!
            id_jurnal: 1,
            tahun: 2024
        };

        console.log('Data:', JSON.stringify(invalidData, null, 2));

        const response = await axios.post(
            `${BASE_URL}/api/dosen/${ID_DOSEN}/publikasi/manual`,
            invalidData,
            {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('❌ Test Failed - Should have returned error');
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.log('✅ Test Passed - Correctly rejected invalid source');
            console.log('Error:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.log('❌ Unexpected error');
            console.log('Error:', error.message);
        }
    }
}

// Function to test missing required fields
async function testMissingFields() {
    try {
        console.log('\n📝 Testing: Missing Required Fields (should fail)');

        const incompleteData = {
            judul: "Test Publication",
            // Missing: source and id_jurnal
            tahun: 2024
        };

        console.log('Data:', JSON.stringify(incompleteData, null, 2));

        const response = await axios.post(
            `${BASE_URL}/api/dosen/${ID_DOSEN}/publikasi/manual`,
            incompleteData,
            {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('❌ Test Failed - Should have returned error');
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        if (error.response && error.response.status >= 400) {
            console.log('✅ Test Passed - Correctly rejected incomplete data');
            console.log('Error:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.log('❌ Unexpected error');
            console.log('Error:', error.message);
        }
    }
}

// Main test runner
async function runTests() {
    console.log('='.repeat(60));
    console.log('🚀 Starting Manual Publication API Tests');
    console.log('='.repeat(60));
    console.log(`Base URL: ${BASE_URL}`);
    console.log(`Dosen ID: ${ID_DOSEN}`);
    console.log(`Token: ${TOKEN.substring(0, 20)}...`);

    // Test valid publications from different sources
    for (const testCase of testPublications) {
        await testCreatePublication(testCase);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between tests
    }

    // Test error cases
    await testInvalidSource();
    await new Promise(resolve => setTimeout(resolve, 1000));

    await testMissingFields();

    console.log('\n' + '='.repeat(60));
    console.log('✨ Tests Completed!');
    console.log('='.repeat(60));
}

// Run all tests
runTests().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
