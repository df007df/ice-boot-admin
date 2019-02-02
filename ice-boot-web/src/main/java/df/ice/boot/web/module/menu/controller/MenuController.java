package df.ice.boot.web.module.menu.controller;

import df.ice.boot.core.controller.MapperCurdController;
import df.ice.boot.web.dao.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by df on 2019/1/20.
 */
@RestController
@RequestMapping("/admin/api/menu/curd")
public class MenuController extends MapperCurdController<User> {


}
