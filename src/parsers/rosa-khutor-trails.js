const axios = require('axios');
const { parse } = require('node-html-parser');
const fs = require('fs');
const path = require('path');

const { logger } = require('../util/logger');

const INDEX_OF_STATUS = 3;
const INDEX_OF_LEVEL = 4;
const OPTIONS = {
  status: {
    status_2: 'Трасса закрыта',
    status_4: 'Вне эксплуатации'
  },
  complexity: {
    level_1: '🟢',
    level_2: '🔵',
    level_3: '🔴',
    level_4: '⚫',
    level_5: '⚪'
  }
};

async function connectToPage() {
  const URL = 'https://rosakhutor.com/skiing/trails/';

  try {
    const response = await axios.get(URL);

    return response.data;
  } catch (error) {
    if (error.response) {
      logger.debug(this.ctx, error.response.data.title);
    } else if (error.request) {
      logger.debug(this.ctx, error.request);
    } else {
      logger.debug(this.ctx, error);
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

  const trailsRowContent = DocumentTree.querySelectorAll('.trails_row_content');

  const trailsData = [];

  trailsRowContent.pop();

  for (const key in trailsRowContent) {
    const row = trailsRowContent[key];

    const [
      title,
      status,
      complexity
    ] = [
      row.childNodes[1].childNodes[1].childNodes[2].rawText,
      row.classNames[INDEX_OF_STATUS],
      row.classNames[INDEX_OF_LEVEL]
    ];

    trailsData.push({
      title: title.trim(),
      complexity: OPTIONS.complexity[complexity],
      status: OPTIONS.status[status]
    });
  }

  return trailsData;
}

function checkDirectory() {
  try {
    fs.statSync(path.join(__dirname, '..', 'data'));
  } catch (error) {
    if (error.code === 'ENOENT') {
      fs.mkdir(
        path.join(__dirname, '..', 'data'),
        (error) => {
          if (error) {
            logger.debug(null, error);

            throw error;
          }

          logger.debug(null, 'Data directory created successfully');
        }
      );
    }
  }
}

function updateSummaryTrails(trailsData, resortTitle) {
  fs.writeFile(
    path.join(__dirname, '..', 'data', 'rosa-khutor-trails.json'),
    JSON.stringify(trailsData),
    (error) => {
      if (error) {
        logger.debug(null, error);

        throw error;
      }

      logger.debug(
        null,
        `The ${resortTitle} trail summary has been successfully updated`
      );
    }
  );
}

async function run() {
  const trailsData = await parseTrailsData();

  checkDirectory();
  updateSummaryTrails(trailsData, 'Rosa Khutor');
}

run();
