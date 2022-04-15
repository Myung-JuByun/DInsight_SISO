package siso.sam.fcasting.service;
import java.util.List;

/**
 * @Class Name : ForeCastingService.java
 * @Description : ForeCastingService Class
 */
public interface ForeCastingService {	

    /**
	 * 영업관리 - forecasting
	 * @param ForeCastingVO - 조회할 정보가 담긴 VO
	 * @return forecasting 목록
	 * @exception Exception
	 */
    public List<ForeCastingVO> selectForeCastingList(ForeCastingVO forecastingvo) throws Exception;

    /**
	 * forcasting 복사
	 * @param ForeCastingVO - forecasting Copy
	 * @return forecasting Copy
	 * @exception
	 * 
	 */	 
    public List<ForeCastingVO> foreCastingListCopy(ForeCastingVO forecastingvo) throws Exception;
    
    /**
	 * forcasting 저장
	 * @param ForeCastingVO - forecasting Copy
	 * @return forecasting Save
	 * @exception
	 * 
	 */	 
    public void foreCastingSave(ForeCastingVO forecastingvo) throws Exception;
    
    /**
	 * forcasting 삭제
	 * @param ForeCastingVO - forecasting Copy
	 * @return forecasting Delete
	 * @exception
	 * 
	 */	 
    public void foreCastingListDelete(ForeCastingVO forecastingvo) throws Exception;
    
    /**
	 * 이슈 조회
	 * @param ForeCastingVO - forecasting Copy
	 * @return forecasting Delete
	 * @exception
	 * 
	 */	 
    public List<ForeCastingVO> selectForeCastingIssue(ForeCastingVO forecastingvo) throws Exception;
    
    /**
	 * 이슈 저장
	 * @param ForeCastingVO - forecasting Copy
	 * @return forecasting Delete
	 * @exception
	 * 
	 */	 
    public void foreCastingIssueSave(ForeCastingVO forecastingvo) throws Exception;
    
    /**
	 * 이슈 삭제
	 * @param ForeCastingVO - forecasting Copy
	 * @return forecasting Delete
	 * @exception
	 * 
	 */	 
    public void foreCastingIssueDelete(ForeCastingVO forecastingvo) throws Exception;
    
    /**
	 * forecasting 전 주 데이터 복사(배치) - 전주, 현재주 출력
	 * @param ForeCastingVO - forecasting Copy
	 * @return forecasting Delete
	 * @exception
	 * 
	 */	 
    public ForeCastingVO foreCastingAutoSaveWeekCheck(ForeCastingVO forecastingvo) throws Exception;
    
    
    /**
	 * forecasting 전 주 데이터 복사(배치)
	 * @param ForeCastingVO - forecasting Copy
	 * @return forecasting Delete
	 * @exception
	 * 
	 */	 
    public void foreCastingAutoSave(ForeCastingVO forecastingvo) throws Exception;
}
