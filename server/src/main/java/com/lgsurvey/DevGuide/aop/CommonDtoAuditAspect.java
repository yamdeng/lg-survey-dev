package com.lgsurvey.DevGuide.aop;

import com.lgsurvey.DevGuide.dto.CommonDto;
import com.lgsurvey.DevGuide.utils.RequestUtil;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CommonDtoAuditAspect {

    @Before("execution(* com.lgsurvey.DevGuide..controller..*(..))")
    public void injectUserInfoIntoDto(JoinPoint joinPoint) {
        String userId = getLoginUserId();
        String clientIp = RequestUtil.getClientIp();

        for (Object arg : joinPoint.getArgs()) {
            if (arg instanceof CommonDto dto) {
                if (dto.getRegUserKey() == null) {
                    dto.setRegUserKey(userId);
                }
                dto.setModUserKey(userId);
                dto.setClientIp(clientIp);
            }
        }
    }

    private String getLoginUserId() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated())
            return "anonymous";
        return auth.getName();
    }

}

