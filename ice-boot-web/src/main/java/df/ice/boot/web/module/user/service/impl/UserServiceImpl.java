package df.ice.boot.web.module.user.service.impl;

import df.ice.boot.web.dao.User;
import df.ice.boot.web.module.common.BaseServiceImpl;
import df.ice.boot.web.module.user.service.UserService;
import org.springframework.stereotype.Service;

/**
 * Created by df on 2019/1/16.
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User> implements
    UserService {

    public String demo() {
        return "demo";
    }
}
