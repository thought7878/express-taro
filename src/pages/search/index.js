import Taro, { Component } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import { AtSearchBar, AtButton, AtActivityIndicator } from 'taro-ui'

class Search extends Component {
  config = {
    navigationBarTitleText: '表情搜索'
  }

  state = {
    value: '',
    images: [],
    pageNum: 1,
    length: 10,
    loading: false
  }
  // load more imgs
  onReachBottom() {
    console.log('onReachBottom')
    const { value, pageNum, length, images } = this.state
    if (value && images.length > 0) {
      this.setState({ loading: true })
      const start = pageNum * length
      this.requestSearchImgs(value, start, length).then(res => {
        this.setState({
          images: [...images, ...res.data.items],
          pageNum: pageNum + 1,
          loading: false
        })
      })
    }
  }

  onChangeHandler = value => {
    this.setState({ value })
  }
  // first request search imgs
  onActionClickHandler = () => {
    console.log('onActionClick')
    const { value } = this.state
    const start = 0
    const length = this.state.length
    if (value) {
      this.requestSearchImgs(value, start, length).then(res => {
        console.log(res.data.items)
        this.setState({ images: res.data.items })
      })
    }
  }

  // request search imgs
  requestSearchImgs(value, start, length) {
    if (value) {
      const searchBasicUrl = `https://pic.sogou.com/pics/json.jsp`
      const url = `${searchBasicUrl}?query=${value} 表情&st=5&start=${start}&xml_len=${length}&reqFrom=wap_result`
      return Taro.request({ url })
    }
  }

  onConfirmHandler = () => {
    console.log('onConfirm')
  }

  render() {
    const { images, loading } = this.state
    const imagesList = images.map((img, index) => (
      <View className="img-item mb-2" key={index}>
        <Image mode="aspectFit" src={img.locImageLink} className="list-img" />
      </View>
    ))

    return (
      <View className="page-container">
        <AtSearchBar
          // className=""
          value={this.state.value}
          onChange={this.onChangeHandler.bind(this)}
          onConfirm={this.onConfirmHandler.bind(this)}
          onActionClick={this.onActionClickHandler.bind(this)}
        />
        <View className="img-list pt-2">{imagesList}</View>

        {loading && (
          <View className="activity-indicator-container mb-2">
            <AtActivityIndicator content="加载中..." mode="normal" />
          </View>
        )}
      </View>
    )
  }
}

export default Search
