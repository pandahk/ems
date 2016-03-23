package cn.hongye.ems.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.hongye.ems.model.User;
import cn.hongye.ems.service.UserService;
import cn.hongye.ems.util.ResultVo;
import cn.hongye.ems.util.ValidResult;
import cn.hongye.ems.vo.PageFormVo;
import cn.vshcxl.sh.Result;

@Controller
public class UserController {

	
	@Autowired
	private UserService userService;
	
	@RequestMapping("/findAll")
	@ResponseBody
	public Map<String, Object> findUser(PageFormVo vo){
		
//		List<User> ll=new ArrayList<>();
//		ll.add(new User("zz","zz2"));
//		ll.add(new User("zz22","zz3"));
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
	
	@RequestMapping("/login/validate")
	@ResponseBody
	public ResultVo validate(String account,String password){
		
		ValidResult vr=userService.validUser(account, password);
		if (vr.name().equals(ValidResult.OK.name())) {
			return new ResultVo(1, "验证成功");
		}
		return new ResultVo(0, "验证失败");
		
		
		
	}
	
	
	
}
