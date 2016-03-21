package cn.hongye.ems.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import antlr.collections.List;
import cn.hongye.ems.model.User;
import cn.hongye.ems.service.UserService;
import cn.hongye.ems.vo.PageFormVo;

@Controller
public class UserController {

	
	@Autowired
	private UserService userService;
	
	@RequestMapping("/findAll")
	@ResponseBody
	public Page<User> findUser(PageFormVo vo){
		return userService.queryBankInfoByPage(vo);
	}
	
	@RequestMapping("/find")
	public String findUser(){
		return "/userList";
		
	}
}
