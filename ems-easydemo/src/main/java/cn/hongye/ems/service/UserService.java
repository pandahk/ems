package cn.hongye.ems.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.hongye.ems.dao.UserDao;
import cn.hongye.ems.mode.User;
import cn.hongye.ems.vo.PageFormVo;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserDao userDao;
	
	public void save(User user){
		userDao.save(user);
	}
	public Page<User> queryBankInfoByPage(PageFormVo page) {
		return userDao.findAll(new Specification<User>() {

			public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> list = new ArrayList<Predicate>();
				Predicate[] p = new Predicate[list.size()];
				return cb.and(list.toArray(p));
			}
		}, page);

	}
	
}
