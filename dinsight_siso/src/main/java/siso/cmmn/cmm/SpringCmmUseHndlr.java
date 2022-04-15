package siso.cmmn.cmm;

import java.util.List;

import javax.annotation.Resource;

import siso.cmmn.cmm.service.CmmnDetailCode;
import siso.cmmn.cmm.service.SpringCmmUseService;



/**
 * 
 * 공통코드등 전체 업무에서 공용해서 사용해야 하는 서비스를 정의하기 위한 서비스 인터페이스 
 * @author 공통서비스 개발팀 이삼섭
 * @since 2009.04.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.03.11  이삼섭          최초 생성
 *
 * </pre>
 */
public class SpringCmmUseHndlr {
	
	@Resource(name="egovCmmUseService")
	private SpringCmmUseService egovCmmUseService;

	public List<CmmnDetailCode> selectCmnCodeCombo() throws Throwable {
		List<CmmnDetailCode> cmmnDetailCodeList = egovCmmUseService.selectAllCmnCodeCombo();
		return cmmnDetailCodeList;
	}

}
