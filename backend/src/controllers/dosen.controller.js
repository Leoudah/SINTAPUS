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
    res.json({
      success: true,
      data: updatedDosen,
      logout: true,
      message: 'Profile updated. Status changed to submitted. Please login again.'
    });
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

export const getPublicationStats = async (req, res) => {
  try {
    const { id_dosen } = req.params;
    const stats = await dosenService.getPublicationStats(id_dosen);
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createManualPublication = async (req, res) => {
  try {
    const { id_dosen } = req.params;
    const publicationData = req.body;

    // Validate source enum (can be null)
    const validSources = ['scopus', 'rama', 'garuda', 'google_scholar'];
    if (publicationData.source && !validSources.includes(publicationData.source)) {
      return res.status(400).json({
        success: false,
        message: `Invalid source. Must be one of: ${validSources.join(', ')} or null`
      });
    }

    const result = await dosenService.createManualPublication(id_dosen, publicationData);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updatePublication = async (req, res) => {
  try {
    const { id_dosen, id_publikasi } = req.params;
    const publicationData = req.body;

    // Validate source enum (can be null)
    const validSources = ['scopus', 'rama', 'garuda', 'google_scholar'];
    if (publicationData.source && !validSources.includes(publicationData.source)) {
      return res.status(400).json({
        success: false,
        message: `Invalid source. Must be one of: ${validSources.join(', ')} or null`
      });
    }

    const result = await dosenService.updatePublication(id_dosen, id_publikasi, publicationData);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const { id_dosen, id_publikasi } = req.params;

    const result = await dosenService.deletePublication(id_dosen, id_publikasi);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};