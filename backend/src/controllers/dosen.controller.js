import * as dosenService from '../services/dosen.service.js';

export const getDosenByScopusID = async (req, res) => {
  try {
    const { scopusAuthorId } = req.params;
    const dosen = await dosenService.getDosenByScopusID(scopusAuthorId);
    if (!dosen) {
      return res.status(404).json({ success: false, message: 'Dosen not found' });
    }
    res.json({ success: true, data: dosen });
    } catch (err) {
    res.status(500).json({ success: false, message: err.message });
    }  
};

export const updateDosenProfile = async (req, res) => {
  try {
    const { id_dosen } = req.params;
    const profileData = req.body;
    const updatedDosen = await dosenService.updateDosenProfile(id_dosen, profileData);
    res.json({ success: true, data: updatedDosen });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getDosenPublications = async (req, res) => {
  try {
    const { id_dosen } = req.params;
    const publications = await dosenService.getDosenPublications(id_dosen);
    res.json({ success: true, data: publications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  } 
};