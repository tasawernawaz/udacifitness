import React, { Component } from 'react'
import  { View, TouchableOpacity, Text } from 'react-native'
import { getMetricMetaInfo, timeToString} from '../utils/helpers'
import UdaciSlider from '../components/UdaciSlider'
import UdaciSteppers from '../components/UdaciSteppers'
import DateHeader from '../components/DateHeader'
import {Ionicons} from '@expo/vector-icons'
import TextButton from '../components/TextButton'


function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
          onPress={onPress}>
            <Text>Submit</Text>
        </TouchableOpacity>
      )
}

export default class AddEntry extends Component {

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

        //update redux
        //navigate to home
        //save to db
        //clear local notifications
    }

    reset = () => {
        const key = timeToString()
        // update redux
        //redirect to home
        //update db
    }
    render () {
        const metaInfo = getMetricMetaInfo()
        if (this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons size={100} name='ios-happy-outline' />
                        <Text>You already have logged information for today.</Text>
                    <TextButton onPress={this.reset}>Reset</TextButton>
                </View>
            )
        }
        return (
            <View>
                <DateHeader date={(new Date().toLocaleDateString())}/>
                { Object.keys(metaInfo).map(key => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]
                    return (
                        <View key={key}>
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
                            />}
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}

