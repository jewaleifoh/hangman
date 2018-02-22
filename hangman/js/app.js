/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hangman = __webpack_require__(1);

document.addEventListener('DOMContentLoaded', function () {

	var hangman = void 0;
	var $board = document.querySelector('.board');
	var $word = $board.querySelector('.word span');
	var $send = $board.querySelector('#send');
	var $reset = $board.querySelector('#reset');
	var $guess = $board.querySelector('input');
	var $screen = $board.querySelector('.results');
	var $results = $board.querySelector('.results span');
	var letter = void 0;

	//let url = 'http://watchout4snakes.com/wo4snakes/Random/RandomWord'; //Get a source for random words
	var url = 'source';

	//Initialize the game
	var init = function init() {

		getWord().then(function (word) {
			hangman = new _hangman.Hangman(word);

			$word.textContent = hangman.wordWithGuesses();
			$results.textContent = '';
			$screen.classList.remove('won');
			$screen.classList.remove('lost');

			$send.addEventListener('click', guess);
		});
	};

	//Mock data
	var getWord = function getWord() {

		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (words) {

			return words;
		}).catch(function (error) {

			console.log(error);
		});
	};

	var guess = function guess() {

		letter = $guess.value;

		hangman.guess(letter);

		$guess.value = '';

		$word.textContent = hangman.wordWithGuesses();

		var status = hangman.check();

		if (status === 1) {

			$results.textContent = 'You won!';
			$screen.classList.add('won');
			$send.removeEventListener('click', guess, true);
		} else if (status === -1) {

			$results.textContent = 'You lost!';
			$screen.classList.add('lost');
			$word.textContent = hangman.hiddenWord();
			$send.removeEventListener('click', guess, true);
		}
	};

	$reset.addEventListener('click', function () {

		init();
	});

	init();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A class the represent the hangman game
 * the user guesses words until she discovers
 * the hidden world or the number of attemps 
 * is reached.
 */
var Hangman = exports.Hangman = function () {
	function Hangman(word) {
		var attempts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;

		_classCallCheck(this, Hangman);

		this.word = word.toLowerCase();
		this.correct = '';
		this.incorrect = '';
		this.max = attempts;
		this.attempts = 0;
	}

	/**
  * [guess Indicates if a guess was wrong or right.]
  * @param  {[String]} letter [The letter to guess.]
  * @return {[Boolean]}        [True if the word contains 
  *                                  the letter and false otherwise.]
  */


	_createClass(Hangman, [{
		key: 'guess',
		value: function guess(letter) {
			var right = false;
			var updated = false;

			right = this.word.includes(letter.toLowerCase());
			updated = this._update(letter, right);

			if (updated && !right) {

				this.attempts++;
			}

			return right && updated;
		}

		/**
   * [_update Updates the list of wrong and right letters.]
   * @param  {[String]} letter [The letter to add.]
   * @param  {[Boolean]} right  [Indicates if the guess was right]
   * @return {[Boolean]}        [True if the list were updated 
   *                                  and false otherwise]
   */

	}, {
		key: '_update',
		value: function _update(letter, right) {
			var updated = false;

			if (this.correct.includes(letter) || this.incorrect.includes(letter)) {

				return updated;
			}

			if (right && !this.correct.includes(letter.toLowerCase())) {

				this.correct += letter.toLowerCase();
				updated = true;
			} else if (!right && !this.incorrect.includes(letter.toLowerCase())) {

				this.incorrect += letter.toLowerCase();
				updated = true;
			}

			return updated;
		}

		/**
   * [guesses Contains the letters that have been guessed correctly.]
   * @return {[String]} [The letters that have been guessed correctly.]
   */

	}, {
		key: 'guesses',
		value: function guesses() {

			return this.correct;
		}

		/**
   * [wrongGuesses Contains the letters that have been guessed incorrectly.]
   * @return {[String]} [The letters that have been guessed incorrectly.]
   */

	}, {
		key: 'wrongGuesses',
		value: function wrongGuesses() {

			return this.incorrect;
		}

		/**
   * [hiddenWord The current the word.]
   * @return {[String]} [The current.]
   */

	}, {
		key: 'hiddenWord',
		value: function hiddenWord() {

			return this.word;
		}

		/**
   * [wordWithGuesses The current state of the word with the guesses.]
   * @return {[String]} [The current state of the word with the guesses.]
   */

	}, {
		key: 'wordWithGuesses',
		value: function wordWithGuesses() {
			var result = '-'.repeat(this.word.length);

			String.prototype.replaceAt = this.__replaceAt;

			for (var i = 0; i < this.correct.length; i++) {

				var c = this.correct.charAt(i);

				for (var j = 0; j < this.word.length; j++) {

					var w = this.word.charAt(j);

					if (w == c) {

						result = result.replaceAt(j, w);
					}
				}
			}
			return result;
		}

		/**
   * [check Indicates the currrent status of the game.]
   * @return {[type]} [-1 if the player lost, 0 if the game continutes
   *                      and 1 if the player won.]
   */

	}, {
		key: 'check',
		value: function check() {

			var game = 0;
			if (this.word == this.wordWithGuesses()) {

				game = 1;
			} else if (this.attempts >= this.max) {

				game = -1;
			}

			return game;
		}

		/**
   * [__replaceAt Replace the character at a given position.]
   * @param  {[Integer]} index [The letter will be replaced.]
   * @param  {[String]} letter  [The letter to replace.]
   * @return {[String]}       [A word with a letter replaced.]
   */

	}, {
		key: '__replaceAt',
		value: function __replaceAt(index, letter) {

			return this.substr(0, index) + letter + this.substr(index + letter.length);
		}
	}]);

	return Hangman;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map