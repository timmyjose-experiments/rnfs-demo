import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./screens/Home"
import Demo from "./screens/Demo"
import { Provider } from "react-redux"
import { store } from "./store/store"

export type RootStackParamList = {
  Home: undefined
  Demo: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Demo' component={Demo} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App