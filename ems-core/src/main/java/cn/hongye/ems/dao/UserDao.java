package cn.hongye.ems.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import cn.hongye.ems.model.EUser;
import cn.hongye.ems.util.ValidResult;


@Repository
public interface UserDao extends PagingAndSortingRepository<EUser, Long>, JpaSpecificationExecutor<EUser>{

	
	EUser findUserByAccountAndPassword(String account,String password);
	EUser findUserByUserName(String username);
	
}
