/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package siso.exp.service;

import org.apache.commons.lang.builder.ToStringBuilder;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : ExpSearchVO.java
 * @Description : ExpSearchVO Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2014.07.10           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public class ExpSearchVO extends ComDefaultVO {

	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;

	/** 경비 조회 기준년도 */
    private String expanse_year = "";

    /** 경비 조회기준월 */
    private String expanse_month = "";
    
    /** 경비 아이디 */
    private int expanse_id = 0;
    
    /** 사원  아이디 */
    private int user_id = 0;
    

    @Override
	public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public String getExpanse_year() {
		return expanse_year;
	}


	public String getExpanse_month() {
		return expanse_month;
	}


	public int getExpanse_id() {
		return expanse_id;
	}


	public int getUser_id() {
		return user_id;
	}


	public void setExpanse_year(String expanse_year) {
		this.expanse_year = expanse_year;
	}


	public void setExpanse_month(String expanse_month) {
		this.expanse_month = expanse_month;
	}


	public void setExpanse_id(int expanse_id) {
		this.expanse_id = expanse_id;
	}


	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}	

}
