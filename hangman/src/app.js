import {Hangman} from './hangman';

document.addEventListener('DOMContentLoaded', () => {

	let hangman;
    let $board = document.querySelector('.board');
	let $word = $board.querySelector('.word span');
	let $send = $board.querySelector('#send');
	let $reset = $board.querySelector('#reset');
	let $guess = $board.querySelector('input');
	let $screen = $board.querySelector('.results');
	let $results = $board.querySelector('.results span');
	let letter;

	//let url = 'http://watchout4snakes.com/wo4snakes/Random/RandomWord'; //Get a source for random words
	let url = 'source';

	//Initialize the game
	const init = () => {

		getWord().then(word => {
			hangman = new Hangman(word);

			$word.textContent = hangman.wordWithGuesses();
			$results.textContent = '';
			$screen.classList.remove('won');
			$screen.classList.remove('lost');


			$send.addEventListener('click', guess);
		});
	};

	//Mock data
	const getWord = () => {


		return fetch(url)
		.then(response => response.json())
		.then(words => {

			
			return words;
		
		}).catch(error => {

			console.log(error);

		});


	};

	const guess = () => {

		letter = $guess.value;

			hangman.guess(letter);

			$guess.value = '';

			$word.textContent = hangman.wordWithGuesses();

			let status = hangman.check();

		if(status ===1 ) {


			$results.textContent = 'You won!';
			$screen.classList.add('won');
			$send.removeEventListener('click', guess, true);

		}else if(status === -1) {


			$results.textContent = 'You lost!';
			$screen.classList.add('lost');
			$word.textContent = hangman.hiddenWord();
			$send.removeEventListener('click', guess, true);
		}
	};

	$reset.addEventListener('click', () => {

		init();
	
	});

	init();

});