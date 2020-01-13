//自定义手机号码校验规则
 export const validatephone = (rule, value, callback) => {
    const reg=/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
       if (value === '') {
         callback(new Error('请输入密码'));
       } else {
         if (reg.test(value)!=true) {
              callback(new Error('手机号码格式不对噢'));
         }
         callback();
       }
     };
export const validateemail = (rule, value, callback) => {
    const reg=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
       if (value === '') {
         callback(new Error('请输入密码'));
       } else {
         if (reg.test(value)!=true) {
              callback(new Error('邮箱格式不对噢'));
         }
         callback();
       }
     };