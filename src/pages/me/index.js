import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class Me extends Component {
  config = {
    navigationBarTitleText: '我的'
  }

  render() {
    return <View>我的信息</View>
  }
}

export default Me
