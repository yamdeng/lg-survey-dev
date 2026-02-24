/* common_group_code : 공통그룹코드 */
CREATE TABLE common_group_code
(
    group_code   VARCHAR(255)                        NOT NULL,
    group_name   VARCHAR(255)                        NOT NULL,
    use_yn       CHAR(1)                             NOT NULL,
    description  VARCHAR(2000) NULL,
    reg_date     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mod_date     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    reg_user_key VARCHAR(255) NULL,
    mod_user_key VARCHAR(255) NULL,
    CONSTRAINT common_group_code_pk PRIMARY KEY (group_code)
);

/* common_code : 공통 코드 */
CREATE TABLE common_code
(
    group_code   VARCHAR(255)                        NOT NULL,
    code         VARCHAR(255)                        NOT NULL,
    code_name    VARCHAR(255)                        NOT NULL,
    use_yn       CHAR(1)                             NOT NULL,
    description  VARCHAR(2000) NULL,
    sort_index   INT NULL,
    reg_date     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mod_date     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    reg_user_key VARCHAR(255) NULL,
    mod_user_key VARCHAR(255) NULL,
    CONSTRAINT common_code_pk PRIMARY KEY (group_code, code)
);

/* common_file : 공통 파일 */
CREATE TABLE common_file
(
    file_key       VARCHAR(255)                        NOT NULL,
    ori_filename   VARCHAR(300) NULL,
    file_ext       VARCHAR(50) NULL,
    mime_type      VARCHAR(100) NULL,
    thum_mime_type VARCHAR(100) NULL,
    file_size      NUMERIC(19) NULL,
    parent_path    VARCHAR(300) NULL,
    file_hash      VARCHAR(256) NULL,
    use_yn         CHAR(1)                             NOT NULL,
    base64_string  TEXT NULL,
    reg_date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mod_date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    reg_user_key   VARCHAR(255) NULL,
    mod_user_key   VARCHAR(255) NULL,
    CONSTRAINT common_file_pk PRIMARY KEY (file_key)
);


/* common_dept : 부서 */
CREATE TABLE common_dept
(
    dept_key       VARCHAR(255)                        NOT NULL,
    upper_dept_key VARCHAR(255) NULL,
    dept_name      VARCHAR(4000)                       NOT NULL,
    use_yn         CHAR(1)                             NOT NULL,
    sort_index     INT NULL,
    reg_date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mod_date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    reg_user_key   VARCHAR(255) NULL,
    mod_user_key   VARCHAR(255) NULL,
    CONSTRAINT common_dept_pk PRIMARY KEY (dept_key)
);


/* common_user : 사용자 */
CREATE TABLE common_user
(
    user_key      VARCHAR(255)                        NOT NULL,
    dept_key      VARCHAR(255) NULL,
    position_key  VARCHAR(255) NULL,
    user_id       VARCHAR(50) NULL,
    user_name     VARCHAR(255)                        NOT NULL,
    user_name_en  VARCHAR(255) NULL,
    user_comment  VARCHAR(4000) NULL,
    email         VARCHAR(50) NULL,
    mobile_tel    VARCHAR(20) NULL,
    birth_date    DATE NULL,
    start_time    TIME,
    use_yn        CHAR(1) NULL,
    user_password VARCHAR(4000) NULL,
    user_type     CHAR(1) NULL,
    author_cd     VARCHAR(5000) NULL,
    reg_date      TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mod_date      TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    reg_user_key  VARCHAR(255) NULL,
    mod_user_key  VARCHAR(255) NULL,
    CONSTRAINT common_user_pk PRIMARY KEY (user_key)
);


/* common_position : 직위 */
CREATE TABLE common_position
(
    position_key   VARCHAR(255)                        NOT NULL,
    position_title VARCHAR(50)                         NOT NULL,
    sort_index     INT NULL,
    reg_date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mod_date       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    reg_user_key   VARCHAR(255) NULL,
    mod_user_key   VARCHAR(255) NULL,
    CONSTRAINT common_position_pk PRIMARY KEY (position_key)
);


/* notice_board : 공지사항 게시판 */
/* use_yn : 체크박스 테스트용 */
/* main_yn : Select */
/* board_auth_type : 라디오 테스트용 */
/* security_level : CodeSelect */
CREATE TABLE notice_board
(
    board_key     VARCHAR(255)                        NOT NULL,
    board_type    VARCHAR(15) NULL,
    board_title   VARCHAR(1000)                       NOT NULL,
    board_content TEXT NULL,
    use_yn        CHAR(1) DEFAULT 'Y' NULL,
    main_yn       CHAR(1) DEFAULT 'N' NULL,
    board_auth_type     VARCHAR(50) NULL,
    security_level     VARCHAR(50) NULL,
    reg_date      TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mod_date      TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    reg_user_key  VARCHAR(15) NULL,
    mod_user_key  VARCHAR(15) NULL,
    CONSTRAINT notice_board_pk PRIMARY KEY (board_key)
);


/* common_menu : 메뉴 */
CREATE TABLE common_menu
(
    menu_key     VARCHAR(255)                        NOT NULL,
    up_menu_key  VARCHAR(255) NULL,
    menu_level   INT NULL,
    menu_title   VARCHAR(500)                        NOT NULL,
    menu_url     VARCHAR(500) NULL,
    sort_index   INT NULL,
    description  VARCHAR(2000) NULL,
    use_yn       CHAR(1)                             NOT NULL,
    menu_type    CHAR(1)                             NOT NULL,
    reg_date     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    mod_date     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    reg_user_key VARCHAR(255) NULL,
    mod_user_key VARCHAR(255) NULL,
    CONSTRAINT common_menu_pk PRIMARY KEY (menu_key)
);

/* common_error_log : error 로그 테이블 */
CREATE TABLE common_error_log
(
    log_key       VARCHAR(255)                        NOT NULL,
    user_key      VARCHAR(255) NULL,
    log_kind_code VARCHAR(50) NULL,
    error_message TEXT                       NOT NULL,
    reg_date      TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT common_error_log_pk PRIMARY KEY (log_key)
);

/* common_file_map : 파일 연결 맵 테이블 */
CREATE TABLE common_file_map
(
    file_key     VARCHAR(255) NOT NULL, -- 파일 테이블 PK
    ref_key      VARCHAR(255) NOT NULL, -- 게시글(board_key) 등 참조 대상의 PK
    ref_type     VARCHAR(50)  NOT NULL, -- 참조 타입 (예: 'NOTICE', 'USER_PROFILE')
    sort_index   INT DEFAULT 0,         -- 파일 정렬 순서
    reg_date     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT common_file_map_pk PRIMARY KEY (file_key, ref_key)
);
