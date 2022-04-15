package siso.cmmn.util;

import java.io.Serializable;

/**
 * @Class Name : FileVO.java
 * @Description : 파일정보 처리를 위한 VO 클래스
 * @Modification Information
 *
 *    수정일       수정자         수정내용
 *    -------        -------     -------------------
 *    2009. 3. 25.     이삼섭
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 25.
 * @version
 * @see
 *
 */
@SuppressWarnings("serial")
public class PropertiesVO implements Serializable {

    /**
     * 속성 아이디
     */
    public String propertiesId = "";
    /**
     * 속성값
     */
    public String propertiesValue = "";
    
    
	public String getPropertiesId() {
		return propertiesId;
	}
	public void setPropertiesId(String propertiesId) {
		this.propertiesId = propertiesId;
	}
	public String getPropertiesValue() {
		return propertiesValue;
	}
	public void setPropertiesValue(String propertiesValue) {
		this.propertiesValue = propertiesValue;
	}
    
    
}
