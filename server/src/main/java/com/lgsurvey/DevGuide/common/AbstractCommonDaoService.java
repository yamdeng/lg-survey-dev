package com.lgsurvey.DevGuide.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public abstract class AbstractCommonDaoService {

  @Autowired
  @Qualifier("commonSqlDao")
  protected CommonSqlDao commonSqlDao;

}
