package com.modak.user.dao;

import java.util.Map;


import com.modak.user.bean.UserAllDTO;
import com.modak.user.bean.UserDTO;

public interface UserDAO {

	//공통 영역 : 시작 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


	//공통 영역 : 끝 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	//연수 : 시작(220706) ====================================
		public UserAllDTO getUser(String user_email);
		
	    //@@@@@@@@@@@@  연수 회원정보 수정창 전면수정(220710) @@@@@@@@@@@@
		public UserAllDTO userUpdate_nicknameCheck(String user_nickname);

		public UserAllDTO userUpdate_emailCheck(String user_email);
		
		public void update_userImg(UserAllDTO userAllDTO);
		
		public void update_userInfo(UserAllDTO userAllDTO);

		public void update_userEmail(Map<String, String> map);

	    //@@@@@@@@@@@@  연수 회원정보 수정창 전면수정(220710) @@@@@@@@@@@@

		public UserDTO checkPwd(String user_email);

		public void pwdChangeComplete(Map<String, String> map);

		public void delete(String user_email);
	//연수 : 끝시작(220706) ====================================
	
	//유진 : 시작 0706 ====================================
		public void user_register(UserAllDTO userAllDTO);

		public UserAllDTO userSignup_emailCheck(String user_email);
		
		public UserAllDTO userSignup_nicknameCheck(String user_nickname);
		
		public UserDTO getUserInformation(String user_email);
	//유진 : 끝 0706====================================
	

	// 기진 : 시작  @@@@@@@@@@@@@@@@@@@@ 
		//@@@@ 연수 수정(220708)  @@@@///
		public UserAllDTO login(String user_email);

		public UserDTO getUserInfo(String user_id);
	// 기진 : 끝 @@@@@@@@@@@@@@@@@@@@@@@

	// 풍혁 : 시작 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
		//풍혁 220708 : 글 작성하고 리스트에서 유저 이름 or 닉네임 표시하기 위해 만들었습니다. 
		public int getUserIdByEmail(String session_email);		

		public String getUserNameByUserId(int board_uid);
	// 풍혁 : 끝 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%	







}
