-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 13, 2026 at 02:21 PM
-- Server version: 8.0.30
-- PHP Version: 8.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sintapus`
--

-- --------------------------------------------------------

--
-- Table structure for table `afiliasi`
--

CREATE TABLE `afiliasi` (
  `id_afiliasi` int NOT NULL,
  `institusi` varchar(128) NOT NULL,
  `singkatan` varchar(32) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `afiliasi`
--

INSERT INTO `afiliasi` (`id_afiliasi`, `institusi`, `singkatan`, `alamat`, `created_at`, `updated_at`) VALUES
(1, 'Universitas Indonesia', 'UI', 'Depok, Jawa Barat', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(2, 'Universitas Gadjah Mada', 'UGM', 'Sleman, DI Yogyakarta', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(3, 'Institut Teknologi Bandung', 'ITB', 'Bandung, Jawa Barat', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(4, 'Institut Pertanian Bogor', 'IPB', 'Bogor, Jawa Barat', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(5, 'Universitas Airlangga', 'UNAIR', 'Surabaya, Jawa Timur', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(6, 'Universitas Diponegoro', 'UNDIP', 'Semarang, Jawa Tengah', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(7, 'Universitas Padjadjaran', 'UNPAD', 'Sumedang, Jawa Barat', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(8, 'Universitas Brawijaya', 'UB', 'Malang, Jawa Timur', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(9, 'Universitas Sebelas Maret', 'UNS', 'Surakarta, Jawa Tengah', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(10, 'Universitas Hasanuddin', 'UNHAS', 'Makassar, Sulawesi Selatan', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(11, 'Universitas Pendidikan Indonesia', 'UPI', 'Bandung, Jawa Barat', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(12, 'Universitas Andalas', 'UNAND', 'Padang, Sumatera Barat', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(13, 'Universitas Sriwijaya', 'UNSRI', 'Palembang, Sumatera Selatan', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(14, 'Universitas Sumatera Utara', 'USU', 'Medan, Sumatera Utara', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(15, 'Universitas Negeri Yogyakarta', 'UNY', 'Yogyakarta, DI Yogyakarta', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(16, 'Universitas Negeri Malang', 'UM', 'Malang, Jawa Timur', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(17, 'Universitas Negeri Semarang', 'UNNES', 'Semarang, Jawa Tengah', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(18, 'Universitas Negeri Jakarta', 'UNJ', 'Jakarta Timur, DKI Jakarta', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(19, 'Universitas Jember', 'UNEJ', 'Jember, Jawa Timur', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(20, 'Universitas Lampung', 'UNILA', 'Bandar Lampung, Lampung', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(21, 'Universitas Riau', 'UNRI', 'Pekanbaru, Riau', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(22, 'Universitas Syiah Kuala', 'USK', 'Banda Aceh, Aceh', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(23, 'Universitas Mulawarman', 'UNMUL', 'Samarinda, Kalimantan Timur', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(24, 'Universitas Tanjungpura', 'UNTAN', 'Pontianak, Kalimantan Barat', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(25, 'Universitas Lambung Mangkurat', 'ULM', 'Banjarbaru, Kalimantan Selatan', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(26, 'Universitas Sam Ratulangi', 'UNSRAT', 'Manado, Sulawesi Utara', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(27, 'Universitas Halu Oleo', 'UHO', 'Kendari, Sulawesi Tenggara', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(28, 'Universitas Pattimura', 'UNPATTI', 'Ambon, Maluku', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(29, 'Universitas Cenderawasih', 'UNCEN', 'Jayapura, Papua', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(30, 'Universitas Nusa Cendana', 'UNDANA', 'Kupang, Nusa Tenggara Timur', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(31, 'Universitas Udayana', 'UNUD', 'Badung, Bali', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(32, 'Universitas Islam Indonesia', 'UII', 'Sleman, DI Yogyakarta', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(33, 'Universitas Atma Jaya Yogyakarta', 'UAJY', 'Yogyakarta, DI Yogyakarta', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(34, 'Universitas Katolik Parahyangan', 'UNPAR', 'Bandung, Jawa Barat', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(35, 'Universitas Muhammadiyah Yogyakarta', 'UMY', 'Bantul, DI Yogyakarta', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(36, 'Universitas Muhammadiyah Malang', 'UMM', 'Malang, Jawa Timur', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(37, 'Universitas Telkom', 'TEL-U', 'Bandung, Jawa Barat', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(38, 'Universitas Gunadarma', 'UG', 'Depok, Jawa Barat', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(39, 'Universitas Trisakti', 'TRISAKTI', 'Jakarta Barat, DKI Jakarta', '2025-12-15 08:38:37', '2025-12-15 08:38:37'),
(40, 'Universitas Binus', 'BINUS', 'Jakarta Barat, DKI Jakarta', '2025-12-15 08:38:37', '2025-12-15 08:38:37');

-- --------------------------------------------------------

--
-- Table structure for table `audit_log`
--

CREATE TABLE `audit_log` (
  `id_log` int NOT NULL,
  `entity_type` varchar(32) DEFAULT NULL,
  `entity_id` int DEFAULT NULL,
  `action` varchar(64) DEFAULT NULL,
  `performed_by` int DEFAULT NULL,
  `performed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `note` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `iso` char(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `iso`) VALUES
