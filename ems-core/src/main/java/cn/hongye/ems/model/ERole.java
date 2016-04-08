package cn.hongye.ems.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="ems_role")
public class ERole implements java.io.Serializable{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5137120731390853414L;
	private Integer id;
	private String roleName;
	private String authority;
	private String code;
	
	public ERole(){}
	
	public ERole(Integer id, String roleName, String authority, String code) {
		super();
		this.id = id;
		this.roleName = roleName;
		this.authority = authority;
		this.code = code;
	}


	@Id
	@Column(name="id",unique=true,nullable=false,updatable=false,insertable=false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Override
	public String toString() {
		return "Role [id=" + id + ", roleName=" + roleName + ", authority=" + authority + ", code=" + code + "]";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
