function serializeToJson(from) {
  var result = {};
  //获取表单中填写的所有值，返回值是一个对象数组
  var ss = from.serializeArray();
  ss.forEach(function(item) {
    result[item.name] = item.value;
  });
  return result;
}
