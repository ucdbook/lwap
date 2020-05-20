export default (api, opts) => {
  api.addHTMLHeadScript({
    type: 'text/javascript',
    content: `window.document.title = '智慧军事物流平台';`,
  });
  api.addHTMLHeadScript({
    type: 'text/javascript',
    src: 'https://api.map.baidu.com/api?v=2.0&ak=f1ng2mbt4EGoRcVflAkN6GzF&s=1',
  });
  api.addHTMLHeadScript({
    type: 'text/javascript',
    src: 'https://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js',
  });
  api.addHTMLHeadScript({
    type: 'text/javascript',
    src: 'https://api.map.baidu.com/library/LuShu/1.2/src/LuShu_min.js',
  });
  api.addHTMLHeadScript({
    type: 'text/javascript',
    src: 'https://api.map.baidu.com/library/RichMarker/1.2/src/RichMarker_min.js',
  });
  api.addHTMLHeadScript({
    type: 'text/javascript',
    src: 'https://api.map.baidu.com/library/TrafficControl/1.4/src/TrafficControl_min.js',
  });
};
