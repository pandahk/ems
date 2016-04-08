package cn.hongye.ems.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import cn.hongye.ems.dao.UserRoleDao;
import cn.hongye.ems.model.ERole;
import cn.hongye.ems.model.EUser;
import net.wicp.tams.commons.apiext.PwdUtil;

@Service("userDetailService")
public class UserDetailService implements UserDetailsService {
	public static Logger logger = LoggerFactory.getLogger(UserDetailService.class);
	@Autowired
	private UserService userService;
	@Autowired
	private UserRoleDao userRoleDao;

	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		Collection<GrantedAuthority> auths = new ArrayList<GrantedAuthority>();

		EUser queryObj = new EUser();
		queryObj.setAccount(username);
		EUser  user = userService.findUserByUsername(username);
		if (user == null) {
			return null;
		}
		List<ERole> roles = userRoleDao.findERoleByAssignValue(user.getId());
		for (ERole role : roles) {
			SimpleGrantedAuthority grantedAuthorityImpl = new SimpleGrantedAuthority(
					String.valueOf(role.getId()));
			auths.add(grantedAuthorityImpl);
		}
		String pwd=user.getPassword();
//		String pwdtrue=PwdUtil.Base64ToString(pwd.substring(5));
		user.setPassword(pwd);
		UserInfo userinfo = new UserInfo(user, auths);
		userinfo.getRoles().addAll(roles);
		return userinfo;
	}

	
	private Authentication getAuthentication() {
		return SecurityContextHolder.getContext().getAuthentication();

	}
	
	public User getUser() {
		Authentication currentuser = getAuthentication();

		if (currentuser == null || currentuser.getPrincipal().equals("anonymousUser")) {
			return null;
		}

		return (User) currentuser.getPrincipal();

	}
}
