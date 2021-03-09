class Common {
  static linearSearch(array, element) {
    for (let index = 0; index < array.length; index++) {
      if (array[index] === element) {
        return true;
      }
    }

    return false;
  }
}

module.exports = Common;
