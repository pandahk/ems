package cn.hongye.ems.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.hongye.ems.dao.UserDao;
import cn.hongye.ems.model.EUser;
import cn.hongye.ems.util.ValidResult;
import cn.hongye.ems.vo.PageFormVo;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserDao userDao;
	
	public void save(EUser user){
		userDao.save(user);
	}
	
	public EUser findUserByUsername(String username){
		return userDao.findUserByUserName(username);
	}
	
	public Page<EUser> queryBankInfoByPage(PageFormVo page) {
		return userDao.findAll(new Specification<EUser>() {

			public Predicate toPredicate(Root<EUser> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> list = new ArrayList<Predicate>();
				Predicate[] p = new Predicate[list.size()];
				return cb.and(list.toArray(p));
			}
		}, page);

	}
	
	
	public ValidResult  validUser(String account,String password){
		EUser uu=userDao.findUserByAccountAndPassword(account, password);
		if (uu==null) 
			return ValidResult.USERNAME_NOT;
		return ValidResult.OK;
		
		
	}
	
	
	
	
	
	
}
