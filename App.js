import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import AddEntry from './components/AddEntry'

class App extends React.Component {
  render () {
    return (
      <View>
        <AddEntry />
      </View>
    )
  }
}

export default App
