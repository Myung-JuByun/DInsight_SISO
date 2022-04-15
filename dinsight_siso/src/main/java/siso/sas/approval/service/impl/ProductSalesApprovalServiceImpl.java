package siso.sas.approval.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.alc.admin.service.impl.AlcAdminMapper;
import siso.cmmn.util.SpringUserDetailsHelper;
import siso.cmmn.util.Globals;
import siso.exp.approval.service.ApprovalVO;
import siso.exp.approval.service.impl.ApprovalMapper;
import siso.sas.approval.service.ProductSalesApprovalService;
import siso.sas.approval.service.ProductSalesApprovalVO;
import siso.sys.service.LoginVO;

/**
 * @Class Name : ProductSalesApprovalServiceImpl.java
 * @Description : ProductSalesApprovalServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class ProductSalesApprovalServiceImpl implements ProductSalesApprovalService {

	@Autowired
	public SqlSession sqlSession;
	public ProductSalesApprovalMapper productSalesApprovalMapper;
	public ApprovalMapper approvalMapper;
	public AlcAdminMapper alcAdminMapper;	
	public LoginVO loginVO;
	
	ProductSalesApprovalServiceImpl(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
		this.productSalesApprovalMapper = sqlSession.getMapper(ProductSalesApprovalMapper.class);
		this.approvalMapper = sqlSession.getMapper(ApprovalMapper.class);
		this.alcAdminMapper = sqlSession.getMapper(AlcAdminMapper.class);		
	}
	
	/**
	 * 메인리스트
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	@Override
	public List<ApprovalVO> prdSalesApprovalList(ApprovalVO searchVO) throws Exception {
		return productSalesApprovalMapper.prdSalesApprovalList(searchVO);
	}
	
	/**
	 * 매입/매출 품의서 제출(승인)
	 * @param vo - 저장할 정보가 담긴 ProductSalesApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
    public void prdSalesApprovalPermit(ApprovalVO searchVO) throws Exception {
    	//회원정보
		loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
		int login_id       =  loginVO.getUser_id();
		
		searchVO.setModifier(login_id);
		searchVO.setSource_type_cd("04");
		searchVO.setNode_id(searchVO.getNode_id());
		searchVO.setSource_object_id(searchVO.getSource_object_id());
		searchVO.setStatus_cd("1702"); //승인코드
		searchVO.setApproval_id(searchVO.getApproval_id());
		searchVO.setFinal_expanse_appoint(searchVO.getFinal_expanse_appoint());
		searchVO.setExpanse_appoint_cd("00");
		
		//결재 승인정보 승인으로 변경(tb_approval_node)
		approvalMapper.updateApprovalNodeOwner(searchVO); //승인자
		approvalMapper.updateApprovalNodeCreator(searchVO); //기안자
    	
    	
		if(searchVO.getFinal_expanse_appoint().equals("1")) {
			searchVO.setStatus_cd(Globals.EXP_APP_OK_STATUS_CD);
		} else {
			searchVO.setStatus_cd(Globals.EXP_APP_ING_STATUS_CD);
		}
		
		productSalesApprovalMapper.updateProductSalesApprovalConferMonthly(searchVO);
		productSalesApprovalMapper.updateProductSalesApprovalConfer(searchVO);
		
		//최종 승인자 승인시 ALC 등록
		if(searchVO.getFinal_expanse_appoint().equals("1")) {
			
			ProductSalesApprovalVO productSalesApprovalVO = new ProductSalesApprovalVO();
			
			productSalesApprovalVO.setCreator(login_id);
			productSalesApprovalVO.setSales_confer_id(searchVO.getSales_confer_id());
			
			//alc 삭제
			productSalesApprovalMapper.alcDel(productSalesApprovalVO);
			//alc udate
			productSalesApprovalMapper.alcDelUpdate(productSalesApprovalVO);
			
			//다소 매입매출 수량 리스트
			List<ProductSalesApprovalVO> salesRecordDsList = productSalesApprovalMapper.salesRecordDsList(productSalesApprovalVO);
			
			for(int i=0; i<salesRecordDsList.size(); i++){
				
				for(int subCnt=0; subCnt<Integer.parseInt(salesRecordDsList.get(i).getQty()); subCnt++){
				
					String sales_record_ds_id = salesRecordDsList.get(i).getSales_record_ds_id();
					
					ProductSalesApprovalVO productSalesSubApprovalVO = new ProductSalesApprovalVO();
					
					productSalesSubApprovalVO.setSales_record_ds_id(sales_record_ds_id);
					
					//alc 저장 - 다소 데이터
					productSalesApprovalMapper.alcDsSave(productSalesSubApprovalVO);
				}
			}
			
			//alc 수정 - first_alc_id, first_company_id 수정
			productSalesApprovalMapper.alcFirstAlcIdCompanyIdModify(productSalesApprovalVO);
			
			//alc 수정 - 변경매입매출 기존데이터 삭제
			productSalesApprovalMapper.alcChangeSalesRecordModify(productSalesApprovalVO);
			
			//alc 저장 - 변경매입매출 데이터 저장
			productSalesApprovalMapper.alcChangeSalesRecordSave(productSalesApprovalVO);
			
			//alc 히스토리 저장
			productSalesApprovalMapper.alcChangSave(productSalesApprovalVO);
			
			//alc 수정 - max_chg_alc_id 수정
			alcAdminMapper.updateAlcAdminMaxChgAlcId();
		}
    }
    
    /**
	 * 매입/매출 품의서 제출(반려)
	 * @param vo - 저장할 정보가 담긴 ProductSalesApprovalVO
	 * @return void형
	 * @exception Exception
	 */
    @Override
    public void prdSalesApprovalCancle(ApprovalVO searchVO) throws Exception {
    	//회원정보
    	loginVO = (LoginVO) SpringUserDetailsHelper.getAuthenticatedUser();		
    	int login_id       =  loginVO.getUser_id();
    	
    	searchVO.setModifier(login_id);
    	searchVO.setSource_object_id(searchVO.getSource_object_id());
		searchVO.setNode_id(searchVO.getNode_id());
		searchVO.setStatus_cd("1703"); //반려코드
		searchVO.setApproval_id(searchVO.getApproval_id());
		searchVO.setCreator(searchVO.getCreator());
		searchVO.setExpanse_appoint_cd("00");
		
		//결재 승인정보 승인으로 변경(tb_approval_node)
		approvalMapper.updateApprovalNodeOwner(searchVO); //승인자
		approvalMapper.updateApprovalNodeCreator(searchVO); //기안자
    	
		//반려코드
		searchVO.setStatus_cd(Globals.EXP_APP_CANCEL_STATUS_CD);
		
		productSalesApprovalMapper.updateProductSalesApprovalConferMonthly(searchVO);
		productSalesApprovalMapper.updateProductSalesApprovalConfer(searchVO);
		
		////////////////////////////////////////////////
		//반려 처리후 기존데이터를 새로 입력해준다.
		ProductSalesApprovalVO productSalesApprovalVO = new ProductSalesApprovalVO();
		
		//
		productSalesApprovalVO.setStatus_cd(Globals.EXP_IMSI_SAVE_STATUS_CD);
		productSalesApprovalVO.setSales_confer_id(searchVO.getSales_confer_id());
		
		//매입 및 매출 품의서 복사
		int new_sales_confer_id = productSalesApprovalMapper.copyProductSalesApprovalConfer(productSalesApprovalVO);		
		productSalesApprovalVO.setNew_sales_confer_id(new_sales_confer_id);
		
		//ETC 매입 및 매출내역 복사
		productSalesApprovalMapper.copyProductSalesApprovalRecord(productSalesApprovalVO);
		
		//DS 매입 및 매출내역 복사
		productSalesApprovalMapper.copyProductSalesApprovalRecordDs(productSalesApprovalVO);
		
		//DS 변경 매입 및 매출내역 복사
		productSalesApprovalMapper.copyProductSalesApprovalRecordDsChang(productSalesApprovalVO);
		
		//매입/매출 세금계산서 복사
		productSalesApprovalMapper.copyProductSalesApprovalInvoice(productSalesApprovalVO);
    }
}
