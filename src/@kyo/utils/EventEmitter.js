class EventEmitter {
  constructor() {
    this.events = {};
  }

  _getEventListByName(eventName) {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = new Set();
    }
    return this.events[eventName];
  }

  on(eventName, fn) {
    this._getEventListByName(eventName).add(fn);
  }

  once(eventName, fn) {
    const self = this;

    const onceFn = (...args) => {
      self.removeListener(eventName, onceFn);
      fn.apply(self, args);
    };
    this.on(eventName, onceFn);
  }

  emit(eventName, ...args) {
    this._getEventListByName(eventName).forEach(
      // eslint-disable-next-line func-names
      function (fn) {
        fn.apply(this, args);
      }.bind(this)
    );
  }

  removeListener(eventName, fn) {
    this._getEventListByName(eventName).delete(fn);
  }

  static hasPermission(authArr, userRole) {
    if (authArr === null || authArr === undefined) {
      // console.info("auth is null || undefined:", authArr);
      return true;
    }
    if (authArr.length === 0) {
      return !userRole || userRole.length === 0;
    }
    if (userRole && Array.isArray(userRole)) {
      return authArr.some((r) => userRole.indexOf(r) >= 0);
    }

    return authArr.includes(userRole);
  }
}

export default EventEmitter;