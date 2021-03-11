import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import  reducer from './reducers'

class App extends React.Component {
  render () {
    return (
      <Provider store={createStore(reducer)}>
        <View>
          <AddEntry />
        </View>
      </Provider>
    )
  }
}

export default App
