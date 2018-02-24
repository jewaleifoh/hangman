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
	let $player = $board.querySelector('.player');
	let letter;
	let tries = 0;

	//let url = 'http://watchout4snakes.com/wo4snakes/Random/RandomWord'; //Get a source for random words
	let url = 'source';

	//Initialize the game
	const init = () => {

		tries = 0;
		$player.className= '';
		$player.classList.add('player');

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

			//Update player image if the guess is wrong.
			updatePlayer(hangman.getAttempts());
			

			$guess.value = '';

			$word.textContent = hangman.wordWithGuesses();

			let status = hangman.check();

			$results.textContent = hangman.wrongGuesses();

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

	const updatePlayer = status => {


		switch(status) {

			case 1:

				$player.classList.add('one');

			break;

				$player.classList.remove('one');
				$player.classList.add('two');

			case 2:

				$player.classList.remove('one');
				$player.classList.add('two');
			break;


			case 3:

				$player.classList.remove('two');
				$player.classList.add('three');
			break;


			case 4:

				$player.classList.remove('three');
				$player.classList.add('four');
			break;


			case 5:

				$player.classList.remove('four');
				$player.classList.add('five');
			break;


			case 6:

				$player.classList.remove('five');
				$player.classList.add('six');
			break;


			case 7:

				$player.classList.remove('six');
				$player.classList.add('seven');
			break;

			default:

		}
	};

	init();

});