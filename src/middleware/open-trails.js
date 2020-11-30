const fs = require('fs');
const path = require('path');

const { logger } = require('../util/logger');
const dateFormat = require('../util/dateformat');

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
    return `${dateFormat('dddd, d mmmm HH:MM')}`;
  }

  // Message body template.
  preparingMessageBody(openTrails) {
    const bodyContent = [];

    openTrails.forEach((item) => {
      if (typeof item === 'string') {
        bodyContent.push(`\n<b>${item}</b>:`);
      } else {
        if (item.status !== 'closed') {
          bodyContent.push(`${item.complexity} ${item.title}`);
        }
      }
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
      // return this.ctx.i18n.t('shared.errorReceivingData');
    }
  }
}

module.exports = OpenTrails;