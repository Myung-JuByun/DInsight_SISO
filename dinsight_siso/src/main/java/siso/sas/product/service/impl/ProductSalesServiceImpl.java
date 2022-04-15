package siso.sas.product.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import siso.cmmn.util.SpringStringUtil;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.exp.admin.service.ExpanseAdminVO;
import siso.exp.admin.service.impl.ExpanseAdminMapper;
import siso.sas.product.service.ProductSalesService;
import siso.sas.product.service.ProductSalesVO;
import siso.sys.service.LoginVO;

/**
 * @Class Name : ProductSalesServiceImpl.java
 * @Description : ProductSalesServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class ProductSalesServiceImpl implements ProductSalesService {

	@Autowired
	public SqlSession sqlSession;
	public ProductSalesMapper productSalesMapper;
	public ExpanseAdminMapper expanseAdminMapper;
	
	public ProductSalesServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.productSalesMapper = sqlSession.getMapper(ProductSalesMapper.class);
		this.expanseAdminMapper = sqlSession.getMapper(ExpanseAdminMapper.class);
	}
			
	/**
	 * 매출품의 리스트 출력
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProductSalesVO> productSalesList(ProductSalesVO searchVO) throws Exception {
		return productSalesMapper.productSalesList(searchVO);
	}
	
	/**
	 * 매출품의 상세 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProductSalesVO> productSalesDetail(ProductSalesVO searchVO) throws Exception {
		return productSalesMapper.productSalesDetail(searchVO);
	}
	
	/**
	 * 매출품의 alc 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProductSalesVO> productSalesAlcSearch(ProductSalesVO searchVO) throws Exception {
		return productSalesMapper.productSalesAlcSearch(searchVO);
	}
	
	/**
	 * 매출품의 상세보기
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProductSalesVO> productSalesConferView(ProductSalesVO searchVO) throws Exception {
		return productSalesMapper.productSalesConferView(searchVO);
	}
	
	/**
	 * DS 매출 및 매입내역 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProductSalesVO> productDSSalesRecordView(ProductSalesVO searchVO) throws Exception {
		return productSalesMapper.productDSSalesRecordView(searchVO);
	}
	
	/**
	 * ETC 매출 및 매입내역 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProductSalesVO> productSalesRecordView(ProductSalesVO searchVO) throws Exception {
		return productSalesMapper.productSalesRecordView(searchVO);
	}
	
	/**
	 * 매출 및 매입 세금계산서 리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ProductSalesVO> productSalesInvoiceView(ProductSalesVO searchVO) throws Exception {
		return productSalesMapper.productSalesInvoiceView(searchVO);
	}
	
	/**
	 * contract check
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public List<ProductSalesVO> selectCheckContract(ProductSalesVO searchVO) throws Exception {    	
    	return productSalesMapper.selectCheckContract(searchVO);
    }
	
    /**
	 * degree max 카운트 
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public String selectDegreeCount(ProductSalesVO vo) throws Exception {    	
    	return productSalesMapper.selectDegreeCount(vo);
    }
    
    /**
	 * selectCheckKind 카운트 
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
	public String selectCheckKind(ProductSalesVO vo) throws Exception {
    	return productSalesMapper.selectCheckKind(vo);
    }
    
	/**
	 * 매출품의 메인정보 저장
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return String형
	 * @exception Exception
	 */
    @Override
    @Transactional
    public void productSalesConferInsert(ProductSalesVO searchVO, LoginVO loginVO) throws Exception {    	
    	//로그인정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();			
		int login_id       		=	loginVO.getUser_id();
		
		int conferId					=	0;
		String chk						=	"";
		String modichk					=	"";
		int old_sales_confer_id		=	searchVO.getSales_confer_id();
		
		String old_degree				=	searchVO.getDegree();
		String status_cd				=	searchVO.getStatus_cd();
		String sales_confer_kind		=	searchVO.getSales_confer_kind();
		int sales_confer_monthly_id	=	searchVO.getSales_confer_monthly_id();
		String insert_date				=	searchVO.getInsert_date();
		String total_contract_price		=	searchVO.getTotal_contract_price();
		String total_purchase_price		=	searchVO.getPurchase_price();
		String profit_price				=	searchVO.getProfit_price();
		int sales_confer_id			=	searchVO.getSales_confer_id();
		int sales_record_ds_id		=	0;
		String price_list_date 			=	"";
		String portfolio				=	"";
		String portfolio_item_name		=	"";
		String prd_number				=	"";
		String prd_revision				=	"";
		String prd_type 				=	"";
		String trigram 					=	"";
		String plc 						=	"";
		String alc 						=	"";
		String qlc						=	"";
		String ylc						=	"";
		String etc 						=	"";
		String ds_list_price 			=	"";
		String ds_qty 					=	"";
		String each_yn					=	"";
		String sales_alc_dc				=	"";
		String sales_plc_dc				=	"";
		String sales_alc_dc_gb			=	"";
		String sales_plc_dc_gb			=	"";
		String sales_alc_dc_price		=	"";
		String sales_plc_dc_price		=	"";
		String ds_sales_price 			=	"";
		String purchase_plc_dc 			=	"";
		String purchase_alc_dc			=	"";
		String purchase_plc_dc_gb 		=	"";
		String purchase_alc_dc_gb		=	"";
		String purchase_plc_dc_price	=	"";
		String purchase_alc_dc_price 	=	"";
		String ds_purchase_unit_price 	=	"";
		String ds_purchase_price		=	"";
		String ds_po_day 				=	"";
		String install_day				=	"";
		String ordering_day				=	"";
		String license_start_date		=	"";
		String license_end_date 		=	"";
		String target_id				=	"";
		String place_of_business 		=	"";
		String chang_yn					=	"";
				
		String sales_record_id			=	"";
    	String sales_gb 				=	"";
		String models					=	"";
		String des_start_day			=	"";
		String des_end_day 				=	"";
		String qty 						=	"";
		String list_price 				=	"";
		String sales_unit_price 		=	"";
		String sales_price				=	"";
		String sales_dc					=	"";
		String purchase_unit_price 		=	"";
		String purchase_price 			=	"";
		String purchase_dc 				=	"";
		String supplier					=	"";
		String purchase_pay_code 		=	"";
		String purchase_pay_method 		=	"";		

		String sale_invoice_id			=	"";
		String buy_invoice_id			=	"";
		String invoice_name				=	"";
		String checked					=	"";
		String split					=	"";
		String issued					=	"";
		String method					=	"";
		String price					=	"";
		String payment_requisite_content=	"";
		String contract_number			=	"";
		String invoice_content			=	searchVO.getInvoice_content();
		String buy_invoice_content		=	searchVO.getBuy_invoice_content();
		
		int chg_sales_record_ds_id		=	0;
		String chg_price_list_date 			=	"";
		String chg_portfolio				=	"";
		String chg_portfolio_item_name		=	"";
		String chg_prd_number				=	"";
		String chg_prd_revision				=	"";
		String chg_prd_type 				=	"";
		String chg_trigram 					=	"";
		String chg_plc 						=	"";
		String chg_alc 						=	"";
		String chg_qlc						=	"";
		String chg_ylc						=	"";
		String chg_etc 						=	"";
		String chg_ds_list_price 			=	"";
		String chg_qty 						=	"";
		String chg_each_yn					=	"";
		String chg_sales_alc_dc				=	"";
		String chg_sales_plc_dc				=	"";
		String chg_sales_alc_dc_gb			=	"";
		String chg_sales_plc_dc_gb			=	"";
		String chg_sales_alc_dc_price		=	"";
		String chg_sales_plc_dc_price		=	"";
		String chg_ds_sales_price 			=	"";
		String chg_purchase_plc_dc 			=	"";
		String chg_purchase_alc_dc			=	"";
		String chg_purchase_plc_dc_gb 		=	"";
		String chg_purchase_alc_dc_gb		=	"";
		String chg_purchase_plc_dc_price	=	"";
		String chg_purchase_alc_dc_price 	=	"";
		String chg_ds_purchase_unit_price 	=	"";
		String chg_ds_purchase_price		=	"";
		String chg_ds_po_day 				=	"";
		String chg_install_day				=	"";
		String chg_ordering_day				=	"";
		String chg_license_start_date		=	"";
		String chg_license_end_date 		=	"";
		String chg_target_id				=	"";
		String chg_place_of_business 		=	"";
		String chg_chang_yn					=	"";
		String alc_year					=	"";
		int company_id				=	0;
		
		insert_date = insert_date.replace("-", "");
		total_contract_price = total_contract_price.replace(",", "");
		total_purchase_price = total_purchase_price.replace(",", "");
		profit_price = profit_price.replace(",", "");
		
		if(status_cd.equals("703"))	status_cd = "701";    		
		
		searchVO.setStatus_cd(status_cd);
		searchVO.setSales_confer_kind(sales_confer_kind);		
		searchVO.setInsert_date(insert_date);
		searchVO.setTotal_contract_price(total_contract_price);
		searchVO.setPurchase_price(total_purchase_price);
		searchVO.setProfit_price(profit_price);		
		
		if (sales_confer_id > 0)
			chk = "Y";
    	else chk = "N";
		
		//버전체크
		String degreeCount = productSalesMapper.selectDegreeCount(searchVO);
		
		if(old_degree.equals(degreeCount)){
			chk = "Y";
			modichk = "Y";
			old_sales_confer_id = 0;
		}else{
			chk = "N";
			modichk = "N";
			sales_confer_monthly_id = 0;
			sales_confer_id = 0;
		}
		
		if (SpringStringUtil.isEmpty(degreeCount)) {
			searchVO.setDegree("1");
    	}else searchVO.setDegree(degreeCount);
		
		searchVO.setSales_confer_monthly_id(sales_confer_monthly_id);
		searchVO.setSales_confer_id(sales_confer_id);
		
		if(chk.equals("N")){
			conferId = productSalesMapper.productSalesConferInsert(searchVO);
		}else{
			conferId = sales_confer_id;
			productSalesMapper.productSalesConferUpdate(searchVO);
		}
		
    	//매출 및 매입내역 저장
		//DS
		if(searchVO.getIn_portfolio() != null && searchVO.getIn_portfolio().length > 0) {
			List<ProductSalesVO> inputListVO = new ArrayList<ProductSalesVO>();
	    	
			for (int cnt=0; cnt < searchVO.getIn_portfolio().length; cnt++) {
				ProductSalesVO productSalesVO = new ProductSalesVO();
				sales_record_ds_id		=	searchVO.getIn_sales_record_ds_id()[cnt];
				price_list_date 		=	searchVO.getIn_price_list_date()[cnt];
				portfolio				=	searchVO.getIn_portfolio()[cnt];
				portfolio_item_name		=	searchVO.getIn_portfolio_item_name()[cnt];
				prd_number				=	searchVO.getIn_prd_number()[cnt];
				prd_revision			=	searchVO.getIn_prd_revision()[cnt];
				prd_type 				=	searchVO.getIn_prd_type()[cnt];
				trigram 				=	searchVO.getIn_trigram()[cnt];
				plc 					=	searchVO.getIn_plc()[cnt];
				alc 					=	searchVO.getIn_alc()[cnt];
				qlc						=	searchVO.getIn_qlc()[cnt];
				ylc						=	searchVO.getIn_ylc()[cnt];
				etc 					=	searchVO.getIn_etc()[cnt];
				ds_list_price 			=	searchVO.getIn_ds_list_price()[cnt];
				ds_qty 					=	searchVO.getIn_ds_qty()[cnt];
				each_yn					=	searchVO.getIn_each_yn()[cnt];
				sales_alc_dc 			=	searchVO.getIn_sales_alc_dc()[cnt];
				sales_plc_dc 			=	searchVO.getIn_sales_plc_dc()[cnt];
				sales_alc_dc_gb 		=	searchVO.getIn_sales_alc_dc_gb()[cnt];
				sales_plc_dc_gb 		=	searchVO.getIn_sales_plc_dc_gb()[cnt];
				sales_alc_dc_price 		=	searchVO.getIn_sales_alc_dc_price()[cnt];
				sales_plc_dc_price 		=	searchVO.getIn_sales_plc_dc_price()[cnt];
				ds_sales_price 			=	searchVO.getIn_ds_sales_price()[cnt];
				purchase_plc_dc 		=	searchVO.getIn_purchase_plc_dc()[cnt];
				purchase_alc_dc 		=	searchVO.getIn_purchase_alc_dc()[cnt];				
				purchase_alc_dc_gb 		=	searchVO.getIn_purchase_alc_dc_gb()[cnt];
				purchase_plc_dc_gb 		=	searchVO.getIn_purchase_plc_dc_gb()[cnt];
				purchase_plc_dc_price	=	searchVO.getIn_purchase_plc_dc_price()[cnt];
				purchase_alc_dc_price	=	searchVO.getIn_purchase_alc_dc_price()[cnt];
				ds_purchase_unit_price 	=	searchVO.getIn_ds_purchase_unit_price()[cnt];
				ds_purchase_price 		=	searchVO.getIn_ds_purchase_price()[cnt];
				ds_po_day				=	searchVO.getIn_ds_po_day()[cnt];
				install_day				=	searchVO.getIn_install_day()[cnt];
				ordering_day	 		=	searchVO.getIn_ordering_day()[cnt];
				license_start_date 		=	searchVO.getIn_license_start_date()[cnt];
				license_end_date 		=	searchVO.getIn_license_end_date()[cnt];
				target_id				=	searchVO.getIn_target_id()[cnt];
				place_of_business		=	searchVO.getIn_place_of_business()[cnt];
				chang_yn				=	searchVO.getIn_chang_yn()[cnt];
				
				if (SpringStringUtil.isEmpty(ds_list_price)) {
					ds_list_price = null;
		    	}
				if (SpringStringUtil.isEmpty(ds_sales_price)) {
					ds_sales_price = null;
		    	}
				if (SpringStringUtil.isEmpty(sales_alc_dc)) {
					sales_alc_dc = null;
		    	}
				if (SpringStringUtil.isEmpty(sales_plc_dc)) {
					sales_plc_dc = null;
		    	}
				if (SpringStringUtil.isEmpty(sales_alc_dc_price)) {
					sales_alc_dc_price = null;
		    	}
				if (SpringStringUtil.isEmpty(sales_plc_dc_price)) {
					sales_plc_dc_price = null;
		    	}
				if (SpringStringUtil.isEmpty(purchase_alc_dc)) {
					purchase_alc_dc = null;
		    	}
				if (SpringStringUtil.isEmpty(purchase_plc_dc)) {
					purchase_plc_dc = null;
		    	}
				if (SpringStringUtil.isEmpty(purchase_plc_dc_price)) {
					purchase_plc_dc_price = null;
		    	}
				if (SpringStringUtil.isEmpty(purchase_alc_dc_price)) {
					purchase_alc_dc_price = null;
		    	}
				if (SpringStringUtil.isEmpty(ds_purchase_unit_price)) {
					ds_purchase_unit_price = null;
		    	}
				if (SpringStringUtil.isEmpty(ds_purchase_price)) {
					ds_purchase_price = null;
		    	}
				if (SpringStringUtil.isEmpty(prd_revision)) {
					prd_revision = null;
		    	}

				if(modichk.equals("N")) sales_record_ds_id = 0;
				
				productSalesVO.setSales_confer_id(conferId);
				productSalesVO.setSales_record_ds_id(sales_record_ds_id);
				productSalesVO.setPrice_list_date(price_list_date);
				productSalesVO.setPortfolio(portfolio);
				productSalesVO.setPortfolio_item_name(portfolio_item_name);
				productSalesVO.setPrd_number(prd_number);
				productSalesVO.setPrd_revision(prd_revision);
				productSalesVO.setPrd_type(prd_type);
				productSalesVO.setTrigram(trigram);
				productSalesVO.setPlc(plc);
				productSalesVO.setAlc(alc);
				productSalesVO.setQlc(qlc);
				productSalesVO.setYlc(ylc);
				productSalesVO.setEtc(etc);
				productSalesVO.setDs_list_price(ds_list_price);
				productSalesVO.setDs_qty(ds_qty);
				productSalesVO.setEach_yn(each_yn);
				productSalesVO.setSales_alc_dc(sales_alc_dc);
				productSalesVO.setSales_plc_dc(sales_plc_dc);
				productSalesVO.setSales_alc_dc_gb(sales_alc_dc_gb);
				productSalesVO.setSales_plc_dc_gb(sales_plc_dc_gb);
				productSalesVO.setSales_alc_dc_price(sales_alc_dc_price);
				productSalesVO.setSales_plc_dc_price(sales_plc_dc_price);
				productSalesVO.setDs_sales_price(ds_sales_price);
				productSalesVO.setPurchase_plc_dc(purchase_plc_dc);
				productSalesVO.setPurchase_alc_dc(purchase_alc_dc);
				productSalesVO.setPurchase_alc_dc_gb(purchase_alc_dc_gb);
				productSalesVO.setPurchase_plc_dc_gb(purchase_plc_dc_gb);
				productSalesVO.setPurchase_plc_dc_price(purchase_plc_dc_price);
				productSalesVO.setPurchase_alc_dc_price(purchase_alc_dc_price);
				productSalesVO.setDs_purchase_unit_price(ds_purchase_unit_price);
				productSalesVO.setDs_purchase_price(ds_purchase_price);
				productSalesVO.setDs_po_day(ds_po_day);
				productSalesVO.setInstall_day(install_day);
				productSalesVO.setOrdering_day(ordering_day);
				productSalesVO.setLicense_start_date(license_start_date);
				productSalesVO.setLicense_end_date(license_end_date);
				productSalesVO.setTarget_id(target_id);
				productSalesVO.setPlace_of_business(place_of_business);
				productSalesVO.setChang_yn(chang_yn);
				productSalesVO.setCreator(login_id);
				
				inputListVO.add(productSalesVO);
			}
		
			for (ProductSalesVO inputVo : inputListVO) {
	    		productSalesMapper.productDSSalesRecordInsert(inputVo);
	    	}
		}
		
		//System.out.println("----------------------ds ok-------------------");
		
		//ALC
		if(searchVO.getIn_alc_portfolio() != null && searchVO.getIn_alc_portfolio().length > 0) {
			for (int cnt=0; cnt < searchVO.getIn_alc_portfolio().length; cnt++) {
				ProductSalesVO productSalesVO2 = new ProductSalesVO();
				
				chg_sales_record_ds_id		=	searchVO.getIn_alc_sales_record_ds_id()[cnt];
				chg_chang_yn				=	searchVO.getIn_alc_chang_yn()[cnt];
				chg_price_list_date 		=	searchVO.getIn_alc_price_list_date()[cnt];
				chg_portfolio				=	searchVO.getIn_alc_portfolio()[cnt];
				chg_portfolio_item_name		=	searchVO.getIn_alc_portfolio_item_name()[cnt];
				chg_prd_number				=	searchVO.getIn_alc_prd_number()[cnt];
				
				//System.out.println("----------------------chg_prd_revision-------------------");
				
				chg_prd_revision			=	searchVO.getIn_alc_prd_revision()[cnt];
				
				System.out.println(chg_prd_revision);
				
				//System.out.println("----------------------chg_prd_revision-------------------");
				
				chg_prd_type 				=	searchVO.getIn_alc_prd_type()[cnt];
				chg_trigram 				=	searchVO.getIn_alc_trigram()[cnt];
				chg_plc 					=	searchVO.getIn_alc_plc()[cnt];
				chg_alc 					=	searchVO.getIn_alc_alc()[cnt];
				chg_qlc						=	searchVO.getIn_alc_qlc()[cnt];
				chg_ylc						=	searchVO.getIn_alc_ylc()[cnt];
				chg_etc 					=	searchVO.getIn_alc_etc()[cnt];
				chg_ds_list_price 			=	searchVO.getIn_alc_ds_list_price()[cnt];
				chg_qty 					=	searchVO.getIn_alc_ds_qty()[cnt];
				chg_each_yn					=	searchVO.getIn_alc_each_yn()[cnt];
				chg_sales_alc_dc 			=	searchVO.getIn_alc_sales_alc_dc()[cnt];
				chg_sales_plc_dc 			=	searchVO.getIn_alc_sales_plc_dc()[cnt];
				chg_sales_alc_dc_gb 		=	searchVO.getIn_alc_sales_alc_dc_gb()[cnt];
				chg_sales_plc_dc_gb 		=	searchVO.getIn_alc_sales_plc_dc_gb()[cnt];
				chg_sales_alc_dc_price 		=	searchVO.getIn_alc_sales_alc_dc_price()[cnt];
				chg_sales_plc_dc_price 		=	searchVO.getIn_alc_sales_plc_dc_price()[cnt];
				chg_ds_sales_price 			=	searchVO.getIn_alc_ds_sales_price()[cnt];
				chg_purchase_plc_dc 		=	searchVO.getIn_alc_purchase_plc_dc()[cnt];
				chg_purchase_alc_dc 		=	searchVO.getIn_alc_purchase_alc_dc()[cnt];				
				chg_purchase_alc_dc_gb 		=	searchVO.getIn_alc_purchase_alc_dc_gb()[cnt];
				chg_purchase_plc_dc_gb 		=	searchVO.getIn_alc_purchase_plc_dc_gb()[cnt];
				chg_purchase_plc_dc_price	=	searchVO.getIn_alc_purchase_plc_dc_price()[cnt];
				chg_purchase_alc_dc_price	=	searchVO.getIn_alc_purchase_alc_dc_price()[cnt];
				chg_ds_purchase_unit_price 	=	searchVO.getIn_alc_ds_purchase_unit_price()[cnt];
				chg_ds_purchase_price 		=	searchVO.getIn_alc_ds_purchase_price()[cnt];
				chg_ds_po_day				=	searchVO.getIn_alc_ds_po_day()[cnt];
				chg_install_day				=	searchVO.getIn_alc_install_day()[cnt];
				chg_ordering_day	 		=	searchVO.getIn_alc_ordering_day()[cnt];
				chg_license_start_date 		=	searchVO.getIn_alc_license_start_date()[cnt];
				chg_license_end_date 		=	searchVO.getIn_alc_license_end_date()[cnt];
				chg_target_id				=	searchVO.getIn_alc_target_id()[cnt];
				chg_place_of_business		=	searchVO.getIn_alc_place_of_business()[cnt];
				alc_year					=	searchVO.getIn_alc_year()[cnt];
				company_id					=	searchVO.getIn_company_id()[cnt];
				
				if (SpringStringUtil.isEmpty(chg_ds_list_price)) {
					chg_ds_list_price = null;
		    	}
				if (SpringStringUtil.isEmpty(chg_ds_sales_price)) {
					chg_ds_sales_price = null;
		    	}
				if (SpringStringUtil.isEmpty(chg_sales_alc_dc)) {
					chg_sales_alc_dc = null;
		    	}
				if (SpringStringUtil.isEmpty(chg_sales_plc_dc)) {
					chg_sales_plc_dc = null;
		    	}
				if (SpringStringUtil.isEmpty(chg_sales_alc_dc_price)) {
					chg_sales_alc_dc_price = null;
		    	}
				if (SpringStringUtil.isEmpty(chg_sales_plc_dc_price)) {
					chg_sales_plc_dc_price = null;
		    	}
				if (SpringStringUtil.isEmpty(chg_purchase_alc_dc)) {
					chg_sales_alc_dc = null;
		    	}
				if (SpringStringUtil.isEmpty(chg_purchase_plc_dc)) {
					chg_sales_plc_dc = null;
		    	}
				if (SpringStringUtil.isEmpty(chg_purchase_plc_dc_price)) {
					chg_purchase_plc_dc_price = null;
		    	}
				if (SpringStringUtil.isEmpty(chg_purchase_alc_dc_price)) {
					chg_purchase_alc_dc_price = null;
		    	}
				if (SpringStringUtil.isEmpty(chg_ds_purchase_unit_price)) {
					chg_ds_purchase_unit_price = null;
		    	}
				if (SpringStringUtil.isEmpty(chg_ds_purchase_price)) {
					chg_ds_purchase_price = null;
		    	}				
				if (SpringStringUtil.isEmpty(alc_year)) {
					alc_year = null;
		    	}
				if (SpringStringUtil.isEmpty(chg_prd_revision)) {
					chg_prd_revision = null;
		    	}
				
				//ds/alc 구분
				if(modichk.equals("N")) chg_sales_record_ds_id = 0;
				
				productSalesVO2.setSales_confer_id(conferId);
				productSalesVO2.setChg_sales_record_ds_id(chg_sales_record_ds_id);
				productSalesVO2.setChg_price_list_date(chg_price_list_date);
				productSalesVO2.setChg_portfolio(chg_portfolio);
				productSalesVO2.setChg_portfolio_item_name(chg_portfolio_item_name);
				productSalesVO2.setChg_prd_number(chg_prd_number);
				productSalesVO2.setChg_prd_revision(chg_prd_revision);
				productSalesVO2.setChg_prd_type(chg_prd_type);
				productSalesVO2.setChg_trigram(chg_trigram);
				productSalesVO2.setChg_plc(chg_plc);
				productSalesVO2.setChg_alc(chg_alc);
				productSalesVO2.setChg_qlc(chg_qlc);
				productSalesVO2.setChg_ylc(chg_ylc);
				productSalesVO2.setChg_etc(chg_etc);
				productSalesVO2.setChg_ds_list_price(chg_ds_list_price);
				productSalesVO2.setChg_qty(chg_qty);
				productSalesVO2.setChg_each_yn(chg_each_yn);
				productSalesVO2.setChg_sales_alc_dc(chg_sales_alc_dc);
				productSalesVO2.setChg_sales_plc_dc(chg_sales_plc_dc);
				productSalesVO2.setChg_sales_alc_dc_gb(chg_sales_alc_dc_gb);
				productSalesVO2.setChg_sales_plc_dc_gb(chg_sales_plc_dc_gb);
				productSalesVO2.setChg_sales_alc_dc_price(chg_sales_alc_dc_price);
				productSalesVO2.setChg_sales_plc_dc_price(chg_sales_plc_dc_price);
				productSalesVO2.setChg_ds_sales_price(chg_ds_sales_price);
				productSalesVO2.setChg_purchase_plc_dc(chg_purchase_plc_dc);
				productSalesVO2.setChg_purchase_alc_dc(chg_purchase_alc_dc);
				productSalesVO2.setChg_purchase_alc_dc_gb(chg_purchase_alc_dc_gb);
				productSalesVO2.setChg_purchase_plc_dc_gb(chg_purchase_plc_dc_gb);
				productSalesVO2.setChg_purchase_plc_dc_price(chg_purchase_plc_dc_price);
				productSalesVO2.setChg_purchase_alc_dc_price(chg_purchase_alc_dc_price);
				productSalesVO2.setChg_ds_purchase_unit_price(chg_ds_purchase_unit_price);
				productSalesVO2.setChg_ds_purchase_price(chg_ds_purchase_price);
				productSalesVO2.setChg_ds_po_day(chg_ds_po_day);
				productSalesVO2.setChg_install_day(chg_install_day);
				productSalesVO2.setChg_ordering_day(chg_ordering_day);
				productSalesVO2.setChg_license_start_date(chg_license_start_date);
				productSalesVO2.setChg_license_end_date(chg_license_end_date);
				productSalesVO2.setChg_target_id(chg_target_id);
				productSalesVO2.setChg_place_of_business(chg_place_of_business);
				productSalesVO2.setChg_chang_yn(chg_chang_yn);
				productSalesVO2.setCreator(login_id);
				
				int chg_ds_id= productSalesMapper.productALCSalesRecordInsert(productSalesVO2);
				
				productSalesVO2.setAlc_year(alc_year);
				productSalesVO2.setCompany_id(company_id);
				productSalesVO2.setChg_sales_record_ds_id(chg_ds_id);
				productSalesVO2.setOld_sales_confer_id(old_sales_confer_id);
				
				//inputListVO.add(productSalesVO2);
				
				productSalesMapper.productAlcSalesRecordHistoryInsert2(productSalesVO2);
				productSalesMapper.productAlcSalesRecordHistoryInsert(productSalesVO2);
			}			
		}
		
		//ETC
		if(searchVO.getIn_sales_gb() != null && searchVO.getIn_sales_gb().length > 0) {
			List<ProductSalesVO> inputListVO2 = new ArrayList<ProductSalesVO>();
			
			String etc_insertyn = "";
			
			for (int cnt=0; cnt < searchVO.getIn_sales_gb().length; cnt++) {	
				ProductSalesVO productSalesVO = new ProductSalesVO();
				sales_record_id			=	searchVO.getIn_sales_record_id()[cnt];
				sales_gb 				=	searchVO.getIn_sales_gb()[cnt];
				models					=	searchVO.getIn_model()[cnt];
				des_start_day			=	searchVO.getIn_des_start_day()[cnt];
				des_end_day 			=	searchVO.getIn_des_end_day()[cnt];
				qty 					=	searchVO.getIn_qty()[cnt];
				list_price 				=	searchVO.getIn_list_price()[cnt];
				sales_unit_price 		=	searchVO.getIn_sales_unit_price()[cnt];
				sales_price				=	searchVO.getIn_sales_price()[cnt];
				sales_dc				=	searchVO.getIn_sales_dc()[cnt];
				purchase_unit_price 	=	searchVO.getIn_purchase_unit_price()[cnt];
				purchase_price 			=	searchVO.getIn_purchase_price()[cnt];
				purchase_dc 			=	searchVO.getIn_purchase_dc()[cnt];
				supplier				=	searchVO.getIn_supplier()[cnt];
				purchase_pay_code 		=	searchVO.getIn_purchase_pay_code()[cnt];
				purchase_pay_method 	=	searchVO.getIn_purchase_pay_method()[cnt];
				//금액 , 치환
				qty = qty.replace(",", "");
				list_price = list_price.replace(",", "");
				sales_unit_price = sales_unit_price.replace(",", "");
				sales_price = sales_price.replace(",", "");
				sales_dc = sales_dc.replace(",", "");			
				purchase_unit_price = purchase_unit_price.replace(",", "");
				purchase_price = purchase_price.replace(",", "");
				purchase_dc = purchase_dc.replace(",", "");
				
				if (SpringStringUtil.isEmpty(sales_record_id)) {
					sales_record_id = null;
					etc_insertyn = "Y";
		    	}else etc_insertyn = "N";
				
				productSalesVO.setSales_confer_id(conferId);
				productSalesVO.setSales_record_id(sales_record_id);
				productSalesVO.setSales_gb(sales_gb);
				productSalesVO.setModel(models);
				productSalesVO.setDes_start_day(des_start_day);
				productSalesVO.setDes_end_day(des_end_day);
				productSalesVO.setQty(qty);
				productSalesVO.setList_price(list_price);
				productSalesVO.setSales_unit_price(sales_unit_price);
				productSalesVO.setSales_price(sales_price);
				productSalesVO.setSales_dc("".equals(sales_dc)?"0":sales_dc);
				productSalesVO.setPurchase_unit_price(purchase_unit_price);
				productSalesVO.setPurchase_price(purchase_price);
				productSalesVO.setPurchase_dc(purchase_dc);
				productSalesVO.setSupplier(supplier);
				productSalesVO.setPurchase_pay_code(purchase_pay_code);
				productSalesVO.setPurchase_pay_method(purchase_pay_method);
				productSalesVO.setCreator(login_id);
				inputListVO2.add(productSalesVO);
			}
			
			if(etc_insertyn.equals("Y")){
				for (ProductSalesVO inputVo2 : inputListVO2) {
		    		productSalesMapper.productSalesRecordInsert(inputVo2);
		    	}
			}else{
				for (ProductSalesVO inputVo2 : inputListVO2) {
		    		productSalesMapper.productSalesRecordUpdate(inputVo2);
		    	}
			}			
		}
		
		String sales_insertyn = "";
		
		for (int cnt=0; cnt < searchVO.getIn_split().length; cnt++) {			
			ProductSalesVO productSalesInvoiceVO = new ProductSalesVO();
			
			sale_invoice_id				=	searchVO.getIn_invoice_id()[cnt];
			invoice_name				=	searchVO.getIn_invoice_name()[cnt];
			checked						=	"1";
			split						=	searchVO.getIn_split()[cnt];
			issued						=	searchVO.getIn_issued()[cnt];
			method						=	searchVO.getIn_method()[cnt];
			price						=	searchVO.getIn_price()[cnt];
			payment_requisite_content	=	searchVO.getIn_payment_requisite_content()[cnt];
			contract_number				=	searchVO.getIn_contract_number()[cnt];
			
			//금액 , 치환
			price = price.replace(",", "");
			
			if(modichk.equals("N")) sale_invoice_id = null;
			
			if (SpringStringUtil.isEmpty(price)) {
				price = null;
	    	}
			if (SpringStringUtil.isEmpty(sale_invoice_id)) {
				sale_invoice_id = null;
				sales_insertyn = "Y";
	    	}else sales_insertyn = "N";
			
			productSalesInvoiceVO.setSale_invoice_id(sale_invoice_id);
			productSalesInvoiceVO.setInvoice_name(invoice_name);
			productSalesInvoiceVO.setSales_confer_id(conferId);
			productSalesInvoiceVO.setChecked(checked);
			productSalesInvoiceVO.setSplit(split);
			productSalesInvoiceVO.setIssued(issued);
			productSalesInvoiceVO.setMethod(method);
			productSalesInvoiceVO.setPrice(price);
			productSalesInvoiceVO.setPayment_requisite_content(payment_requisite_content);
			productSalesInvoiceVO.setContract_number(contract_number);
			productSalesInvoiceVO.setInvoice_content(invoice_content);
			productSalesInvoiceVO.setCreator(login_id);
			
		//	if(sales_insertyn.equals("Y"))inputListInvoiceVO.add(productSalesInvoiceVO);		
			//System.out.println(inputListInvoiceVO);
			
			//inputListInvoiceVO.add(productSalesInvoiceVO);
			
			if(sales_insertyn.equals("Y")){
				System.out.println("insert");
				productSalesMapper.productSalesInvoiceInsert(productSalesInvoiceVO);
			}else{
				System.out.println("update");
				productSalesMapper.productSalesInvoiceUpdate(productSalesInvoiceVO);
			}	
		}
		
		/*if(sales_insertyn.equals("Y")){
			for (ProductSalesVO inputVo : inputListInvoiceVO) {
	    		productSalesDAO.productSalesInvoiceInsert(inputVo);
	    	}
		}else{
			for (ProductSalesVO inputVo : inputListInvoiceVO) {
	    		productSalesDAO.productSalesInvoiceUpdate(inputVo);
	    	}
		}*/		
		
		//매입세금계산서 저장
		if(searchVO.getIn_buy_split() != null && searchVO.getIn_buy_issued() != null &&
			searchVO.getIn_buy_split().length > 0 && searchVO.getIn_buy_issued().length > 0) {			
				String buy_insertyn = "";
				
				for (int cnt=0; cnt < searchVO.getIn_buy_split().length; cnt++) {
					ProductSalesVO productSalesInvoiceBuyVO = new ProductSalesVO();
					
					buy_invoice_id				=	searchVO.getIn_buy_invoice_id()[cnt];
					invoice_name				=	searchVO.getIn_buy_invoice_name()[cnt];
					checked						=	"2";
					split						=	searchVO.getIn_buy_split()[cnt];
					issued						=	searchVO.getIn_buy_issued()[cnt];
					method						=	searchVO.getIn_buy_method()[cnt];
					price						=	searchVO.getIn_buy_price()[cnt];
					payment_requisite_content	=	searchVO.getIn_buy_payment_requisite_content()[cnt];
					contract_number				=	searchVO.getIn_buy_contract_number()[cnt];
					
					//금액 , 치환
					price = price.replace(",", "");
					
					if(modichk.equals("N")) buy_invoice_id = null;					
					
					if (SpringStringUtil.isEmpty(buy_invoice_id)) {
						buy_invoice_id = null;
						buy_insertyn = "Y";
			    	}else buy_insertyn = "N";
					if (SpringStringUtil.isEmpty(price)) {
						price = null;
			    	}
					
					productSalesInvoiceBuyVO.setSale_invoice_id(buy_invoice_id);
					productSalesInvoiceBuyVO.setInvoice_name(invoice_name);
					productSalesInvoiceBuyVO.setSales_confer_id(conferId);
					productSalesInvoiceBuyVO.setChecked(checked);
					productSalesInvoiceBuyVO.setSplit(split);
					productSalesInvoiceBuyVO.setIssued(issued);
					productSalesInvoiceBuyVO.setMethod(method);
					productSalesInvoiceBuyVO.setPrice(price);
					productSalesInvoiceBuyVO.setPayment_requisite_content(payment_requisite_content);
					productSalesInvoiceBuyVO.setContract_number(contract_number);
					productSalesInvoiceBuyVO.setInvoice_content(buy_invoice_content);
					productSalesInvoiceBuyVO.setCreator(login_id);
					
					//inputListInvoiceBuyVO.add(productSalesInvoiceBuyVO);					
					//System.out.println(inputListInvoiceBuyVO);
					
					if(buy_insertyn.equals("Y")){
						System.out.println("insert");
						productSalesMapper.productSalesInvoiceInsert(productSalesInvoiceBuyVO);
					}else{
						System.out.println("update");
						productSalesMapper.productSalesInvoiceUpdate(productSalesInvoiceBuyVO);
					}
				}			
				
				/*if(buy_insertyn.equals("Y")){
					for (ProductSalesVO inputVo : inputListInvoiceBuyVO) {
			    		productSalesDAO.productSalesInvoiceInsert(inputVo);
			    	}
				}else{
					for (ProductSalesVO inputVo : inputListInvoiceBuyVO) {
			    		productSalesDAO.productSalesInvoiceUpdate(inputVo);
			    	}
				}*/			
		}		
    }
    
    /**
	 * 매출품의 매출 및 매입내역 저장
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void productSalesRecordInsert(List<ProductSalesVO> listvo) throws Exception {
    	for (ProductSalesVO inputVo : listvo) {
    		productSalesMapper.productSalesRecordInsert(inputVo);
    	}
    }
    
    /**
	 * 매출품의 매출/매입 세금계산서 저장
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void productSalesInvoiceInsert(List<ProductSalesVO> listvo) throws Exception {
    	for (ProductSalesVO inputVo : listvo) {
    		productSalesMapper.productSalesInvoiceInsert(inputVo);
    	}
    }
	
	/**
	 * 매출품의 삭제
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void productSalesConferDel(ProductSalesVO vo) throws Exception {    	
    	productSalesMapper.productSalesConferDel(vo);
    }
    
    /**
   	 * 매출품의 매출 및 매입내역 삭제 - alc/ds
   	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
   	 * @return void형
   	 * @exception Exception
   	 */
       @Override
   	public void productDSSalesRecordDel(ProductSalesVO vo) throws Exception {    	
       	productSalesMapper.productDSSalesRecordDel(vo);
       }
    
    /**
   	 * 변경 매출품의 매출/매입 - 이력삭제
   	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
   	 * @return void형
   	 * @exception Exception
   	 */
       @Override
   	public void productAlcSalesRecordHistoryDel(ProductSalesVO vo) throws Exception {    	
       	productSalesMapper.productAlcSalesRecordHistoryDel(vo);
       }
     
    /**
	 * 매출품의 매출 및 매입내역 삭제 - etc
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void productSalesRecordDel(ProductSalesVO vo) throws Exception {    	
    	productSalesMapper.productSalesRecordDel(vo);
    }
    
    /**
	 * 매출품의 매출/매입 세금계산서 삭제
	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
	public void productSalesInvoiceDel(ProductSalesVO vo) throws Exception {    	
    	productSalesMapper.productSalesInvoiceDel(vo);
    }
	
    /**
   	 * 매출품의 매출/매입 세금계산서 저장
   	 * @param vo - 저장할 정보가 담긴 ProductSalesVO
   	 * @return void형
   	 * @exception Exception
   	 */
       @Override
   	public void productSalesFinalSubmit(ProductSalesVO vo, LoginVO loginVO) throws Exception {
	   
	   vo.setStatus_cd(Globals.EXP_ING_STATUS_CD); //제출 코드 702
	   
	   //monthly 입력
	   String monthlyId = productSalesMapper.productSalesMonthlyInsert(vo);
	   
	   //confer 업데이트
	   productSalesMapper.productSalesConferFinalUpdate(vo);
	   
		String approval_name = vo.getSales_confer_year() + "년 " + vo.getSales_confer_month() + "월 매입/매출 품의서";
		String source_type_cd = "04";
		
		ExpanseAdminVO expanseAdminVO = new ExpanseAdminVO();
		
		expanseAdminVO.setApproval_year(vo.getSales_confer_year());
		expanseAdminVO.setApproval_month(vo.getSales_confer_month());
		expanseAdminVO.setApproval_name(approval_name);
		expanseAdminVO.setSource_type_cd(source_type_cd);
		expanseAdminVO.setSource_object_id(monthlyId);
		expanseAdminVO.setCreator(vo.getCreator());
		
		//결재 요청서 저장
		int approvalId = expanseAdminMapper.expanseFinalApprovalInsert(expanseAdminVO);		
		expanseAdminVO.setApproval_id(approvalId);
		
		//결재 승인정보 저장
		expanseAdminMapper.expanseFinalApprovalNodeInsert(expanseAdminVO);
   }
}