import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Forecast from './Forecast'

export default class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast: {
                main: '-', description: '-', temp: 0
            }
        }
    }

    fetchData = () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.props.zipCode},th&units=metric&APPID=fd68c0f2039c5a25f666a9ff374bc93e`)
        .then((response) => response.json())
        .then((json) => {
            this.setState({
                forecast: {
                    main: json.weather[0].main,
                    description: json.weather[0].description,
                    temp: json.main.temp
                }
            });
        })
        .catch((error) => {
            console.warn(error);
        });
    }
       
    componentDidMount = () => this.fetchData()
       
    
    render() {
        return (
        <View style={styles.container}>
        <ImageBackground source={require('../bg.jpeg')} style={styles.backdrop}>
        <Text style={styles.welcome}>Zip code is {this.props.zipCode}.</Text>
        <Forecast style={styles.forecast}{...this.state.forecast} />
        </ImageBackground>
        </View>
        );
    }
}
   
const styles = StyleSheet.create({
    container: { paddingTop: 25, flex: 1},
    backdrop: { width: '100%', height: '100%'},
    welcome: { alignItems: 'center', justifyContent:'center', textAlign:'center', fontSize: 30},
});
   