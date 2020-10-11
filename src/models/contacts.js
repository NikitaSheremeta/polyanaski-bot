const fs = require('fs');
const path = require('path');

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

  async toMessage() {
    const data = await this.fetch();
    const message = Object.values(data);

    return message.join('\n\n');
  }
}

module.exports = Contacts;
