package cn.hongye.ems.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import cn.hongye.ems.model.User;
import cn.hongye.ems.util.ValidResult;


@Repository
public interface UserDao extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User>{

	
	//ValidResult findUserByUserNameAndPassword(String username,String password);
	
}
