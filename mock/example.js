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
        content: '一大堆的废话',
        tags: [
          { name: 'vue1' }, { name: 'vue2' }, { name: 'vue3' },
          { name: 'vue4' }, { name: 'vue5' }, { name: 'vue6' }
        ]
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
    data: 20
  },
  'post /api/blog/id': {
    code: 200,
    msg: '',
    data: {
      id: 1,
      title: 'test',
      time: '2022-02-22 12:12:12',
      content: '<pre><code class="highlight"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"this.back"</span>&gt;</span>返回<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre><br/><pre><code class="highlight"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span></span>返回<span class="hljs-tag"></span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>'
    }
  },
  'get /api/dynamic/sheet': {
    code: 200,
    msg: '',
    data: [
      {
        id: 1,
        time: '2022-04-12 13:20:12',
        content: '这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态'
      },
      {
        id: 2,
        time: '2022-04-12 13:20:12',
        content: '这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态'
      },
      {
        id: 3,
        time: '2022-04-12 13:20:12',
        content: '这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态'
      },
      {
        id: 4,
        time: '2022-04-12 13:20:12',
        content: '这是一则动态'
      },
      {
        id: 5,
        time: '2022-04-12 13:20:12',
        content: '这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态'
      },
      {
        id: 6,
        time: '2022-04-12 13:20:12',
        content: '这是一则动态'
      },
      {
        id: 7,
        time: '2022-04-12 13:20:12',
        content: '这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态这是一则动态'
      },
      {
        id: 8,
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
  },
  'post /api/dynamic/delete': {
    code: 200,
    msg: '',
    data: 1
  },
  'get /api/info/album': {
    code: 200,
    msg: '',
    data: 318
  },
  'get /api/info/dynamic': {
    code: 200,
    msg: '',
    data: 256
  },
  'get /api/info/blog': {
    code: 200,
    msg: '',
    data: 485
  },
  'get /api/friend/list': {
    code: 200,
    msg: '',
    data: []
  },
  'get /api/friRw/list': { code: 200, msg: '', data: { count: 2, list: [{ id: 8, nickname: '猫玖', email: 'https://cravatar.cn/avatar/c6c133ad809939cd4cfd37106f9e4145', time: '2022-05-07 16:14:55', url: 'https://csxandlsy.xyz/', parent: 0, target: 0, msg: '猫玖\nhttps://csxandlsy.xyz/\n目前手机端还未完善', tip: 1, child: [{ id: 9, nickname: '时光潜流', email: 'https://cravatar.cn/avatar/ec3be3b2c87506b56678bc7bca7fdecd', time: '2022-05-07 19:34:48', url: 'https://www.dreamcenter.top', parent: null, target: null, msg: '猫玖:希望小伙伴以后有了更多的博文\n再来吧QAQ, 加油吧，\n建议学点前端框架呢>_<', tip: 1 }] }, { id: 1, nickname: '时光潜流', email: 'https://cravatar.cn/avatar/ec3be3b2c87506b56678bc7bca7fdecd', time: '2022-05-05 00:35:59', url: 'https://www.dreamcenter.top', parent: 0, target: 0, msg: '模板如下咯！\n名称：时光潜流\n头像: https://www.dreamcenter.top/imgs/avatar.jpg\n链接：http://www.dreamcenter.top\n简述：妹控的中二君！', tip: 1, child: [] }] } },
  'get /api/repository_type/list': {
    code: 200,
    msg: '',
    data: [
      { id: 1, name: 'java' },
      { id: 2, name: 'java' },
      { id: 3, name: 'java' },
      { id: 4, name: 'java' },
      { id: 5, name: 'java' },
      { id: 6, name: 'java' }
    ]
  },
  'get /api/repository_proj/list': {
    code: 200,
    msg: '',
    data: []
  },
  'get /api/info/increase': {
    code: 200,
    msg: '',
    data: null
  },
  'get /api/anime/list': {
    code: 200,
    msg: '',
    data: [{ id: 1, title: '珈百璃的堕落', icon: '//i0.hdslb.com/bfs/bangumi/7b9a5a6e6c5ca157a4c18b01093a7bb1701f4606.jpg', temp: 10, total: 12, type: 1 }, { id: 2, title: '测不准的阿波连同学', icon: '//i0.hdslb.com/bfs/bangumi/image/91ec1f4bc4af307dbfbd68c9ba6d838b27adee0f.png', temp: 0, total: 12, type: 3 }]
  }
}
