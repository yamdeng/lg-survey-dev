package com.lgsurvey.DevGuide.dto.response;

import com.lgsurvey.DevGuide.dto.CommonDto;
import com.lgsurvey.DevGuide.dto.CommonFileDto;
import com.lgsurvey.DevGuide.dto.CommonFileMapDto;
import com.lgsurvey.DevGuide.dto.NoticeBoardDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@ToString(callSuper = true)
@SuperBuilder
@NoArgsConstructor
public class NoticeBoardResponseDto extends NoticeBoardDto {

    @Schema(description = "파일 목록")
    private List<CommonFileMapDto> fileList;

}
