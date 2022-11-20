import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';

interface Props {
	emoji: string;
	isShown: boolean;
	index: number;
	onHandlePress: (index: number) => void;
}

const Card: FC<Props> = ({ emoji, isShown, index, onHandlePress }) => {
	return (
		<Pressable style={styles.card} onPress={() => onHandlePress(index)}>
			<Text style={styles.emoji}>{isShown ? emoji : '?'}</Text>
		</Pressable>
	);
};

export const styles = StyleSheet.create({
	card: {
		width: 100,
		height: 100,
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 25,
		margin: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emoji: {
		fontSize: 40,
		fontWeight: 'bold',
	},
});

export default Card;
