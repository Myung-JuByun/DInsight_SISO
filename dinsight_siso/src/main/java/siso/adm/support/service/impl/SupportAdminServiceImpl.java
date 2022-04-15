package siso.adm.support.service.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import siso.adm.support.service.SupportAdminService;
import siso.adm.support.service.SupportPurchaseSalesVO;
import siso.adm.support.service.SupportPurchaseVO;
import siso.adm.support.service.SupportSalesItemNameVO;
import siso.adm.support.service.SupportSalesVO;

/**
 * @Class Name : UserAdminServiceImpl.java
 * @Description : UserAdminServiceImpl Class
 * @Modification Information 2009.03.16 최초생성
 * 
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see Copyright (C) by MOPAS All right reserved.
 */

@Service
public class SupportAdminServiceImpl implements SupportAdminService {
	
	@Autowired
	public SqlSession sqlSession;
	public SupportAdminMapper supportAdminMapper;
	
	public SupportAdminServiceImpl(SqlSession sqlSession){
		this.sqlSession = sqlSession;
		this.supportAdminMapper = sqlSession.getMapper(SupportAdminMapper.class);
	}
	
	@Override
	public void purchaseExcelupload(SupportPurchaseVO vo) throws Exception {
		supportAdminMapper.purchaseExceluploadInsert(vo);
	}

	@Override
	public void purchaseDelete(SupportPurchaseVO vo) throws Exception {
		supportAdminMapper.purchaseDelete(vo);
	}

	@Override
	public void salesExcelupload(SupportSalesVO vo) throws Exception {
		supportAdminMapper.salesExceluploadInsert(vo);
	}

	@Override
	public void salesDelete(SupportSalesVO vo) throws Exception {
		supportAdminMapper.salesDelete(vo);
	}

	@Override
	public List<SupportPurchaseSalesVO> purchaseSalesStatus(SupportPurchaseSalesVO vo) throws Exception {
		return supportAdminMapper.purchaseSalesStatus(vo);
	}

	@Override
	public List<SupportPurchaseVO> purchaseSelect(SupportPurchaseVO vo) throws Exception {
		return supportAdminMapper.purchaseSelect(vo);
	}
	
	@Override
	public List<SupportSalesVO> salesSelect(SupportSalesVO vo) throws Exception {
		return supportAdminMapper.salesSelect(vo);
	}

	@Override
	public List<SupportSalesVO> salesStatus(SupportSalesVO vo) throws Exception {
		return supportAdminMapper.salesStatus(vo);
	}

	@Override
	public List<SupportPurchaseVO> purchaseStatus(SupportPurchaseVO vo)
			throws Exception {
		return supportAdminMapper.purchaseStatus(vo);
	}

	@Override
	public List<SupportSalesVO> salesStatusPop(SupportPurchaseSalesVO vo)throws Exception {
		return supportAdminMapper.salesStatusPop(vo);
	}

	@Override
	public List<SupportPurchaseVO> purchaseStatusPop(SupportPurchaseSalesVO vo)
			throws Exception {
		return supportAdminMapper.purchaseStatusPop(vo);
	}

	@Override
	public List<SupportSalesItemNameVO> item_div_name(SupportSalesVO vo)throws Exception {
		return supportAdminMapper.item_div_name(vo);
	}
}