package cn.hongye.ems.constant;

import org.apache.commons.lang3.StringUtils;

/***
 * 是与否枚举
 * 
 * @author Administrator
 * 
 */
public enum Gender  {
	M("男"), F("女"), U("未知");
	private final String desc;

	private Gender(String desc) {
		this.desc = desc;
	}

	public String getDesc() {
		return desc;
	}

	public String getName() {
		return this.name();
	}


	public static Gender find(String name) {
		if (StringUtils.isEmpty(name)) {
			return null;
		}
		for (Gender ele : Gender.values()) {
			if (name.equalsIgnoreCase(ele.name())) {
				return ele;
			}
		}
		return null;
	}
}
