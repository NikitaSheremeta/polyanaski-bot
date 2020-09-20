const path = require('path');
const fs = require('fs');

class Contacts {
  fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'locales', 'contacts-ru.json'),
        'utf-8',
        (err, content) => err ? reject(err) : resolve(JSON.parse(content))
      );
    });
  }

  async getAll() {
    return await this.fetch();
  }

  async toMessage() {
    const data = await this.fetch();
    const message = [];
    for (const key in data) {
      const value = Object.values(data[key]);
      if (value.length) message.push(...value);
    }
    return message.join('\n\n');
  }
}

module.exports = Contacts;
