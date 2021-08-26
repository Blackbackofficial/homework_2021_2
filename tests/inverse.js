'use strict';

QUnit.module('Тестируем функцию inverse', function () {
	QUnit.test('Функция работает с пустым массивом', function (assert) {
		assert.deepEqual(inverse([]), []);
	});

	QUnit.test('Функция работает с не переданным массивом', function (assert) {
		assert.deepEqual(inverse(undefined), []);
	});

	QUnit.test('Функция работает с массивом длины один', function (assert) {
		assert.deepEqual(inverse([ 1 ]), [ 1 ]);
		assert.deepEqual(inverse([ 'a' ]), [ 'a' ]);
		assert.deepEqual(inverse([ null ]), [ null ]);
		assert.deepEqual(inverse([ false ]), [ false ]);
		assert.deepEqual(inverse([ Node ]), [ Node ]);
		assert.deepEqual(inverse([ NaN ]), [ NaN ]);
		assert.deepEqual(inverse([ undefined ]), [ undefined ]);
	});
	QUnit.test('Функция работает с массивом объектов', function (assert) {
		assert.deepEqual(inverse(
			[
				{ name: 'Vasya', type: 'Cat', age: 4},
				{ name: 'Murka', type: 'Cat', age: 1.5 },
				{ name: 'Varna', type: 'Turtle', age: 21 },
				{ name: 'Kesha', type: 'Parrot', age: 3 },
				{ name: 'Nayda', type: 'Dog', age: 2.5 }],
				-3),
			[
				{ name: 'Murka', type: 'Cat', age: 1.5 },
				{ name: 'Vasya', type: 'Cat', age: 4},
				{ name: 'Varna', type: 'Turtle', age: 21 },
				{ name: 'Kesha', type: 'Parrot', age: 3 },
				{ name: 'Nayda', type: 'Dog', age: 2.5 }
			]);
	});

	QUnit.test('Функция работает, если в неё передан только массив', function (assert) {
		assert.deepEqual(inverse([ 1, 2, 3, 4, 5 ]), [ 5, 4, 3, 2, 1 ]);
		assert.deepEqual(inverse([ 'a', 'b', 'c', 'd', 'e' ]), [ 'e', 'd', 'c', 'b', 'a' ]);
		assert.deepEqual(inverse([ null, false, 0, Infinity, '' ]), [ '', Infinity, 0, false, null ]);
	});

	QUnit.test('Функция не переставляет первые элементы массива', function (assert) {
		assert.deepEqual(inverse([ 1, 2, 3, 4, 5 ], 0), [ 5, 4, 3, 2, 1 ]);
		assert.deepEqual(inverse([ 1, 2, 3, 4, 5 ], 1), [ 1, 5, 4, 3, 2 ]);
		assert.deepEqual(inverse([ 1, 2, 3, 4, 5 ], 2), [ 1, 2, 5, 4, 3 ]);
		assert.deepEqual(inverse([ 1, 2, 3, 4, 5 ], 5), [ 1, 2, 3, 4, 5 ]);
		assert.deepEqual(inverse([ 1, 2, 3, 4, 5 ], 15), [ 1, 2, 3, 4, 5 ]);
	});

	QUnit.test('Функция не переставляет последние элементы массива', function (assert) {
		assert.deepEqual(inverse([ 1, 2, 3, 4, 5 ], 0), [ 5, 4, 3, 2, 1 ]);
		assert.deepEqual(inverse([ 1, 2, 3, 4, 5 ], -1), [ 4, 3, 2, 1, 5 ]);
		assert.deepEqual(inverse([ 1, 2, 3, 4, 5 ], -2), [ 3, 2, 1, 4, 5 ]);
		assert.deepEqual(inverse([ 1, 2, 3, 4, 5 ], -5), [ 1, 2, 3, 4, 5 ]);
		assert.deepEqual(inverse([ 1, 2, 3, 4, 5 ], -15), [ 1, 2, 3, 4, 5 ]);
	});

	QUnit.test('Функция не переставляет последние элементы массива слов', function (assert) {
		assert.deepEqual(inverse([ 1, 2, 3, 4, 5 ], 0), [ 5, 4, 3, 2, 1 ]);
		assert.deepEqual(inverse([ 'a', 'b', 'c', 'd', 'e' ], -1), [ 'd', 'c', 'b', 'a', 'e' ]);
		assert.deepEqual(inverse([ 'a', 'b', 'c', 'd', 'e' ], -2), [ 'c', 'b', 'a', 'd', 'e' ]);
		assert.deepEqual(inverse([ 'a', 'b', 'c', 'd', 'e' ], -5), [ 'a', 'b', 'c', 'd', 'e' ]);
		assert.deepEqual(inverse([ 'a', 'b', 'c', 'd', 'e' ], -100), [ 'a', 'b', 'c', 'd', 'e' ]);
	});

	QUnit.test('Тестирование различных типов данных', function (assert) {
		assert.deepEqual(inverse([ 11111111111111111111111111111111111111111111111111111111111n, 2222222222222222222222222222222n, 3333333333333333333333333333n, 44444444444444444444444444444n ], '-1'),
			[ 3333333333333333333333333333n, 2222222222222222222222222222222n, 11111111111111111111111111111111111111111111111111111111111n, 44444444444444444444444444444n ]);
		assert.deepEqual(inverse([ Infinity, Infinity, NaN, NaN ], -1), [ NaN, Infinity, Infinity, NaN ]);
		assert.deepEqual(inverse([ undefined, undefined, null, undefined, null ], -2), [ null, undefined, undefined, undefined, null ]);
		assert.notDeepEqual(inverse([ Math, undefined, null, undefined, null ], -2), [ null, undefined, 'Math', undefined, null ]); // Math object
		assert.deepEqual(inverse([ Math, undefined, alert, undefined, null ], -2), [ alert, undefined, Math, undefined, null ]);
	});

	QUnit.test('Большие массивы', function (assert) {
		let start_arr = []
		for (let i = 0; i < 10000001; i++) {
			start_arr[i] = i;
		}
		assert.deepEqual(inverse(start_arr, -100000001 ), start_arr);
	});
});
