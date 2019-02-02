package df.ice.boot.web.module.user.service;

import df.ice.boot.core.service.MapperCurdService;
import df.ice.boot.web.dao.User;

/**
 * Created by df on 2019/1/16.
 */
public interface UserService extends MapperCurdService<
    User> {

    /**
     * 接口方法
     *
     * @return
     */
    String demo();

}
