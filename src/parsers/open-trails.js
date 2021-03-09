const axios = require('axios');
const { parse } = require('node-html-parser');
const fs = require('fs');
const path = require('path');

const { logger } = require('../util/logger');

// Indexes for fetching parameters from an query array.
const QUERY_INDICES = {
  header: 0,
  complexity: 1,
  resortName: 2,
  status: 3
};

// Object with complexity indicators necessary for interpreting incoming data.
const COMPLEXITY = {
  'trail-green': '🟢',
  'trail-blue': '🔵',
  'trail-red': '🔴',
  'trail-black': '⚫'
};

async function connectToPage() {
  const URL = process.env.FUN_SOCHI_URL;

  try {
    const response = await axios.get(URL);

    return response.data;
  } catch (error) {
    if (error.response) {
      logger.debug(this.ctx, error.response.data.title);
    } else if (error.request) {
      logger.debug(this.ctx, error.request);
    }

    throw error;
  }
}

async function getDocumentTree() {
  const DOMString = await connectToPage();

  return parse(DOMString);
}

async function parseTrailsData() {
  const DocumentTree = await getDocumentTree();

  const trailsRow = DocumentTree.querySelectorAll('.trail-row');

  // The skeleton of the object that is written to the local API
  const data = {
    'roza-khutor': [],
    'gorki-gorod': [],
    'gazprom-laura': [],
    'gazprom-alpika': []
  };

  for (const key in trailsRow) {
    const row = trailsRow[key];

    const [
      resortName,
      complexity,
      status
    ] = [
      row.classNames[QUERY_INDICES.resortName],
      COMPLEXITY[row.classNames[QUERY_INDICES.complexity]],
      row.classNames[QUERY_INDICES.status]
    ];

    if (row.classNames[0] === 'header') {
      // Create a new object to segment tracks into sectors
      const sectorData = {
        sectorName: row.childNodes[0].rawText,
        trails: []
      };

      /**
       * Because selection is carried out from an array of classes,
       * then the required property can change the index.
       * 3 is the biased index of the resort.
       */
      data[row.classNames[3]].push(sectorData);
    } else {
      // Determine in which sector to add the track
      const sectorIndex = data[resortName].length - 1;

      let title = row.childNodes[0].childNodes[3].rawText;

      // Cut off unnecessary characters that appeared during parsing
      title = title.replace(/&nbsp;/g, '');

      data[resortName][sectorIndex].trails.push({ complexity, title, status });
    }
  }

  return data;
}

// this is required when you first start the application.
function checkDirectory() {
  const filepath = path.join(__dirname, '..', 'data');

  try {
    fs.statSync(filepath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      fs.mkdir(filepath, (error) => {
        if (error) throw error;

        logger.debug(null, 'Data directory created successfully');
      });
    }
  }
}

async function updateSummaryTrails() {
  const trailsData = await parseTrailsData();

  checkDirectory();

  const [
    filepath,
    data
  ] = [
    path.join(__dirname, '..', 'data', 'open-trails.json'),
    JSON.stringify(trailsData),
  ];

  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, data, (error) => {
      if (error) {
        reject(error);
      } else {
        logger.debug(null, 'The trails summary has been successfully updated');

        resolve();
      }
    });
  });
}

async function start() {
  try {
    await updateSummaryTrails();
  } catch (error) {
    logger.debug(null, error);

    return false;
  }
}

module.exports.openTrailsParser = { start };
