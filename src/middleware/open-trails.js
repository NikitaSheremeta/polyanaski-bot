const fs = require('fs');
const path = require('path');
const moment = require('moment');

const { logger } = require('../util/logger');

moment.locale('ru');

class OpenTrails {
  constructor(ctx, resort) {
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

  // Message header template.
  preparingHeaderBody() {
    return `${moment().format('dddd, Do MMMM HH:mm')}`;
  }

  createTrailsContent(trails) {
    const trailsContent = [];

    trails.forEach((item) => {
      if (item.status !== 'closed') {
        trailsContent.push(`${item.complexity} ${item.title}`);
      }
    });

    if (trailsContent.length === 0) {
      trailsContent.push(this.ctx.i18n.t('scenes.openTrails.allTrailsClosed'));
    }

    return trailsContent;
  }

  // Message body template.
  preparingMessageBody(openTrails) {
    const bodyContent = [];

    openTrails.forEach((item) => {
      const trailsContent = this.createTrailsContent(item.trails);

      const title = `\n<b>${item.sectorName}</b>:`;

      bodyContent.push(title, ...trailsContent);
    });

    return bodyContent;
  }

  async createMessage() {
    const openTrails = await this.connectToOpenTrails();

    const messageHeader = this.preparingHeaderBody();
    const messageBody = this.preparingMessageBody(openTrails[this.resort]);

    const messageArray = [messageHeader, ...messageBody];

    return messageArray.join('\n');
  }

  async getMessage() {
    try {
      return await this.createMessage();
    } catch (error) {
      return this.ctx.i18n.t('shared.errorReceivingData');
    }
  }
}

module.exports = OpenTrails;
