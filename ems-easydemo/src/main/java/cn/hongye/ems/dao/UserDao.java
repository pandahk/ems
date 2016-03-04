package cn.hongye.ems.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import cn.hongye.ems.mode.User;


@Repository
public interface UserDao extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User>{

}
