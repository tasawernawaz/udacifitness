import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform
  } from "react-native"
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import UdaciSlider from '../components/UdaciSlider'
import UdaciSteppers from '../components/UdaciSteppers'
import DateHeader from '../components/DateHeader'
import {Ionicons} from '@expo/vector-icons'
import TextButton from '../components/TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { white, purple } from '../utils/colors'

function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            style={
                Platform.OS === "ios" ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
            }
            onPress={onPress}
            >
          <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
      )
}

class AddEntry extends Component {

    state = {
        run: 6,
        bike: 4,
        swim: 3,
        sleep: 0,
        eat: 0
    }

    increament = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)
    this.setState((state) => {
        const count = state[metric] + step
        return {
        ...state,
        [metric]: count > max ? max : count,
        }
    })
    }

    decrement = (metric) => {
        const { step } = getMetricMetaInfo(metric)

        this.setState((currentState) => {
            const count = currentState[metric] - step
            return {
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        }))

        this.props.dispatch(addEntry({
            [key]: entry
          }))

        //navigate to home

        submitEntry({key, entry})

        //clear local notifications
    }

    reset = () => {
        const key = timeToString()
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
          }))
        //redirect to home
        removeEntry(key)
    }

    render () {
        const metaInfo = getMetricMetaInfo()
        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons size={100} name={Platform.OS === "ios" ? "ios-happy" : "md-happy"} />
                        <Text>You already have logged information for today.</Text>
                    <TextButton style={{ padding: 10 }} onPress={this.reset}>Reset</TextButton>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <DateHeader date={(new Date().toLocaleDateString())}/>
                { Object.keys(metaInfo).map(key => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]
                    return (
                        <View key={key} style={styles.row}>
                            {getIcon()}
                            {type === 'slider'
                            ? <UdaciSlider
                            value={value}
                            onChange={(value) => this.slide(key, value)}
                            {...rest}
                            />
                            : <UdaciSteppers
                            value={value}
                            onIncrement={() => this.increament(key)}
                            onDecrement={() => this.decrement(key)}
                            {...rest}
                            />}
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: white
},
row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
},
iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
},
AndroidSubmitBtn: {
    padding: 10,
    paddingLeft: 30,
    backgroundColor: purple,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
},
submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
},
center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30
}
})


function mapStateToProps (state) {
    const key = timeToString()

    return {
      alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
  }

export default connect(mapStateToProps)(AddEntry)