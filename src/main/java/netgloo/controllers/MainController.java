package netgloo.controllers;

import netgloo.models.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class MainController {
    @RequestMapping("/")
    public String index() {
        return "index";
    }
    @RequestMapping("/m")
    public String login() {
        return "login";
    }
    @RequestMapping("/s")
    public String loginSuper() {
        return "super";
    }

}

