import * as React from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './styles';

class MainMenu extends React.Component {
  state = {
    newNote: '',
    notes: [
      {"id": 1,"name": "Note 1"},
      {"id": 2,"name": "Note 2"},
      {"id": 3,"name": "Note 3"}
    ]
  }
  handleNoteChange = (text) => {this.setState({ newNote: text })}

  pushNote = (props) => {const note = {id: this.state.notes.length+1,name: this.state.newNote}
    console.log("Muistutus vastaanotettu. Muistutus: "+this.state.newNote)
    this.setState({notes: this.state.notes.concat(note)})
  }

  addNote = (text) => {
    this.setState({newNote: text})
    const note = {
      id: this.state.notes.length+1,
      name: text
    }
    if(!this.state.notes.find(muistutus => muistutus.name === note.name)) { 
      this.pushNote()
    }
    else {
      Alert.alert(
        "Muistiinpano on jo listassa.",
        "Lisätäänkö silti?",
        [
          {
            text: "Peruuta",
            onPress: () => console.log("Käyttäjä peruutti lähetyksen."),
            style: "cancel"
          },
          { text: "Ok", onPress: () => {
            this.setState({newNote: text})
            console.log("Käyttäjä lähetti duplikaatin TAHALLAAN")
            this.pushNote()
            }}
        ]
      );
    }  
  }

  render() {
    return (
      <View>
        <Button title="Muistiinpanot" onPress={() => this.props.navigation.navigate('Notes', {
          notesParam: this.state.notes}
        )} 
        />
        <Button title="Muistiinpanon lisäys" onPress={() => this.props.navigation.navigate('AddNoteScreen' ,{
          addNoteParam: this.addNote,
          handleNoteChangeParam: this.handleNoteChange})} />
      </View>
    )
  }
}

class AddNoteScreen extends React.Component {

  state= {
    newNote: '',
  }
  handleNoteChange = (text) => {
    this.setState({ newNote: text })
  }

  render() {
    return (
      <View>
        <View>
          <TextInput style={styles.inputField}
            placeholder="Lisää muistutus"
            value={this.newNote}
            onChangeText={(val) => {
              this.props.route.params.handleNoteChangeParam(val)
              this.handleNoteChange(val)}
            }
            />
          <Button style= {styles.inputButton} title="Send" onPress={()=> this.props.route.params.addNoteParam(this.state.newNote)}/>
      </View>
      </View>
    )
  }
}

class NotesList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        error: false,
      }  
    }
  
  componentDidMount() {
    this.setState({
      loading:false,
      newNote: ''
    })
  }

  render() {
    let notesParam = this.props.route.params.notesParam
    if (this.state.loading) {
      return (<View><ActivityIndicator animating={true} /></View>)} 
    if (this.state.error) {
      return (<View><Text>Jotakin meni pieleen!</Text></View>)}
    return (
    <View style={{flex:1}}>
      <ScrollView style={{flex: 16}}>
        <Text style={styles.headerText}>Muistutukset:</Text>
        {notesParam.map(note =>
          <Note
            key={note.id}
            name={note.name}
            id={note.id}
            navigation={this.props.navigation}
          />)}
      </ScrollView>
      </View>
    );
  }
}

const Note = (props) => {return (<Text style={styles.muistutusText}>{props.name}</Text>)}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="Notes" component={NotesList} />
        <Stack.Screen name="AddNoteScreen" component={AddNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;