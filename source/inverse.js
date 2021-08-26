'use strict';

const inverse = function inverse(arr = [], offset = 0) {
    return offset >= 0 ? arr.slice(0, offset).concat(arr.slice(offset).reverse()) : arr.slice(0, offset).reverse().concat(arr.slice(offset));
}