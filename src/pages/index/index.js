import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'

@connect(
  ({ counter }) => ({
    counter
  }),
  dispatch => ({
    add() {
      dispatch(add())
    },
    dec() {
      dispatch(minus())
    },
    asyncAdd() {
      dispatch(asyncAdd())
    }
  })
)
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  async componentWillMount() {
    const res = await Taro.request({
      url: `${BASE_API}/products`
    })
    console.log(res)
  }

  render() {
    return (
      <View className="index">
        <AtButton type="primary" onClick={this.props.add}>
          +
        </AtButton>
        <AtButton type="primary" className="mt-3" onClick={this.props.dec}>
          -
        </AtButton>
        <AtButton
          type="secondary"
          className="mt-3"
          loading={true}
          onClick={this.props.asyncAdd}
        >
          async
        </AtButton>
        <View>
          <Text>{this.props.counter.num}</Text>
        </View>
        <View>
          <Text>Hello, World</Text>
        </View>
      </View>
    )
  }
}

export default Index
