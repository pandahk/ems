package cn.hongye.ems.util;

import org.apache.commons.lang.StringUtils;

/*
 *   校验用户 
 */
public enum ValidResult {

	OK("验证通过"),USERNAME_NOT("用户名错误"),PWD_ERROR("密码错误");
	
	
	private final String desc;

	private ValidResult(String desc) {
		this.desc = desc;
	}

	public String getDesc() {
		return desc;
	}

	public String getName() {
		return this.name();
	}

	public static ValidResult find(String name) {
		if (StringUtils.isEmpty(name)) {
			return null;
		}
		for (ValidResult ele : ValidResult.values()) {
			if (name.equalsIgnoreCase(ele.name())) {
				return ele;
			}
		}
		return null;
	}
	
	
	
}
