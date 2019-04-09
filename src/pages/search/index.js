import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import {
  AtSearchBar,
  AtActivityIndicator,
  AtTabs,
  AtTabsPane,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtButton,
  AtIcon
} from 'taro-ui'

class Search extends Component {
  config = {
    navigationBarTitleText: '表情搜索'
  }

  state = {
    value: '',
    images: [],
    pageNum: 1,
    length: 10,
    loading: false,
    currentTab: 0,
    isShowModal: false,
    modalImg: {}
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
        }).catch(error => {
          console.log(error.message)
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
      this.requestSearchImgs(value, start, length)
        .then(res => {
          console.log(res.data.items)
          this.setState({ images: res.data.items })
        })
        .catch(error => {
          console.log(error.message)
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
    console.log('onConfirm invoked onActionClickHandler')
    this.onActionClickHandler()
  }

  handleTabClick(value) {
    this.setState({
      currentTab: value
    })
  }

  clickImgHandler(e) {
    console.log('clickImg', e)
    e.stopPropagation()
    const img = e.currentTarget.dataset.img
    this.setState({
      isShowModal: true,
      modalImg: img
    })
    console.log(img)
  }

  // modal event handler
  handleModalClose() {
    this.setState({
      isShowModal: false,
      modalImg: {}
    })
  }
  handleCancel() {
    console.log('handleCancel')
  }
  handleConfirm() {
    console.log('handleConfirm')
  }

  render() {
    const { images, loading, isShowModal, modalImg } = this.state
    //
    const imagesList = images.map((img, index) => (
      <View
        className="img-item mb-2"
        key={index}
        data-img={img}
        onClick={this.clickImgHandler.bind(this)}
      >
        <Image mode="aspectFit" src={img.oriPicUrl} className="list-img" />
      </View>
    ))
    const tabList = [{ title: '表情' }, { title: '表情包' }]
    //
    return (
      <View className="page-container">
        <AtSearchBar
          // className=""
          value={this.state.value}
          onChange={this.onChangeHandler.bind(this)}
          onConfirm={this.onConfirmHandler.bind(this)}
          onActionClick={this.onActionClickHandler.bind(this)}
        />
        <AtTabs
          current={this.state.currentTab}
          tabList={tabList}
          onClick={this.handleTabClick.bind(this)}
          swipeable={false}
          animated={true}
        >
          <AtTabsPane current={this.state.currentTab} index={0}>
            <View className="img-list pt-2">{imagesList}</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.currentTab} index={1}>
            <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
              标签页二的内容
            </View>
          </AtTabsPane>
        </AtTabs>

        {loading && (
          <View className="activity-indicator-container mb-2">
            <AtActivityIndicator content="加载中..." mode="normal" />
          </View>
        )}
        {/* modal */}
        <AtModal
          // isOpened={true}
          isOpened={isShowModal}
          onClose={this.handleModalClose}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        >
          <AtModalContent>
            <View className="modal-img-container">
              {modalImg.oriPicUrl && (
                <Image
                  mode="aspectFit"
                  // src="https://i02picsos.sogoucdn.com/423c9ef490d9b335"

                  src={modalImg.oriPicUrl}
                  className="modal-img"
                />
              )}
            </View>
          </AtModalContent>
          {/* <AtModalAction> */}
          <View className="modal-btn-container py-2">
            <AtButton
              // type="secondary"
              // className="at-icon at-icon-heart"
              // circle="50"
              size="small"
            >
              <AtIcon value="heart" size="18" color="#F00" />
              收藏
            </AtButton>
            <AtButton
              // className="at-icon at-icon-share"
              // circle="50"
              size="small"
            >
              <AtIcon value="share" size="18" color="#F00" />
              发送
            </AtButton>
            {/* <AtButton
                // className="at-icon at-icon-download"
                // circle="50"
                size="small"
              >
                <AtIcon value="download" size="18" color="#F00" />
                保存
              </AtButton> */}
          </View>
          {/* </AtModalAction> */}
          {/* <View className="modal-ad-container">
            <Image
              mode="aspectFit"
              src="http://cdn.clm02.com/ezvivi.com/266530/1499736916_204.jpeg"
              className="modal-ad-img"
            />
          </View> */}
        </AtModal>
      </View>
    )
  }
}

export default Search
