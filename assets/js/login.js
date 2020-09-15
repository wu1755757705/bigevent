$(function() {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
  })
  //点击去登录时间
  $('#link_login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()
  })
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd:[
      /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],
     function(value) {
        var pwd = $('.reg-box [name=password]').val()
        if(value !== pwd) {
          return '两次密码不一致'
        }
      }
  })
  //监听注册表单的提交事件
  $('#form_reg').on('submit',function(e){
      e.preventDefault()
      var data = {
        username :$('#form_reg  [name = username]').val(),
        password :$('#form_reg [name=password]').val()
      }
      $.post('/api/reguser',data,function(res){
        if(res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功,请登录')
        //模拟人的点击行为
        $('#link_login').click()
      })
  })
  //监听表单的登录事件
  $('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
      url : '/api/login',
      method :'post',
      data:$(this).serialize(),
      success : function(res) {
        if(res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
         // 将登录成功得到的 token 字符串，保存到 localStorage 中
         localStorage.setItem('token', res.token)
         location.href = '/index.html'
      }
    })
  })
})
// $(function(){
//    //点击注册账号
//    $('#link_reg').on('click',function(){
//       $('.login-box').hide()
//       $('.reg-box').show()
//    })
//    $('#link_login').on('click',function(){
//     $('.login-box').show()
//     $('.reg-box').hide()
//  })
// //  验证文本框和密码框
//  var form = layui.form
//  var layer = layui.layer
//  form.verify({
//    pwd : [
//        /^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'
//    ],
//    repwd :function(value) {
//      var pwd = $('.reg-box [name=password]').val()
//      if(value !== pwd) {
//        return '两次密码不一致'
//      }
//    }
//  })
//  //监听注册表单的提交事件
//  $('#form_reg').submit(function(e){
//    e.preventDefault()
//    var data = {
//      username : $('#form_reg [name=username]').val(),
//      password :  $('#form_reg [name=password]').val()
//    }
//    $.post('/api/reguser',data,function(res){
//      if(res.status !== 0) {
//        return layer.msg(res.message)
//      }
//      layer.msg('注册成功, 请登录')
//      $('#link_login').click()
//    })
//  })
//  //监听表单登录事件
//  $('#form_login').submit(function(e){
//    e.preventDefault()
//    $.ajax({
//      url :'/api/login',
//      method: 'post',
//      data : $(this).serialize(),
//      success : function(res) {
//        if(res.status !== 0) {
//          return layer.msg('登录失败')
//        }
//        layer.msg('登录成功')
//        localStorage.setItem('token')
//        location.href ='/index.html'
//      }
//    })
//  })
// })