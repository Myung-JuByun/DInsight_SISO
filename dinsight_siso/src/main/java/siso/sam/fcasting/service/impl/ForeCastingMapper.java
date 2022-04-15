package siso.sam.fcasting.service.impl;

import java.util.List;


import org.springframework.stereotype.Component;
import siso.sam.fcasting.service.ForeCastingVO;

/**
 * @Class Name : ForeCastingDAO.java
 * @Description : ForeCastingDAO.Class
 */


@Component
public interface ForeCastingMapper {

    /**
	 * forcasting 조회
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return forcasting 목록
	 * @exception Exception
	 */    
	public List<ForeCastingVO> selectForeCastingList(ForeCastingVO vo) throws Exception;
    
    /**
	 * forcasting 복사
	 * @param vo - 삭제할 정보가 담긴 ExpSearchVO
	 * @return void형
	 * @exception Exception
	 */    
	public List<ForeCastingVO> foreCastingListCopy(ForeCastingVO vo) throws Exception;
    
    /**
	 * forcasting 저장
	 * @param vo - 등록할 정보가 담긴 ExpSearchVO
	 * @return 등록 결과
	 * @exception Exception
	 */
    public void foreCastingSave(ForeCastingVO vo) throws Exception;

    /**
	 * forcasting 삭제
	 * @param vo - 삭제할 정보가 담긴 ExpSearchVO
	 * @return void형
	 * @exception Exception
	 */
    public void foreCastingListDelete(ForeCastingVO vo) throws Exception;
    
    /**
	 * 이슈 조회
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return forcasting 목록
	 * @exception Exception
	 */    
	public List<ForeCastingVO> selectForeCastingIssue(ForeCastingVO vo) throws Exception;
    
    /**
   	 * 이슈 저장
   	 * @param vo - 등록할 정보가 담긴 ExpSearchVO
   	 * @return 등록 결과
   	 * @exception Exception
   	 */
    public void foreCastingIssueSave(ForeCastingVO vo) throws Exception;    

    /**
   	 * 이슈 삭제
   	 * @param vo - 삭제할 정보가 담긴 ExpSearchVO
   	 * @return void형
   	 * @exception Exception
   	 */
    public void foreCastingIssueDelete(ForeCastingVO vo) throws Exception;
       
    /**
  	 * 이슈 삭제
  	 * @param vo - 삭제할 정보가 담긴 ExpSearchVO
  	 * @return void형
  	 * @exception Exception
  	 */    
	public String selectForeCastingRole(ForeCastingVO vo) throws Exception;
    
    /**
	 * forecasting 전 주 데이터 복사(배치) - 전주, 현재주 출력
	 * @param searchMap - 조회할 정보가 담긴 Map
	 * @return forcasting 목록
	 * @exception Exception
	 */	
	public ForeCastingVO foreCastingAutoSaveWeekCheck(ForeCastingVO vo) throws Exception;
          
    /**
   	 * forecasting 전 주 데이터 복사(배치)
   	 * @param vo - 삭제할 정보가 담긴 ExpSearchVO
   	 * @return void형
   	 * @exception Exception
   	 */
    public void foreCastingAutoSave(ForeCastingVO vo) throws Exception;
      
}
