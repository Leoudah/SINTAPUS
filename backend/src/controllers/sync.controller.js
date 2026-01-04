import syncService from '../services/sync.service.js';

export const syncByAuthor = async (req, res) => {
  try {
    const { scopus_author_id } = req.body;
    const userId = req.user.id_user; // Assumed from Auth Middleware

    if (!scopus_author_id) {
      return res.status(400).json({
        success: false,
        message: 'scopus_author_id is required'
      });
    }

    // Trigger the sync service
    const result = await syncService.syncScopusPublications(
      userId,
      scopus_author_id
    );

    return res.status(200).json({
      success: true,
      message: 'Synchronization completed successfully',
      data: result.stats
    });

  } catch (error) {
    console.error('Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Synchronization failed',
      error: error.message
    });
  }
};
