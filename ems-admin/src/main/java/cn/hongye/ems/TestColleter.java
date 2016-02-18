package cn.hongye.ems;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public  class TestColleter {

	
	@RequestMapping("/home")
	public String test(){
		return "/index";
		
	}
}
