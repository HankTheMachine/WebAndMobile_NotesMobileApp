import { StyleSheet } from "react-native"

//A stylesheet to make our app beautiful
const styles = StyleSheet.create({
    headerText: {
        backgroundColor: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10,
    },
    muistutusText: {
        backgroundColor: 'white',
        fontSize: 15,
        padding: 12,
        flex: 1
    },
    inputField: {
        backgroundColor: 'rgb(230,230,230)',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        padding: 10,
    },
    inputButton: {
        backgroundColor: 'red',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        padding: 10,
    },
    container: {
        flex: 4
    }

});

export default styles;