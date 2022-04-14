module.exports = {
  'post /api/admin/check': {
    code: 200,
    msg: '',
    data: 'token-1234567'
  },
  'get /api/info/total': {
    code: -400,
    msg: '未找到',
    data: null
  },
  'post /api/blog/add': {
    code: 200,
    msg: '',
    data: 1
  },
  'post /api/blog/page': {
    code: 200,
    msg: '',
    data: [
      {
        id: 1,
        title: '论c++语言',
        time: '2022-02-22 12:12:12',
        content: '一大堆的废话'
      },
      {
        id: 2,
        title: '论java语言',
        time: '2022-02-24 12:12:12',
        content: '一大堆的废话一大堆的废一大堆的废<p>666</p>555555一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废一大堆的废'
      },
      {
        id: 3,
        title: '论python语言',
        time: '2022-02-26 12:12:12',
        content: '一大堆的废话'
      },
      {
        id: 4,
        title: '论go语言',
        time: '2022-02-22 12:12:12',
        content: '一大堆的废话'
      }
    ]
  },
  'get /api/blog/count': {
    code: 200,
    msg: '',
    data: 31
  },
  'post /api/blog/id': {
    code: 200,
    msg: '',
    data: {
      id: 1,
      title: '论c++语言',
      time: '2022-02-22 12:12:12',
      content: '一大堆的废话'
    }
  },
  'get /api/dynamic/sheet': {
    code: 200,
    msg: '',
    data: [
      {
        id: 1,
        time: '2022-04-12 13:20:12',
        content: '这是一则动态'
      },
      {
        id: 2,
        time: '2022-04-12 13:20:12',
        content: '这是一则动态'
      },
      {
        id: 3,
        time: '2022-04-12 13:20:12',
        content: '这是一则动态'
      },
      {
        id: 4,
        time: '2022-04-12 13:20:12',
        content: '这是一则动态'
      }
    ]
  },
  'post /api/dynamic/add': {
    code: 200,
    msg: '',
    data: 0
  },
  'get /api/album/list': {
    code: 200,
    msg: '',
    data: [
      {
        id: 1,
        name: '大学碎碎念',
        cover: 'http://www.baidu.com',
        count: 10
      },
      {
        id: 2,
        name: '原神',
        cover: 'http://www.baidu.com',
        count: 46
      },
      {
        id: 3,
        name: 'game',
        cover: 'http://www.baidu.com',
        count: 8
      },
      {
        id: 4,
        name: '老照片',
        cover: 'http://www.baidu.com',
        count: 3
      }
    ]
  },
  'get /api/image/list': {
    code: 200,
    msg: '',
    data: [
      {
        id: 1,
        aid: 1,
        name: '傍晚',
        time: '2022-03-12 12:12:12',
        url: '/imgs/bk.jpeg',
        describe: '东京都的傍晚总是金光普照'
      },
      {
        id: 2,
        aid: 1,
        name: '纱雾',
        time: '2022-03-12 12:12:12',
        url: '/imgs/background.png',
        describe: '纱雾，老婆是也'
      },
      {
        id: 3,
        aid: 1,
        name: '侧睡',
        time: '2022-03-12 12:12:12',
        url: '/imgs/A006.jpg',
        describe: '侧睡什么的すき'
      },
      {
        id: 4,
        aid: 1,
        name: '女孩',
        time: '2022-03-12 12:12:12',
        url: '/imgs/temp.jpg',
        describe: '巨乳ですき！'
      }
    ]
  },
  'get /api/info/doge': {
    code: 200,
    msg: '',
    data: 1
  }
}
