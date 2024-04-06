// @ts-nocheck

const patchArrays = (): void => {
  Array.prototype.count = function () {
    return this.length;
  };

  Array.prototype.insert = function (index: unknown, value: unknown) {
    if (typeof index !== 'number') {
      throw new Error('INVALID_ARGUMENT');
    }
    if (index <= 0) {
      this.unshift(value);
      return this;
    }
    if (index > this.length) {
      this.push(value);
      return this;
    }

    this.splice(index, 0, value);
    return this;
  };

  Array.prototype.remove = function (value: unknown) {
    const index = this.indexOf(value);
    if (index !== -1) {
      this.splice(index, 1);
    }
    return this;
  };
};

export default patchArrays;
