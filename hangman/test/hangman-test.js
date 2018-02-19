import {Hangman} from '../js/hangman';
import {expect} from 'chai';

describe('Hangman', () => {

	let hangman;

	beforeEach(() => {

		hangman = new Hangman('Hello');
	});

	describe('guess()', () => {


		it('Should return true when a letter is guessed.', () => {


			expect(hangman.guess('h')).to.true;
		});


		it('Should return false when a letter is not guessed.', () => {

			expect(hangman.guess('m')).to.false;
			
		});

	});

	describe('#update()', () => {

		it('Should return true if the letter has not been guessed.', () => {

			let updated = hangman._update('h');

			expect(updated).to.true;
		});


		it('Should return false if the letter has been guessed before.', () => {

			let updated = hangman._update('h');
			expect(updated).to.true;

		});


		it('Should add correct guess to the letters guessed corrently.', () => {

			let updated = hangman._update('h');
			expect(updated).to.true;
		});


		it('Should add incorrect guess to the letters guessed incorrectly.', () => {


			let updated = hangman._update('m');
			expect(updated).to.true;
		});
	});

	describe('#guesses()', () => {

		it('Should contain the letters guessed correctly.', () => {

			hangman.guess('h');
			let guesses = hangman.guesses();
			expect(guesses.includes('h')).to.true;
			expect(guesses.includes('e')).to.false;
		});

	});

	describe('#wrongGuesses()', () => {

		it('Should contain the letters guessed wrongly.', () => {

			hangman.guess('f');
			let guesses = hangman.wrongGuesses();
			expect(guesses.includes('f')).to.true;
			expect(guesses.includes('h')).to.false;

		});

	});

	describe('#wordWithGuesses()', () => {

		it('Should return the world with guesses.', () => {

			let guess = hangman.guess('l');

			expect(guess).to.true;
			expect(hangman.wordWithGuesses()).to.equal('--ll-');

		});
	});

	describe('#check()', () =>{


		it('Should return -1 if the player lost.', () => {

			hangman.guess('a');
			hangman.guess('b');
			hangman.guess('c');
			hangman.guess('g');
			hangman.guess('d');
			hangman.guess('f');
			hangman.guess('i');

			expect(hangman.check()).to.equal(-1);

		});

		it('Should return 0 if the game continues.', () => {

			
			hangman.guess('h');
			hangman.guess('l');
			hangman.guess('o');

			expect(hangman.check()).to.equal(0);

		});

		it('Should return 1 if the player won.', () => {

			hangman.guess('h');
			hangman.guess('l');
			hangman.guess('e');
			hangman.guess('o');

			expect(hangman.check()).to.equal(1);

		});
	});
});