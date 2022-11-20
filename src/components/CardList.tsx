import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Card from './Card';
import cards from '../../data';

const shuffleCards = (array: string[]) => array.sort(() => Math.random() - 0.5);

const CardList = () => {
	const [board, setBoard] = useState<string[]>(() =>
		shuffleCards([...cards, ...cards])
	);
	const [selectedCards, setSelectedCards] = useState<number[]>([]);
	const [matchedCards, setMatchedCards] = useState<number[]>([]);
	const [movements, setMovements] = useState<number>(0);

	useEffect(() => {
		if (selectedCards.length < 2) return;
		if (board[selectedCards[0]] === board[selectedCards[1]]) {
			setSelectedCards([]);
			setMatchedCards([...matchedCards, ...selectedCards]);
		} else {
			const timeout = setTimeout(() => {
				setSelectedCards([]);
			}, 500);

			return () => clearInterval(timeout);
		}
	}, [selectedCards]);

	const onHandlePress = (index: number) => {
		if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
		setSelectedCards([...selectedCards, index]);
		setMovements((prevMovements) => prevMovements + 1);
	};

	const onHandleReset = () => {
		setBoard(() => shuffleCards([...cards, ...cards]));
		setMovements(0);
		setSelectedCards([]);
		setMatchedCards([]);
	};

	const playerWon = matchedCards.length === board.length;

	return (
		<>
			<Text style={styles.subheading}>Movements: {movements}</Text>
			<Text style={styles.subheading}>
				{playerWon ? 'Congratulations 🎉🎊' : null}
			</Text>
			{playerWon ? (
				<ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
			) : null}
			<View style={styles.board}>
				{board.map((emoji, index) => {
					const isShown =
						selectedCards.includes(index) || matchedCards.includes(index);

					return (
						<Card
							key={index}
							emoji={emoji}
							isShown={isShown}
							onHandlePress={onHandlePress}
							index={index}
						/>
					);
				})}
			</View>
			{playerWon ? (
				<TouchableOpacity style={styles.button} onPress={onHandleReset}>
					<Text style={styles.buttonText}>Play Again!</Text>
				</TouchableOpacity>
			) : null}
		</>
	);
};

const styles = StyleSheet.create({
	board: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	subheading: {
		color: 'white',
		fontSize: 18,
		fontWeight: '600',
	},
	button: {
		marginTop: 10,
		backgroundColor: 'pink',
		padding: 10,
		borderRadius: 20,
	},
	buttonText: {
		color: 'white',
		fontSize: 20,
		fontWeight: '900',
	},
});

export default CardList;
