import axios from 'axios';
import { parseScopusXml } from '../utils/xmlParser.js';

class ElsevierService {
  constructor() {
    this.baseUrl = 'https://api.elsevier.com/content/search/scopus';
    this.apiKey = process.env.ELSEVIER_API_KEY;
  }

  async fetchAuthorPublications(scopusAuthorId, start = 0, count = 25) {
    try {
      const query = `AU-ID(${scopusAuthorId})`;

      const response = await axios.get(this.baseUrl, {
        headers: {
          'X-ELS-APIKey': this.apiKey,
          'Accept': 'application/xml'
        },
        params: {
          query: query,
          start: start,
          count: count,
          view: 'STANDARD',
          sort: 'coverDate'
        }
      });

      const parsedData = await parseScopusXml(response.data);

      // FIX: Access 'search-results' (no change) but check children carefully
      const root = parsedData['search-results'];

      if (!root) {
        throw new Error('Invalid Scopus API Response Structure');
      }

      // FIX: Prefixes are stripped, so look for 'totalResults' instead of 'opensearch:totalResults'
      // Depending on xml2js version, if opensearch is a namespace it might behave differently.
      // But based on stripPrefix, it usually becomes 'totalResults'.
      // We check both just in case.
      const totalResults = parseInt(root['totalResults'] || root['opensearch:totalResults'] || 0);
      const itemsPerPage = parseInt(root['itemsPerPage'] || root['opensearch:itemsPerPage'] || 0);

      let entries = [];
      if (root.entry) {
        entries = Array.isArray(root.entry) ? root.entry : [root.entry];
      }

      return {
        totalResults,
        itemsPerPage,
        entries
      };

    } catch (error) {
      console.error('Elsevier API Error:', error.message);
      throw new Error(`Elsevier API Error: ${error.response?.statusText || error.message}`);
    }
  }
}

export default new ElsevierService();
