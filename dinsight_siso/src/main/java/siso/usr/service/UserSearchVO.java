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
package siso.usr.service;

import org.apache.commons.lang.builder.ToStringBuilder;

import siso.cmmn.ComDefaultVO;

/**
 * @Class Name : UserSearchVO.java
 * @Description : UserSearchVO Class
 * @Modification Information 2014.07.10 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */
public class UserSearchVO extends ComDefaultVO {

	/**
	 * serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;

	/** 검색타입 */
	private String searchMode = "userId";

	/** 검색어 */
	private String searchString = "";

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public String getSearchMode() {
		return searchMode;
	}

	public void setSearchMode(String searchMode) {
		this.searchMode = searchMode;
	}

	public String getSearchString() {
		return searchString;
	}

	public void setSearchString(String searchString) {
		this.searchString = searchString;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
