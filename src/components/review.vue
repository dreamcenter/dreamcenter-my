<template>
  <div>
    <form @submit.prevent="commit">
      <!-- <input class="input-text" placeholder="昵称(必填)" v-model="review.nickname"/>
      <input class="input-text" type="email" placeholder="邮箱(必填)" v-model="review.email"/>
      <input class="input-text" placeholder="网址(选填)" v-model="review.url"/> -->
      <!-- 申请必要 : 名称、头像、链接、简述 -->
      <textarea placeholder="在此留言评论o(*￣▽￣*)ブ" v-model="review.msg">
      </textarea>
      <br/>
      <input class="input-checkbox" id="send" type="checkbox" v-model="review.tip"/>
      <label for="send">回复时发送邮件通知</label>
      <slot name="extention"></slot>
      <input class="input-submit" type="submit" v-model="submitTip"/>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      review: {
        nickname: '',
        email: '',
        time: '',
        url: '',
        parent: 0,
        msg: '',
        tip: 1,
        target: 0
      },
      submitTip: '发送'
    }
  },
  props: ['parent', 'target', 'uri', 'bid'],
  beforeMount () {
    this.review.parent = this.parent
    this.review.target = this.target

    // const nickname = this.$cookie.get('review_nickname')
    // const email = this.$cookie.get('review_email')
    // const url = this.$cookie.get('review_url')

    // this.review.nickname = nickname == null ? '' : nickname
    // this.review.email = email == null ? '' : email
    // this.review.url = url == null ? '' : url
  },
  beforeUpdate () {
    this.review.parent = this.parent
    this.review.target = this.target
  },
  methods: {
    commit () {
      const isBlog = this.bid !== undefined // true:blog;false:not blog
      if (isBlog) this.review.bid = Number.parseInt(this.bid)
      // if (this.review.nickname.trim() === '') {
      //   alert('昵称不能为空')
      //   return
      // }
      // if (this.review.email.trim() === '') {
      //   alert('邮箱不能为空')
      //   return
      // }

      // this.$cookie.config(-1)
      // this.$cookie.set('review_nickname', this.review.nickname)
      // this.$cookie.set('review_email', this.review.email)
      // this.$cookie.set('review_url', this.review.url)

      this.review.tip = this.review.tip ? 1 : 0
      this.review.time = this.$time()
      this.submitTip = '发送中'
      axios.post(this.uri, JSON.stringify(this.review), {
        headers: {
          'content-type': 'application/json'
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.submitTip = '发送成功!'
          this.$emit('review_success')
        } else {
          this.submitTip = '发送失败!'
          alert('回复异常')
        }
        setTimeout(() => {
          this.submitTip = '发送'
        }, 2000)
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss" scoped>
form{
  overflow: hidden;
  textarea{
    box-sizing: border-box;
    width: 90%;
    height: 100px;
    font-size: 18px;
    padding: 4px;
    resize: none;
    background-color: rgba(0,0,0,0);
    margin-top: 4px;
    color: rgb(202, 210, 216);
  }
  .input-text{
    box-sizing: border-box;
    width: 28%;
    height: 30px;
    margin-left: 1%;
    margin-right: 1%;
    text-align: center;
    border: 0;
    border: 1px solid gray;
    outline: none;
    background-color: rgba(0,0,0,0);
  }

  label{
    font-size: 12px;
    vertical-align: middle;
  }

  .input-submit{
    width: 100px;
    height: 30px;
    background-color: rgba(0,0,0,0);
    border: 1px solid rgb(216, 175, 175);
    float: right;
    margin-right: 11%;
    margin-top: 4px;
    color: aliceblue;
    &:hover{
      border: 2px solid coral;
    }
  }
}
</style>
