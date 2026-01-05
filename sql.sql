-- =============================================
-- STUDI KASUS: SUPERMARKET MAJU JAYA (VERSI EXPANDED)
-- Total 7 Tabel untuk Analisis Mendalam
-- =============================================

-- 1. Tabel Kategori
CREATE TABLE kategori (
    id_kategori INT PRIMARY KEY,
    nama_kategori VARCHAR(50) NOT NULL
);

-- 2. Tabel Supplier (BARU)
-- Mencatat asal barang. Berguna untuk re-stock dan analisis vendor.
CREATE TABLE supplier (
    id_supplier INT PRIMARY KEY,
    nama_supplier VARCHAR(100) NOT NULL,
    kota_supplier VARCHAR(50),
    no_telp VARCHAR(20)
);

-- 3. Tabel Pelanggan (BARU)
-- Mencatat data member. Berguna untuk analisis demografi & loyalty.
CREATE TABLE pelanggan (
    id_pelanggan INT PRIMARY KEY,
    nama_pelanggan VARCHAR(100) NOT NULL,
    kota_asal VARCHAR(50),
    level_member VARCHAR(20) -- Gold, Silver, Bronze
);

-- 4. Tabel Produk (Diupdate)
-- Sekarang produk punya "Orang Tua" yaitu Kategori dan Supplier
CREATE TABLE produk (
    id_produk VARCHAR(10) PRIMARY KEY,
    nama_produk VARCHAR(100) NOT NULL,
    harga DECIMAL(10, 2) NOT NULL,
    stok INT DEFAULT 0,
    id_kategori INT,
    id_supplier INT, -- Tambahan Foreign Key
    FOREIGN KEY (id_kategori) REFERENCES kategori(id_kategori),
    FOREIGN KEY (id_supplier) REFERENCES supplier(id_supplier)
);

-- 5. Tabel Karyawan
CREATE TABLE karyawan (
    id_karyawan VARCHAR(10) PRIMARY KEY,
    nama_karyawan VARCHAR(100) NOT NULL,
    shift_kerja VARCHAR(20)
);

-- 6. Tabel Transaksi (Header - Diupdate)
-- Sekarang mencatat ID Pelanggan secara spesifik
CREATE TABLE transaksi (
    no_faktur VARCHAR(20) PRIMARY KEY,
    tanggal_waktu DATETIME NOT NULL,
    id_pelanggan INT, -- Foreign Key ke tabel Pelanggan
    id_karyawan VARCHAR(10),
    FOREIGN KEY (id_pelanggan) REFERENCES pelanggan(id_pelanggan),
    FOREIGN KEY (id_karyawan) REFERENCES karyawan(id_karyawan)
);

-- 7. Tabel Detail Transaksi
CREATE TABLE detail_transaksi (
    id_detail INT PRIMARY KEY,
    no_faktur VARCHAR(20),
    id_produk VARCHAR(10),
    qty INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (no_faktur) REFERENCES transaksi(no_faktur),
    FOREIGN KEY (id_produk) REFERENCES produk(id_produk)
);

-- =============================================
-- BAGIAN 2: PENGISIAN DATA (DML)
-- =============================================

-- A. Data Master (Independen)
INSERT INTO kategori VALUES 
(1, 'Sembako'), 
(2, 'Minuman'), 
(3, 'Snack'), 
(4, 'Kebersihan'), 
(5, 'Alat Tulis')
(6, 'Frozen Food'),
(7, 'Bumbu Dapur'),
(8, 'Produk Segar'),
(9, 'Perawatan Rumah'),
(10, 'Makanan Siap Saji');

INSERT INTO supplier VALUES 
(101, 'PT. Padi Mas', 'Karawang', '021-1111'),
(102, 'PT. Unilever', 'Jakarta', '021-2222'),
(103, 'PT. Indofood', 'Jakarta', '021-3333'),
(104, 'PT. Susu Segar', 'Bandung', '022-4444'),
(105, 'PT. Kiky', 'Solo', '0271-5555')
(106, 'PT. Fiesta Food', 'Bekasi', '021-6666'),
(107, 'PT. Ajinomoto Indonesia', 'Mojokerto', '0321-7777'),
(108, 'PT. Wings Food', 'Surabaya', '031-8888'),
(109, 'CV. Sayur Sejahtera', 'Bogor', '0251-9999'),
(110, 'PT. ABC President', 'Jakarta', '021-1212');

