package cn.hongye.ems.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="ems_user")
public class User implements Serializable{
	
	private Integer id;
	private String name;
	private String password;
	private String sex;
	//private String isValid;
	private String mobile;
	private String email;
//	private Date createTime;
//	private Date updateTime;
	public User(){}
	public User(Integer id, String name){
		this.id = id;
		this.name = name;
		
	}
	public User(Integer id, String name, String password, String sex, String isValid, String mobile, String email
			) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
		this.sex = sex;
	//	this.isValid = isValid;
		this.mobile = mobile;
		this.email = email;
		
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
//	public String getIsValid() {
//		return isValid;
//	}
//	public void setIsValid(String isValid) {
//		this.isValid = isValid;
//	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
//	@Temporal(TemporalType.TIMESTAMP)
//	public Date getCreateTime() {
//		return createTime;
//	}
//	public void setCreateTime(Date createTime) {
//		this.createTime = createTime;
//	}
//	@Temporal(TemporalType.TIMESTAMP)
//	public Date getUpdateTime() {
//		return updateTime;
//	}
//	public void setUpdateTime(Date updateTime) {
//		this.updateTime = updateTime;
//	}
	
	
	
	
	
	
	

}
