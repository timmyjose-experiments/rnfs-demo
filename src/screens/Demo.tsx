import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Pressable, Text, View } from 'react-native'
import { styles } from '../styles'
import { decrement, getCounterSelector, increment } from '../store/counterSlice'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'

const Demo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const counter = useAppSelector(getCounterSelector)
  const dispatch = useAppDispatch()

  const handleIncrement = useCallback(async () => {
    dispatch(increment())
  }, [dispatch])

  const handleDecrement = useCallback(async () => {
    dispatch(decrement())
  }, [dispatch])

  return (
    <View style={styles.container}>
      <Text>Counter: {counter}</Text>
      <View style={{ flexDirection: 'row'}}>
        <Pressable
          style={styles.smallButton}
          onPress={() => handleIncrement()}>
          <Text>Inc</Text>
        </Pressable>
        <Pressable
          style={styles.smallButton}
          onPress={() => handleDecrement()}>
          <Text>Dec</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </Pressable>
    </View>
  )
}

export default Demo