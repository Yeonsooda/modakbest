$('#num_check_blank').hide();

$(function(){
	
	//프로필 설정
	$('#camera_icon_div').click(function(){
		$('#user_image').trigger('click');
	});
	
	$('#user_image').on('change',function(){
		var profileFile = $(this)[0].files[0]; 	   
		   if(profileFile){
		       if (!profileFile.type.startsWith('image/')){ 
		           alert("파일은 이미지만 가능합니다. png, jpg, gif");
		           $(this).val(null);
		           return;
		       } else if(profileFile.size >= 250 * 1000) {
				   alert("파일용량은 최대 250KB까지 가능합니다.");
				   $(this).val(null);
				   return;
		       }  
		   }
		readURL(this);
	});
	
	function readURL(input){
		if(input.files[0]){
			var reader = new FileReader();
			reader.onload=function(e){ 
				$('#basic_profile_img').attr('src', e.target.result); 
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
});

/*이메일 중복체크*/

$('#user_email').focusout(function(){
	if( $('#user_email').val() == ''){
		$('#user_emailDiv').html('먼저 이메일 입력');
		$('#user_emailDiv').css('color','red');
		$('#user_emailDiv').css('font-size','8px');
	}else{
		$.ajax({
			type: 'post',
			url:'/semiproject/user/userSignup_emailCheck',
			data: {'user_email' : $('#user_email').val()}, 
			dataType: 'text', 
			success: function(data){
				//data = data.trim();
				alert(data);
				if(data=='exist'){
					$('#user_emailDiv').html('이미 사용하고 있는 이메일입니다.');
					$('#user_emailDiv').css('color', 'red');
					$('#user_emailDiv').css('font-size', '8px');
				}else if(data=='non exist'){
					$('input[name="user_email_check"]').val($('#user_email').val());
					$('#user_emailDiv').html('사용 가능한 이메일입니다.');
					$('#user_emailDiv').css('color', 'blue');
					$('#user_emailDiv').css('font-size', '8px');
				}
			},
			error: function(err){
				console.log(err);
			}
		});
	}
		
});

/*아이디 수 세기*/
/*$("#user_id").keyup(function(e) {
	var content = $(this).val();
	$("#countId").val("(" + content.length + "/ 20)"); //실시간 글자수 카운팅
	$("#countId").css('font-size','8px');
	if (content.length > 20) {
		$(this).val(content.substring(0, 20));
		$('#countId').html("(200 / 최대 20자)");
	}
});*/

/*비밀번호 제약조건*/

/*$('#user_pwd').focusout(function(){
	
	 var pw = $("#user_pwd").val();
	 var num = pw.search(/[0-9]/g);
	 var eng = pw.search(/[a-z]/ig);
	 var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
	
	 if(pw.length < 8 || pw.length > 20){
		 
		$('#user_pwdDiv').html('8자리 ~ 20자리 이내로 입력해주세요.');
		$('#user_pwdDiv').css('color','red');
		$('#user_pwdDiv').css('font-size','8px');
		  
		 }else if(pw.search(/\s/) != -1){
			$('#user_pwdDiv').html('비밀번호는 공백 없이 입력해주세요.');
			$('#user_pwdDiv').css('color','red');
			$('#user_pwdDiv').css('font-size','8px');
		
		 }else if(num < 0 || eng < 0 || spe < 0 ){
			$('#user_pwdDiv').html('영문,숫자, 특수문자를 혼합하여 입력해주세요.');
			$('#user_pwdDiv').css('color','red');
			$('#user_pwdDiv').css('font-size','8px');
		  
		 }else {
			 $('#user_pwdDiv').val('사용가능');
			 $('#user_pwdDiv').css('color','blue');
			$('#user_pwdDiv').css('font-size','8px');
		 
		 }
	
});*/

/*메일 인증*/
var code = "";
var mailnumCheck = false;

$('#emailBtn').click(function(){
	
	$('#user_emailDiv').empty();
	
	console.log('완성된 이메일 : ' + $('#user_email').val()); // 이메일 오는지 확인
	
	if($('#user_email').val() == ''){
		$('#user_emailDiv').html('이메일을 입력하세요.');
		$('#user_emailDiv').css('color','red');
		$('#user_emailDiv').css('font-size','8px');
	}else{
	
	$.ajax({
		type : 'get',
		url : '/semiproject/user/mailCheck?user_email='+$('#user_email').val(), // GET방식이라 Url 뒤에 email을 붙일수있다.
		//data: {'user_email': $('#user_email').val()},
		success : function (data) {
			console.log("data : " +  data);
			$('#user_email_check_number').attr('disabled',false);
			code = data;
			alert('인증번호가 전송되었습니다.');
			$('#num_check_blank').show();
		},
		error: function(err){
			console.log(err);
		}
	}); // end ajax
	}//else
});

$('#mail-check-input').click(function () {
	console.log(code);
	var inputCode = $(this).val();
	var $resultMsg = $('#user_emailDiv');
	
	if($('#user_email_check_number').val() == code){
		$resultMsg.html('인증번호가 일치합니다.');
		$resultMsg.css('color','blue');
		$resultMsg.css('font-size','8px');
		$('#emailBtn').attr('disabled',true);
		$('#user_email').attr('readonly',true);
		mailnumCheck = true;
	}else{
		$resultMsg.html('인증번호가 불일치 합니다. 다시 확인해주세요.');
		$resultMsg.css('color','red');
		$resultMsg.css('font-size','8px');
		mailnumCheck = false;
	}
});

/*회원가입 버튼 눌렀을떄~*/
/*버튼을 눌렀을때~*/

$('#signUpBtn').click(function(){
		$('#user_nameDiv').empty();
		$('#user_pwdDiv').empty();
		$('#user_emailDiv').empty();
		$('#user_nicknameDiv').empty();
		$('#flexCheckCheckedDiv').empty();
		
		var pw = $("#user_pwd").val();
		 var num = pw.search(/[0-9]/g);
		 var eng = pw.search(/[a-z]/ig);
		 var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
		
		
		if($('#user_name').val() == ''){
			$('#user_nameDiv').html('이름을 입력하세요.');
			$('#user_nameDiv').css('color','red');
			$('#user_nameDiv').css('font-size','8px');
		}
		else if($('#user_pwd').val() == ''){
			$('#user_pwdDiv').html('비밀번호를 입력하세요.');
			$('#user_pwdDiv').css('color','red');
			$('#user_pwdDiv').css('font-size','8px');
		}
		else if(pw.length < 8 || pw.length > 20){
			
			$('#user_pwdDiv').html('8자리 ~ 20자리 이내로 입력해주세요.');
			$('#user_pwdDiv').css('color','red');
			$('#user_pwdDiv').css('font-size','8px');
			
		}
		else if(pw.search(/\s/) != -1){
			$('#user_pwdDiv').html('비밀번호는 공백 없이 입력해주세요.');
			$('#user_pwdDiv').css('color','red');
			$('#user_pwdDiv').css('font-size','8px');
			
		}
		else if(num < 0 || eng < 0 || spe < 0 ){
			$('#user_pwdDiv').html('영문,숫자, 특수문자를 혼합하여 입력해주세요.');
			$('#user_pwdDiv').css('color','red');
			$('#user_pwdDiv').css('font-size','8px');
			
		}
		else if($('#user_repwd').val() == ''){
			$('#user_pwdDiv').html('비밀번호를 확인하세요.');
			$('#user_pwdDiv').css('color','red');
			$('#user_pwdDiv').css('font-size','8px');
		}
		else if($('#user_pwd').val() != $('#user_repwd').val()){
			$('#user_pwdDiv').html('비밀번호가 맞지 않습니다.');
			$('#user_pwdDiv').css('color','red');
			$('#user_pwdDiv').css('font-size','8px');
		}
		else if($('#user_email').val() == ''){
			$('#user_emailDiv').html('이메일을 입력하세요.');
			$('#user_emailDiv').css('color','red');
			$('#user_emailDiv').css('font-size','8px');
		}
		else if($('#user_email').val() != $('input[name="user_email_check"]').val()){
			$('#user_emailDiv').html('이메일 중복체크하세요.');
			$('#user_emailDiv').css('color','red');
			$('#user_emailDiv').css('font-size','8pt');
		}
		else if(mailnumCheck == false){
			$('#user_emailDiv').html('이메일 인증을 하세요');
			$('#user_emailDiv').css('color','red');
			$('#user_emailDiv').css('font-size','8px');
		}
		else if($('#user_nickname').val() == ''){
			$('#user_nicknameDiv').html('닉네임을 입력하세요.');
			$('#user_nicknameDiv').css('color','red');
			$('#user_nicknameDiv').css('font-size','8px');
		}
		else if(!$('input[name="flexCheckChecked"]').is(':checked')){
			$('#flexCheckCheckedDiv').html('이메일 수신에 동의해주세요.');
			$('#flexCheckCheckedDiv').css('color','red');
			$('#flexCheckCheckedDiv').css('font-size','8px');
			
		}
		else{
			//$('#userSignupWriteForm').submit();
	 		var formData = new FormData($('#userSignupWriteForm')[0]);
			
			$.ajax({
				type: 'post',
				url: '/semiproject/user/user_register',
				enctype: 'multipart/form-data',
				processData: false,
				contentType: false,
				data: formData,
				success: function(){
					location.href='/semiproject/user/userSignupComplete';
				},
				error: function(err) {
					console.log(err);
				}				
			}); 
		}//else
			
		
});
