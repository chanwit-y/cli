import { get } from "lodash";

declare global {
  interface Array<T> {
    first(): T | undefined;
    last(): T | undefined;
  }
}

Array.prototype.first = function () {
  return get(this, "[0]");
};

Array.prototype.last = function () {
  return get(this, "[-1]");
};
