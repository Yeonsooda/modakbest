package com.modak.user.service;

import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.modak.user.bean.UserAllDTO;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.modak.user.bean.UserDTO;
import com.modak.user.dao.UserDAO;

@Service
public class UserServiceImpl implements UserService {
	//공통 영역 : 시작 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		@Autowired
		private UserDAO userDAO;	
		//풍혁 220707 : session객체를 공통역역으로 이동시켰습니다.
		@Autowired
		private HttpSession session;		
		@Autowired
		private BCryptPasswordEncoder passwordEncoder;
		
		

	//공통 영역 : 끝 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	//연수 : 시작(220706) ====================================

		@Override
		public UserAllDTO getUser(String user_email) {
			return userDAO.getUser(user_email);
		}
		
	    //@@@@@@@@@@@@  연수 회원정보 수정창 전면수정(220710) @@@@@@@@@@@@		
		@Override
		public UserAllDTO userUpdate_nicknameCheck(String user_nickname) {
			return userDAO.userUpdate_nicknameCheck(user_nickname);			
		}

		@Override
		public UserAllDTO userUpdate_emailCheck(String user_email) {
			return userDAO.userUpdate_emailCheck(user_email);	
		}
		
		@Override
		public void update_userImg(UserAllDTO userAllDTO) {
			userDAO.update_userImg(userAllDTO);			
		}
		
		@Override
		public void update_userInfo(UserAllDTO userAllDTO) {
			userDAO.update_userInfo(userAllDTO);			
		}		
		
		@Override
		public void update_userEmail(Map<String, String> map) {
			userDAO.update_userEmail(map);
		}
	    //@@@@@@@@@@@@  연수 회원정보 수정창 전면수정(220710) @@@@@@@@@@@@

		@Override
		public UserDTO checkPwd(String user_email) {
			return userDAO.checkPwd(user_email);
		}

		@Override
		public void pwdChangeComplete(Map<String, String> map) {
			userDAO.pwdChangeComplete(map);	
		}
		
		@Override
		public void delete(String user_email) {
			userDAO.delete(user_email);
			
		}
	//연수 : 끝(220706) ====================================

	
	//유진 : 시작 ====================================
		@Override
		public void user_register(UserAllDTO userAllDTO) {
			userDAO.user_register(userAllDTO);
		}

		@Override
		public String userSignup_emailCheck(String user_email) {
			UserAllDTO userAllDTO = userDAO.userSignup_emailCheck(user_email);
			if(userAllDTO == null) {
				return "non exist";
			}else {
				return "exist";
			}
		}
		

		@Override
		public String userSignup_nicknameCheck(String user_nickname) {
			UserAllDTO userAllDTO = userDAO.userSignup_nicknameCheck(user_nickname);
			if(userAllDTO == null) {
				return "non exist";
			}else {
				return "exist";
			}				
		}
	
		
		@Override
		public UserDTO getUserInformation(String user_email) {
			return userDAO.getUserInformation(user_email);
		}
		
	//유진 : 끝 ====================================

	// 기진 : 시작  @@@@@@@@@@@@@@@@@@@@ 

		@Override
		public String login(Map<String, String> map) {
			String inputPwd = map.get("user_pwd");
			UserAllDTO userAllDTO = userDAO.login(map.get("user_email"));
			
			if(userAllDTO != null && passwordEncoder.matches(inputPwd, userAllDTO.getUser_pwd())){
				session.setAttribute("memEmail", userAllDTO.getUser_email());
				session.setAttribute("memId", userAllDTO.getUser_id());
				session.setAttribute("memNickname", userAllDTO.getUser_nickname());
				session.setAttribute("memImg", userAllDTO.getUser_img());
				
				return "ok";
				
			}else {
				
				return "fail";
			}
		}

		@Override
		public void userLogout() {
			session.invalidate();
			
		}

		//*******연수 수정(220707)	
		@Override
		public UserDTO getUserInfo(String user_id) {
			UserDTO userDTO = userDAO.getUserInfo(user_id);
			System.out.println("userService getUserInfo DTO : " + userDTO);
			return userDTO;
		}

	// 기진 : 끝 @@@@@@@@@@@@@@@@@@@@@@@

	// 풍혁 : 시작 &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& 
		@Override
		public int getUserIdByEmail(String session_email) {
			
			return userDAO.getUserIdByEmail(session_email);
		}
		
		@Override
		public String getUserNameByUserId(int board_uid) {
			
			return userDAO.getUserNameByUserId(board_uid);
		}
	// 풍혁 : 끝 &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

}
