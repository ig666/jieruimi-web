/**
 * 防抖
 * @param { Function } fn 需要防抖函数
 * @param { Number } wait 等待时间
 */
export const debonce = (fn, wait) => {
  let timeout = null;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.call(this, arguments);
    }, wait);
  };
};
