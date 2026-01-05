export const getAllDosen = async () => {
  const res = await fetch("/api/dosen");
  return res.json();
};

export const searchDosen = async (keyword) => {
  const res = await fetch(`/api/dosen/search?keyword=${keyword}`);
  return res.json();
};

export const getAfiliasiDosen = async (dosenId) => {
  const res = await fetch(`/api/dosen/${dosenId}/afiliasi`);
  return res.json();
};
