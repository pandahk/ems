package cn.hongye.ems.Controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.hongye.ems.model.User;
import cn.hongye.ems.service.UserService;
import cn.hongye.ems.vo.PageFormVo;

@Controller
public class UserController {

	
	@Autowired
	private UserService userService;
	
	@RequestMapping("/findAll")
	@ResponseBody
	public Map<String, Object> findUser(PageFormVo vo){
		
//		List employees = new ArrayList<User>();
//        employees.add(new User(1, "张三"));
//        employees.add(new User(2, "李四"));
//        employees.add(new User(3, "王二麻"));
//        Map<String, Object> map = new LinkedHashMap<String,Object>();
//        map.put("total", employees.size());
//        map.put("rows", employees);
		  Page<User> page=userService.queryBankInfoByPage(vo);
		  Map<String, Object> map = new LinkedHashMap<String,Object>();
	      map.put("total", page.getTotalElements());
	      map.put("rows", page.getContent());
        return map;  
	}
	
	@RequestMapping("/find")
	public String findUser(){
		return "/userList";
		
	}
	
	
	
	@RequestMapping("/login")
	public String login(){
		return "/login/login";
		
	}
	
	
	@RequestMapping({ "/login/validate" })
	public String validate(){
		
		
		
		
		
		return "/index";
		
	}
	
	
	
}
