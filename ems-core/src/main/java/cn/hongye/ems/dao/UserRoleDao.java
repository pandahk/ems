package cn.hongye.ems.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import cn.hongye.ems.model.ERole;
import cn.hongye.ems.model.EUser;
import cn.hongye.ems.model.EUserRole;
import cn.hongye.ems.util.ValidResult;


@Repository
public interface UserRoleDao extends PagingAndSortingRepository<EUserRole, Long>, JpaSpecificationExecutor<EUser>{
//	@Query("select r.* from ems_user_role ur,ems_role r where r.id=ur.roleid and ur.assigntype='user' and ur.assignvalue=?1")
	@Query("select r from EUserRole ur,ERole r where ur.erole.id=r.id  and ur.assignValue=?1")
	List<ERole> findERoleByAssignValue(Integer assignValue);
	
}
