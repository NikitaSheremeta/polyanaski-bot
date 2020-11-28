const fs = require('fs');
const path = require('path');

const { logger } = require('../util/logger');

class OpenTrails {
  constructor(ctx, resort = 'roza-khutor') {
    this.ctx = ctx;
    this.resort = resort;
  }

  async connectToOpenTrails() {
    const filepath = path.join(__dirname, '..', 'data', 'open-trails.json');

    return new Promise((resolve, reject) => {
      fs.readFile(filepath, 'utf-8', (error, content) => {
        if (error) {
          logger.debug(this.ctx, error);

          reject(error);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }

  async getMessage() {
    try {
      return await this.connectToOpenTrails();
    } catch (error) {
      return this.ctx.i18n.t('shared.errorReceivingData');
    }
  }
}

module.exports = OpenTrails;
