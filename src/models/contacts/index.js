const path = require('path');
const fs = require('fs');

class Contacts {
  static getData() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '../../', 'data', 'contacts.json'),
        'utf-8',
        (err, content) => err ? reject(err) : resolve(JSON.parse(content))
      );
    });
  }
}

module.exports = Contacts;
