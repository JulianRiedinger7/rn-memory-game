import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardList from './components/CardList';

const Main = () => {
	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<Text style={styles.title}>Memory Game</Text>
			<CardList />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0f172a',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		color: '#efefef',
		fontSize: 30,
		fontWeight: '900',
	},
});

export default Main;
