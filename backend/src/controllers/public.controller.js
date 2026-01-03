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
