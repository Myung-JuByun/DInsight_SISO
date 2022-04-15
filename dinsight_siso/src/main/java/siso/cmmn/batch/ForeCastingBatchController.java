package siso.cmmn.batch;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import siso.sam.fcasting.service.ForeCastingService;
import siso.sam.fcasting.service.ForeCastingVO;

/**
 * @Class Name : ForeCastingBatchController.java
 * @Description : ForeCastingBatchController Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */
@Controller
public class ForeCastingBatchController {
	
	/** forecastingService */
	@Autowired
	private ForeCastingService forecastingservice;
	
	/**
	 * forecasting 전 주 데이터 복사(배치)
	 * @param request
	 * @param response
	 * @return "/batch/foreCastingBatch"
	 * @exception Exception
	 */
	@RequestMapping(value = "/batch/foreCastingAutoSave")
	public void foreCastingAutoSave(@ModelAttribute("searchVO") ForeCastingVO searchVO
			, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String str_resData = "";
		
		try {
			
			//SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		    //Date nDate = dateFormat.parse("2017-10-02");
			
			//디폴트 년,월 설정
			Calendar calendar = Calendar.getInstance();
			//calendar.setTime(nDate);
			
			String year = Integer.toString(calendar.get(Calendar.YEAR));
			String month = String.format("%02d",calendar.get(Calendar.MONTH)+1);
			String day = String.format("%02d",calendar.get(Calendar.DATE));
			
			searchVO.setNow_ymd(year+month+day);
			
			boolean batchSaveGo = true;
			
			int monthCount=0;
			for(int cnt=1; cnt<=28; cnt++) {
				
				String date = year+"-"+month+"-"+String.format("%02d",cnt);
				
				if(getDateDay(date, "yyyy-MM-dd").equals("월")) { monthCount++; };
				
				if(monthCount == 1 && calendar.get(Calendar.DATE) == cnt && (month.equals("01") || month.equals("04") || month.equals("07") || month.equals("10"))) {
					batchSaveGo = false;
					break;
				}
			}
			
			if(batchSaveGo) {
				
				ForeCastingVO yearMonthWeek = forecastingservice.foreCastingAutoSaveWeekCheck(searchVO);
				
				searchVO.setNow_sales_ym(yearMonthWeek.getNow_sales_ym());
				searchVO.setNow_sales_week(yearMonthWeek.getNow_sales_week());
				searchVO.setCopy_sales_ym(yearMonthWeek.getCopy_sales_ym());
				searchVO.setCopy_sales_week(yearMonthWeek.getCopy_sales_week());
				
				forecastingservice.foreCastingAutoSave(searchVO);
				
				str_resData = "success";
			} else {
				str_resData = "nothing";
			}
		} catch (Exception e) {
			str_resData = "fail";
		}
		
		response.setContentType("text/html; charset=utf-8");
	    PrintWriter pw = response.getWriter();
	    
		pw.print(str_resData);
		pw.flush();
	}
	
	
	/**
	 * 특정 날짜에 대하여 요일을 구함(일 ~ 토)
	 * @param date
	 * @param dateType
	 * @return
	 * @throws Exception
	 */
	public String getDateDay(String date, String dateType) throws Exception {
	     
	    String day = "" ;
	     
	    SimpleDateFormat dateFormat = new SimpleDateFormat(dateType);
	    Date nDate = dateFormat.parse(date);
	     
	    Calendar cal = Calendar.getInstance();
	    cal.setTime(nDate);
	     
	    int dayNum = cal.get(Calendar.DAY_OF_WEEK);
	     
	    switch(dayNum) {
	        case 1:
	            day = "일";
	            break ;
	        case 2:
	            day = "월";
	            break ;
	        case 3:
	            day = "화";
	            break ;
	        case 4:
	            day = "수";
	            break ;
	        case 5:
	            day = "목";
	            break ;
	        case 6:
	            day = "금";
	            break ;
	        case 7:
	            day = "토";
	            break ;
	    }
	     
	    return day ;
	}
	
	
}
