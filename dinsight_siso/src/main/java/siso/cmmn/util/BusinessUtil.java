package siso.cmmn.util;

import java.util.ArrayList;
import java.util.List;

import siso.exp.payment.service.PaymentVO;

public class BusinessUtil {
	
	/*
	 * 사업부 코드 검색
	 * 
	 */
	
	public ArrayList<String> totalList = new ArrayList<String>();
	
	public String divisionSearch (List<PaymentVO> divisionList, String division_cd) {
		
		String last_division_cd = "";
		int totCount = 0;
		Boolean flag = false;
		
		while(true) {			
			if(totCount > 0 && division_cd==null) {
				System.out.println("최상위 부서 입니다.");
				break;
			}
			
			if(totCount > divisionList.size()){
				System.out.println("데이터가 존재하지 않습니다.");
				break;
			}
			
			for(int cnt=0; cnt<divisionList.size(); cnt++) {				
				PaymentVO paymentVO = new PaymentVO();				
				paymentVO = divisionList.get(cnt);
				
				if(paymentVO.getDivision_cd().equals(division_cd)) {					
					if(paymentVO.getOperation_yn().equals("0")) {						
						division_cd = paymentVO.getParent_cd();						
					} else {						
						last_division_cd = paymentVO.getDivision_cd();
						flag = true;
						break;
					}					
				}
			}			
			
			if(flag)	break;
			totCount++;
		}		
		
		return last_division_cd;
		
	}
	
	/*
	 * 하위 부서 검색
	 * 
	 */
	public ArrayList<String> divisionChildSearch (List<PaymentVO> divisionList, String division_cd, String depth) {		
		childSearch(divisionList, division_cd, depth);
		
		if(totalList.size() > 0){
			for(int i=0;  i<totalList.size() ; i++){
				//System.out.println(totalList.get(i));
			}
		}
		
		return totalList;
	}
	
	
	/*
	 * 하위 부서 검색(재귀 호출)
	 * depth : A (모든부서), O (사업부만)
	 */
	private void childSearch(List<PaymentVO> divisionList, String division_cd, String depth) {		
		for(int cnt=0; cnt<divisionList.size(); cnt++) {			
			PaymentVO paymentVO = new PaymentVO();			
			paymentVO = divisionList.get(cnt);
			
			if(paymentVO.getParent_cd() == null)
				continue;			
			
			if(depth.equals("A")) {				
				if(paymentVO.getParent_cd().equals(division_cd)) {
					totalList.add(paymentVO.getDivision_cd());
					childSearch(divisionList, paymentVO.getDivision_cd(), depth);
				}				
			} else {				
				if(paymentVO.getParent_cd().equals(division_cd) && paymentVO.getOperation_yn().equals("1")) {
					totalList.add(paymentVO.getDivision_cd());
					childSearch(divisionList, paymentVO.getDivision_cd(), depth);
				}
			}				
		}
	}
	
}