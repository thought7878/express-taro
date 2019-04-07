import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtButton } from 'taro-ui'

class Search extends Component {
  config = {
    navigationBarTitleText: '表情搜索'
  }
  state = {
    value: ''
  }

  onChangeHandler = value => {
    console.log(value)

    this.setState({ value })
  }
  onActionClickHandler = () => {
    console.log('onActionClick')
  }
  onConfirmHandler = () => {
    console.log('onConfirm')
  }

  navigateTo = () => {
    Taro.switchTab({
      url: '/pages/me/index'
    })
  }

  render() {
    return (
      <View>
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChangeHandler.bind(this)}
          onConfirm={this.onConfirmHandler.bind(this)}
          onActionClick={this.onActionClickHandler.bind(this)}
        />
        <AtButton onClick={this.navigateTo}>我的</AtButton>
      </View>
    )
  }
}

export default Search
