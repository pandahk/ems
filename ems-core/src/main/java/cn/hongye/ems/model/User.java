package cn.hongye.ems.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import cn.hongye.ems.constant.Gender;
import cn.hongye.ems.constant.YesOrNo;

@Entity
@Table(name="ems_user")
public class User implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 408976322770520213L;
	private Integer id;
	private String account;
	private String userName;
	private String password;
	private Gender gender;
	private String phone;
	private String mobile;
	private String email;
	private String remark;
	private YesOrNo isValid;
	private String workCode;//工号
	private Date createTime;
	private Date updateTime;
//	private EmsOrganization emsOrganization;
	public User(){}
	public User(String account,String userName){
		this.account=account;
		this.userName=userName;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
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
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="createTime",length=19)
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="updateTime")
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	
	@Enumerated(EnumType.STRING)
	@Column(name="isValid")
	public YesOrNo getIsValid() {
		return isValid;
	}
	public void setIsValid(YesOrNo isValid) {
		this.isValid = isValid;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	@Column(name="userName")
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	@Enumerated(EnumType.STRING)
	@Column(name="gender")
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	@Column(name="workCode")
	public String getWorkCode() {
		return workCode;
	}
	public void setWorkCode(String workCode) {
		this.workCode = workCode;
	}

//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "orgId")
//	public EmsOrganization getEmsOrganization() {
//		return emsOrganization;
//	}
//
//	public void setEmsOrganization(EmsOrganization emsOrganization) {
//		this.emsOrganization = emsOrganization;
//	}
	
	
	
	
	
	
	

}
