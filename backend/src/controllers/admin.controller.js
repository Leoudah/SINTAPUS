import * as adminService from '../services/admin.service.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await adminService();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAccounts = async (req, res) => {
  try {
    const { status } = req.query;

    if (status && !['submitted', 'verified', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status filter'
      });
    }

    const data = await adminService.getAccountsByStatus(status);
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const getAccountDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await adminService.getAccountDetail(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export const updateAccountStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, verification_note } = req.body;
    const adminId = req.user.id_user;

    if (!['verified', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be verified or rejected'
      });
    }

    await adminService.updateAccountStatus(
      id,
      status,
      verification_note ?? null,
      adminId
    );

    res.json({
      success: true,
      message: 'Account status updated'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || 'Server error'
    });
  }
};

export const getPublications = async (req, res) => {
  try {
    const { status } = req.query;

    if (status && !['draft', 'submitted', 'verified', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status filter' });
    }

    const data = await adminService.getPublicationsByStatus(status);
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getPublicationDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await adminService.getPublicationDetail(id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Publication not found' });
    }

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updatePublicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, verification_note } = req.body;
    const adminId = req.user.id_user;

    if (!['verified', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be verified or rejected' });
    }

    await adminService.updatePublicationStatus(id, status, verification_note ?? null, adminId);

    res.json({ success: true, message: 'Publication status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};
