module.exports = {
  'post /api/admin/check': {
    code: 200,
    msg: '',
    data: 'token-1234567'
  },
  'post /api/info/total': {
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
  }
}
