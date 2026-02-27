package com.lgsurvey.DevGuide.common;

import java.sql.SQLException;
import java.util.List;

public interface CommonSqlDao {

  /**
   * 특정 쿼리문 실행 : Delete
   *
   * @param qName     : 쿼리문 네임스페이스
   * @param parameter
   * @return
   * @throws SQLException
   */
  int delete(String qName, Object parameter);

  int delete(String qName);

  /**
   * 특정 쿼리문 실행 : Insert
   *
   * @param qName     : 쿼리문 네임스페이스
   * @param parameter
   * @return
   * @throws SQLException
   */
  int insert(String qName, Object parameter);

  int insert(String qName);

  /**
   * 틀정 쿼리문 실행 : Update
   *
   * @param qName
   * @param parameter
   * @return
   * @throws SQLException
   */
  int update(String qName, Object parameter);

  int update(String qName);

  /**
   * 특정 쿼리문 실행 : SELECT - ONE
   *
   * @param qName
   * @param parameter
   * @return Object
   * @throws SQLException
   */
  <T> T selectOne(String qName, Object parameter);

  <T> T selectOne(String qName);


  /**
   * 특정쿼리문 실행 : SELECT - LIST
   *
   * @param qName
   * @param parameter
   * @return
   * @throws SQLException
   */
  @SuppressWarnings("rawtypes")
  List selectList(String qName, Object parameter);

  @SuppressWarnings("rawtypes")
  List selectList(String qName);
}

