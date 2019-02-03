package df.ice.boot.web.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import com.github.pagehelper.PageInfo;
import df.ice.boot.core.controller.entity.PageSearchFieldsVO;
import df.ice.boot.core.controller.entity.PageSearchVO;
import df.ice.boot.core.service.MapperCurdService;
import df.ice.boot.web.AdminApplication;
import df.ice.boot.web.dao.User;
import df.ice.boot.web.dao.UserExample;
import df.ice.boot.web.module.user.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import tk.mybatis.mapper.entity.Example;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

/**
 * Created by df on 2019/1/16.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AdminApplication.class)
public class UserMapperCurdServiceTest {

    @Autowired
    private UserService service;

    @Autowired
    private MapperCurdService<User> mapperCurdService;

    @Test
    public void delAll() {
        UserExample example = new UserExample();
        example.createCriteria().andGmtCreateIsNotNull();
        service.deleteByExample(example);
        System.out.println("delAll");
    }

    @Test
    public void demo() {
        assertEquals("查询主键不一致", "demo", service.demo());
    }

    @Test
    public void insert() {
        User user = new User();

        user.setName("name_1");
        user.setId(1);
        user.setAge(10);
        user.setIsPass(true);

        assertEquals("插入数据失败", 1, service.insertSelective(user));

        user.setName("name_2");
        user.setId(2);
        user.setAge(23);
        user.setIsPass(false);

        assertEquals("插入数据失败", 1, service.insertSelective(user));

        user.setName("name_3");
        user.setId(3);
        user.setAge(33);
        user.setIsPass(false);

        assertEquals("插入数据失败", 1, service.insertSelective(user));

        user.setName("name_4");
        user.setId(4);
        user.setAge(44);
        user.setIsPass(true);

        assertEquals("插入数据失败", 1, service.insertSelective(user));

        user.setName("name_5");
        user.setId(5);
        user.setAge(51);
        user.setIsPass(true);

        assertEquals("插入数据失败", 1, service.insertSelective(user));
    }

    @Test
    public void selectByPk() {
        assertEquals("查询主键不一致", new Integer(3), service.selectByPrimaryKey(3).getId());
    }

    @Test
    public void selectByExample() {

        int[] data = {3, 4};

        UserExample example = new UserExample();
        example.setOrderByClause("age DESC");
        example.createCriteria().andIdIn(Arrays.stream(data).boxed().collect(Collectors.toList()));

        List<Integer> ids = new ArrayList<>();
        //3,4
        for (User dao : service.selectByExample(example)) {
            System.out.println(dao.getAge());

            ids.add(dao.getId());
        }

        assertArrayEquals("查询in调试不一致", data, ids.stream().mapToInt(Integer::valueOf).toArray());
    }

    @Test
    public void selectPage() {

        PageSearchVO pageSearchVO = new PageSearchVO<User>();
        pageSearchVO.setPageNum(1);
        pageSearchVO.setPageSize(2);

        PageInfo<User> pageInfo = service.selectByPage(pageSearchVO);

        assertEquals("分页查询数据不一致", 2, pageInfo.getList().size());
    }

    @Test
    public void selectPage2() {

        PageSearchVO pageSearchVO = new PageSearchVO<User>();
        pageSearchVO.setPageNum(1);
        pageSearchVO.setPageSize(4);

        PageInfo<User> pageInfo = service.selectByPage(pageSearchVO);

        System.out.println(pageInfo.getList());

        assertEquals("分页查询数据不一致", 4, pageInfo.getList().size());
    }

    @Test
    public void updateByPk() {

        User user = new User();
        user.setId(2);
        user.setAge(2224);

        assertEquals("数据跟新不一致", 1, service.updateByPrimaryKeySelective(user));
    }

    @Test
    public void updateByExample() {

        User user = new User();
        user.setAge(3334);

        UserExample example = new UserExample();
        example.createCriteria().andIdEqualTo(3);
        assertEquals("数据跟新不一致", 1, service.updateByExampleSelective(user, example));
    }

    @Test
    public void selectPage3() {

        PageSearchVO pageSearchVO = new PageSearchVO<User>();
        pageSearchVO.setPageNum(1);
        pageSearchVO.setPageSize(4);

        Example example = new Example(User.class, true);
        example.createCriteria().andEqualTo("age", 10);

        pageSearchVO.setCondition(example);

        PageInfo<User> pageInfo = service.selectByPage(pageSearchVO);

        System.out.println(pageInfo.getList());

    }

    @Test
    public void selectPage4() {

        PageSearchFieldsVO pageSearchVO = new PageSearchFieldsVO<User>();
        pageSearchVO.setPageNum(1);
        pageSearchVO.setPageSize(4);

        HashMap params = new HashMap();

        params.put("age", "=|10");

        pageSearchVO.setCondition(params);

        pageSearchVO.setExample(User.class);


        PageInfo<User> pageInfo = mapperCurdService.selectByPage(pageSearchVO);

        System.out.println(pageInfo);

    }

}
