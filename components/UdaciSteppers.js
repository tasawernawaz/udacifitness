import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {FontAwesome, Entypo} from '@expo/vector-icons'

export default function UdaciSteppers({max, unit, step, value, onIncreament, onDecrement}) {
    return (
        <View>
            <View>
                <TouchableOpacity onPress={onDecrement}>
                    <FontAwesome name='minus' size={30} color={'black'}></FontAwesome>
                </TouchableOpacity>
                <TouchableOpacity onPress={onIncreament}>
                    <FontAwesome name='plus' size={30} color={'black'}></FontAwesome>
                </TouchableOpacity>
            </View>
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>

    )
}