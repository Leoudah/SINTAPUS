# Definisi Tata Bahasa Bebas Konteks (CFG)
# Aturan direpresentasikan sebagai dictionary: {Variabel: [Daftar_Aturan_RHS]}
CFG = {
    'S': ['ACBa', 'aACA'],
    'A': ['aa', 'aB', 'Ca'],
    'B': ['Ab', 'bb', 'aC', 'bA'],
    'C': ['a', 'bb', 'b', 'BA']
}

# String Target yang ingin diverifikasi ambiguitasnya
TARGET_STRING = 'aabbbbabbbaaa'

# List untuk menyimpan semua penurunan yang berhasil (sebagai urutan aturan)
found_derivations = []
MAX_STEPS = 250 # Batas langkah untuk mencegah rekursi tak terbatas pada CFG yang buruk

def find_derivations(current_string, target, step, history):
    """
    Fungsi rekursif untuk mencari penurunan dari current_string ke target.
    Ini mengimplementasikan Leftmost Derivation.
    """
    global found_derivations

    # 1. Batasan Langkah (Guard Clause)
    if step > MAX_STEPS:
        return

    # 2. Kondisi Sukses
    if current_string == target:
        # String target tercapai, simpan hasil penurunan (history)
        if history not in found_derivations:
            found_derivations.append(history)
            print(f"\nPenurunan Ditemukan (PT {len(found_derivations)}):")
            print(" -> ".join(history))

            if len(found_derivations) >= 2:
                # Ambigu terbukti, hentikan pencarian
                raise StopIteration # Mekanisme cepat untuk keluar dari rekursi

        return

    # 3. Kondisi Kegagalan Awal
    # Jika string yang ada lebih panjang atau tidak ada variabel lagi, hentikan jalur ini
    if len(current_string) > len(target) and all(c not in CFG for c in current_string):
        return

    # 4. Cari Variabel Paling Kiri (Leftmost Variable)
    leftmost_var_index = -1
    leftmost_var = None
    for i, char in enumerate(current_string):
        if char in CFG:
            leftmost_var_index = i
            leftmost_var = char
            break

    # Jika tidak ada variabel lagi, tetapi belum mencapai target (mismatch), hentikan
    if leftmost_var is None:
        return

    # 5. Iterasi semua aturan yang mungkin untuk Variabel Paling Kiri
    for rule in CFG[leftmost_var]:
        # Substitusi: Ganti variabel paling kiri dengan RHS aturan
        new_string = (
            current_string[:leftmost_var_index] +
            rule +
            current_string[leftmost_var_index + 1:]
        )

        # Simpan jejak (history) aturan yang digunakan
        new_history = history + [f"{leftmost_var} -> {rule}"]

        try:
            # Lanjutkan rekursi
            find_derivations(new_string, target, step + 1, new_history)
        except StopIteration:
            # Hentikan pencarian karena ambiguitas sudah terbukti
            raise


# --- Eksekusi Program ---
print(f"Mencari penurunan untuk string: '{TARGET_STRING}'")

try:
    # Mulai dari state S
    find_derivations('S', TARGET_STRING, 0, ['S'])
except StopIteration:
    pass # Ambiguity found

print("\n--- Hasil Analisis ---")
if len(found_derivations) >= 2:
    print(f"✅ CFG ini **AMBIGU** untuk string '{TARGET_STRING}'. Ditemukan {len(found_derivations)} penurunan berbeda.")
elif len(found_derivations) == 1:
    print(f"⚠️ CFG ini **TIDAK AMBIGU** untuk string '{TARGET_STRING}' (Hanya 1 penurunan ditemukan).")
else:
    print(f"❌ String '{TARGET_STRING}' **TIDAK DAPAT** diturunkan dari CFG ini (atau melebihi batas langkah).")