INSERT INTO pelanggan VALUES
(1, 'Budi Santoso', 'Jakarta', 'Gold'),
(2, 'Ani Wijaya', 'Bandung', 'Silver'),
(3, 'Coki Sitohang', 'Surabaya', 'Bronze'),
(0, 'Non-Member', '-', 'None'); -- ID 0 untuk tamu umum

INSERT INTO karyawan VALUES 
('KSR-01', 'Rina Marlina', 'Pagi'),
('KSR-02', 'Joko Susilo', 'Siang');

-- B. Data Produk (Tergantung Kategori & Supplier)
INSERT INTO produk (id_produk, nama_produk, harga, stok, id_kategori, id_supplier) VALUES 
('BRG-001', 'Beras Premium 5kg', 65000, 50, 1, 101),
('BRG-002', 'Minyak Goreng 2L', 35000, 100, 1, 102),
('BRG-003', 'Susu UHT 1L', 18000, 80, 2, 104),
('BRG-004', 'Keripik Kentang', 15000, 200, 3, 103),
('BRG-005', 'Sabun Mandi Cair', 25000, 50, 4, 102),
('BRG-006', 'Buku Tulis A5', 5000, 300, 5, 105),
('BRG-007', 'Pulpen Gel', 4000, 200, 5, 105)
('BRG-008', 'Nugget Ayam 500gr', 32000, 100, 6, 106),
('BRG-009', 'Sosis Sapi 500gr', 30000, 80, 6, 108),

-- Bumbu Dapur
('BRG-010', 'Penyedap Rasa 100gr', 12000, 200, 7, 107),
('BRG-011', 'Kecap Manis 600ml', 17000, 150, 7, 110),

-- Produk Segar
('BRG-012', 'Telur Ayam 1kg', 28000, 100, 8, 109),
('BRG-013', 'Sayur Bayam Ikat', 5000, 150, 8, 109),

-- Perawatan Rumah
('BRG-014', 'Pembersih Lantai 800ml', 22000, 120, 9, 108),

-- Makanan Siap Saji
('BRG-015', 'Roti Tawar', 15000, 90, 10, 103);

-- C. Data Transaksi (Header)
INSERT INTO transaksi (no_faktur, tanggal_waktu, id_pelanggan, id_karyawan) VALUES 
('STR-001', '2023-11-01 08:30:00', 1, 'KSR-01'), -- Budi belanja pagi
('STR-002', '2023-11-01 09:00:00', 2, 'KSR-01'), -- Ani belanja pagi
('STR-003', '2023-11-01 10:15:00', 0, 'KSR-02'), -- Non-member belanja siang
('STR-004', '2023-11-01 11:30:00', 1, 'KSR-02'); -- Budi belanja lagi siang (lupa beli barang)

-- D. Data Detail (Isi Keranjang)
INSERT INTO detail_transaksi (id_detail, no_faktur, id_produk, qty, subtotal) VALUES 
-- Struk 001 (Budi)
(1, 'STR-001', 'BRG-001', 1, 65000), -- Beras
(2, 'STR-001', 'BRG-002', 2, 70000), -- Minyak 2x

-- Struk 002 (Ani)
(3, 'STR-002', 'BRG-003', 3, 54000), -- Susu 3x
(4, 'STR-002', 'BRG-004', 2, 30000), -- Keripik 2x

-- Struk 003 (Non-member)
(5, 'STR-003', 'BRG-005', 1, 25000), -- Sabun 1x

-- Struk 004 (Budi lagi)
(6, 'STR-004', 'BRG-006', 10, 50000), -- Buku 10x
(7, 'STR-004', 'BRG-007', 5, 20000);  -- Pulpen 5x
