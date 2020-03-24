//实现密码家吗
//导入加密模块对象
const bcrypt = require("bcrypt");

async function genSalts(params) {
  //生成盐（生成字符串）
  //该方法接收一个数值作为参数
  //数值越大，生成的随机字符复杂度越高，数值越小复杂度越简单
  //默认值是10
  //返回Promise对象因此可以加上await关键字通过返回值获得生成的字符串
  const salt = await bcrypt.genSalt(10);
  //对密码进行加密
  //参数1：要加密的密码
  //参数2：上面生成的随机字符串
  const result = await bcrypt.hash();
  console.log(s);
}
genSalts();
