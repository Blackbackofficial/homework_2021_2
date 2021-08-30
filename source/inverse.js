'use strict';
/**
 * Меняет порядок элементов в arr на противоположный. Если в функцию вторым аргументом передаётся число —
 * то переставляются все элементы массива кроме нескольких первых (количество зависит от числа).
 * Если число отрицательное — то на месте остаются элементы в конце массива
 * @param arr {any[]} - перебираемый массив
 * @param offset {number} - число отступа
 * @returns {*[]} - результирующий перевернутый массив
 */
const inverse = (arr = [], offset = 0) => {
    const cutArr = arr.slice(0, offset);
    const moreOffset = cutArr.concat(arr.slice(offset).reverse());
    const lessOffset = cutArr.reverse().concat(arr.slice(offset));
    return offset >= 0 ? moreOffset : lessOffset;
}