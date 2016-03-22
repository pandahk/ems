package cn.hongye.ems.constant;

import org.apache.commons.lang3.StringUtils;


/***
 * 是与否枚举
 * 
 * @author Administrator
 * 
 */
public enum YesOrNo {
	yes("是"), no("否");

	private final String desc;

	private YesOrNo(String desc) {
		this.desc = desc;
	}

	public String getDesc() {
		return desc;
	}

	public String getName() {
		return this.name();
	}

	public static YesOrNo find(String name) {
		if (StringUtils.isEmpty(name)) {
			return null;
		}
		for (YesOrNo ele : YesOrNo.values()) {
			if (name.equalsIgnoreCase(ele.name())) {
				return ele;
			}
		}
		return null;
	}

}