(1, 'Afghanistan', 'AF'),
(2, 'Albania', 'AL'),
(3, 'Algeria', 'DZ'),
(4, 'American Samoa', 'AS'),
(5, 'Andorra', 'AD'),
(6, 'Angola', 'AO'),
(7, 'Anguilla', 'AI'),
(8, 'Antarctica', 'AQ'),
(9, 'Antigua and Barbuda', 'AG'),
(10, 'Argentina', 'AR'),
(11, 'Armenia', 'AM'),
(12, 'Aruba', 'AW'),
(13, 'Australia', 'AU'),
(14, 'Austria', 'AT'),
(15, 'Azerbaijan', 'AZ'),
(16, 'Bahamas', 'BS'),
(17, 'Bahrain', 'BH'),
(18, 'Bangladesh', 'BD'),
(19, 'Barbados', 'BB'),
(20, 'Belarus', 'BY'),
(21, 'Belgium', 'BE'),
(22, 'Belize', 'BZ'),
(23, 'Benin', 'BJ'),
(24, 'Bermuda', 'BM'),
(25, 'Bhutan', 'BT'),
(26, 'Bosnia and Herzegovina', 'BA'),
(27, 'Botswana', 'BW'),
(28, 'Bouvet Island', 'BV'),
(29, 'Brazil', 'BR'),
(30, 'British Indian Ocean Territory', 'IO'),
(31, 'Brunei Darussalam', 'BN'),
(32, 'Bulgaria', 'BG'),
(33, 'Burkina Faso', 'BF'),
(34, 'Burundi', 'BI'),
(35, 'Cambodia', 'KH'),
(36, 'Cameroon', 'CM'),
(37, 'Canada', 'CA'),
(38, 'Cape Verde', 'CV'),
(39, 'Cayman Islands', 'KY'),
(40, 'Central African Republic', 'CF'),
(41, 'Chad', 'TD'),
(42, 'Chile', 'CL'),
(43, 'China', 'CN'),
(44, 'Christmas Island', 'CX'),
(45, 'Cocos (Keeling) Islands', 'CC'),
(46, 'Colombia', 'CO'),
(47, 'Comoros', 'KM'),
(48, 'Congo', 'CG'),
(49, 'Cook Islands', 'CK'),
(50, 'Costa Rica', 'CR'),
(51, 'Croatia', 'HR'),
(52, 'Cuba', 'CU'),
(53, 'Cyprus', 'CY'),
(54, 'Czech Republic', 'CZ'),
(55, 'Denmark', 'DK'),
(56, 'Djibouti', 'DJ'),
(57, 'Dominica', 'DM'),
(58, 'Dominican Republic', 'DO'),
(59, 'Ecuador', 'EC'),
(60, 'Egypt', 'EG'),
(61, 'El Salvador', 'SV'),
(62, 'Equatorial Guinea', 'GQ'),
(63, 'Eritrea', 'ER'),
(64, 'Estonia', 'EE'),
(65, 'Ethiopia', 'ET'),
(66, 'Falkland Islands (Malvinas)', 'FK'),
(67, 'Faroe Islands', 'FO'),
(68, 'Fiji', 'FJ'),
(69, 'Finland', 'FI'),
(70, 'France', 'FR'),
(71, 'French Guiana', 'GF'),
(72, 'French Polynesia', 'PF'),
(73, 'French Southern Territories', 'TF'),
(74, 'Gabon', 'GA'),
(75, 'Gambia', 'GM'),
(76, 'Georgia', 'GE'),
(77, 'Germany', 'DE'),
(78, 'Ghana', 'GH'),
(79, 'Gibraltar', 'GI'),
(80, 'Greece', 'GR'),
(81, 'Greenland', 'GL'),
(82, 'Grenada', 'GD'),
(83, 'Guadeloupe', 'GP'),
(84, 'Guam', 'GU'),
(85, 'Guatemala', 'GT'),
(86, 'Guernsey', 'GG'),
(87, 'Guinea', 'GN'),
(88, 'Guinea-Bissau', 'GW'),
(89, 'Guyana', 'GY'),
(90, 'Haiti', 'HT'),
(91, 'Heard Island and McDonald Islands', 'HM'),
(92, 'Holy See (Vatican City State)', 'VA'),
(93, 'Honduras', 'HN'),
(94, 'Hong Kong', 'HK'),
(95, 'Hungary', 'HU'),
(96, 'Iceland', 'IS'),
(97, 'India', 'IN'),
(98, 'Indonesia', 'ID'),
(99, 'Iran', 'IR'),
(100, 'Iraq', 'IQ'),
(101, 'Ireland', 'IE'),
(102, 'Isle of Man', 'IM'),
(103, 'Israel', 'IL'),
(104, 'Italy', 'IT'),
(105, 'Jamaica', 'JM'),
(106, 'Japan', 'JP'),
(107, 'Jersey', 'JE'),
(108, 'Jordan', 'JO'),
(109, 'Kazakhstan', 'KZ'),
(110, 'Kenya', 'KE'),
(111, 'Kiribati', 'KI'),
(112, 'Kuwait', 'KW'),
(113, 'Kyrgyzstan', 'KG'),
(114, 'Lao Peoples Democratic Republic', 'LA'),
(115, 'Latvia', 'LV'),
(116, 'Lebanon', 'LB'),
(117, 'Lesotho', 'LS'),
(118, 'Liberia', 'LR'),
(119, 'Libya', 'LY'),
(120, 'Liechtenstein', 'LI'),
(121, 'Lithuania', 'LT'),
(122, 'Luxembourg', 'LU'),
(123, 'Macao', 'MO'),
(124, 'Madagascar', 'MG'),
(125, 'Malawi', 'MW'),
(126, 'Malaysia', 'MY'),
(127, 'Maldives', 'MV'),
(128, 'Mali', 'ML'),
(129, 'Malta', 'MT'),
(130, 'Marshall Islands', 'MH'),
(131, 'Martinique', 'MQ'),
(132, 'Mauritania', 'MR'),
(133, 'Mauritius', 'MU'),
(134, 'Mayotte', 'YT'),
(135, 'Mexico', 'MX'),
(136, 'Monaco', 'MC'),
(137, 'Mongolia', 'MN'),
(138, 'Montenegro', 'ME'),
(139, 'Montserrat', 'MS'),
(140, 'Morocco', 'MA'),
(141, 'Mozambique', 'MZ'),
(142, 'Myanmar', 'MM'),
(143, 'Namibia', 'NA'),
(144, 'Nauru', 'NR'),
(145, 'Nepal', 'NP'),
(146, 'Netherlands', 'NL'),
(147, 'New Caledonia', 'NC'),
(148, 'New Zealand', 'NZ'),
(149, 'Nicaragua', 'NI'),
(150, 'Niger', 'NE'),
(151, 'Nigeria', 'NG'),
(152, 'Niue', 'NU'),
(153, 'Norfolk Island', 'NF'),
(154, 'Northern Mariana Islands', 'MP'),
(155, 'Norway', 'NO'),
(156, 'Oman', 'OM'),
(157, 'Pakistan', 'PK'),
(158, 'Palau', 'PW'),
(159, 'Panama', 'PA'),
(160, 'Papua New Guinea', 'PG'),
(161, 'Paraguay', 'PY'),
(162, 'Peru', 'PE'),
(163, 'Philippines', 'PH'),
(164, 'Pitcairn', 'PN'),
(165, 'Poland', 'PL'),
(166, 'Portugal', 'PT'),
(167, 'Puerto Rico', 'PR'),
(168, 'Qatar', 'QA'),
(169, 'Romania', 'RO'),
(170, 'Russian Federation', 'RU'),
(171, 'Rwanda', 'RW'),
(172, 'Saint Kitts and Nevis', 'KN'),
(173, 'Saint Lucia', 'LC'),
(174, 'Saint Martin (French part)', 'MF'),
(175, 'Saint Pierre and Miquelon', 'PM'),
(176, 'Saint Vincent and the Grenadines', 'VC'),
(177, 'Samoa', 'WS'),
(178, 'San Marino', 'SM'),
(179, 'Sao Tome and Principe', 'ST'),
(180, 'Saudi Arabia', 'SA'),
(181, 'Senegal', 'SN'),
(182, 'Serbia', 'RS'),
(183, 'Seychelles', 'SC'),
(184, 'Sierra Leone', 'SL'),
(185, 'Singapore', 'SG'),
(186, 'Sint Maarten (Dutch part)', 'SX'),
(187, 'Slovakia', 'SK'),
(188, 'Slovenia', 'SI'),
(189, 'Solomon Islands', 'SB'),
(190, 'Somalia', 'SO'),
(191, 'South Africa', 'ZA'),
(192, 'South Georgia and the South Sandwich Islands', 'GS'),
(193, 'South Sudan', 'SS'),
(194, 'Spain', 'ES'),
(195, 'Sri Lanka', 'LK'),
(196, 'State of Palestine', 'PS'),
(197, 'Sudan', 'SD'),
(198, 'Suriname', 'SR'),
(199, 'Svalbard and Jan Mayen', 'SJ'),
(200, 'Swaziland', 'SZ'),
(201, 'Sweden', 'SE'),
(202, 'Switzerland', 'CH'),
(203, 'Syrian Arab Republic', 'SY'),
(204, 'Tajikistan', 'TJ'),
(205, 'Thailand', 'TH'),
(206, 'Timor-Leste', 'TL'),
(207, 'Togo', 'TG'),
(208, 'Tokelau', 'TK'),
(209, 'Tonga', 'TO'),
(210, 'Trinidad and Tobago', 'TT'),
(211, 'Tunisia', 'TN'),
(212, 'Turkey', 'TR'),
(213, 'Turkmenistan', 'TM'),
(214, 'Turks and Caicos Islands', 'TC'),
(215, 'Tuvalu', 'TV'),
(216, 'Uganda', 'UG'),
(217, 'Ukraine', 'UA'),
(218, 'United Arab Emirates', 'AE'),
(219, 'United Kingdom', 'GB'),
(220, 'United States', 'US'),
(221, 'United States Minor Outlying Islands', 'UM'),
(222, 'Uruguay', 'UY'),
(223, 'Uzbekistan', 'UZ'),
(224, 'Vanuatu', 'VU'),
(225, 'Viet Nam', 'VN'),
(226, 'Wallis and Futuna', 'WF'),
(227, 'Western Sahara', 'EH'),
(228, 'Yemen', 'YE'),
(229, 'Zambia', 'ZM'),
(230, 'Zimbabwe', 'ZW');

