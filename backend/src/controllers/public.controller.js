import * as publicService from '../services/public.service.js';

export const getDosenCards = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const q = (req.query.q || '').trim();
        const dosenCards = await publicService.getDosenCards(page, q);
        // unwrap meta & data so frontend gets an array plus pagination info
        res.json({ success: true, data: dosenCards.data, meta: dosenCards.meta });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

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

export const getCountries = async (req, res) => {
    try {
        const countries = await publicService.getCountries();
        res.json({ success: true, data: countries });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getAfiliasiPaged = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const q = (req.query.q || '').trim();
        const result = await publicService.getAfiliasiPaged(page, q);
        res.json({ success: true, data: result.data, meta: result.meta });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getAfiliasi = async (req, res) => {
    try {
        const afiliasi = await publicService.getAfiliasi();
        res.json({ success: true, data: afiliasi });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getAfiliasiDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await publicService.getAfiliasiDetail(id);
        if (!detail) {
            return res.status(404).json({ success: false, message: 'Afiliasi not found' });
        }
        res.json({ success: true, data: detail });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
