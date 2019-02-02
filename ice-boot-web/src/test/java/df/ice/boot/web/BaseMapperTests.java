package df.ice.boot.web;

import java.util.List;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import df.ice.boot.core.service.impl.MapperCurdServiceImpl;
import df.ice.boot.web.dao.User;
import df.ice.boot.web.dao.mapper.UserMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 * Created by df on 2019/1/15.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AdminApplication.class)
public class BaseMapperTests {

    @Autowired
    private UserMapper mapper;

    @Autowired
    private MapperCurdServiceImpl<User> CurdService;

    @Test
    public void demo() {
        System.out.println("ok!");
    }

    @Test
    public void mapperselectAll() {
        List<User> list = mapper.selectAll();
        assertNotNull("mapper查询失败", list);
    }

    @Test
    public void mapperselectByPrimaryKey() {
        User dao = mapper.selectByPrimaryKey(2);
        assertEquals("ID不一致", new Integer(2), dao.getId());
    }

    @Test
    public void mapperPage() {

        PageHelper.startPage(1, 4);
        List<User> list = mapper.selectAll();
        assertEquals("分页失败", 4, list.size());

        PageHelper.startPage(1, 9);
        List<User> list2 = mapper.selectAll();
        assertEquals("分页失败", 9, list2.size());

    }

    @Test
    public void mapperPageInfo() {

        PageHelper.startPage(1, 10);
        List<User> list = mapper.selectAll();

        PageInfo page = new PageInfo(list);
        //测试PageInfo全部属性
        //PageInfo包含了非常全面的分页属性
        assertEquals(1, page.getPageNum());
        assertEquals(10, page.getPageSize());
        assertEquals(1, page.getStartRow());
        assertEquals(10, page.getEndRow());
        assertEquals(249, page.getTotal());
        assertEquals(25, page.getPages());
        assertEquals(1, page.getNavigateFirstPage());
        assertEquals(8, page.getNavigateLastPage());
        assertEquals(true, page.isIsFirstPage());
        assertEquals(false, page.isIsLastPage());
        assertEquals(false, page.isHasPreviousPage());
        assertEquals(true, page.isHasNextPage());

        List<User> liss = page.getList();
    }

}
