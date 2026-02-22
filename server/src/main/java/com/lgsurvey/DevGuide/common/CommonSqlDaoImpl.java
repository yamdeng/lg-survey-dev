package com.lgsurvey.DevGuide.common;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository("commonSqlDao")
public class CommonSqlDaoImpl implements CommonSqlDao {

  private SqlSession sqlSession;

  private boolean externalSqlSession;

  @Autowired(required = false)
  public final void setSqlSessionFactory(
      @Qualifier("sqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
    if (!this.externalSqlSession) {
      this.sqlSession = new SqlSessionTemplate(sqlSessionFactory);
    }
  }

  @Autowired(required = false)
  public final void setSqlSessionTemplate(
      @Qualifier("sqlSessionTemplate") SqlSessionTemplate sqlSessionTemplate) {
    this.sqlSession = sqlSessionTemplate;
    this.externalSqlSession = true;
  }

  public int delete(String qName, Object parameter) {
    return this.sqlSession.delete(qName, parameter);
  }

  public int insert(String qName, Object parameter) {
    return this.sqlSession.insert(qName, parameter);
  }

  public int update(String qName, Object parameter) {
    return this.sqlSession.update(qName, parameter);
  }

  public <T> T selectOne(String qName, Object parameter) {
    return this.sqlSession.selectOne(qName, parameter);
  }

  @SuppressWarnings("rawtypes")
  public List selectList(String qName, Object parameter) {
    return this.sqlSession.selectList(qName, parameter);
  }

  public int delete(String qName) {
    return delete(qName, null);
  }

  public int insert(String qName) {
    return insert(qName, null);
  }

  public int update(String qName) {
    return update(qName, null);
  }

  public <T> T selectOne(String qName) {
    return selectOne(qName, null);
  }

  @SuppressWarnings("rawtypes")
  public List selectList(String qName) {
    return selectList(qName, null);
  }

}