-- --------------------------------------------------------

--
-- Table structure for table `dosen`
--

CREATE TABLE `dosen` (
  `id_dosen` int NOT NULL,
  `nama` varchar(128) NOT NULL,
  `nidn` varchar(32) DEFAULT NULL,
  `scopus_author_id` varchar(32) DEFAULT NULL,
  `id_afiliasi` int DEFAULT NULL,
  `citizenship` int DEFAULT NULL,
  `foto_profil` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dosen`
--

INSERT INTO `dosen` (`id_dosen`, `nama`, `nidn`, `scopus_author_id`, `id_afiliasi`, `citizenship`, `foto_profil`, `created_at`, `updated_at`) VALUES
(1, 'Muhammad Yeganehfar ', '0123456789', '57200213491', 28, 180, 'Link Nothing First', '2025-12-30 19:40:01', '2025-12-30 19:40:01'),
(2, 'Dosen Test', '12345678', '57123456789', 1, 98, NULL, '2025-12-31 18:46:06', '2025-12-31 18:46:06'),
(4, 'Dosen Test', '1234567', '57123456780', NULL, 98, NULL, '2025-12-31 18:52:24', '2025-12-31 18:52:24'),
(5, 'Dosen Test', '87654321', '57123456980', 31, 98, NULL, '2025-12-31 18:57:21', '2025-12-31 18:57:21'),
(7, 'I Dewa Bayu', '127671812', '57225368971', 31, 98, NULL, '2026-01-04 16:47:52', '2026-01-12 16:03:59'),
(8, 'INTENATIONAL YOUTH GOALS SINGAPORE, MALAYSIA, AND THAILAND BATCH 2 - BIGFAIR', '212121111', '123123123', 8, 98, NULL, '2026-01-06 03:34:04', '2026-01-06 03:34:04'),
(9, ' I. Gede Wikania Wira Wiguna', '125657293', '57727281400', 31, 98, '/uploads/foto-1767682933735-571406765.jpg', '2026-01-06 06:54:47', '2026-01-06 07:02:13');

-- --------------------------------------------------------

--
-- Table structure for table `dosen_tag`
--

CREATE TABLE `dosen_tag` (
  `id_dosen` int NOT NULL,
  `id_tag` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dosen_tag`
--

INSERT INTO `dosen_tag` (`id_dosen`, `id_tag`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `jurnal`
--

CREATE TABLE `jurnal` (
  `id_jurnal` int NOT NULL,
  `nama_jurnal` varchar(255) NOT NULL,
  `issn` varchar(32) DEFAULT NULL,
  `publisher` varchar(128) DEFAULT NULL,
  `quartile` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jurnal`
--

INSERT INTO `jurnal` (`id_jurnal`, `nama_jurnal`, `issn`, `publisher`, `quartile`) VALUES
(1, 'Unknown Journal', NULL, 'Unknown', NULL),
(2, 'Journal of Information Communication and Ethics in Society', '1477996X', 'Unknown', NULL),
(3, 'Data in Brief', '23523409', 'Unknown', NULL),
(4, '2025 18th International Conference on Engineering of Modern Electric Systems Emes 2025', NULL, 'Unknown', NULL),
(5, 'Proceedings International Conference on Smart Green Technology in Electrical and Information Systems Icsgteis', '28313992', 'Unknown', NULL),
(6, 'Journal of Physics Conference Series', '17426588', 'Unknown', NULL),
(7, 'Journal of Health Science and Medical Research', '25869981', 'Unknown', NULL),
(8, 'Biomedical and Pharmacology Journal', '09746242', 'Unknown', NULL),
(9, 'Asian Pacific Journal of Cancer Prevention', '15137368', 'Unknown', NULL),
(10, 'Bali Medical Journal', '20891180', 'Unknown', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `penulis_publikasi`
--

CREATE TABLE `penulis_publikasi` (
  `id_publikasi` int NOT NULL,
  `id_dosen` int DEFAULT NULL,
  `nama_penulis` varchar(128) NOT NULL,
  `urutan` int NOT NULL,
  `id_afiliasi` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `penulis_publikasi`
--

INSERT INTO `penulis_publikasi` (`id_publikasi`, `id_dosen`, `nama_penulis`, `urutan`, `id_afiliasi`) VALUES
(2, 1, 'Unknown', 1, 28),
(3, 7, 'Unknown', 1, 31),
(4, 7, 'Unknown', 1, 31),
(5, 7, 'Unknown', 1, 31),
(6, 7, 'Unknown', 1, 31),
(7, 7, 'Unknown', 1, 31),
(8, 7, 'Unknown', 1, 31),
(9, 7, 'Unknown', 1, 31),
(10, 7, 'Unknown', 1, 31),
(11, 7, 'Unknown', 1, 31),
(12, 7, 'Unknown', 1, 31),
(15, 7, 'Unknown', 1, 18),
(16, 9, 'Unknown', 1, 31),
(17, 9, 'Unknown', 1, 31),
(18, 9, 'Unknown', 1, 31),
(19, 9, 'Unknown', 1, 31),
(20, 9, 'Unknown', 1, 31);

-- --------------------------------------------------------

--
-- Table structure for table `publikasi`
--

CREATE TABLE `publikasi` (
  `id_publikasi` int NOT NULL,
  `eid` varchar(64) NOT NULL,
  `doi` varchar(128) DEFAULT NULL,
  `judul` varchar(255) NOT NULL,
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tahun` int DEFAULT NULL,
  `jenis` varchar(64) DEFAULT NULL,
  `link_publikasi` text,
  `source` enum('scopus','garuda','rama','google_scholar') NOT NULL,
  `citation_count` int DEFAULT '0',
  `id_jurnal` int NOT NULL,
  `status` enum('draft','submitted','verified','rejected') DEFAULT 'draft',
  `is_public` tinyint(1) DEFAULT '0',
  `verified_by` int DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `verification_note` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `publikasi`
--

INSERT INTO `publikasi` (`id_publikasi`, `eid`, `doi`, `judul`, `creator`, `tahun`, `jenis`, `link_publikasi`, `source`, `citation_count`, `id_jurnal`, `status`, `is_public`, `verified_by`, `verified_at`, `verification_note`, `created_at`) VALUES
(2, '2-s2.0-85040225405', '10.1108/JICES-06-2017-0038', 'Justice in technology policy: A systematic review of gender divide literature and the marginal contribution of women on ICT', 'Yeganehfar M.', 2018, 'Journal', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85040225405&origin=inward', 'scopus', 15, 2, 'submitted', 0, NULL, NULL, NULL, '2026-01-04 15:12:38'),
(3, '2-s2.0-105005584701', '10.1016/j.dib.2025.111642', 'Indonesian sign language system (SIBI) dataset: Sentences enhanced by diverse facial expressions for total communication', 'Darmawan I.D.M.B.A.', 2025, 'Journal', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=105005584701&origin=inward', 'scopus', 1, 3, 'verified', 1, 3, '2026-01-04 19:17:59', 'GOOOOO', '2026-01-04 17:36:01'),
(4, '2-s2.0-105010384915', '10.1109/EMES65692.2025.11045598', 'Exploring a Human-in-the-Loop Framework for Adaptive Sign Language Translation in Deaf Education', 'Darmawan I.D.M.B.A.', 2025, 'Conference Proceeding', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=105010384915&origin=inward', 'scopus', 0, 4, 'verified', 1, 3, '2026-01-05 13:08:06', NULL, '2026-01-04 17:36:01'),
(5, '2-s2.0-85187553295', '10.1109/ICSGTEIS60500.2023.10424116', 'Evaluation of Enrichment in Ontology-based Knowledge Management System', 'Dessy Hariyanti N.K.', 2023, 'Conference Proceeding', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85187553295&origin=inward', 'scopus', 3, 5, 'verified', 1, 3, '2026-01-05 13:08:09', NULL, '2026-01-04 17:36:01'),
(6, '2-s2.0-85187551816', '10.1109/ICSGTEIS60500.2023.10424020', 'Advancing Total Communication in SIBI: A Proposed Conceptual Framework for Sign Language Translation', 'Darmawan I.D.M.B.A.', 2023, 'Journal Article', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85187551816&origin=inward', 'rama', 3, 1, 'verified', 1, 3, '2026-01-12 16:17:01', NULL, '2026-01-04 17:36:01'),
(7, '2-s2.0-85103276068', '10.1088/1742-6596/1810/1/012018', 'Rindik rod sound separation with spectral subtraction method', 'Christian Y.', 2021, 'Conference Proceeding', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85103276068&origin=inward', 'scopus', 2, 6, 'verified', 0, 3, '2026-01-05 13:08:13', NULL, '2026-01-04 17:36:01'),
(8, '2-s2.0-85100747671', '10.1088/1742-6596/1722/1/012014', 'Implementation of audio recognition using mel frequency cepstrum coefficient and dynamic time warping in wirama praharsini', 'Wibawa I.D.G.Y.A.', 2021, 'Conference Proceeding', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85100747671&origin=inward', 'scopus', 15, 6, 'verified', 0, 3, '2026-01-05 13:08:17', NULL, '2026-01-04 17:36:01'),
(9, '2-s2.0-85100754532', '10.1088/1742-6596/1722/1/012104', 'The effectiveness of the blended learning approach in algorithm and programming courses', 'Darmawan I.D.M.B.A.', 2021, 'Conference Proceeding', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85100754532&origin=inward', 'scopus', 1, 6, 'verified', 0, 3, '2026-01-05 13:58:56', NULL, '2026-01-04 17:36:01'),
(10, '2-s2.0-85100816777', '10.1088/1742-6596/1722/1/012107', 'Analysis of student interaction with learning objects on blended learning course applying cooperative learning together method on Moodle learning management system', 'Nilakusmawati D.P.E.', 2021, 'Conference Proceeding', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85100816777&origin=inward', 'scopus', 3, 6, 'verified', 0, 3, '2026-01-05 13:58:59', NULL, '2026-01-04 17:36:01'),
(11, '2-s2.0-85100801164', '10.1088/1742-6596/1722/1/012015', 'Iqra reading verification with mel frequency cepstrum coefficient and dynamic time warping', 'Wibowo A.S.', 2021, 'Conference Proceeding', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85100801164&origin=inward', 'scopus', 3, 6, 'verified', 0, 3, '2026-01-06 03:30:55', 'Sukses\n', '2026-01-04 17:36:01'),
(12, '2-s2.0-85100729476', '10.1088/1742-6596/1722/1/012071', 'Comparative study of pitch detection algorithm to detect traditional Balinese music tones with various raw materials', 'Brata I.P.B.W.', 2021, 'Conference Proceeding', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85100729476&origin=inward', 'scopus', 2, 6, 'rejected', 0, 3, '2026-01-05 14:00:28', NULL, '2026-01-04 17:36:01'),
(15, '2-s2.0-85100829499', '10.1088/1742-6596/1722/1/012101', 'Audio fingerprint for automatic Balinese rindik music identification using Gaussian mixture model', 'Widarsa A.A.R.S.', 2021, 'Conference Proceeding', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85100829499&origin=inward', 'scopus', 3, 6, 'verified', 0, 3, '2026-01-04 19:17:51', NULL, '2026-01-04 18:23:43'),
(16, '2-s2.0-105017099384', '10.31584/jhsmr.20251201', 'Evaluation of the Efficacy and Safety of Chimeric Antigen Receptor-Modified T (CAR-T) Cell Therapy in Leukemia: A Five-Year Updated Systematic Review and Meta-analysis', 'Wiguna I.G.W.W.', 2025, 'Journal', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=105017099384&origin=inward', 'scopus', 0, 7, 'verified', 1, NULL, NULL, NULL, '2026-01-06 06:58:22'),
(17, '2-s2.0-105010955470', '10.13005/bpj/3199', 'High Cytoplasmic and Membranous Epidermal Growth Factor Receptor (EGFR) Expression as a Risk Factor for High-Grade Ovarian Carcinoma (HGOC)', 'Armerinayanti N.W.', 2025, 'Journal', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=105010955470&origin=inward', 'scopus', 1, 8, 'verified', 1, NULL, NULL, NULL, '2026-01-06 06:58:22'),
(18, '2-s2.0-85150972779', '10.31557/APJCP.2023.24.3.1015', 'Clinicopathological and Prognostic Significance of Ubiquitin-Specific Protease 39 Overexpression in Solid Cancers: A Meta-Analysis', 'Remitha N.P.S.I.', 2023, 'Journal', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85150972779&origin=inward', 'scopus', 4, 9, 'verified', 1, NULL, NULL, NULL, '2026-01-06 06:58:22'),
(19, '2-s2.0-85153757155', '10.15562/bmj.v12i1.4031', 'Perception and readiness of medical students and teaching staff to implement interprofessional education', 'Darmayani I.G.A.S.', 2023, 'Journal', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85153757155&origin=inward', 'scopus', 1, 10, 'verified', 1, NULL, NULL, NULL, '2026-01-06 06:58:22'),
(20, '2-s2.0-85131108030', '10.31557/APJCP.2022.23.5.1595', 'Pretreatment Leukocyte Count Ratios as Metastatic Predictive Factors in Luminal Type Breast Cancer', 'Wiguna I.G.W.W.', 2022, 'Journal', 'https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=85131108030&origin=inward', 'scopus', 7, 9, 'verified', 1, NULL, NULL, NULL, '2026-01-06 06:58:22');

-- --------------------------------------------------------

--
-- Table structure for table `sinkronisasi`
--

CREATE TABLE `sinkronisasi` (
  `id_sinkron` int NOT NULL,
  `id_user` int NOT NULL,
  `waktu_sinkron` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(32) DEFAULT NULL,
  `total_ditemukan` int DEFAULT '0',
  `publikasi_baru` int DEFAULT '0',
  `publikasi_diupdate` int DEFAULT '0',
  `pesan_error` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sinkronisasi`
--

INSERT INTO `sinkronisasi` (`id_sinkron`, `id_user`, `waktu_sinkron`, `status`, `total_ditemukan`, `publikasi_baru`, `publikasi_diupdate`, `pesan_error`) VALUES
(1, 1, '2025-12-30 19:47:08', 'Failed', 0, 0, 0, 'Bind parameters must not contain undefined. To pass SQL NULL specify JS null'),
(2, 1, '2025-12-30 19:52:05', 'Failed', 0, 0, 0, 'Data truncated for column \'status\' at row 1'),
(3, 1, '2025-12-30 19:55:19', 'Failed', 0, 0, 0, 'Data truncated for column \'status\' at row 1'),
(4, 1, '2025-12-30 19:56:00', 'Failed', 0, 0, 0, 'Field \'id_jurnal\' doesn\'t have a default value'),
(5, 1, '2025-12-30 19:58:34', 'Success', 0, 1, 0, NULL),
(6, 1, '2025-12-30 20:22:20', 'Success', 1, 0, 1, NULL),
(7, 1, '2025-12-31 20:03:04', 'Success', 1, 0, 0, NULL),
(8, 1, '2026-01-03 15:56:38', 'Success', 1, 0, 0, NULL),
(9, 1, '2026-01-03 16:27:35', 'Success', 1, 0, 0, NULL),
(10, 1, '2026-01-03 17:04:47', 'Success', 1, 0, 0, NULL),
(11, 1, '2026-01-03 17:07:05', 'Success', 1, 0, 0, NULL),
(12, 1, '2026-01-03 17:10:55', 'Success', 1, 0, 0, NULL),
(13, 1, '2026-01-03 17:15:39', 'Success', 1, 0, 0, NULL),
(14, 1, '2026-01-03 17:23:29', 'Success', 1, 0, 0, NULL),
(15, 1, '2026-01-03 17:24:48', 'Success', 1, 0, 1, NULL),
(16, 1, '2026-01-04 14:51:06', 'Success', 1, 0, 0, NULL),
(17, 1, '2026-01-04 15:12:34', 'Success', 1, 1, 0, NULL),
(18, 1, '2026-01-04 16:31:00', 'Success', 1, 0, 0, NULL),
(19, 1, '2026-01-04 16:31:45', 'Success', 1, 0, 0, NULL),
(20, 1, '2026-01-04 16:32:25', 'Success', 1, 0, 0, NULL),
(21, 1, '2026-01-04 17:35:11', 'Success', 0, 0, 0, NULL),
(22, 1, '2026-01-04 17:36:00', 'Success', 11, 11, 0, NULL),
(23, 5, '2026-01-04 18:22:17', 'Success', 11, 0, 0, NULL),
(24, 5, '2026-01-04 18:22:55', 'Success', 11, 1, 0, NULL),
(25, 5, '2026-01-04 18:23:42', 'Success', 11, 1, 0, NULL),
(26, 5, '2026-01-05 13:06:39', 'Success', 11, 0, 0, NULL),
(27, 5, '2026-01-05 13:07:12', 'Success', 11, 0, 0, NULL),
(28, 7, '2026-01-06 06:57:55', 'Failed', 0, 0, 0, 'Elsevier API Error: Unauthorized'),
(29, 7, '2026-01-06 06:58:21', 'Success', 5, 5, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id_tag` int NOT NULL,
  `nama` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id_tag`, `nama`) VALUES
(2, 'Deep Learning'),
(1, 'Machine Learning');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int NOT NULL,
  `email` varchar(128) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('Admin','Dosen') NOT NULL,
  `id_dosen` int DEFAULT NULL,
  `status` enum('draft','submitted','verified','rejected') DEFAULT 'submitted',
  `verified_by` int DEFAULT NULL,
  `verified_at` timestamp NULL DEFAULT NULL,
  `verification_note` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `email`, `password_hash`, `role`, `id_dosen`, `status`, `verified_by`, `verified_at`, `verification_note`, `created_at`, `updated_at`) VALUES
(1, 'testSubject@gmail.com', 'testSubject', 'Dosen', 1, 'verified', 3, '2026-01-04 18:54:27', NULL, '2025-12-30 19:37:55', '2026-01-04 18:54:27'),
(2, 'dosen1@test.com', '$2b$10$IlWGPy3AHzseUtHESh5uGuR/vXqwnfvsXfPRKjpXeCcAkxbTd3Cri', 'Dosen', 2, 'verified', 3, '2026-01-06 03:55:54', NULL, '2025-12-31 18:46:06', '2026-01-06 03:55:54'),
(3, 'admin@test.com', '$2b$10$0JVEcY7AfbTwNIVF8wTbcOSgKIUCXVZ.wX02CsjwJnY872bTLuZOO', 'Admin', 4, 'verified', NULL, NULL, NULL, '2025-12-31 18:52:24', '2025-12-31 19:23:07'),
(4, 'dosen3@test.com', '$2b$10$oUCaxb6XOAsNyggIvKDJkOCGvsmjar5092Bl81t6Y6TcX07dZ5bSW', 'Dosen', 5, 'verified', 3, '2026-01-06 03:55:57', NULL, '2025-12-31 18:57:21', '2026-01-06 03:55:57'),
(5, 'dewabayu@gmail.com', '$2b$10$rXmmcgS.d9GYhvgJvK1WFeY6Wb1XXu65ymys9cwPI0IX8RkWkPYVe', 'Dosen', 7, 'verified', 3, '2026-01-12 16:04:14', NULL, '2026-01-04 16:47:52', '2026-01-12 16:04:14'),
(6, 'tjiptaut@gmail.com', '$2b$10$CN5Zz8jDP91siUSOTM03ReJXeYHoZ.oI8a/ewCwvvypLX68G1.MpG', 'Dosen', 8, 'submitted', NULL, NULL, NULL, '2026-01-06 03:34:04', '2026-01-06 03:34:04'),
(7, 'abcd@gmail.com', '$2b$10$n4/lEYjIz4bRfoWi64WlS./8ddUkDJCrvDg/JGuAWCHgg9XDK6H6G', 'Dosen', 9, 'verified', 3, '2026-01-06 06:57:01', NULL, '2026-01-06 06:54:47', '2026-01-06 06:57:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `afiliasi`
--
ALTER TABLE `afiliasi`
  ADD PRIMARY KEY (`id_afiliasi`);

--
-- Indexes for table `audit_log`
--
ALTER TABLE `audit_log`
  ADD PRIMARY KEY (`id_log`),
  ADD KEY `performed_by` (`performed_by`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `iso` (`iso`);

--
-- Indexes for table `dosen`
--
ALTER TABLE `dosen`
  ADD PRIMARY KEY (`id_dosen`),
  ADD UNIQUE KEY `scopus_author_id` (`scopus_author_id`),
  ADD KEY `id_afiliasi` (`id_afiliasi`),
  ADD KEY `citizenship` (`citizenship`),
  ADD KEY `idx_dosen_nama` (`nama`);

--
-- Indexes for table `dosen_tag`
--
ALTER TABLE `dosen_tag`
  ADD PRIMARY KEY (`id_dosen`,`id_tag`),
  ADD KEY `id_tag` (`id_tag`);

--
-- Indexes for table `jurnal`
--
ALTER TABLE `jurnal`
  ADD PRIMARY KEY (`id_jurnal`),
  ADD KEY `idx_jurnal_nama` (`nama_jurnal`);

--
-- Indexes for table `penulis_publikasi`
--
ALTER TABLE `penulis_publikasi`
  ADD PRIMARY KEY (`id_publikasi`,`urutan`),
  ADD KEY `id_dosen` (`id_dosen`),
  ADD KEY `id_afiliasi` (`id_afiliasi`);

--
-- Indexes for table `publikasi`
--
ALTER TABLE `publikasi`
  ADD PRIMARY KEY (`id_publikasi`),
  ADD UNIQUE KEY `eid` (`eid`),
  ADD KEY `id_jurnal` (`id_jurnal`),
  ADD KEY `verified_by` (`verified_by`),
  ADD KEY `idx_publikasi_tahun` (`tahun`),
  ADD KEY `idx_publikasi_status` (`status`);

--
-- Indexes for table `sinkronisasi`
--
ALTER TABLE `sinkronisasi`
  ADD PRIMARY KEY (`id_sinkron`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id_tag`),
  ADD UNIQUE KEY `nama` (`nama`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `uq_user_dosen` (`id_dosen`),
  ADD KEY `verified_by` (`verified_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `afiliasi`
--
ALTER TABLE `afiliasi`
  MODIFY `id_afiliasi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `audit_log`
--
ALTER TABLE `audit_log`
  MODIFY `id_log` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- AUTO_INCREMENT for table `dosen`
--
ALTER TABLE `dosen`
  MODIFY `id_dosen` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `jurnal`
--
ALTER TABLE `jurnal`
  MODIFY `id_jurnal` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `publikasi`
--
ALTER TABLE `publikasi`
  MODIFY `id_publikasi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `sinkronisasi`
--
ALTER TABLE `sinkronisasi`
  MODIFY `id_sinkron` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id_tag` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `audit_log`
--
ALTER TABLE `audit_log`
  ADD CONSTRAINT `audit_log_ibfk_1` FOREIGN KEY (`performed_by`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `dosen`
--
ALTER TABLE `dosen`
  ADD CONSTRAINT `dosen_ibfk_1` FOREIGN KEY (`id_afiliasi`) REFERENCES `afiliasi` (`id_afiliasi`),
  ADD CONSTRAINT `dosen_ibfk_2` FOREIGN KEY (`citizenship`) REFERENCES `countries` (`id`);

--
-- Constraints for table `dosen_tag`
--
ALTER TABLE `dosen_tag`
  ADD CONSTRAINT `dosen_tag_ibfk_1` FOREIGN KEY (`id_dosen`) REFERENCES `dosen` (`id_dosen`),
  ADD CONSTRAINT `dosen_tag_ibfk_2` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id_tag`);

--
-- Constraints for table `penulis_publikasi`
--
ALTER TABLE `penulis_publikasi`
  ADD CONSTRAINT `penulis_publikasi_ibfk_1` FOREIGN KEY (`id_publikasi`) REFERENCES `publikasi` (`id_publikasi`),
  ADD CONSTRAINT `penulis_publikasi_ibfk_2` FOREIGN KEY (`id_dosen`) REFERENCES `dosen` (`id_dosen`),
  ADD CONSTRAINT `penulis_publikasi_ibfk_3` FOREIGN KEY (`id_afiliasi`) REFERENCES `afiliasi` (`id_afiliasi`);

--
-- Constraints for table `publikasi`
--
ALTER TABLE `publikasi`
  ADD CONSTRAINT `publikasi_ibfk_1` FOREIGN KEY (`id_jurnal`) REFERENCES `jurnal` (`id_jurnal`),
  ADD CONSTRAINT `publikasi_ibfk_2` FOREIGN KEY (`verified_by`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `sinkronisasi`
--
ALTER TABLE `sinkronisasi`
  ADD CONSTRAINT `sinkronisasi_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_dosen` FOREIGN KEY (`id_dosen`) REFERENCES `dosen` (`id_dosen`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`verified_by`) REFERENCES `user` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
