package com.lgsurvey.DevGuide.utils;

import com.lgsurvey.DevGuide.dto.SessionDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {

  private final Key key;
  private final long accessTokenExpTime;
  private final long refreshTokenExpTime;

  // private final ModelMapper modelMapper;

  public JwtUtil(@Value("${jwt.secret}") String secretKey,
      @Value("${jwt.accessToken.expiration_time}") long accessTokenExpTime,
      @Value("${jwt.refreshToken.expiration_time}") long refreshTokenExpTime) {
    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    this.key = Keys.hmacShaKeyFor(keyBytes);
    this.accessTokenExpTime = accessTokenExpTime;
    this.refreshTokenExpTime = refreshTokenExpTime;
  }

  /**
   * Access Token 생성
   *
   * @param user
   * @return Access Token String
   */
  public String createAccessToken(SessionDto user) {
    return createToken(user, accessTokenExpTime);
  }

  /**
   * Refresh Token 생성
   *
   * @param user
   * @return Access Token String
   */
  public String createRefreshToken(SessionDto user) {
    return createRefreshToken(user, refreshTokenExpTime);
  }


  /**
   * JWT 생성
   *
   * @param user
   * @param expireTime
   * @return JWT String
   */
  private String createToken(SessionDto user, long expireTime) {
    Claims claims = getClaimsBySessionDto(user);

    ZonedDateTime now = ZonedDateTime.now();
    ZonedDateTime tokenValidity = now.plusSeconds(expireTime);

    return Jwts.builder().setClaims(claims).setIssuedAt(Date.from(now.toInstant()))
        .setExpiration(Date.from(tokenValidity.toInstant())).signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  /**
   * Refresh Token 생성
   *
   * @param user
   * @param expireTime
   * @return JWT String
   */
  private String createRefreshToken(SessionDto user, long expireTime) {
    Claims claims = getClaimsBySessionDto(user);

    ZonedDateTime now = ZonedDateTime.now();
    ZonedDateTime tokenValidity = now.plusSeconds(expireTime);

    return Jwts.builder().setClaims(claims).setIssuedAt(Date.from(now.toInstant()))
        .setExpiration(Date.from(tokenValidity.toInstant())).signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }


  /**
   * Token에서 User ID 추출
   *
   * @param token
   * @return User ID
   */
  public String getUserId(String token) {
    return parseClaims(token).get("userId", String.class);
  }

  /**
   * Token에서 empNo 추출
   *
   * @param token
   * @return User ID
   */
  public String getUserKey(String token) {
    return parseClaims(token).get("userKey", String.class);
  }

  public boolean validateToken(String token, HttpServletRequest request) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (ExpiredJwtException e) {
      log.error("Expired JWT Token");
      // 토큰이 만료된 경우 request에 표식 남김
      request.setAttribute("exception", "TOKEN_EXPIRED");
    } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException e) {
      log.error("Invalid JWT Token");
      // 토큰 자체가 잘못된 경우 (위조, 파손 등)
      request.setAttribute("exception", "INVALID_TOKEN");
    }
    return false;
  }

  /**
   * JWT 검증
   *
   * @param token
   * @return IsValidate
   */
  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
      // log.info("Invalid JWT Token", e);
      log.error("Invalid JWT Token");
    } catch (ExpiredJwtException e) {
      // log.info("Expired JWT Token", e);
      log.error("Expired JWT Token");
    } catch (UnsupportedJwtException e) {
      // log.info("Unsupported JWT Token", e);
      log.error("Unsupported JWT Token");
    } catch (IllegalArgumentException e) {
      // log.info("JWT claims string is empty.", e);
      log.error("JWT claims string is empty");
    }
    return false;
  }


  /**
   * JWT Claims 추출
   *
   * @param accessToken
   * @return JWT Claims
   */
  public Claims parseClaims(String accessToken) {
    try {
      return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
    } catch (ExpiredJwtException e) {
      return e.getClaims();
    }
  }

  public SessionDto getSessionDtoByAccessToken(String accessToken) {
    Claims body =
        Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
    ModelMapper modelMapper = new ModelMapper();
    SessionDto result = modelMapper.map(body, SessionDto.class);
    return result;
  }

  private Claims getClaimsBySessionDto(SessionDto user) {
    Claims claims = Jwts.claims();
    claims.put("userKey", user.getUserKey());
    claims.put("deptKey", user.getDeptKey());
    claims.put("positionKey", user.getPositionKey());
    claims.put("userIp", user.getUserId());
    claims.put("userName", user.getUserName());
    claims.put("userNameEn", user.getUserNameEn());
    claims.put("email", user.getEmail());
    claims.put("useYn", user.getUseYn());
    claims.put("userType", user.getUserType());
    return claims;
  }
}

