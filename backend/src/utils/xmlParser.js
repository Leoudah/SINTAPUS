import xml2js from 'xml2js';

/**
 * Parses Elsevier Atom XML response into a JavaScript object.
 */
const parseScopusXml = async (xmlData) => {
  const parser = new xml2js.Parser({
    explicitArray: false,
    // FIX 1: set ignoreAttrs to false so we get hrefs
    ignoreAttrs: false,
    // FIX 2: merge attributes into the object so we can access entry.link[0].href directly
    mergeAttrs: true,
    tagNameProcessors: [xml2js.processors.stripPrefix], // Keep this (dc:title -> title)
  });

  try {
    const result = await parser.parseStringPromise(xmlData);
    return result;
  } catch (error) {
    throw new Error(`XML Parsing Failed: ${error.message}`);
  }
};

export { parseScopusXml };
