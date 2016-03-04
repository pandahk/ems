package cn.hongye.ems.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import antlr.collections.List;
import cn.hongye.ems.service.UserService;
import cn.hongye.ems.vo.PageFormVo;

@Controller
public class UserController {

	
	@Autowired
	private UserService userService;
	
	@RequestMapping("/findAll")
	@ResponseBody
	public PageFormVo findUser(@RequestParam(value = "page", defaultValue = "1") int pageNumber, 
			@RequestParam(value = "pageSize", defaultValue = "10") int pageSize,
			@RequestParam(value = "sortType", defaultValue = "auto") String sortType,Model model){
		PageFormVo page = new PageFormVo();
		page.setPage(pageNumber);
		page.setRows(10);
		page.setOrder("desc");
		
		model.addAttribute("users",userService.queryBankInfoByPage( page) );
		return page;
		
	}
	
	@RequestMapping("/find")
	public String findUser(){
		return "/userList";
		
	}
}
