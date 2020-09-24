class Session {
  static set(key, value) {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    sessionStorage.setItem(key, value);
  }

  static get(key) {
    const value = sessionStorage.getItem(key);

    try {
      return JSON.parse(value);
    } catch (ex) {
      return value;
    }
  }

  static remove(key) {
    sessionStorage.removeItem(key);
  }
}

export default Session;
