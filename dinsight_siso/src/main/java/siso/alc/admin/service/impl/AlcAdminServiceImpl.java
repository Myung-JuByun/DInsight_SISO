package siso.alc.admin.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.alc.admin.service.AlcAdminService;
import siso.alc.admin.service.AlcAdminVO;
import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.sys.service.LoginVO;

/**
 * @Class Name : AlcAdminServiceImpl.java
 * @Description : AlcAdminServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class AlcAdminServiceImpl implements AlcAdminService {
	
	@Autowired
	public SqlSession sqlSession;
	public AlcAdminMapper alcAdminMapper;	
	public LoginVO loginVO;
	
	public AlcAdminServiceImpl(SqlSession sqlSession) {		
		this.sqlSession = sqlSession;
		this.alcAdminMapper = sqlSession.getMapper(AlcAdminMapper.class);		
	}

	/**
	 * 메인리스트 - Product 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<AlcAdminVO> alcAdminList(AlcAdminVO searchVO) throws Exception {
		return alcAdminMapper.alcAdminList(searchVO);
	}
	
	/**
	 * 메인리스트 - 설치사 조회
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<AlcAdminVO> alcAdminInstallCustomerList(AlcAdminVO searchVO) throws Exception {
		return alcAdminMapper.alcAdminInstallCustomerList(searchVO);
	}
	
	/**
	 * 등록한다.
	 * @param ExpanseInfoVO - 등록할 정보가 담긴 VO
	 * @return 등록 결과
	 * @exception Exception
	 */
    @Override
    public void insertAlcAdmin(AlcAdminVO vo) throws Exception {
    	
    	//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
    	
    	/**
    	 * 초기화 한다.
    	 * 공통으로 들어가는 부분
    	 * */
    	String company_id = vo.getCompany_id();
    	String alc_year = vo.getAlc_year();
    	String place_of_business = vo.getPlace_of_business();
    	String sales_customer = vo.getSales_customer();
    	String portfolio = vo.getPortfolio();
    	String prd_number = vo.getPrd_number();
    	String prd_TYPE = vo.getPrd_type();
    	String trigram = vo.getTrigram();
    	String portfolio_item_name = vo.getPortfolio_item_name();
    	String install_identical_yn = vo.getInstall_identical_yn();
    	
    	/**
    	 * 공통 아닌 부분
    	 * */
    	String install_company_id = "";
    	
	 	String ordering_start_day = "";
    	String ordering_end_day = "";
    	String install_start_day = "";
    	String install_end_day = "";
    	String ordering_identical_yn = "";
    	String target_id = "";
    	String license_date = "";
    	String list_price = "";
    	String estimated_cost = "";
    	String purchase_date = "";
    	String collect_money = "";
    	String invoice_start_day = "";
    	String invoice_end_day = "";
    	String contract_start_day = "";
    	String contract_end_day = "";
    	String quote_id = "";
    	String contract_id = "";
    	String stock_yn = "";
    	String purchase_agreement_yn = "";
    	
    	/**
    	 * 설치사 동일여부 N일 경우
    	 * */
    	String in_install_company_id = "";
    	//String in_sub_qty = "";
    	String in_ordering_start_day = "";
    	String in_ordering_end_day = "";
    	String in_ordering_identical_yn = "";
    	String in_install_start_day = "";
    	String in_install_end_day = "";
    	String in_target_id = "";
    	String in_license_date = "";
    	String in_list_price = "";
    	String in_estimated_cost = "";
    	String in_purchase_date = "";
    	String in_collect_money = "";
    	String in_invoice_start_day = "";
    	String in_invoice_end_day = "";
    	String in_contract_start_day = "";
    	String in_contract_end_day = "";
    	String in_quote_id = "";
    	String in_contract_id = "";
    	String in_stock_yn = "";
    	String in_purchase_agreement_yn = "";
    	
    	if (SpringStringUtil.isEmpty(place_of_business)) {
    		place_of_business = null;
    	}
    	
    	//설치사 동일인지 아닌지 구분하여 처리
    	if(vo.getInstall_identical_yn().equals("1")){
    		
    		int qty =  Integer.parseInt(vo.getSub_qty());
    		
    		if (SpringStringUtil.isEmpty(vo.getOrdering_day())) {
    			ordering_start_day = "";
    			ordering_end_day = "";
    		} else {
    			String[] ordering_day = vo.getOrdering_day().split("~");
        		
    			ordering_start_day = ordering_day[0].trim();
    			ordering_end_day = ordering_day[1].trim();
    		}
    		
    		if (SpringStringUtil.isEmpty(vo.getInstall_day())) {        			
    			install_start_day = "";
    			install_end_day = "";
    		} else {
    			String[] install_day = vo.getInstall_day().split("~");
    		
    			install_start_day = install_day[0].trim();
    			install_end_day = install_day[1].trim();
    		}
    		
    		if (SpringStringUtil.isEmpty(vo.getInvoice_day())) {        			
    			invoice_start_day = "";
    			invoice_end_day = "";
    		} else {
    			String[] invoice_day = vo.getInvoice_day().split("~");
    		
    			invoice_start_day = invoice_day[0].trim();
    			invoice_end_day = invoice_day[1].trim();
    		}
    		
    		if (SpringStringUtil.isEmpty(vo.getContract_day())) {        			
    			contract_start_day = "";
    			contract_end_day = "";
    		} else {
    			String[] contract_day = vo.getContract_day().split("~");
    		
    			contract_start_day = contract_day[0].trim();
    			contract_end_day = contract_day[1].trim();
    		}
    		
    		for(int i=0; i<qty; i++){
    			
    			AlcAdminVO searchVO = new AlcAdminVO();

    			/*
	    		 * 공통 아닌 부분 추가
	    		 * */
	    		install_company_id = vo.getInstall_company_id(); //설치사
	    		if(SpringStringUtil.isEmpty(vo.getOrdering_identical_yn())){
	    			ordering_identical_yn = "0";
	    		} else {
	    			ordering_identical_yn = vo.getOrdering_identical_yn(); //발주기간동일여부
	    		}
	    		target_id = vo.getTarget_id(); //Target_Id
	    		if (SpringStringUtil.isEmpty(target_id)) {
	    			target_id = null;
	        	}
	    		license_date = vo.getLicense_date(); //license_date
	    		list_price = vo.getList_price(); //정가
	    		estimated_cost = vo.getEstimated_cost(); //견적가
	    		if (SpringStringUtil.isEmpty(estimated_cost)) {
	    			estimated_cost = null;
	        	}
	    		purchase_date = vo.getPurchase_date(); //구매일
	    		collect_money = vo.getCollect_money(); //수금
	    		if (SpringStringUtil.isEmpty(collect_money)) {
	    			collect_money = null;
	        	}
	    		
	    		if(SpringStringUtil.isEmpty(vo.getQuote_id())){
	    			quote_id = null; //견적서 파일
	    		}else{
	    			quote_id = vo.getQuote_id(); //견적서 파일
	    		}
	    		
	    		if(SpringStringUtil.isEmpty(vo.getContract_id())){
	    			contract_id = null; //계약서 파일
	    		}else{
	    			contract_id = vo.getContract_id(); //계약서 파일
	    		}
	    		
	    		stock_yn = vo.getStock_yn(); //stock
	    		purchase_agreement_yn = vo.getPurchase_agreement_yn(); //구매동의
	    		
	    		searchVO.setAlc_id(null);
	    		searchVO.setAlc_year(alc_year); //년도
	    		searchVO.setCompany_id(company_id); //고객사	    			    		
	    		searchVO.setPlace_of_business(place_of_business); //사업장	    		
	    		searchVO.setSales_customer(sales_customer); //영업담당자
    			searchVO.setPortfolio(portfolio); //상표
	    		searchVO.setPrd_number(prd_number); //제품번호
	    		searchVO.setPrd_type(prd_TYPE); //유형
	    		searchVO.setTrigram(trigram); //모듈
	    		searchVO.setPortfolio_item_name(portfolio_item_name); //상표명
	    		searchVO.setQty("1"); //수량
	    		searchVO.setOrdering_start_day(ordering_start_day); //발주_시작일
	    		searchVO.setOrdering_end_day(ordering_end_day); //발주_종료일
	    		searchVO.setInstall_company_id(install_company_id); //설치사
	    		searchVO.setInstall_identical_yn(install_identical_yn); //설치사 동일여부
	    		searchVO.setOrdering_identical_yn(ordering_identical_yn); //발주기간동일여부
	    		searchVO.setInstall_start_day(install_start_day); //설치_시작일
	    		searchVO.setInstall_end_day(install_end_day); //설치_종료일	    		
	    		searchVO.setTarget_id(target_id); //Target_Id
	    		searchVO.setLicense_date(license_date); //license_date
	    		searchVO.setList_price(list_price); //정가
	    		searchVO.setEstimated_cost(estimated_cost); //견적가
	    		searchVO.setPurchase_date(purchase_date); //구매일
	    		searchVO.setCollect_money(collect_money); //수금
	    		searchVO.setDestruction_yn("0"); //파훼여부
	    		searchVO.setQuote_id(quote_id); //견적서 파일
	    		searchVO.setInvoice_id(null); //세금계산서 아이디
	    		searchVO.setInvoice_start_day(invoice_start_day); //세금계산서_시작일
	    		searchVO.setInvoice_end_day(invoice_end_day); //세금계산서_종료일
	    		searchVO.setContract_id(contract_id); //계약서 파일
	    		searchVO.setContract_start_day(contract_start_day); //계약서_시작일
	    		searchVO.setContract_end_day(contract_end_day); //계약서_종료일
	    		searchVO.setStock_yn(stock_yn); //stock
	    		searchVO.setPurchase_agreement_yn(purchase_agreement_yn); //구매동의
	    		searchVO.setCreator(login_id);
	    		searchVO.setMax_chg_alc_id(null);
	    		
	    		int alc_id = alcAdminMapper.insertAlcAdmin(searchVO);
	    		
	    		searchVO.setChg_alc_id(null);
	    		searchVO.setAlc_id(alc_id);
	    		
	    		alcAdminMapper.insertAlcAdminChang(searchVO);
    		}    		
    	} else {
    		
    		for(int i=0; i<vo.getIn_sub_qty().length; i++){
    			
    			int sub_qty =  Integer.parseInt(vo.getIn_sub_qty()[i]);
    			
    			//설치사 동일이 아닌 항목으로 선택해도 고객사와 설치사 정보가 같으면 설치사 동일값으로 지정 
    			if(company_id.equals(vo.getIn_install_company_id()[i])){
    				install_identical_yn = "1";
    			}else{
    				install_identical_yn = "0";
    			}
    			
    			for(int a=0; a<sub_qty; a++){
    			
	    			AlcAdminVO searchVO = new AlcAdminVO();
	    			
	    			in_install_company_id = vo.getIn_install_company_id()[i]; //설치사
	        		//in_sub_qty = vo.getIn_sub_qty()[i]; //수량
	        		
	        		if (SpringStringUtil.isEmpty(vo.getIn_ordering_day()[i])) {
	        			in_ordering_start_day = "";
	        			in_ordering_end_day = "";
	        		} else {
	        			String[] ordering_day = vo.getIn_ordering_day()[i].split("~");
	            		
	        			in_ordering_start_day = ordering_day[0].trim();
	        			in_ordering_end_day = ordering_day[1].trim();
	        		}
	        		
	        		if (SpringStringUtil.isEmpty(vo.getIn_install_day()[i])) {        			
	        			in_install_start_day = "";
	        			in_install_end_day = "";
	        		} else {
	        			String[] install_day = vo.getIn_install_day()[i].split("~");
	        		
	        			in_install_start_day = install_day[0].trim();
	        			in_install_end_day = install_day[1].trim();
	        		}
	        		
	        		if(SpringStringUtil.isEmpty(vo.getIn_ordering_identical_yn()[i])){
	        			in_ordering_identical_yn = "";
	        		} else {
	        			in_ordering_identical_yn = vo.getIn_ordering_identical_yn()[i]; //발주기간동일여부
	        		}
	        		
	        		in_target_id = vo.getIn_target_id()[i]; //Target_Id
	        		if (SpringStringUtil.isEmpty(in_target_id)) {
	        			in_target_id = null;
		        	}
	        		in_license_date = vo.getIn_license_date()[i]; //license_date
	        		in_list_price = vo.getIn_list_price()[i]; //정가
	        		in_estimated_cost = vo.getIn_estimated_cost()[i]; //견적가
	        		if (SpringStringUtil.isEmpty(in_estimated_cost)) {
	        			in_estimated_cost = null;
		        	}
	        		in_purchase_date = vo.getIn_purchase_date()[i]; //구매일
	        		in_collect_money = vo.getIn_collect_money()[i]; //수금
	        		if (SpringStringUtil.isEmpty(in_collect_money)) {
	        			in_collect_money = null;
		        	}
	        		
	        		if (SpringStringUtil.isEmpty(vo.getIn_invoice_day()[i])) {        			
	        			in_invoice_start_day = "";
	        			in_invoice_end_day = "";
	        		} else {
	        			String[] invoice_day = vo.getIn_invoice_day()[i].split("~");
	        		
	        			in_invoice_start_day = invoice_day[0].trim();
	        			in_invoice_end_day = invoice_day[1].trim();
	        		}
	        		
	        		if (SpringStringUtil.isEmpty(vo.getIn_contract_day()[i])) {        			
	        			in_contract_start_day = "";
	        			in_contract_end_day = "";
	        		} else {
	        			String[] contract_day = vo.getIn_contract_day()[i].split("~");
	        		
	        			in_contract_start_day = contract_day[0].trim();
	        			in_contract_end_day = contract_day[1].trim();
	        		}
	        		
	        		if(SpringStringUtil.isEmpty(vo.getIn_quote_id()[i])){
	        			in_quote_id = null; //견적서 파일
		    		}else{
		    			in_quote_id = vo.getIn_quote_id()[i]; //견적서 파일
		    		}
	        		
		    		if(SpringStringUtil.isEmpty(vo.getIn_contract_id()[i])){
		    			in_contract_id = null; //계약서 파일
		    		}else{
		    			in_contract_id = vo.getIn_contract_id()[i]; //계약서 파일
		    		}
	        		
	        		in_stock_yn = vo.getIn_stock_yn()[i]; //stock
	        		in_purchase_agreement_yn = vo.getIn_purchase_agreement_yn()[i]; //구매동의
	    			
	        		/*
	        		 * 공통 부분 추가
	        		 * */       		
	        		searchVO.setCompany_id(company_id); //고객사
		    		searchVO.setAlc_year(alc_year); //년도	    		
		    		searchVO.setPlace_of_business(place_of_business); //사업장
		    		searchVO.setSales_customer(sales_customer); //영업담당자
	    			searchVO.setPortfolio(portfolio); //상표
		    		searchVO.setPrd_number(prd_number); //제품번호
		    		searchVO.setPrd_type(prd_TYPE); //유형
		    		searchVO.setTrigram(trigram); //모듈
		    		searchVO.setPortfolio_item_name(portfolio_item_name); //상표명
		    		searchVO.setInstall_identical_yn(install_identical_yn); //설치사 동일여부
	        		
		    		searchVO.setAlc_id(null);
	        		searchVO.setInstall_company_id(in_install_company_id); //설치사
	        		searchVO.setQty("1"); //수량
	        		searchVO.setOrdering_start_day(in_ordering_start_day); //발주_시작일
	        		searchVO.setOrdering_end_day(in_ordering_end_day); //발주_종료일  
	        		searchVO.setInstall_start_day(in_install_start_day); //설치_시작일
	        		searchVO.setInstall_end_day(in_install_end_day); //설치_종료일
	        		searchVO.setOrdering_identical_yn(in_ordering_identical_yn); //발주기간동일여부
	        		searchVO.setTarget_id(in_target_id); //Target_Id
	        		searchVO.setLicense_date(in_license_date); //license_date
	        		searchVO.setList_price(in_list_price); //정가
	        		searchVO.setEstimated_cost(in_estimated_cost); //견적가
	        		searchVO.setPurchase_date(in_purchase_date); //구매일
	        		searchVO.setCollect_money(in_collect_money); //수금
	        		searchVO.setDestruction_yn("0"); //파훼여부
	        		searchVO.setQuote_id(in_quote_id); //견적서 파일
	        		searchVO.setInvoice_id(null); //세금계산서 아이디
	        		searchVO.setInvoice_start_day(in_invoice_start_day); //세금계산서_시작일
	        		searchVO.setInvoice_end_day(in_invoice_end_day); //세금계산서_종료일
	        		searchVO.setContract_id(in_contract_id); //계약서 파일
	        		searchVO.setContract_start_day(in_contract_start_day); //계약서_시작일
	        		searchVO.setContract_end_day(in_contract_end_day); //계약서_종료일
	        		searchVO.setStock_yn(in_stock_yn); //stock
	        		searchVO.setPurchase_agreement_yn(in_purchase_agreement_yn); //구매동의
	        		searchVO.setCreator(login_id);
	        		searchVO.setMax_chg_alc_id(null);
	        		
	        		int alc_id = alcAdminMapper.insertAlcAdmin(searchVO);	        		
	        		searchVO.setChg_alc_id(null);
		    		searchVO.setAlc_id(alc_id);
		    		
		    		alcAdminMapper.insertAlcAdminChang(searchVO);
    			}
    		}
    	}
    	
    	//Max_chg_alc_id 업데이트
    	alcAdminMapper.updateAlcAdminMaxChgAlcId();
    }
    
    /**
	 * 메인리스트 - 담당영업
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<AlcAdminVO> alcSalesList(AlcAdminVO searchVO) throws Exception {
		return alcAdminMapper.alcSalesList(searchVO);
	}
	
	/**
	 * 메인리스트 - 견적서 파일 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<AlcAdminVO> alcAdminDetailQuiteFileList(AlcAdminVO searchVO) throws Exception {
		return alcAdminMapper.alcAdminDetailQuiteFileList(searchVO);
	}
	
	/**
	 * 메인리스트 - 계약서 파일 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<AlcAdminVO> alcAdminDetailContractFileList(AlcAdminVO searchVO) throws Exception {
		return alcAdminMapper.alcAdminDetailContractFileList(searchVO);
	}
		
}
