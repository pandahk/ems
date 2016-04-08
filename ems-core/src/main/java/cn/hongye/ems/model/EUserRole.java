package cn.hongye.ems.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="ems_user_role")
public class EUserRole implements java.io.Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -4001349515078475785L;
	private Integer id;
	private ERole erole;
	private String assignType;
	private Integer assignValue;
	
	public EUserRole() {
		super();
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

//	@ManyToOne(fetch=FetchType.LAZY)
//	@JoinColumn(name="roleId")
//	public ERole getERole() {
//		return role;
//	}
//
//	public void setERole(ERole role) {
//		this.role = role;
//	}

	public String getAssignType() {
		return assignType;
	}

	public void setAssignType(String assignType) {
		this.assignType = assignType;
	}

	public Integer getAssignValue() {
		return assignValue;
	}

	public void setAssignValue(Integer assignValue) {
		this.assignValue = assignValue;
	}

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="roleId")
	public ERole getErole() {
		return erole;
	}


	public void setErole(ERole erole) {
		this.erole = erole;
	}

	
	
	
	
	
}
