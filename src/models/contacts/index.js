const path = require('path');
const fs = require('fs');

class Contacts {
  fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '../..', 'data', 'contacts.json'),
        'utf-8',
        (err, content) => err ? reject(err) : resolve(JSON.parse(content))
      );
    });
  }

  async getAll() {
    const data = await this.fetch();
    return data;
  }

  async toMessage() {
    const data = await this.fetch();
    let message = [];
    for (const key in data) {
      const value = Object.values(data[key]);
      if (value.length) message.push(...value);
    }
    message = message.join('\n\n');
    return message;
  }
}

module.exports = Contacts;
