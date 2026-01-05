export const getAllAfiliasi = async () => {
  const res = await fetch("/api/afiliasi");
  return res.json();
};

export const searchAfiliasi = async (keyword) => {
  const res = await fetch(`/api/afiliasi/search?keyword=${keyword}`);
  return res.json();
};

