package df.ice.boot.web.module.menu.controller;

import df.ice.boot.core.controller.MapperCurdController;
import df.ice.boot.web.dao.Menu;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by df on 2019/1/20.
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin/api/menu")
public class MenuController extends MapperCurdController<Menu> {


}
