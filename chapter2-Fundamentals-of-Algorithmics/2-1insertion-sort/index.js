/**
 * ------------------------------------------------------------------
 *  基本算法
 * ------------------------------------------------------------------
 */
/**
 * 插入排序算法
 * @param {array} arr 待排序数组
 */
function insertionSortBase (arr) {
  // key是每次被选择的牌，k是key所在的位置
  // key的左端arr[0 -> k-1]是已经在手里抽好的牌，右侧是桌上未抽的牌
  let key;
  let i;
  for (let k = 1; k < arr.length; k++) {
    key = arr[k];
    i = k - 1;
    while (i >= 0 && arr[i] > key) {
      arr[i + 1] = arr[i];
      i--;
    }
    arr[i + 1] = key;
  }
  return arr;
}

/**
 * ------------------------------------------------------------------
 *  主函数
 * ------------------------------------------------------------------
 */
$(function () {
  let arr = getRandomArray(8);
  let curArr = [];
  $('#origin-arr').text(`[${arr}]`);
  let speed = 3000;
  // console.log(arr);
  const cxt = $('#main')[0].getContext('2d');
  let colorList = ['#3385ff', '#996699', '#CC0033', '#99CC33', '#FF9900', '#99CCFF', '#FFCCCC', '#FF99CC'];

  let models = arr.map((v, i) => {
    return {
      value: v,
      w: 120,
      h: v * 6,
      x: i * 150,
      y: 600 - v * 6,
      select: false,
      compare: false,
      color: colorList[i]
    }
  });
  console.log(models);
  setInterval(render, 10);

  let key;
  let i;
  let k = 1;

  setTimeout(update, speed);

  function update() {
    console.log(k)
    if (k < models.length) {
      models.forEach(v => {
        v.select = false;
        v.compare = false;
      })
      key = models[k];
      key.select = true;
      i = k - 1;
      models[i].compare = true;
      setTimeout(updateCompare, speed);
    // setTimeout(update, speed);
      k++;
    }
    console.log(models)
  }

  function updateCompare() {
    let x;
    models.forEach(v => {
        v.compare = false;
      })
    if (i >= 0 && models[i].value > key.value) {
      models[i].compare = true;
      x = models[i+1].x;
      setTimeout(() => {
        models[i + 1] = _.cloneDeep(models[i]);
        models[i + 1].x = x;
        i--;
        setTimeout(updateCompare, speed);
        // updateCompare();
      }, speed)
    } else {
      x = models[i+1].x;
      models[i + 1] = _.cloneDeep(key);
      models[i + 1].x = x;

      setTimeout(update, speed);
      // update();
    }
  }

  /* 图形渲染 */
  function render() {
    curArr = [];
    models.forEach( (v, i) => {
      curArr.push(v.value);
      if (v.select) {
        $('#select').text(`${v.value} (index: ${i})`);
      }
      if (v.compare) {
        $('#compare').text(v.value);
      }
    })
    $('#current-arr').text(`[${curArr}]`);
    cxt.clearRect(0, 0, 1200, 600);
    models.forEach((model, i) => {
      cxt.beginPath();
      cxt.fillStyle = model.color;
      cxt.fillRect(model.x, model.y, model.w, model.h);
      
      if (model.select) {
        cxt.fillStyle = 'black';
        cxt.fillRect(model.x, model.y, model.w, model.h);
      }
      
      if (model.compare) {
        cxt.fillStyle = 'gray';
        cxt.fillRect(model.x, model.y, model.w, model.h);
      }

      cxt.fillStyle = '#fff';
      cxt.font = '40px Arial';
      cxt.fillText(model.value, model.x + 35, model.y + 50);
    });
  }
})

/**
 * ------------------------------------------------------------------
 *  工具函数
 * ------------------------------------------------------------------
 */

/**
 * 随机生成长度为length的数组
 * @param {number} length 数组长度
 */
function getRandomArray (length) {
  return Array(length).fill(0).map((v, i) => _.random(10, 99));
}

/**
 * Fisher-Yates洗牌算法
 * @param {array} arr 待洗牌数组
 */
function makeShuffle(arr) {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    const j = Math.floor(Math.random() * (len - i)) + i;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
