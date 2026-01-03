import * as publicService from '../services/public.service.js';

export const getDosenCards = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const dosenCards = await publicService.getDosenCards(page);
        res.json({ success: true, data: dosenCards });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }  
};

<<<<<<< HEAD
export const getDosenDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const dosen = await publicService.getDosenDetail(id);
    if (!dosen) {
      return res.status(404).json({ success: false, message: 'Dosen not found' });
    }
    res.json({ success: true, data: dosen });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
=======
export const getDosenPage = async (req, res) => {
    try {
        const { id_dosen } = req.params;
        const dosenPage = await publicService.getDosenPage(id_dosen);
        res.json({ success: true, data: dosenPage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getDosenPublicationsPage = async (req, res) => {
    try {
        const { id_dosen } = req.params;
        const page = parseInt(req.query.page) || 1;
        const publicationsPage = await publicService.getDosenPublicationsPage(id_dosen, page);
        res.json({ success: true, data: publicationsPage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }   
};
>>>>>>> 1c59374cf8f11d8c0e8fd0b009c9aca0e74a7387
