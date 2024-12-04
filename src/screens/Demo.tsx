import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Pressable, Text, View } from 'react-native'
import { styles } from '../styles'
import { decrement, getCounterSelector, increment } from '../store/counterSlice'
import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import largeDataJson from '../../largeData.json'
import smallDataJson from '../../smallData.json'
import { setLargeData } from '../store/largeSlice'
import { setSmallData } from '../store/smallSlice'

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

  const showAllKeys = useCallback(async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys()
      console.log(`All AsyncStorage Keys: ${allKeys}`)
    } catch (err: any) {
      console.error(err)
    }
  }, [])

  const storeLargeData = async () => {
    try {
      dispatch(setLargeData(largeDataJson))
    } catch(err: any) {
      console.error(err)
    }
  }

  const storeSmallData = async () => {
    try {
      dispatch(setSmallData(smallDataJson))
    } catch(err: any) {
      console.error(err)
    }
  }

  const showData = async () => {
    try {
      const data = await AsyncStorage.getItem('persist:root')
      console.log(`Persisted Large Data: ${data}`)
    } catch (err: any) {
      console.error(err)
    }
  }


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
      <View style={{ flexDirection: 'row'}}>
        <Pressable
          style={styles.smallButton}
          onPress={showAllKeys}>
          <Text>Show All Keys</Text>
        </Pressable>
        <Pressable
          style={styles.smallButton}
          onPress={storeSmallData}>
          <Text>Store Small</Text>
        </Pressable>
        <Pressable
          style={styles.smallButton}
          onPress={storeLargeData}>
          <Text>Store Large</Text>
        </Pressable>
        <Pressable
          style={styles.smallButton}
          onPress={showData}>
          <Text>Show Data</Text>
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