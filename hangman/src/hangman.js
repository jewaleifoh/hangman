/**
 * A class the represent the hangman game
 * the user guesses words until she discovers
 * the hidden world or the number of attemps 
 * is reached.
 */
export class Hangman {

	constructor(word, attempts = 7) {

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
	guess(letter) {
		let right = false;
		let updated = false;

		right = this.word.includes(letter.toLowerCase());
		updated = this._update(letter, right);

		if(updated && !right) {

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
	_update(letter, right) {
		let updated = false;

		if(this.correct.includes(letter) 
			|| this.incorrect.includes(letter)){

			return updated;
		}


		if(right && 
			!this.correct.includes(letter.toLowerCase())){

			this.correct += letter.toLowerCase();
			updated = true;

		}else if(!right &&
			!this.incorrect.includes(letter.toLowerCase())) {

			this.incorrect += letter.toLowerCase();
			updated = true;
		}

		return updated;
	}

	/**
	 * [guesses Contains the letters that have been guessed correctly.]
	 * @return {[String]} [The letters that have been guessed correctly.]
	 */
	guesses() {

		return this.correct;
	}

	/**
	 * [wrongGuesses Contains the letters that have been guessed incorrectly.]
	 * @return {[String]} [The letters that have been guessed incorrectly.]
	 */
	wrongGuesses() {

		return this.incorrect;
	}


	/**
	 * [hiddenWord The current the word.]
	 * @return {[String]} [The current.]
	 */
	hiddenWord() {

		return this.word;

	}

	/**
	 * [wordWithGuesses The current state of the word with the guesses.]
	 * @return {[String]} [The current state of the word with the guesses.]
	 */
	wordWithGuesses() {
		let result = 
		'-'.repeat(this.word.length);
		
		String.prototype.replaceAt = this.__replaceAt;
		
		for(let i=0; i < this.correct.length; i++) {

			let c = this.correct.charAt(i);

			for(let j= 0; j < this.word.length; j++) {

				let w = this.word.charAt(j);

				if(w == c) {

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
	check() {

		let game = 0;
		console.log(this.word, this.wordWithGuesses());
		if(this.word == this.wordWithGuesses()){

			game = 1;

		} else if(this.attempts >= this.max){

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
	__replaceAt(index, letter) {

		return this.substr(0, index) + letter 
		+ this.substr(index + letter.length);
	}
}