package com.lgsurvey.DevGuide.controller.view;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Slf4j
@Controller
public class ViewController {

  @RequestMapping(
      value = {"/{path:^(?!api|assets|static|css|js|images|favicon|error|html|admin).*}/**",
          "/"})
  public String index(Model model) {
    return "index";
  }

  @RequestMapping(value = {"/admin", "/admin/**"})
  public String admin(Model model) {
    return "admin";
  }

}
