package cn.hongye.ems.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import cn.hongye.ems.model.ERole;
import cn.hongye.ems.model.EUser;

public class UserInfo extends User {
	private static final long serialVersionUID = 1L;
	private final EUser user;
	private final List<ERole> roles = new ArrayList<>();
	private String lang = "zh";// 选择的语言

	public UserInfo(EUser user,
			Collection<? extends GrantedAuthority> authorities) {
		super(user.getUserName(), user.getPassword(), true, true, true, true,
				authorities);// 需要扩展staff表
		this.user = user;
	}

	public EUser getStaff() {
		return this.user;
	}


	public List<ERole> getRoles() {
		return roles;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}
}
