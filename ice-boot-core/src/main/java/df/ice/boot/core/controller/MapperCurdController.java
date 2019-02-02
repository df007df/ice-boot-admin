package df.ice.boot.core.controller;

import java.lang.reflect.ParameterizedType;

import com.alibaba.fastjson.JSON;

import com.github.pagehelper.PageInfo;
import df.ice.boot.core.controller.ApiResponse.ApiErrorResponse;
import df.ice.boot.core.controller.entity.PageSearchFieldsVO;
import df.ice.boot.core.dao.BaseDao;
import df.ice.boot.core.service.MapperCurdService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by df on 2019/1/20.
 */
@CrossOrigin(origins = "*")
public class MapperCurdController<T extends BaseDao> extends BaseApiController {

    static final Logger logger = LoggerFactory.getLogger(MapperCurdController.class);

    @Autowired
    protected MapperCurdService<T> mapperCurdService;

    private Class<T> example;

    public MapperCurdController() {
        ParameterizedType pt = (ParameterizedType)this.getClass().getGenericSuperclass();
        example = (Class<T>)pt.getActualTypeArguments()[0];
    }

    /**
     * 模型搜索接口，支持分页和基本字段过滤
     *
     * @return
     */

    @GetMapping(value = "/search")
    public ApiResponse curdSearch(@ModelAttribute PageSearchFieldsVO<T> pageSearch) {

        pageSearch.setExample(example);

        PageInfo<T> pageInfo = mapperCurdService.selectByPage(pageSearch);
        pageSearch.setList(pageInfo.getList());
        pageSearch.setPageTotal(pageInfo.getTotal());

        return new ApiResponse(pageSearch);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public ApiResponse get(@PathVariable("id") int id) {

        T data = mapperCurdService.selectByPrimaryKey(id);
        return new ApiResponse(data);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(method = RequestMethod.POST, value = "/")
    public ApiResponse create(@RequestBody T data) {

        if (mapperCurdService.insertSelective(data) >= 1) {
            logger.info("controller create success, dao: `{}`", JSON.toJSONString(data));
            T newData = mapperCurdService.selectByPrimaryKey(data.getId());
            return new ApiResponse(newData);
        } else {
            return new ApiErrorResponse("create data is fail!");
        }

    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public ApiResponse update(@PathVariable("id") int id, @RequestBody T data) {
        T row = mapperCurdService.updateByPrimaryKeySelective(id, data);

        if (row != null) {
            return new ApiResponse(row);
        } else {
            return new ApiErrorResponse("update is fail!");
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public ApiResponse delete(@PathVariable("id") int id) {
        int rows = mapperCurdService.deleteByPrimaryKey(id);
        if (rows == 1) {
            return new ApiResponse(id);
        } else {
            return new ApiErrorResponse("delete is fail!");
        }
    }
}
